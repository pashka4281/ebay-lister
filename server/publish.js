import { Meteor } from 'meteor/meteor';
import { Scrapers } from './scrapers';
import { ScrapedPages } from '../common/collections';

Meteor.publish('scrapedPageById', function(id) {
  return ScrapedPages.find({ _id: id }, { limit: 1 })
});

Meteor.publish('recentlyScrapedPages', function() {
  return ScrapedPages.find({ }, { sort: { createdAt: -1 }, limit: 10 })
});
