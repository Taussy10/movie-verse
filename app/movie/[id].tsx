import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link, router, useLocalSearchParams } from 'expo-router';

// this route should be outside the tabs group cause 
// we don't want to show tabs on it 

const MovieDetails = () => {
  const {id} = useLocalSearchParams()
  console.log("ID",id);
  
  return (
    <View>
      <Text>MovieDetails</Text>
    </View>
  );
};

export default MovieDetails;
