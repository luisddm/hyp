(function() {

  'use strict';

  jQuery(document).ready(function($) {

    // Rotación de las imágenes de portada
    var $diapos = $('.ppal');
    var $dots = $('.dots');
    var $obra = $('.obra');

    $diapos.find('.diapo:gt(0)').hide();
    $dots.find('.fa').first().css('color', '#11aadd');

    setInterval(function() {
      $diapos.find('.diapo:first').fadeOut(800).next().fadeIn(800).end().appendTo($diapos);
      $dots.find('.fa').css('color', '#eee').eq($diapos.find('.diapo:first').data('order')).css('color', '#11aadd');
    }, 6000);


    // CLICK en una de las obras de la galería de obras
    $obra.on('click', function() {
      var $self = $(this),
        $obras = $self.parent(),
        index = $self.index('.obra'),
        $galeriaRow = $('.galeria-row'),
        $fotogrande = $galeriaRow.find('.fotogrande-img'),
        $actual = $galeriaRow.eq(index);

      if ($obras.hasClass('big')) {
        if ($(window).width() >= 768) {
          $obras.hide(500, function() {
            $('body,html').animate({
              scrollTop: 0
            }, 0, function() {
              $obras.addClass('small').removeClass('big').show(500, function() {
                $('body,html').animate({
                  scrollTop: 430
                }, 500);
              });
            });
          });
        } else {
          $obras.addClass('small').removeClass('big').show(500, function() {
            $('body,html').animate({
              scrollTop: 1200
            }, 500);
          });
        }
      }

      if ($(window).width() >= 768) {
        $('body,html').animate({
          scrollTop: 430
        }, 500);
      } else {
        $('body,html').animate({
          scrollTop: 1200
        }, 500);
      }

      $galeriaRow.hide();
      $actual.show();

      // Mostrar sección de galerías
      $('.galeria-section').show();

      $('.obra').removeClass('activo');
      $self.addClass('activo');

      $fotogrande.attr('src', 'img/placeholder.png');

      ponerFoto($actual, $actual.find('.mini-img').eq(0));
    });


    // CLICK en galería de imágenes
    $('.mini-div').on('click', function() {
      var $self = $(this).children('.mini-img');
      ponerFoto($self.closest('.galeria-row'), $self);
    });


    // SWIPE en imagen grande
    $('.fotogrande-div').swipe({
      swipeLeft: function() {
        var $galeria = $(this).closest('.galeria-row');
        var $fotograndeImg = $(this).find('.fotogrande-img');
        var maxIndex = $galeria.find('.mini-img').length - 1;

        var nextIndex = +$fotograndeImg.data('index') - 1;
        if (nextIndex < 0) nextIndex = maxIndex;
        ponerFoto($galeria, $galeria.find('.mini-img').eq(nextIndex));
      },
      swipeRight: function() {
        var $galeria = $(this).closest('.galeria-row');
        var $fotograndeImg = $(this).find('.fotogrande-img');
        var maxIndex = $galeria.find('.mini-img').length - 1;

        var nextIndex = +$fotograndeImg.data('index') + 1;
        if (nextIndex > maxIndex) nextIndex = 0;
        ponerFoto($galeria, $galeria.find('.mini-img').eq(nextIndex));
      }
    });


    // HASH
    var hash = window.location.search.substring(1);
    if (hash) {
      $obra.eq(hash).trigger('click');
    }


    // FORM
    $('#contact-form').validate({
      highlight: function(element) {
        $(element).css({
          'background-color': '#ecc'
        });
      },
      unhighlight: function(element) {
        $(element).css({
          'background-color': '#ddd'
        });
      },
      errorPlacement: function(error, element) {
        var $label = element.parent('div').find('label');
        error.insertAfter($label);
      },
      rules: {
        telefono: {
          number: true
        },
        condiciones: {
          required: true
        }
      },
      messages: {
        nombre: {
          required: 'Introduce tu nombre o el de tu empresa'
        },
        texto: {
          required: 'Introduce tu consulta o sugerencia'
        },
        telefono: {
          number: 'Introduce un teléfono válido o deja el campo vacío'
        },
        email: {
          required: 'Introduce tu email',
          email: 'Email inválido'
        },
        condiciones: {
          required: 'Acepta la política de privacidad'
        }
      },
      submitHandler: function(form) {
        submitForm($('form').serialize());
      }
    });


    // SCROLL anchors
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 600);
          return false;
        }
      }
    });


    // SHOW OR HIDE privacy message
    $('#show-privacy').click(function() {
      $('.alert').slideToggle('slow');
    });


    // SCROLL menubar
    menu();

    $(window).on('resize', function() {
      menu();
    });


    // GOOGLE MAPS loading
    google.maps.event.addDomListener(window, 'load', initialize);

    $('#drop').on('click', function() {
      var posicion = document.getElementById('comoLlegar').value; //start y end son objetos de tipo coordenadas
      calcularRuta(posicion);
    });

  });


  // MENU behaviour with scroll
  function menu() {

    var $menu = $('header');
    var $logo = $menu.find('.logo');

    if ($(window).width() >= 768) {

      $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();

        if (scrollTop < 20) {

          $menu
            .css({
              'background-color': 'rgba(10,10,10,0.8)',
              'border-bottom': '2px solid rgba(188,209,92,0)',
              'margin-top': 20 - scrollTop,
              'box-shadow': 'none'
            })
            .find('.navbar').css({
              'margin-top': '35px',
              'margin-bottom': '35px'
            });

          $logo
            .css({
              'height': 111
            })
            .attr('src', 'img/logo.png');


        } else if (scrollTop > 20 && scrollTop < 90) {

          var x = (scrollTop / (-2)) + 45;
          var trans = (scrollTop * 0.00286) + 0.743;
          var transBorder = (scrollTop - 20) * 0.01428;

          $menu
            .css({
              'background-color': 'rgba(10,10,10,' + trans + ')',
              'border-bottom': '2px solid rgba(188,209,92,' + transBorder + ')',
              'margin-top': 0,
              'box-shadow': 'none'
            })
            .find('.navbar').css({
              'margin-top': x,
              'margin-bottom': x
            });

          $logo
            .css({
              'height': 140 - scrollTop
            })
            .attr('src', 'img/logo.png');

        } else if (scrollTop > 90) {

          $menu
            .css({
              'background-color': 'rgba(20,20,20,1)',
              'border-bottom': '2px solid rgba(188,209,92,1)',
              'margin-top': 0,
              'box-shadow': '0 0 15px 5px #222'
            })
            .find('.navbar').css({
              'margin-top': '0px',
              'margin-bottom': '0px'
            });

          $logo
            .css({
              'height': 50
            })
            .attr('src', 'img/hoja.png');

        }
      });
    } else {
      $(window).unbind('scroll');
      $menu.removeAttr('style')
        .find('.navbar').removeAttr('style');
      $logo.removeAttr('style').attr('src', 'img/logo.png');
    }
  }


  // CAMBIAR la foto grande en respuesta a loads, clicks o swipes
  function ponerFoto($galeriaSection, $miniImg) {

    $galeriaSection.find('.mini-img').removeAttr('style');
    $miniImg.animate({
      'border-width': '3px'
    }, 300);

    var index = $miniImg.data('index');
    var link = $miniImg.data('foto');
    var $fotogrande = $galeriaSection.find('.fotogrande-img');
    var $spinner = $galeriaSection.find('.loading');

    $spinner.show().spin();

    $fotogrande.css('opacity', 0);
    var imgaux = $('<img />').attr('src', link).on('load', function() {
      $fotogrande.attr('src', imgaux.attr('src'));
      $fotogrande.animate({
        'opacity': 1
      }, 500);
      $fotogrande.data('index', index);

      $spinner.hide().spin(false);

    });
    return false;
  }


  // SUBMIT form
  function submitForm(form) {

    var $enviarMsg = $('.enviar-msg');
    var $enviarBoton = $('.enviar-boton');
    // show that something is loading
    $enviarMsg.show();

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'mail.php',
        data: form
      }).done(function(data) {

        // show the response
        $enviarMsg.html('<i class="fa fa-check"></i> Enviado');
        $enviarBoton.attr('disabled', 'disabled');

      })
      .fail(function() {

        // just in case posting your form failed
        $enviarMsg.html('¡Error!');

      });

    // to prevent refreshing the whole page page
    return false;
  }

  var myLatlng = new google.maps.LatLng(41.542187, -4.663383);
  var map;
  var marker1;
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();

  function initialize() { //function initializes Google map

    directionsDisplay = new google.maps.DirectionsRenderer();

    var image = {
      url: 'img/puntero-hoja.png'
    };

    var googleMapOptions = {
      center: myLatlng, // map center
      zoom: 15, //zoom level, 0 = earth view to higher value
      panControl: true, //enable pan Control
      zoomControl: true, //enable zoom control
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.MEDIUM //zoom control size
      },
      scaleControl: true, // enable scale control
      mapTypeId: google.maps.MapTypeId.ROADMAP // google map type
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), googleMapOptions);

    marker1 = new google.maps.Marker({
      position: myLatlng,
      map: map,
      icon: image,
      animation: google.maps.Animation.DROP
    });
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));

    var control = document.getElementById('control');
    control.style.display = 'block';
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
  }

  function calcularRuta(dondeEstoy) {
    var start = dondeEstoy; //start y end son objetos de tipo coordenadas
    var end = myLatlng;
    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
  }

})();
