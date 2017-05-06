FlowRouter.route('/scrapedPages/:_id', {
  action: function() {
    BlazeLayout.render('layout', { main: "importResults_Page" });
  }
});

FlowRouter.route('/', {
  action: function() {
    if (Meteor.userId())
      BlazeLayout.render('layout', { main: "importByUrl" });
    else
      BlazeLayout.render('layout', { main: "login" });
  }
});
