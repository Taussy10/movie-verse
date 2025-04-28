import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '~/constants/images';
import { icons } from '~/constants/icons';
import SearchBar from '~/components/search-bar';
import { useRouter } from 'expo-router';
import { useFetch } from '~/hooks/useFetch';
import { fetchMovies } from '~/components/services/api';
import MovieCard from '~/components/MovieCard';

const Home = () => {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));


  
  // console.log('Movies :', movies);


  return (
    // <SafeAreaView
    // Sometimes you don't need this for whole screenpx-4
    // className=' flex-1  bg-primary'>
    // {/* Divide screen in three parts
    // 1. Top: logo and search
    // 2. Popular movide row wise
    // 3. Showing only 3 movie par row
    // */}
    <View className="  flex-1  bg-primary">
      <Image source={images.bg} className=" absolute z-0 w-full flex-1" />

      <ScrollView
        className=" flex-1 px-5 "
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}>
        <Image source={icons.logo} className="mx-auto mb-5  mt-20 h-10 w-12" />

        {moviesLoading ? (
          <ActivityIndicator color={'#0000ff'} size={'small'} className="  mt-5 self-center" />
        ) : moviesError ? (
          <Text>Error: {moviesError?.message} Failed</Text>
        ) : (
          <View className=" mt-5 flex-1 ">
            <SearchBar
              onPress={() => router.push('/search')}
              placeholder={'Search through 300+ movies online'}
            />

            <>
              <Text className="  mb-3 mt-5  text-xl font-bold text-white">Latest Movies</Text>

              <FlatList
                data={movies}
                // horizontal
                numColumns={2 }
                keyExtractor={(item) =>item.id}
                renderItem={({ item, index }) => {
                    return(
                    <View>
                      {/* <TouchableOpacity
                      activeOpacity={0.6}
                      className=' mb-6 mr-6' >
                      */}
                     <MovieCard 
                    //  image = {item.poster_path}
                    //  rating = {item?.vote_average}
                    //  title = {item?.original_title}

                    // Just speraded the object then get it one by one in
                    //  MovieCard component 
                     {...item}
                     
                     />
                      {/* </TouchableOpacity> */}
                  </View>
                )
                  }
                 }
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
    // </SafeAreaView>
  );
};

export default Home;
