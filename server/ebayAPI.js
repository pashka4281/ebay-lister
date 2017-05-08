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
      params: {
        CategorySiteID: "0",
        DetailLevel: "ReturnAll"
      },
      parser: ebay.parseResponseJson
    });

    return response;
  },

  findItemsByKeywords: function(keywords=[]) {
    var params = {
      keywords        : keywords,
      outputSelector  : ['AspectHistogram'],
      paginationInput : { entriesPerPage: 10 },
      domainFilter    : [ {name: 'domainName', value: 'Digital_Cameras'} ],
      itemFilter: [
        {name: 'FreeShippingOnly', value: true},
        {name: 'MaxPrice', value: '150'}
      ]
    };

    let itemsResponse = xmlRequestSync( {
      serviceName: 'Finding',
      opType: 'findItemsByKeywords',
      appId: 'PavloS-xLIster-PRD-e08f655c9-281d827d',
      params: params,
      parser: ebay.parseResponseJson
    });

    var items = itemsResponse.searchResult.item;
    return items;
  },

  _makeRequest: function() {
  }
};

module.exports.ebayAPI = ebayAPI;
