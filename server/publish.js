import { Meteor } from 'meteor/meteor';
import { Scrapers } from './scrapers';
import { ScrapedPages } from '../common/collections';

Meteor.publish('scrapedPageById', function(id) {
  return ScrapedPages.find({ _id: id }, { limit: 1 })
});
