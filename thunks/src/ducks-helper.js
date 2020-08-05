export const makeType = m => (a, isAsync) => { 
    if (isAsync) {
        return{
            START: `${m}/${a}-start`,
            SUCCESS: `${m}/${a}-success`,
            ERROR: `${m}/${a}-error`
        }
    }
    return `${m}/${a}`
} // Esta funcion lo que hace es que va a recibir el nombre del modulo y despues va a recibir una acción y va a retonar con template string...

// makeActionCreator -> nos va a simplificar la forma en que nosotros creamos nuestros action creators 
 export function mac (type, ...argNames){
    return function ac(...args){
        const action = {type}
        argNames.forEach((arg, index) =>{
            action[argNames[index]] = args[index]
        })
        return action
    }
}
// makeActionCreator asincrono
export function asyncMac(types){
    return{
        error: mac(`${types.ERROR}`, 'error'),
        start: mac(`${types.START}`),
        success: mac(`${types.SUCCESS}`, 'payload'),
    }
}

export function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
      if (handlers.hasOwnProperty(action.type)) {
        const newState =  handlers[action.type](state, action);
        if (newState !== state) {
            return newState; 
        }
      }
      return state; 
    };
  }
