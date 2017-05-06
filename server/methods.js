import { Meteor } from 'meteor/meteor';
import { Scrapers } from './scrapers';
import { ScrapedPages } from '../common/collections';

Meteor.methods({
  'parseUrl': function(url) {
    let scraper    = Scrapers.findScraperByUrl(url);
    let parserData = scraper.parse(url);

    let newPageId  = ScrapedPages.insert({
      scrapedData : parserData,
      createdAt   : new Date
    });
    return newPageId;
  }
});
