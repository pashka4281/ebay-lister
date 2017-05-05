import { Meteor } from 'meteor/meteor';
import targetParser from 'product-scraper-target.com';

Meteor.methods({
  'parseUrl': function(url) {
    return targetParser.parse(url);
  }
});
