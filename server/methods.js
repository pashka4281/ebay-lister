import { Meteor } from 'meteor/meteor';
import { Scrapers } from './scrapers'

Meteor.methods({
  'parseUrl': function(url) {

    let scraper = Scrapers.findScraperByUrl(url);

    return scraper.parse(url);
  }
});
