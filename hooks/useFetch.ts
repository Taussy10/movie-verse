import { useState, useEffect } from 'react';
import { fetchMovies } from '~/components/services/api';


// Created a customHook so that we don't need to 
// write state handaling this for each screen: useEffect(whenever component shows) then show data 
// then storing  


// Hooks aren't async functions so dont' try to use async await on it

// It takes 2 params fetchFunction as 
// 1. Fetch function jo ki promise return krega
// autFetch params default value true for refetching again data if component rendrs/updata/remove 
export const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  // For working with fetching data we need to do three things 


  //1. Store the data 
  const [data, setData] = useState<T | null>(null);
  //1. Manage loading time of data 
  const [loading, setLoading] = useState(false);
  // Manage errors
  const [error, setError] = useState<Error | null>(null);


  const fetchData = async () => {
    try {
      // start loading
      setLoading(true);
      setError(null);

      const result = await fetchFunction();
      // console.log("Result: ", result);
      // will store it 
      setData(result);
      // return result
    } catch (error) {
      console.log('Error from fetch fun :', error);
      setError(error instanceof Error ? error : new Error('An error occured'));
    } finally {
      // if try catch anything then loaded false
      setLoading(false);
    }
  };


  // another functin for reset 
  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  // for fetching again and again if component renders
  useEffect(() => {
    // if autoFetch true
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch]);

  return { data, loading, error, refetch: fetchData, reset };
};
