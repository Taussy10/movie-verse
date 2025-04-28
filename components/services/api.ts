
// export const TMDB_CONFIG = {
export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3/" ,
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_READ_ACCESS_TOKEN} `
  }
}

// You may ask we didn't use API key ? cause we don't need 
// that was for registering on TMDB  


export const fetchPopularMovies = async({query}:{query: string}) => {
  
  try {
    // whenever you get an string and if you want to use temeplate literal 
    // encode them cause theere may be error
    const endpoint = query ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${ encodeURIComponent(query)}`:`${TMDB_CONFIG.BASE_URL}discover/movie?sort_by=popularity.desc`
    
    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers
    })
    if (!response.ok) {
      console.log("Response :",response);
      
      throw new Error("Failed to fetch movies", response.statusText)
      
    }

    // if evrything ok
    const data = await response.json()
    return data.results
  } catch (error) {
    console.log("Error from fetchMovies fun in api.ts :",error);
    throw new Error("Error in fetching movies")
    
    
  }
}
const options = {
    method: 'GET',
    
  };
  
  fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));