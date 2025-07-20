
interface StoreApi<S = any> {
  getState: () => S
  dispatch: (action: any) => any
}

interface MiddlewareAPI<S = any> {
  (storeApi: StoreApi<S>): (next: (action: any) => any) => (action: any) => any
}

const localStorageMiddleware: MiddlewareAPI = (storeApi) => (next) => (action) => {
  const result = next(action)
  console.log('storeApi', storeApi)
  console.log('next', next)
  console.log('action', action)
  // Access the updated state after the action has been processed
  const stateToPersist = storeApi.getState()

  try {
    window.localStorage.setItem('ivrState', JSON.stringify(stateToPersist))    
  }
  catch(err) {
    console.warn('Erros saving to localStorage', err)
  }

  return result
}

export default localStorageMiddleware