FlowRouter.route('/processedUrl/:_id', {
  action: function() {
    BlazeLayout.render('layout', { main: "processedUrl" });
  }
});


FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('layout', { main: "importByUrl" });
  }
});
