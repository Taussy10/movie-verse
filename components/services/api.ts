
export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3/',
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_READ_ACCESS_TOKEN}`,
  },
};

// You may ask we didn't use API key ? cause we don't need
// that was for registering on TMDB

// Created a functiont that takes params called query 
export const fetchMovies = async ({ query }: { query: string }) => {
  try {
    // whenever you get an string and if you want to use temeplate literal
    // encode them cause theere may be error

    // Created a varaiable to store endpoint for fetching: either searched movies 
    // if query exist else store popular moves in endpoint 

    const endpoint =query ?
     `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${TMDB_CONFIG.BASE_URL}discover/movie?sort_by=popularity.desc`;

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
    // In response provieds this kinda ununderstable data 
    //  {"_bodyBlob":28}}, "_bodyInit": {"_data": {"__collector": [Object], "blobId": 
    // so convert it in json and give it Return data as promise 

    const data = await response.json();
    console.log("movieData :",data);
        
    return data.results
  } catch (error) {
    console.log('Error from fetchMovies fun in api.ts :', error);
    throw new Error('Error in fetching movies');
  }
};
