import { useState } from "react";

export default function useOnline(){

const[isOnline , setIsOnline] = useState<boolean>(true)


window.addEventListener("online",()=>{
    setIsOnline(true)
})


window.addEventListener("offline",()=>{
    setIsOnline(false)
})

return isOnline


}