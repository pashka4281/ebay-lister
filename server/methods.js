import { Meteor } from 'meteor/meteor';
import { Scrapers } from './scrapers';
import { ScrapedPages } from '../common/collections';
import { ebayAPI } from './ebayAPI';

Meteor.methods({
  'parseUrl': function(url) {
    let scraper    = Scrapers.findScraperByUrl(url);
    let parserData = JSON.parse(scraper.parse(url));

    let newPageId  = ScrapedPages.insert({
      scrapedData : parserData,
      createdAt   : new Date,
      url         : url
    });
    return newPageId;
  },

  'setAuthToken': function(token) {
    let userId = Meteor.userId();

    Meteor.users.update({ _id: userId }, {
      $set: {
        'profile.ebayAuthToken': token
      }
    });
  },

  'ebay.findItemsByKeywords': function() {
    let items = ebayAPI.findItemsByKeywords(["Canon", "Powershot"]);
    return items;
  },

  'ebay.getCategory': function(parentCategoryId) {
    return ebayAPI.getCategory(parentCategoryId);
  }
});
