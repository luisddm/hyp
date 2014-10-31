//Obtengo en un array elements todos los elementos con la etiqueta thumb, que son las imagenes pequeñitas
var elements = document.getElementsByClassName('thumb');

// Creo una variable i y la voy iterando tantas veces como elementos tiene el array (en este caso 5, que es elements.length)
for(var i = 0; i < elements.length; i++) {
    // En cada iteracion, tomo un elemento de elements y le asigno el evento click
    elements[i].onclick = function() {
        // Obtengo el atributo data-foto del elemento que estoy iterando (this) y se lo asigno a fotogrande
        document.getElementById('fotogrande').src = this.getAttribute("data-foto");
    };
}
