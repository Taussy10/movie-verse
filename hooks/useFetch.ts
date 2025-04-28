
import { useState } from "react"

// useFetch will accept a fetchFunction for fetching a function
// can popular movies
// autoFecth = true

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch:boolean) => {
    // Now it will store some data
    const [data, setData] = useState<T|null>(null)
    // it will take time so we have to see time to load
    // if loaded then make it true
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error|null>(null)

    

}