Template.profile_Page.events({
  'submit form': function(e, t) {
    e.preventDefault();
    let token       = t.$('#token').val();
    let paypalEmail = t.$('#paypalEmail').val();

    Meteor.call('updateProfile', token, paypalEmail,  (err, res) => {
      if (!err) {
        alert("Saved");
      }
    });
  }
});
