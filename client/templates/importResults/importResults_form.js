import './importResults_form.html';
import 'ckeditor';

// scrapedPageForm template
Template.importResults_form.onRendered(function() {
  CKEDITOR.replace( 'details-area', {
    height: 560
  });
});
