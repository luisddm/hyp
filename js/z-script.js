(function () {

    "use strict";

    var ponerFoto = function (foto) {
        var fotogrande = $('#fotogrande');

        $('#bbb').show().spin();

        //fotogrande.hide();
        var imgaux = $('<img />').attr('src', foto).load(function() {
            fotogrande.attr('src', imgaux.attr('src'));
            //fotogrande.fadeIn();

            $('#bbb').hide().spin(false);

        });
        return false;
    };

    ponerFoto("img/autovia-A-66/A-66-foto-01.JPG");

    $('.mini').on("click", function() {
        ponerFoto($(this).data('foto'));
    });


})();