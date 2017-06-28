import './importResults_form.html';
import { ScrapedPages } from '/common/collections';
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
  },

  'submit form': function(e, t) {
    e.preventDefault();
    var dataObj = $(e.target).serializeJSON({
      useIntKeysAsArrayIndex : true,
      checkboxUncheckedValue : "false",
      parseBooleans          : true,
      parseNumbers           : true
    });

    console.log(dataObj)
    let scrapedPageId = FlowRouter.getParam("_id"); 

    ScrapedPages.update({ _id: scrapedPageId }, {$set: { ebayParams: dataObj }}, (err, res) => {
      if (err)
        console.log(err)

      if (res) {
        console.log("Item saved, trying to post to ebay now...");
        Meteor.call('ebay.addItem', scrapedPageId, function(err, res) {
          if (err)
            console.log(err)

          if (res) { // got api resp
            if (res && res.Errors && res.Errors.length) {
              let errorMessages = res.Errors.map((er) => er.LongMessage[0]);
              console.log(errorMessages)
            }
          }

        });
      }
    });
    
  }
});
