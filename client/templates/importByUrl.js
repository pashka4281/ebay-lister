import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ScrapedPages } from '/common/collections';

import './importByUrl.html';

Template.importByUrl.onCreated(function() {
  this.formError    = new ReactiveVar("");
  this.isProcessing = new ReactiveVar(false);
  this.subscribe('recentlyScrapedPages');
});

Template.importByUrl.helpers({
  'formError': function() {
    let t = Template.instance();
    return t.formError.get();
  },

  'isProcessing': function() {
    let t = Template.instance();
    return t.isProcessing.get();
  },

  'recentlyScrapedPages': function() {
    return ScrapedPages.find({}, {sort: { createdAt: -1}}).fetch();
  }
});

Template.importByUrl.events({
  'submit form': function(e, t) {
    e.preventDefault();
    t.formError.set("");
    let url = t.$('input[name="url"]').val();

    t.isProcessing.set(true);
    Meteor.call('parseUrl', url, function(err, scrapedPageId) {
      t.isProcessing.set(false);

      if (err) {
        t.formError.set(err.error);
        return;
      }

      FlowRouter.go(`/scrapedPages/${ scrapedPageId }`);
    });
  }
});
