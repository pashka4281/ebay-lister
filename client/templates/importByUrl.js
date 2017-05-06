import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './importByUrl.html';

Template.importByUrl.onCreated(function() {
  this.formError = new ReactiveVar("");
});

Template.importByUrl.helpers({
  'formError': function() {
    let t = Template.instance();
    return t.formError.get();
  }
});

Template.importByUrl.events({
  'submit form': function(e, t) {
    e.preventDefault();
    t.formError.set("");
    let url = t.$('input[name="url"]').val();

    Meteor.call('parseUrl', url, function(err, scrapedPageId) {
      if (err) {
        t.formError.set(err.error);
        return;
      }

      FlowRouter.go(`/scrapedPages/${ scrapedPageId }`);
    });
  }
});
