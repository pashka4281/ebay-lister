import './importResults_form.html';
import 'ckeditor';

Template.importResults_form.onCreated(function() {
  this.currentCategoryId = new ReactiveVar("");
});

Template.importResults_form.onRendered(function() {
  CKEDITOR.replace( 'details-area', {
    height: 560
  });

  this.$('#price-multiplier').trigger('input');
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
  },
  'input #price-multiplier': function(e, t) {
    let multiplier     = parseFloat(e.target.value.replace(/[^\d\.]/g, ''));
    let originalPrice  = parseFloat(t.$('#original-price').val().replace(/[^\d\.]/g, ''));
    let resultingPrice = multiplier * originalPrice;
    t.$('#resulting-price').val(resultingPrice);
  }
});
