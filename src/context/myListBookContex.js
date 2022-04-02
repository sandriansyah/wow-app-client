import { createContext,useReducer } from "react";

export const MyListBookContext=createContext()

const initialState={
    dataListBook:[]
}

const reducer = (state,action)=>{
    const{type,payload} = action

    switch(type){
        case 'MY_LIST_BOOK':
            return{
                dataListBook:payload
            }
        case 'NO_BOOK':
            return{
                dataListBook:[]
            }
        default:
            throw new Error()
    }
}

export const ListBookContextProvider =({children})=>{
    const [state,dispacth] = useReducer(reducer,initialState)

    return(
        <MyListBookContext.Provider value={[state,dispacth]} >
            {children}
        </MyListBookContext.Provider>
    )
} 