import { of, throwError } from 'rxjs'






export let cacheManagerMock = {
  get: () => cacheManagerMock.setData[0],
  setData: [] as any[],
  set: (key: any, value: any) => {
    cacheManagerMock.setData.push(value)
    return Promise.resolve(null)
  },
}



export const error ={
"status": 404,
  "statusText": "Not Found",
  "headers": {},
  "config": {},
  "request": {}
}

export  const mockService = {
  info: () => {},
  debug: () => {},
  error: () => console.log({ error: 'Este es el error' }), // Corrección aquí
  warn: () => {},
}

export const HttpServiceError = {
  get: () => of({
    data: {
      data: {
        message: 'Error fetching tokens prices'
      }
    }
  }),
  request: () => new Error('HttpService request error')
}

export const responseMock: AxiosResponse<any> = {
  data: { },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}

export const responseError: AxiosError<any> = {
  "status": 404,
  "statusText": "Not Found",
  "headers": {},
  "config": {},
  "request": {}
}