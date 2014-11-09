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
        //window.location.search="";
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

})();
