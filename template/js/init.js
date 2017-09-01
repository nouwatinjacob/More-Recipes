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
    Materialize.updateTextFields();
    $('input#input_text, textarea#textarea1').characterCounter();

    $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
    }
  );

  }); // end of document ready
})(jQuery); // end of jQuery name space