import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse } from 'axios'

interface RInstanceInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RInstanceInterceptors<T>
}

class Request {
  instance: AxiosInstance

  // * 存放取消请求控制器Map
  abortControllerMap: Map<string, AbortController>

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)

    // * 初始化存放取消请求控制器Map
    this.abortControllerMap = new Map()

    // 拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const controller = new AbortController()
        const url = config.url || ''
        config.signal = controller.signal
        this.abortControllerMap.set(url, controller)
        return config
      },
      (err) => {
        return err
      }
    )

    // 实例的拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptor,
      config.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptor,
      config.interceptors?.responseInterceptorCatch
    )

    this.instance.interceptors.response.use(
      (res) => {
        const url = res.config.url || ''
        this.abortControllerMap.delete(url)
        return res.data
      },
      (err) => {
        return err
      }
    )
  }

  /**
   * 取消全部请求
   */
  cancelAllRequest() {
    for (const [, controller] of this.abortControllerMap) {
      controller.abort()
    }
    this.abortControllerMap.clear()
  }

  /**
   * 取消指定的请求
   * @param url 待取消的请求URL
   */
  cancelRequest(url: string | string[]) {
    const urlList = Array.isArray(url) ? url : [url]
    for (const _url of urlList) {
      this.abortControllerMap.get(_url)?.abort()
      this.abortControllerMap.delete(_url)
    }
  }

  request<T = any>(config: RequestConfig<T>) {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config as any)
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err: any) => {
          if (config.interceptors?.responseInterceptorCatch) {
            err = config.interceptors.responseInterceptorCatch(err)
          }
          reject(err)
        })
    })
  }

  get<T = any>(config: RequestConfig<T>) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: RequestConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: RequestConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: RequestConfig<T>) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default Request
