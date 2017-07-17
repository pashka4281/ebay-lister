Template.importResults_categorySelect.onCreated(function() {
  this.categories          = new ReactiveVar([]);
  this.isCategoriesLoading = new ReactiveVar(false);

  const getCategoryCallback = (err, data) => {
    this.isCategoriesLoading.set(false);
    if (data)
      this.categories.set(data);
  };

  if (this.data.levelLimit === 1 || this.data.parentCategoryId)
    Meteor.call('ebay.getCategory', { levelLimit: this.data.levelLimit, parentCategoryId: this.data.parentCategoryId }, getCategoryCallback);
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
