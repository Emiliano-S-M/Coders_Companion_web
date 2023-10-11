# Notas de la version 1.1.0.
##  Cambios en el archivo ___**index.js**___

### En la función `handleKey`:

1. **Uso de `event.key.startsWith("Arrow")` en lugar de múltiples comparaciones:** En la segunda versión del código, se ha reemplazado la serie de comparaciones para verificar si la tecla es una flecha de dirección. En la primera versión, se compara la tecla con múltiples cadenas ("ArrowLeft", "ArrowRight", etc.). En la segunda versión, se utiliza `event.key.startsWith("Arrow")`, lo que simplifica el código y lo hace más legible. Esto significa que, si la tecla comienza con "Arrow", se permitirá.
2. **Reducción de duplicación de código:** La segunda versión del código elimina la duplicación de comparaciones para las flechas de dirección ("ArrowLeft", "ArrowRight", etc.) al utilizar `event.key.startsWith("Arrow")`. Esto hace que el código sea más eficiente y menos propenso a errores si necesitas agregar o cambiar el comportamiento de las teclas relacionadas con las flechas en el futuro.



### En la funcion `handleOperationButon`: 

1. **Eliminación de funciones anónimas dentro del bucle:** En la segunda versión del código, se ha reemplazado la creación de funciones anónimas dentro del bucle `forEach` por una función separada llamada `buttonClickHandler`. Esto se hizo para evitar la generación repetida de funciones anónimas para cada botón, lo que podría causar una sobrecarga innecesaria de memoria y reducir el rendimiento. Al definir una función reutilizable, se mejora la eficiencia y la legibilidad del código.
2. **Mejora de claridad y mantenibilidad:** La segunda versión del código es más clara y fácil de mantener. Al dividir la lógica del manejador de clics en una función independiente (`buttonClickHandler`), se facilita la lectura del código y se permite realizar cambios o actualizaciones de manera más sencilla en el futuro. Esto promueve las buenas prácticas de programación y hace que el código sea más robusto y mantenible.

### En la función `showAlert`:

1. **Optimización de la selección de elementos del DOM:** En la segunda versión del código, se ha eliminado la necesidad de seleccionar nuevamente los elementos `popupContainer` y `popupContent` dentro de la función. En su lugar, se han definido como variables globales al principio del código y se utilizan en la función `showAlert`. Esto reduce la duplicación de selección de elementos del DOM y mejora la eficiencia del código.

2. **Mejora de claridad y eficiencia:** La segunda versión del código es más clara y eficiente al utilizar las referencias a los elementos del DOM definidas previamente. Esto simplifica el código y lo hace más fácil de mantener, ya que no es necesario buscar los mismos elementos repetidamente.

---

##  Cambios en el archivo ___**index.css**___

Se añadieron comentarios generales en el archivo `index.css` para mejorar su comprencion

##  Cambios en el archivo ___**index.html**___

Se eliminaron las clases innecesarias del archivo html para aumentar el rendimiento del archivo `index.html`

## **Cambios generales**


Se añadieron comentarios generales en el archivo `index.js` para que quedara mas claro el funcionamiento y utilidad del mismo.



## Añadidos

1. Dentro de la carpeta css `se añadio una carpeta img` que contiene 8 imagenes de tipo png para los el icono de la pagina de tipo ico
2. Se añadieron los archivos `license.md`, `readme.md` y `changelog.md`
