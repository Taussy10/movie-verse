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

export const updateSearchCount = async (query:string, movie: Movie) => {
    // We need to check whether that movie text exist or not
    // if exist ? then increase the count
    const result = await databases.listDocuments(
        config.databaseId, 
        config.collectionId,
        [ Query.equal('searchTerm', query) ]
    );
    console.log("Result :",result);
    
    if (!result) {
        
    }
  // if not ? then create a new document and store the movie name id
  const updateMovies = await databases.updateDocument(
    config.databaseId,
    config.collectionId,
    ID.unique(),
    {
      SearchTerm: 'hello',
    }
  );
};
