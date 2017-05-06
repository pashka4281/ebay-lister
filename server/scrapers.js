import targetParser from 'product-scraper-target.com';

import { check } from 'meteor/check'

let scrapers = [];
scrapers.push(targetParser);


let Scrapers = {
  findScraperByUrl(url) {
    check(url, String);

    let scraper = scrapers.find((scr) => url.match(scr.regexp));
    if (!scraper)
      throw new Meteor.Error("URL format does not match any existing scrapers");
    return scraper;
  }
};

module.exports.Scrapers = Scrapers;
