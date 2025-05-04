import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import {useState, useEffect} from 'react';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFetch from '~/hooks/useFetch';
import { fetchMovieDetails } from '~/components/services/api';

// this route should be outside the tabs group cause 
// we don't want to show tabs on it 

const MovieDetails = () => {
  const {id} = useLocalSearchParams()

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch,
    // This query will take search props
    // actually id will take time to come that's why made it false then need to fetch
  } = useFetch(() => fetchMovieDetails(id), false);

useEffect(() => {
  if (id) {
    refetch()
  }
}, [id])


  // release year , duration
  // stars 
  // overview,
  // release date 
  // status: released or not
  // generese 
  // countries: where it release 
  // budget revenue
  return (
    <SafeAreaView
     >
      <FlatList 
      // cause we are getting data in {}
      data={movies}
      renderItem={({item}) => {
        console.log("item :",item);
        
        return(
       <View>
        <Text>{item?.adult}</Text>
       </View>
        )
      }}
      />
      {/* <Image 
      source={{uri: }}
      /> */}
      <Text>MovieDetails</Text>
    </SafeAreaView>
  );
};

export default MovieDetails;
