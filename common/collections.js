import { Mongo } from 'meteor/mongo';

const ScrapedPages = new Mongo.Collection('scraped_pages');


module.exports.ScrapedPages = ScrapedPages;
