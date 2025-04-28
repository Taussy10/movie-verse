import { useState, useEffect   } from 'react';
import { fetchMovies } from '~/components/services/api';

// useFetch will accept a fetchFunction for fetching a function
// can popular movies
// autoFecth = true


// Hooks aren't using async so dont' try to use async await on it 
export const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch =true) => {
  // Now it will store some data
  const [data, setData] = useState<T | null>(null);
  // it will take time so we have to see time to load
  // if loaded then make it true
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
        // start loading
        setLoading(true)
        setError(null)

        const result= await fetchFunction()
        // console.log("Result: ", result);
        
        setData(result)
// return result
    } catch (error) {
      console.log('Error from fetch fun :', error);
      setError(error instanceof Error ? error : new Error('An error occured'));
    }finally{
        // if try catch anything then loaded false
    setLoading(false)
    }
  }

  const reset = () => {
      setData(null)
    setLoading(false)
    setError(null)
  }

  useEffect(() => {
    // if autoFetch true 
    if (autoFetch) {
        fetchData()
        
    }

  }, [])
  
//   fetching ,loading, error , refetching and reseting
// last two is needed but you don'tneed
  return {data, loading, error , refetch:fetchData, reset }
};
