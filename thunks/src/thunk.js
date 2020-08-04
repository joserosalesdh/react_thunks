const FETCH_START = 'start'
const FETCH_SUCCESS = 'success'
const FETCH_ERROR = 'error'

const fetchStart = () => ({
    type: FETCH_START
})
const fetchSucces = payload => ({
    type: FETCH_SUCCESS
})
const fetchError = error => ({
    type: FETCH_ERROR,
    error,
})

const url ='https://jsonplaceholder.typicode.com/users'

const initialState = {
    data: [],
    fetching: false,
    error: null
}

function reducer (state= initialState, action){
    switch (action.type) {
        case FETCH_START:
            return{
                ...state,
                fetching: true // Esto para poder mostrarles al usuario de que estamos cargando
            }
        case FETCH_SUCCESS:
            return{
                ...state,
                data: action.payload
            }
        case FETCH_ERROR:
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