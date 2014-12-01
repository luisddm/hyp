(function () {

    "use strict";

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

    $('.mini').on("click", function() {
        ponerFoto($(this).closest(".row"), $(this).data('foto'));
    });

    $(".mostrar").hide();

    $('.obra').on("click", function() {
        $('.obra').removeClass("activo").addClass("small").removeClass("big");
        $(this).addClass("activo");
        var index = $(this).index();
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
                required: "Introduce tu nombre"
            },
            texto: {
                required: "Introduce tu comentario o consulta"
            },
            telefono: {
                number: "El teléfono no es válido"
            },
            email: {
                required: "Introduce tu dirección de email",
                email: "El email no es válido"
            }
        },
        submitHandler: function(form) {
            alert('valid form');
            return false;
        }
    });

    $(".error").tooltip();
    $('[data-toggle="tooltip"]').tooltip();



    // SCROLL

    var $menu = $(".menu");
    var $logo = $(".logo");

    $(window).scroll(function () {
      var scrollTop = $(window).scrollTop();
      if(scrollTop < 20) {

        $menu
          .css({"background-color": "rgba(0,0,0,0.8)", "border-bottom": "2px solid rgba(188,209,92,0)", "margin-top": 20-scrollTop})
          .find(".navbar").css({"margin-top": "35px", "margin-bottom": "35px"});

        $logo.css({"height" : 111});


      } else if(scrollTop > 20 && scrollTop < 90) {

        var x = (scrollTop/(-2))+45;
        var trans = (scrollTop*0.00286)+0.743;
        var transBorder = (scrollTop-20)*0.01428;

        $menu
          .css({"background-color": "rgba(0,0,0,"+trans+")", "border-bottom": "2px solid rgba(188,209,92,"+transBorder+")", "margin-top": 0})
          .find(".navbar").css({"margin-top": x, "margin-bottom": x});

        $logo.css({"height" : 140-scrollTop});

      } else if(scrollTop > 90){

        $menu
          .css({"background-color": "rgba(0,0,0,1)", "border-bottom": "2px solid rgba(188,209,92,1)", "margin-top": 0})
          .find(".navbar").css({"margin-top": "0px", "margin-bottom": "0px"});

        $logo.css({"height" : 50});

      }
    });

















})();
