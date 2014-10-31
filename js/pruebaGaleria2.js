var elements = document.getElementsByClassName('thumb');

for(var i = 0; i < elements.length; i++) {
    elements[i].onclick = function() {
        document.getElementById('fotogrande').src = this.getAttribute("data-foto");
    };
}
