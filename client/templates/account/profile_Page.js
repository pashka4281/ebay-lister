Template.profile_Page.events({
  'submit form': function(e, t) {
    e.preventDefault();
    let token = t.$('#token').val();

    Meteor.call('setAuthToken', token, (err, res) => {
      if (!err) {
        alert("Saved");
      }
    });
  }
});
