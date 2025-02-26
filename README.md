# DevBless

DevBless es una librería ligera diseñada para mejorar el uso de `fetch` en proyectos JavaScript. Su propósito es hacer que las peticiones HTTP sean más intuitivas, manejando errores de forma eficiente y proporcionando una API más sencilla de utilizar.

## Instalación

Puedes instalar DevBless usando npm:

```sh
npm install devbless
```

## Uso

### Importación

```js
import { ExodusFetch } from 'devbless'
```

### Realizar una petición GET

```js
const [error, data] = await ExodusFetch.get('https://jsonplaceholder.typicode.com/posts', { verbose: true })
```

Si `error` es `null`, `data` contendrá la respuesta de la petición.

### Parámetros adicionales

- `verbose: true`: Muestra en la consola los datos obtenidos de la petición.
- `bypassCache: true`: Fuerza que la petición obtenga datos frescos, evitando respuestas cacheadas.

### Ejemplo Completo

```js
async function fetchData() {
  const [error, data] = await ExodusFetch.get('https://jsonplaceholder.typicode.com/posts', { verbose: true, bypassCache: true })
  if (error) {
    console.error('Error en la petición:', error)
  } else {
    console.log('Datos recibidos:', data)
  }
}

fetchData()
```

## Características futuras (v1.1.0)

- **Estilos y colores en `console.log`** para mejorar la visibilidad de las respuestas en modo `verbose`.
- **Soporte para localStorage** con un nuevo wrapper.

## Licencia

Este proyecto está bajo la licencia MIT.

