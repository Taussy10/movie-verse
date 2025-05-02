import {Client, Account, ID, Models, Databases} from 'react-native-appwrite'

// Know what is the use of new key word 
const client = new Client()
const account = new Account(client)
const databases = new Databases(client)


export const config = {
 platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
 projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
 endpoint: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,

//  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
//  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
//  galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
// reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
// propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,       
}

