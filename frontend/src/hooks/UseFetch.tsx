import { useEffect, useState } from "react"
import type IUseFetch from "../interfaces/UseFetchInterface"
import type IAnimals from "../interfaces/AnimalInterface"

const useFetch = ({url, method}:IUseFetch)=>{
    
    const [response, setResponse] = useState<IAnimals[]>([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        fetch(url, {
            method,
            headers: {
                "Content-type": "application/json"
            }
        })
        .then((res)=> {
            if(!res.ok) throw new Error("Response failed")
                return res.json()
        })
        .then((data)=> setResponse(data))
        .catch(err=>setError(err))
        .finally(()=>setLoading(false))

        //Clean up
        return ()=>{
            setResponse([])
            setError(null)
            setLoading(false)
        }
    }, [url, method])

    return {response, error, loading}
}

export default useFetch