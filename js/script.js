(function () {

    "use strict";

    var ponerFoto = function (row, foto) {
        var fotogrande = row.find('.fotogrande');

        row.find('.bbb').show().spin();

        fotogrande.hide();
        var imgaux = $('<img />').attr('src', foto).on("load", function() {
            fotogrande.attr('src', imgaux.attr('src'));
            fotogrande.fadeIn();

            row.find('.bbb').hide().spin(false);

        });
        return false;
    };

    //ponerFoto("img/autovia-A-66/A-66-foto-01.JPG", null);

    $('.mini').on("click", function() {
        ponerFoto($(this).closest(".row"), $(this).data('foto'));
    });

    $(".mostrar").hide();

    $('.obra').on("click", function() {
        var index = $(this).index();
        $(".mostrar").hide();
        $(".mostrar").eq(index).show();
    });



})();