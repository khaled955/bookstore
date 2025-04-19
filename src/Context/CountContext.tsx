/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { CounterContextType, CounterProviderProps } from "../Interfaces/Interfaces";

 export const counterContext= createContext<CounterContextType| undefined>(undefined)

export default function CounterProvider({children}:CounterProviderProps){


const [counter , setCounter] = useState(1)

function handleIncreaseCounter(){
    setCounter(counter + 1)
}

function handleDecreaseCounter(){
    setCounter(counter - 1)
}



    return <counterContext.Provider value={{counter,handleIncreaseCounter,handleDecreaseCounter}}>
{children}
    </counterContext.Provider>
}