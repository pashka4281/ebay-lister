import './importResults_form.html';
import 'ckeditor';

Template.importResults_form.onCreated(function() {
  this.categories          = new ReactiveVar([]);
  this.isCategoriesLoading = new ReactiveVar(false);
});

Template.importResults_form.onRendered(function() {
  CKEDITOR.replace( 'details-area', {
    height: 560
  });

  // load categories list
  this.isCategoriesLoading.set(true);
  Meteor.call('ebay.getCategory', (err, data) => {
    this.isCategoriesLoading.set(false);
    //console.log(data)

    if (data)
      this.categories.set(data);
  });
});

Template.importResults_form.helpers({
  'isCategoriesLoading': function() {
    let t = Template.instance();
    return t.isCategoriesLoading.get();
  },
  'categories': function() {
    let t = Template.instance();
    return t.categories.get();
  }
});
