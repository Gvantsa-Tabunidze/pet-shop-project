import { useEffect, useState } from "react"

const useLocalStorage=<T,>(key:string, fallback: T) => {
    const [value, setValue] = useState<T>(JSON.parse(localStorage.getItem(key)) ?? fallback)
    
    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as const

}

export default useLocalStorage