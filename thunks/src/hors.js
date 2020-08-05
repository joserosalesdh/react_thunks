//un Higher Order Reducer es una funcón que nos devuelve reducers que va a funcionar en base a argumentos que nosotros le pasemos obvimanete asi puede generar reducers dinamicos 
export const fetchReducer = ({START, SUCCESS, ERROR})=> ({
    [START]: state => ({
        ...state,
        fetching: true
    }),
    [SUCCESS]: (state,{payload}) => ({
        ...state,
        data: payload
    }),
    [ERROR]: (state,{error}) => ({
        ...state,
        error
    })
}) 