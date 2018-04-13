/**
 * Toolkit JavaScript
 */
 var $ = require('jquery');
 var flickity = require('flickity');
 var flickityImagesLoaded = require('flickity-imagesloaded');
 var parsleyjs = require('parsleyjs');
 var jqueryInputmask = require('jquery.inputmask');
 var clipboard = require('clipboard');
 // var jqueryDropdown = require('jquery-dropdown'); had to include this inline as it was causing a jquery error

//the following is for floating form labels
$(function () {
  var showClass = 'show';
  
  $('input').on('checkval', function () {
    var label = $(this).prev('label');
    if(this.value !== '') {
      label.addClass(showClass);
    } else {
      label.removeClass(showClass);
    }
  }).on('keyup', function () {
    $(this).trigger('checkval');
  });
});
//end floating labels

//parsleyjs
// $(function () {
  // $('#demo-form').parsley().on('field:validated', function() {
  //   var ok = $('.parsley-error').length === 0;
  //   $('.bs-callout-info').toggleClass('hidden', !ok);
  //   $('.bs-callout-warning').toggleClass('hidden', ok);
  // })
  // .on('form:submit', function() {
  //   return false; // Don't submit form for this demo
  // });
// });
//end parsleyjs

$(document).ready(function () {
  Inputmask().mask(document.querySelectorAll("input"));  //static mask 
});  

// function () {
//   var clipboardButton = new Clipboard(".copy");
// };

$(function () {

var navItem = $(".navigation-wrapper ul li")
  navItem.click(function () {
    console.log("good");
    $("li").each(function () {
      $(this).removeClass();
    });
    $(this).addClass("selected");
  });

  navItem.hover(function () {
    console.log("hoverin'");

  });
});

