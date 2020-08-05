const makeType = m => (a, isAsync) => { 
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


const t = makeType('thunk') // Funcion que nos va a crear los tipos y recibe el nombre del modulo

const FETCH = t('fetch', true) // Lo que hace fetch es que va a ser un objeto que va a represntar start, success y error

const fetchStart = mac(FETCH.START)
const fetchSucces = mac(FETCH.SUCCESS, 'payload')
const fetchError = mac(FETCH.ERROR, 'error')

const url ='https://jsonplaceholder.typicode.com/users'

const initialState = {
    data: {}, // La idea es que las llaves de estos objetos sean los id de los elementos  
    fetching: false, // La propiedad de fetching es que si me estoy extrayendo datos 
    error: null
}

function reducer (state= initialState, action){
    switch (action.type) {
        case FETCH.START:
            return{
                ...state,
                fetching: true // Esto para poder mostrarles al usuario de que estamos cargando
            }
        case FETCH.SUCCESS:
            return{
                ...state,
                data: action.payload
            }
        case FETCH.ERROR:
            return{
                ...state,
                error: action.error
            }
        default:
            return state;
    }
  }

export default payload =>
async (dispatch, getState) => {
    dispatch(fetchStart())
    try {
      const result = await fetch(url)
      const resultJson = await result.json()
      dispatch(fetchSucces(resultJson))
      console.log(resultJson)  
    } catch (error) {
        dispatch(fetchError(error))
    }
 }

// Lo bueno de usar thunks es que primero es que puedo consultar el estado completo de mi aplicación, tambien cual es la categoria que se encuentra seleccionada 