type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ExodusFetchOptions {
  url: string
  method?: HTTPMethod
  headers?: Record<string, string>
  body?: any
  verbose?: boolean
  bypassCache?: boolean
}

const cache = new Map<string, any>()

async function ExodusFetchRequest(options: ExodusFetchOptions): Promise<[Error | null, any]> {
  const { url, method = 'GET', headers = {}, body, verbose = false, bypassCache = false } = options
  const cacheKey = `${url}:${JSON.stringify({ method, headers, body })}`

  // Si no se debe ignorar la caché, verificar si los datos están almacenados
  if (!bypassCache && cache.has(cacheKey)) {
    if (verbose) console.log('📌 Datos obtenidos de la caché:', cache.get(cacheKey))
    return [null, cache.get(cacheKey)]
  }

  try {
    // Configurar headers por defecto
    const defaultHeaders = { 'Content-Type': 'application/json' }

    // Realizar la petición
    const response = await fetch(url, {
      method,
      headers: { ...defaultHeaders, ...headers },
      body: body ? JSON.stringify(body) : undefined
    })

    // Manejar errores HTTP
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Parsear respuesta y almacenar en caché si no se está forzando la actualización
    const data = await response.json()
    if (!bypassCache) {
      cache.set(cacheKey, data)
    }

    if (verbose) console.log('📌 Datos obtenidos:', data)
    return [null, data]
  } catch (error) {
    if (verbose) console.error('⚠️ Error en la petición:', error)
    return [error as Error, null]
  }
}

// Métodos específicos
const ExodusFetch = {
  get: (url: string, options: Omit<ExodusFetchOptions, 'url' | 'method'> = {}) =>
    ExodusFetchRequest({ url, method: 'GET', ...options }),

  post: (url: string, body: any, options: Omit<ExodusFetchOptions, 'url' | 'method' | 'body'> = {}) =>
    ExodusFetchRequest({ url, method: 'POST', body, ...options }),

  put: (url: string, body: any, options: Omit<ExodusFetchOptions, 'url' | 'method' | 'body'> = {}) =>
    ExodusFetchRequest({ url, method: 'PUT', body, ...options }),

  delete: (url: string, options: Omit<ExodusFetchOptions, 'url' | 'method'> = {}) =>
    ExodusFetchRequest({ url, method: 'DELETE', ...options })
}

export default ExodusFetch
