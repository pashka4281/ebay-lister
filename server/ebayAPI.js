import ebay from 'ebay-api';
import { Meteor } from 'meteor/meteor';
import { ScrapedPages } from '../common/collections';
import xml2js from 'xml2js';

let apiEndpoint    = "https://api.sandbox.ebay.com/ws/api.dll";
let xmlRequestSync = Meteor.wrapAsync(ebay.xmlRequest);
let parseXmlSync   = Meteor.wrapAsync(xml2js.parseString);

let ebayAPI = {
  getCategory: function(parentCategoryId) {
    let user = Meteor.user();

    let params = {
      CategorySiteID: "0",
      DetailLevel: "ReturnAll",
      LevelLimit: 1
    };

    if (parentCategoryId) {
      params.CategoryParent = parentCategoryId;
      params.LevelLimit = 2;
    }

    let response = xmlRequestSync( {
      serviceName: 'Trading',
      opType: 'GetCategories',
      appId: Meteor.settings.eBay.appId,
      devId: Meteor.settings.eBay.devId,
      certId: Meteor.settings.eBay.certId,
      authToken: user.profile.ebayAuthToken,
      sandbox: Meteor.settings.eBay.isSandbox,
      params: params,
      parser: ebay.parseResponseJson
    });

    let categories = response.Categorys; // <- that's suuper weird spelling, I know ¯\_(ツ)_/¯
    let currentLevelCategories = _.filter(categories, (c) => c.CategoryLevel == params.LevelLimit);
    return currentLevelCategories;
  },

  validateItemBeforeSubmitting: function() {
    let user = Meteor.user();

    let params = {
      //CategorySiteID: "0",
      //DetailLevel: "ReturnAll",
      //LevelLimit: 1,

      ErrorLanguage: "en_US",
      WarningLevel: "High",
      Item: {
        Title: "Harry Potter and the Philosopher's Stone",
        Description: "This is the first book in the Harry Potter series. In excellent condition!",
        PrimaryCategory: {
          CategoryID: 377
        },
        StartPrice: 1.0,
        CategoryMappingAllowed: true,
        ConditionID: 4000,
        Country: "US",
        Currency: "USD",
        DispatchTimeMax: 3,
        ListingDuration: "Days_7",
        ListingType: "Chinese",
        PaymentMethods: "PayPal",
        PayPalEmailAddress: user.profile.paypalEmailAddress,
        PictureDetails: [
          //{ PictureURL: "http://i1.sandbox.ebayimg.com/03/i/00/30/07/20_1.JPG?set_id=8800005007" },
          { PictureURL: "http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg" }
        ],
        PostalCode: 95125,
        Quantity: 1,
        ReturnPolicy: {
          ReturnsAcceptedOption: "ReturnsAccepted",
          RefundOption: "MoneyBack",
          ReturnsWithinOption: "Days_30",
          Description: "If you are not satisfied, return the book for refund.",
          ShippingCostPaidByOption: "Buyer"
        },
        ShippingDetails: {
          ShippingType: "Flat",
          ShippingServiceOptions: {
            ShippingServicePriority : 1,
            ShippingService         : "USPSMedia",
            ShippingServiceCost     : 2.50
          }
        },
        Site: "US"
      }
    };

    try {
      let response = xmlRequestSync({
        serviceName: 'Trading',
        opType: 'VerifyAddItem',
        appId: Meteor.settings.eBay.appId,
        devId: Meteor.settings.eBay.devId,
        certId: Meteor.settings.eBay.certId,
        authToken: user.profile.ebayAuthToken,
        sandbox: Meteor.settings.eBay.isSandbox,
        params: params,
        parser: ebay.parseResponseJson
      });

      console.log(response)
    } catch(err) {
      let parsed = parseXmlSync(err.requestContext.response.body)
      return parsed.VerifyAddItemResponse;
    }
  },

  addItem: function(scrapedPageId) {
    let scrapedPage = ScrapedPages.findOne(scrapedPageId)

    let user = Meteor.user();
    let ebayParams = scrapedPage.ebayParams;
    if (!ebayParams) throw new Meteor.Error("ebayParams is empty on a scrapedPage! Can't proceed");

    let imagesArray = scrapedPage.scrapedData.images.map((img) => {
      { PictureURL: img }
    });


    let params = {
      //CategorySiteID: "0",
      //DetailLevel: "ReturnAll",
      //LevelLimit: 1,
      ErrorLanguage: "en_US",
      WarningLevel: "High",
      Item: {
        Title: ebayParams.title,
        Description: ebayParams.description,
        PrimaryCategory: {
          CategoryID: ebayParams.categoryId
        },
        StartPrice: ebayParams.price,
        CategoryMappingAllowed: true,
        ConditionID: 4000,
        Country: "US",
        Currency: "USD",
        DispatchTimeMax: 3,
        ListingDuration: ebayParams.ListingDuration,
        ListingType: ebayParams.ListingType,
        PaymentMethods: "PayPal",
        PayPalEmailAddress: user.profile.paypalEmailAddress,
        //PictureDetails: [
          //{ PictureURL: "http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg" }
        //],
        PictureDetails: imagesArray,
        PostalCode: 95125,
        Quantity: 1,
        ReturnPolicy: {
          ReturnsAcceptedOption: "ReturnsAccepted",
          RefundOption: "MoneyBack",
          ReturnsWithinOption: "Days_30",
          Description: "If you are not satisfied, return the book for refund.",
          ShippingCostPaidByOption: "Buyer"
        },
        ShippingDetails: {
          ShippingType: "Flat",
          ShippingServiceOptions: {
            ShippingServicePriority : 1,
            ShippingService         : "USPSMedia",
            ShippingServiceCost     : 2.50
          }
        },
        Site: "US"
      }
    };

    try {
      let response = xmlRequestSync({
        serviceName: 'Trading',
        opType: 'VerifyAddItem',
        appId: Meteor.settings.eBay.appId,
        devId: Meteor.settings.eBay.devId,
        certId: Meteor.settings.eBay.certId,
        authToken: user.profile.ebayAuthToken,
        sandbox: Meteor.settings.eBay.isSandbox,
        params: params,
        parser: ebay.parseResponseJson
      });

      console.log(response)
    } catch(err) {
      let parsed = parseXmlSync(err.requestContext.response.body)
      return parsed.VerifyAddItemResponse;
    }
  }
};

module.exports.ebayAPI = ebayAPI;
