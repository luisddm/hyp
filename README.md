# Hidrosyplant

Este es el código del sitio web de [Hidrosyplant](http://hidrosyplant.es/beta). Actualmente se encuentra en desarrollo, no se ha lanzado oficialmente.

## Instalación

Para poder construir la web a partir de este código, es necesario disponer del gestor de paquetes npm, el cual es parte de Node.js. En caso contrario, se puede descargar desde [su sitio web](http://nodejs.org/) e instalar con unos pocos clicks.

1. Descargar el código de este repositorio y navegar hasta su directorio desde la consola del sistema.
2. Instalar Gulp y Bower de forma global: `sudo npm -g install bower gulp`
3. Instalar las dependencias de Node: `npm install`
4. Instalar las dependencias de Bower: `bower install`
5. Lanzar Gulp: `gulp`

Se abrirá el navegador web predeterminado con el código "compilado" y minimizado, que será generado en el directorio build.

## Comentarios adicionales

- Las imágenes no sufren ningún tipo de procesado en Gulp, simplemente se copian del directorio de desarrollo a build. Debido a lo costoso de hacer esto cada vez que se arranca Gulp, es necesario hacer un `gulp images` de forma manual cada vez que se añadan o eliminen imágenes.
- Para limpiar la carpeta build, ejecutar `gulp clean'.
- Para generar la hoja de estilos de la web que se enviará a producción, ejecutar `gulp uncss`. Este comando genera una hoja de estilos limpia, eliminando las reglas que no se usan y por tanto aligerando su tamaño en gran medida. Eso sí, es EXPERIMENTAL, no se garantiza el funcionamiento perfecto con esto.
