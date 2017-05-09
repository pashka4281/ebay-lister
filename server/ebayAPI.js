import ebay from 'ebay-api';
import { Meteor } from 'meteor/meteor';

let apiEndpoint = "https://api.sandbox.ebay.com/ws/api.dll";
let xmlRequestSync = Meteor.wrapAsync(ebay.xmlRequest);

let ebayAPI = {
  getCategory: function() {
    let user = Meteor.user();

    let response = xmlRequestSync( {
      serviceName: 'Trading',
      opType: 'GetCategories',
      appId: Meteor.settings.eBay.appId,
      devId: Meteor.settings.eBay.devId,
      certId: Meteor.settings.eBay.certId,
      authToken: user.profile.ebayAuthToken,
      sandbox: Meteor.settings.eBay.isSandbox,
      params: {
        CategorySiteID: "0",
        DetailLevel: "ReturnAll",
        LevelLimit: 1
      },
      parser: ebay.parseResponseJson
    });

    return response.Categorys; // <- that's suuper weird spelling, I know ¯\_(ツ)_/¯
  }
};

module.exports.ebayAPI = ebayAPI;
