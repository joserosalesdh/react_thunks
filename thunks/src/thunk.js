export default payload =>
(dispatch, getState) => {
    const state = getState()
    console.log(payload)
 }

// Lo bueno de usar thunks es que primero es que puedo consultar el estado completo de mi aplicación, tambien cual es la categoria que se encuentra seleccionada 