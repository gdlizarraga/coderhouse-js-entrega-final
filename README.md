# CoderHouse Proyecto Javascript - Entrega Final

Proyecto desarrollado para CoderHouse donde usamos comandos Javascript, eventos, localstorage, array, metodos de array como ser find, reduce, filter, map, iteradores.
Se uso Promise para llamar a una api y cargar los productos e imagenes.
Se utilizo la api https://fakestoreapi.com/products para cargar las imagenes.
Se uso swetalert2 para mejorar la experiencia de usuario y interfaz.
Se utilizo try-catch en el llamado de la api por si da error. Emite un alert de tipo swetalert2 indicando el error.
Se emite un error utilizando "throw new Error"
Se utilizo Toastify para los mensajes flotantes.
Se utilizo fontawesome para lo iconos en los botones.
Se utilizo luxon para poner la fecha y hora del dia. Se puso un reloj en el header.
Se utilizo setInterval para mantener actualizado el reloj.

Se trata de un Carrito de Compras en el cual te permite elegir diferenetes productos y su cantidad y al final te suma y te dice el total por cada uno que elegiste.

Utilice bootstrap de forma local.

GitHub Page:https://gdlizarraga.github.io/coderhouse-js-segunda-entrega/

El proyecto tiene 1 páginas:

## Carrito de Compras

En esta página se uso funciones y métodos convencionales de javascript para darle vida al Carrito de Compra.
Se utilizo una api de donde se obtiene todos los productos con su precio, descripción e imagenes.
Se pide el usuario apenas ingresa al sitio y luego se lo guarda en localstorage
Permite agregar productos al carrito, quitar uno a uno y sumar uno a uno a la lista de los productos agregados.
Al finalizar la compra muestra un alert que para ellos se uso la libreria sweetalert2
