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

  'updateProfile': function(token, paypalEmail) {
    let userId = Meteor.userId();

    Meteor.users.update({ _id: userId }, {
      $set: {
        'profile.ebayAuthToken': token,
        'profile.paypalEmailAddress': paypalEmail
      }
    });
  },

  'ebay.findItemsByKeywords': function() {
    let items = ebayAPI.findItemsByKeywords(["Canon", "Powershot"]);
    return items;
  },

  'ebay.getCategory': function(parentCategoryId) {
    return ebayAPI.getCategory(parentCategoryId);
  },

  'ebay.validateItemBeforeSubmitting': function() {
    return ebayAPI.validateItemBeforeSubmitting();
  },

  //'scrapedPages.updateWithEbayData': function(scapedPageId, formData) {
    //check(formData, {
      //title       : String,
      //description : String,
      //categoryId  : Integer,
      //price       : Integer
    //});

    //let updatedNum = ScrapedPages.update({_id: scrapedPageId }, {$set: {
      //ebayParams: formData
    //}});
    //return updatedNum;
  //}

});
