import {makeType, asyncMac, createReducer} from './ducks-helper'
import {fetchReducer} from './hors'

const t = makeType('thunk') // Funcion que nos va a crear los tipos y recibe el nombre del modulo
const FETCH = t('fetch', true) // Lo que hace fetch es que va a ser un objeto que va a represntar start, success y error
const fetchAc = asyncMac(FETCH);

const initialState = {
    data: {
        1:{name:'Noticia'}
    }, // La idea es que las llaves de estos objetos sean los id de los elementos  
    fetching: false, // La propiedad de fetching es que si me estoy extrayendo datos 
    fetched:false,
    error: null
}

export default createReducer(initialState, fetchReducer(FETCH))

export const miThunk = payload =>
async (dispatch, getState) => {
    const url ='https://jsonplaceholder.typicode.com/users'
    dispatch(fetchAc.start())
    try {
      const result = await fetch(url)
      const resultJson = await result.json()
      dispatch(fetchAc.succes(resultJson))
      console.log(resultJson)  
    } catch (error) {
        dispatch(fetchAc.error(error))
    }
 }

// Lo bueno de usar thunks es que primero es que puedo consultar el estado completo de mi aplicación, tambien cual es la categoria que se encuentra seleccionada 