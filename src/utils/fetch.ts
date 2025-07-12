import apiClient from '@/lib/api'

async function fetchFromApi<T>(
  url: string,
  options?: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    body?: any
    params?: Record<string, any>
    headers?: Record<string, string>
  }
): Promise<T> {
  try {
    const method = options?.method || 'GET'

    const response = await apiClient.request<T>({
      url,
      method,
      data: options?.body,
      params: options?.params,
      headers: options?.headers,
    })

    return response.data
  } catch (error: any) {
    throw error
  }
}

async function fetchFileFromApi(
  url: string,
  options?: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    body?: any
    params?: Record<string, any>
    headers?: Record<string, string>
  }
): Promise<Blob> {
  try {
    const method = options?.method || 'GET'

    const response = await apiClient.request<Blob>({
      url,
      method,
      data: options?.body,
      params: options?.params,
      headers: options?.headers,
      responseType: 'blob', // wichtig: Blob als Antwort erzwingen
    })

    return response.data
  } catch (error: any) {
    throw error
  }
}

export { fetchFromApi, fetchFileFromApi }
