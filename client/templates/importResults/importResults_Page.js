import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ScrapedPages } from '/common/collections';

import './importResults_Page.html';

Template.importResults_Page.onCreated(function() {
  this.autorun(() => {
    this.subscribe('scrapedPageById', FlowRouter.current().params._id);
  });
});

Template.importResults_Page.helpers({
  'scrapedPage': function() {
    return ScrapedPages.findOne(FlowRouter.current().params._id);
  }
});

