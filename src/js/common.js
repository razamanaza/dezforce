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
});