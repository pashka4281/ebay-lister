import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './importByUrl.html';

Template.importByUrl.onCreated(function() {
  this.formError = new ReactiveVar("");
  this.isProcessing = new ReactiveVar(false);
});

Template.importByUrl.helpers({
  'formError': function() {
    let t = Template.instance();
    return t.formError.get();
  },

  'isProcessing': function() {
    let t = Template.instance();
    return t.isProcessing.get();
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
