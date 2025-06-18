import apiClient from '@/lib/api'

export async function fetchFromApi<T>(
  url: string,
  options?: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' 
    body?: any
    params?: Record<string, any>
  }
): Promise<T> {
  try {
    const method = options?.method || 'GET'
    const response = await apiClient.request<T>({
      url,
      method,
      data: options?.body,
      params: options?.params,
    })

    return response.data
  } catch (error: any) {
    throw error
  }
}