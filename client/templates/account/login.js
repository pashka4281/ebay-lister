import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
//import { ScrapedPages } from '/common/collections';

import './login.html';

Template.login.onCreated(function() {
  this.formError = new ReactiveVar("");
});

Template.login.helpers({
  'formError': function() {
    let t = Template.instance();
    return t.formError.get();
  }
});


Template.login.events({
  'submit form': function(e, t) {
    e.preventDefault();
    var email    = t.find('#email').value.trim().toLowerCase();
    var password = t.find('#password').value.trim();

    t.formError.set("");
    Meteor.loginWithPassword(email, password, function(error) {
      if (error) {
        t.formError.set(error.reason);
      }
    });
  }
});
