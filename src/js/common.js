$(document).ready(function() {
  $('#mmenu').removeClass('visually-hidden');
  $('#mmenu').mmenu({
    extensions: [ 
      'theme-dark', 
      'effect-menu-slide', 
      'pagedim-black',
      'position-right'],
    navbar: { 
      title: 'Меню сайта' 
    },
    onClick: { close: true },
    pageScroll: true
  });

  var api = $("#mmenu").data( "mmenu" );

  api.bind('open:start', function() {
    $('.hamburger').addClass('is-active');
  });
  api.bind('close:start', function(){
    $('.hamburger').removeClass('is-active');
  });

  //sticky menu
  $(".top-nav").sticky({topSpacing:0, zIndex: 100});

  //accordion
  $('.accordion').accordion({
      "transitionSpeed": 400
  });

  $('#modal-form').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var buttontext = button.data('button') // Extract info from data-* attributes
    var header = button.data('header')
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-body .form-header').text(header)
    modal.find('.modal-body .submit').val(buttontext)
  });

});
