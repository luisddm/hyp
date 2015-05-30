# Hidrosyplant

Este es el código del sitio web de [Hidrosyplant](http://hidrosyplant.es).

## Instalación

Para poder construir la web a partir de este código, es necesario disponer del gestor de paquetes npm, el cual es parte de Node.js. En caso contrario, se puede descargar desde [su sitio web](http://nodejs.org/) e instalar con unos pocos clicks.

1. Descargar el código de este repositorio y navegar hasta su directorio desde la consola del sistema.
2. Instalar Gulp y Bower de forma global: `sudo npm -g install bower gulp`
3. Instalar las dependencias de Node: `npm install`
4. Instalar las dependencias de Bower: `bower install`
5. Lanzar Gulp para ver el resultado: `gulp`

Se abrirá el navegador web predeterminado con el código "compilado" y minimizado, que será generado en el directorio dist, listo para producción.

## Comentarios adicionales

- Las imágenes no sufren ningún tipo de procesado en Gulp, simplemente se copian del directorio de desarrollo a dist. Debido a lo costoso de hacer esto cada vez que se arranca Gulp, es necesario hacer un `gulp images` de forma manual cada vez que se añadan o eliminen imágenes.
- Para limpiar la carpeta dist, ejecutar `gulp clean`.
