import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './importByUrl.html';

Template.importByUrl.onCreated(function() {

});

Template.importByUrl.events({
  'submit form': function(e, t) {
    e.preventDefault();
    let url = t.$('input[name="url"]').val();

    Meteor.call('parseUrl', url, function(err, processedUrlId) {
      if (err) {
        console.log(err);
        return;
      }

      FlowRouter.go(`/processedUrl/${ processedUrlId  }`);
    });
  }
});
