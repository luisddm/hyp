(function () {

    "use strict";

    $(document).ready(function(){

      var ponerFoto = function (row, foto) {
        var fotogrande = row.find('.fotogrande');
        var spinner = row.find('.bbb');

        spinner.show().spin();

        fotogrande.hide();
        var imgaux = $('<img />').attr('src', foto).on("load", function() {
          fotogrande.attr('src', imgaux.attr('src'));
          fotogrande.fadeIn();

          spinner.hide().spin(false);

        });
        return false;
      };

      $('.mini').parent("div").on("click", function() {
        var $self = $(this).children(".mini");
        ponerFoto($self.closest(".row"), $self.data('foto'));
      });

      $(".mostrar").hide();

      $('.obra').on("click", function() {
        $('.obra').removeClass("activo").addClass("small").removeClass("big");
        $(this).addClass("activo");
        var index = $(this).index(".obra");
        var mostrar = $(".mostrar");
        var actual = mostrar.eq(index);
        mostrar.hide();
        mostrar.eq(index).show();
        ponerFoto(actual, actual.find(".mini").eq(0).data('foto'));
      });

      var hash = window.location.search.substring(1);
      if(hash) {
        $(".obra").eq(hash).trigger("click");
      }


      // FORM

      $(".modal-content").find(".acepto").on("click", function(){
        $("#condiciones").prop("checked", true);
      });

      $("#contact-form").validate({
        highlight: function(element) {
          $(element).css({"background-color": "#ecc"});
        },
        unhighlight: function(element) {
          $(element).css({"background-color": "#ddd"});
        },
        errorPlacement: function(error, element) {
          var $label = element.parent("div").find("label");
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
            required: "Introduce tu nombre o el de tu empresa"
          },
          texto: {
            required: "Introduce tu consulta o sugerencia"
          },
          telefono: {
            number: "Introduce un teléfono válido o deja el campo vacío"
          },
          email: {
            required: "Introduce tu email",
            email: "Email inválido"
          },
          condiciones: {
            required: "Acepta la política de privacidad"
          }
        },
        submitHandler: function(form) {
          alert('valid form');
          return false;
        }
      });

      $('[data-toggle="tooltip"]').tooltip();



      // SCROLL

      menu();

      $(window).on("resize", function(){
        menu();
      });


      // SCROLL ANCHORS

      $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 800);
            return false;
          }
        }
      });


      // SHOW PRIVACY
      $("#show-privacy").click(function() {
        $(".alert").slideToggle("slow");
      });


      // MAPS
      google.maps.event.addDomListener(window, 'load', initialize);


    });



    function menu() {

        if($(window).width() >= 768) {

            var $menu = $("header");
            var $logo = $(".logo");

            $(window).on("scroll", function () {
              var scrollTop = $(window).scrollTop();

              if(scrollTop < 20) {

                $menu
                  .css({"background-color": "rgba(10,10,10,0.8)", "border-bottom": "2px solid rgba(188,209,92,0)", "margin-top": 20-scrollTop, "box-shadow": "none"})
                  .find(".navbar").css({"margin-top": "35px", "margin-bottom": "35px"});

                $logo
                  .css({"height" : 111})
                  .attr("src", "img/logo.png");


              } else if(scrollTop > 20 && scrollTop < 90) {

                var x = (scrollTop / (-2)) + 45;
                var trans = (scrollTop * 0.00286) + 0.743;
                var transBorder = (scrollTop - 20) * 0.01428;

                $menu
                  .css({"background-color": "rgba(10,10,10,"+trans+")", "border-bottom": "2px solid rgba(188,209,92,"+transBorder+")", "margin-top": 0, "box-shadow": "none"})
                  .find(".navbar").css({"margin-top": x, "margin-bottom": x});

                $logo
                  .css({"height" : 140-scrollTop})
                  .attr("src", "img/logo.png");

              } else if(scrollTop > 90){

                $menu
                  .css({"background-color": "rgba(20,20,20,1)", "border-bottom": "2px solid rgba(188,209,92,1)", "margin-top": 0, "box-shadow": "0 0 15px 5px #222"})
                  .find(".navbar").css({"margin-top": "0px", "margin-bottom": "0px"});

                $logo
                  .css({"height" : 50})
                  .attr("src", "img/hoja.png");

              }
            });
        }
        else {
          $(window).unbind("scroll");
        }
    }

    function initialize() {
      var myLatlng = new google.maps.LatLng(41.538924, -4.662409);
      var mapOptions = {
        zoom: 11,
        center: myLatlng
      };
      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Hello World!'
      });
    }


})();
