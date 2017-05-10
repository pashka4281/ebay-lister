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
  }
};

module.exports.ebayAPI = ebayAPI;
