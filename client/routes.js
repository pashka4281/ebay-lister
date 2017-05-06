FlowRouter.route('/scrapedPages/:_id', {
  action: function() {
    BlazeLayout.render('layout', { main: "importResult" });
  }
});


FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('layout', { main: "importByUrl" });
  }
});
