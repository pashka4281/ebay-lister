FlowRouter.route('/scrapedPages/:_id', {
  action: function() {
    BlazeLayout.render('layout', { main: "importResults_Page" });
  }
});


FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('layout', { main: "importByUrl" });
  }
});
