import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ScrapedPages } from '../../common/collections';

import './importResult.html';

Template.importResult.onCreated(function() {
  this.autorun(() => {
    this.subscribe('scrapedPageById', FlowRouter.current().params._id);
  });
});

Template.importResult.helpers({
  'scrapedPage': function() {
    return ScrapedPages.findOne(FlowRouter.current().params._id);
  }
});
