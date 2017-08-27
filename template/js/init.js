(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true, // Choose whether you can drag to open on touch screens,
     // onOpen: function(el) { /* Do Stuff* / }, // A function to be called when sideNav is opened
    //  onClose: function(el) { /* Do Stuff* / }, // A function to be called when sideNav is closed
    }
  );

    $('.tooltipped').tooltip({delay: 50});
    $(".dropdown-button").dropdown();
    Materialize.updateTextFields();
    $('input#input_text, textarea#textarea1').characterCounter();

  }); // end of document ready
})(jQuery); // end of jQuery name space