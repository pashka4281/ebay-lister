Template.importResults_categorySelect.onCreated(function() {
  this.categories          = new ReactiveVar([]);
  this.isCategoriesLoading = new ReactiveVar(false);

  let getCategoryCallback = (err, data) => {
    this.isCategoriesLoading.set(false);
    if (data)
      this.categories.set(data);
  };

  if (this.data.hasOwnProperty("parentCategoryId")) {
    if (this.data.parentCategoryId) {
      this.isCategoriesLoading.set(true);
      Meteor.call('ebay.getCategory', this.data.parentCategoryId, getCategoryCallback);
    }
  } else {
    this.isCategoriesLoading.set(true);
    Meteor.call('ebay.getCategory', getCategoryCallback);
  }
});

Template.importResults_categorySelect.helpers({
  'isCategoriesLoading': function() {
    let t = Template.instance();
    return t.isCategoriesLoading.get();
  },
  'categories': function() {
    let t = Template.instance();
    return t.categories.get();
  },

});
