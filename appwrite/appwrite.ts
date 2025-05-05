import { Client, Account, ID, Models, Databases, Query } from 'react-native-appwrite';

// Know what is the use of new key word
const client = new Client();
const account = new Account(client);
const databases = new Databases(client);

export const config = {
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,

  databaseId: process.env.EXPO_PUBLIC_APPWRITE_MOVIES_DATABASE_ID!,
  collectionId: process.env.EXPO_PUBLIC_APPWRITE_METRICS_COLLECTION_ID!,

  //  galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  // reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  // propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
};

client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform);

// Track the searces made by user
export const updateSearchCount = async (query:string, movie: Movie) => {
  try {
    
  
    // We need to check whether that movie text exist or not
    //  according to query we typed on filed

    // if exist ? then increase the count
    const result = await databases.listDocuments(
        config.databaseId, 
        config.collectionId,
        [ Query.equal('searchTerm', query) ]
    );
    console.log("Result :",result);
    
 if (result.documents.length >0) {
  // Search for existing movies
  const existingMovie = result.documents[0]
  
  await databases.updateDocument(
    config.databaseId,
    config.collectionId,
    existingMovie.$id,
    {
      count: existingMovie.count +1,
    }
  );
 }else{

  await databases.createDocument(
    config.databaseId,
    config.collectionId,
    ID.unique(),
    {
      "searchTerm":query,
      "count": 1,
      "poster_url": `https://image.tmdb.org/t/p/w500${movie.poster_path}` ,
      "title": movie.original_title,
      "movie_id": movie.id
    }
  )
 }
} catch (error) {
    console.log("Error from updateSearchCount in appwrite.tsx :",error);
    throw new Error("Erro while updating search count")
}
  

};


  // // if that searchTerm exist then increase the count
  // const updateMovies = await databases.updateDocument(
  //   config.databaseId,
  //   config.collectionId,
  //   ID.unique(),
  //   {
  //     count: +1,
  //   }
  // );


  //   // If not exist that searchTerm then create a new document
  //   if (!result) {
  //     const hello = await databases.createDocument(
  //       config.databaseId,
  //       config.collectionId,
  //       ID.unique(),
  //       {
  //         "searchTerm":query,
  //         "count": 1,
  //         "poster_url": movie.poster_path,
  //         "title": movie.original_title,
  //         "movie_id": movie.id
  //       }
  //     )
  // }
