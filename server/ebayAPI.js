import ebay from 'ebay-api';
import { Meteor } from 'meteor/meteor';

let apiEndpoint = "https://api.sandbox.ebay.com/ws/api.dll";
let xmlRequestSync = Meteor.wrapAsync(ebay.xmlRequest);

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
    let response = xmlRequestSync( {
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
  }
};

module.exports.ebayAPI = ebayAPI;
