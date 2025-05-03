// if you have a lot of things to get create config varialbe
// and store here for writing code in good manner

export const TMDB_CONFIG = {
  // Take care of that forward slash at the end
  // so that you don't write like this /3//popular_movies 
  // or /3popular_movies
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_READ_ACCESS_TOKEN}`,
  },
};

// Created a functiont that takes params called query
export const fetchMovies = async ({ query }: { query: string }) => {
  try {
    // whenever you get an string and if you want to use temeplate literal
    // encode them cause theere may be error

    // Created a varaiable to store endpoint for fetching: either searched movies
    // if query exist else store popular moves in endpoint

    const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    // Then fetch according to endpoint
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: TMDB_CONFIG.headers,
    });
    // console.log("Response ",response);

    if (!response.ok) {
      console.log('Response :', response);
      throw new Error(`Failed to fetch movies ${response.statusText}`);
    }

    // if everything ok:


    // 
    // Then from server we get response object 
    // but data in BLOB(Binary large object) format an unreadable stream 

    //   basically binaray that's not unreadable for human being 

    //  {"_bodyBlob":28}}, "_bodyInit": {"_data": {"__collector": [Object], "blobId":

    // So we need to convert in readable format and return data in object 
    // by response.json() also it returns promise 
    // 
    // So does three things 
    // 1. Read the Blob format 
    // 2. convert in js object 
    // 3. return promise 
    
    const data = await response.json();
    console.log('movieData :', data);

    return data.results;
  } catch (error) {
    console.log('Error from fetchMovies fun in api.ts :', error);
    throw new Error('Error in fetching movies');
  }
};
