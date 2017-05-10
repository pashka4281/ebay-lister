import './importResults_form.html';
import 'ckeditor';

Template.importResults_form.onCreated(function() {
  this.currentCategoryId = new ReactiveVar("");
});

Template.importResults_form.onRendered(function() {
  CKEDITOR.replace( 'details-area', {
    height: 560
  });
});

Template.importResults_form.helpers({
  'getCurrentCategoryId': function() {
    let t = Template.instance();
    return [t.currentCategoryId.get()];
  }
});

Template.importResults_form.events({
  'change select[name="categoryId"]': function(e, t) {
    let parentCategoryId = e.target.value;
    t.currentCategoryId.set(parentCategoryId);
  }
});
