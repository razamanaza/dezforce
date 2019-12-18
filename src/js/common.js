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

  var api = $('#mmenu').data( 'mmenu' );

  api.bind('open:start', function() {
    $('.hamburger').addClass('is-active');
  });
  api.bind('close:start', function(){
    $('.hamburger').removeClass('is-active');
  });

  //sticky menu
  $('.top-nav').sticky({topSpacing:0, zIndex: 100});

  //accordion
  $('.accordion').accordion({
      'transitionSpeed': 400
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

  if (window.location.hash == '#thanks') {
    $('#modal-thanks').modal('show')
  }

  $('#modal-thanks').on('hidden.bs.modal', function (e) {
    window.location = '/';
  });

  $('#form-service').change(function() {
    $('.area-selectors .visible').removeClass('visible');
    var selector = $(this).val();
    $('#form-' + selector).addClass('visible');
    $('#form-' + selector).val('');
    $('.calc-form-answer').text('');
  });

  $(".reviews-carousel").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoHeight: true,
    autoplayTimeout: 13000,
  });

  $('.work-carousel').owlCarousel({
    margin: 10,
    loop: true,
    autoWidth: true,
    items: 4
  });

  $('#calc-form').on('change', '.area-selectors select', function() {
    var areas = {
      dezinfection: ['от 1 500 рублей', 'от 2 500 рублей', 'от 3 500 рублей', 'от 4 500 рублей', 'от 5 500 рублей'],
      dezinsectionHome: ['1300 рублей', '1500 рублей', '2000 рублей', '2500 рублей', 'от 3000 рублей'],
      dezinsectionIndustrial: ['от 2 000 рублей', 'от 3 000 рублей', 'от 4 000 рублей', 'от 5 000 рублей', 'от 6 000 рублей'],
      deratization: ['от 900 рублей', 'от 1 300 рублей', 'от 1 500 рублей', 'от 2 000 рублей', 'от 2 500 рублей']
    };
    var areaText = areas[$('#form-service').val()][$(this).val()];
    $('.calc-form-answer').text(areaText);
  });

  $('#modal-form .phone').change(function() {
    $('#modal-form .subject').val("Сообщение с сайта. тел: " + $(this).val());
  });

  $('#prices-form .phone').change(function() {
    $('#prices-form .subject').val("Сообщение с сайта. тел: " + $(this).val());
  });

  $('#solutions-form .phone').change(function() {
    $('#solutions-form .subject').val("Сообщение с сайта. тел: " + $(this).val());
  });

  $('#header-form .phone').change(function() {
    $('#header-form .subject').val("Сообщение с сайта. тел: " + $(this).val());
  });

});
