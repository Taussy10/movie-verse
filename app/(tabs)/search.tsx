import {
  View,
  Text,
  Image,
  ImageBackground,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '~/constants/icons';
import { images } from '~/constants/images';
import useFetch from '~/hooks/useFetch';
import { fetchMovies } from '~/components/services/api';
import { useState, useEffect } from 'react';
import SearchBar from '~/components/search-bar';
import MovieCard from '~/components/MovieCard';
import { router } from 'expo-router';
import { updateSearchCount } from '~/appwrite/appwrite';
const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset: resetMovies,
    // This query will take search props
  } = useFetch(() => fetchMovies({ query: searchQuery || "" }), false);

  // There is a problem in this that app
  // It's requesting to server for every single
  // letter you type in filed

  // solution ? use deboucne technique in
  // which after typing then 1 second it should request to server
  // https://www.youtube.com/watch?v=AkHvKi2s9hw
  // This is called debouncing search term

  // Take care of this show can't convert null value
  // Can't convert null to object or something 
  useEffect(() => {
    // We want that movie should exist 
    // if it's null will give updateSearchCount(searchQuery,movies[0]) error

   
   
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
        
        if (movies?.length>0 && movies?.[0]) {
          // We only want first movie 
           await updateSearchCount(searchQuery,movies[0])
          }
      } else {
        resetMovies();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };
  // The problem is that it only shows when component renders/update/delete
  // so in useEffect we need if something changes then fetch it
  // console.log("hello");

  return (
    <SafeAreaView className=" flex-1  bg-primary">
      <StatusBar barStyle={'light-content'} />

      <Image source={images.bg} className=" absolute z-0 w-full flex-1" />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        className=" px-5"
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className=" mt-20  w-full  flex-row  items-center justify-center">
              <Image source={icons.logo} className=" mb-8 size-12" />
            </View>

            <View>
              <SearchBar
                // onPress={() => router.push('/search')}
                placeholder="Search movies"
                inputValue={searchQuery}
                onChangeText={handleSearch}
              />

              {/* If loading then also show indicator */}
              {moviesLoading && (
                <ActivityIndicator color={'#0000ff'} size={'large'} className="my-3" />
              )}

              {/* If error then also show Error */}
              {moviesError && (
                <Text className=" my-3 px-5 text-red-500">Error: {moviesError.message} </Text>
              )}

              {/* If not loading also not error then also Movies */}
              {!moviesLoading && !moviesError && 'SEARCH TERM'.trim() && movies?.length > 0 && (
                // {" "} for space
                <Text className=" text-xl  font-bold  text-white ">
                  Search results for <Text className="  text-darkAccent">{searchQuery}</Text>
                </Text>
              )}
            </View>
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className=" my-6 px-6 ">
              {
                <Text className=" text-center font-bold text-2xl  text-gray-500 ">
                  {/* // If search trim exist then show no movies found else search for movies  */}
                  {searchQuery.trim() ? 'No Movies Found' : 'Search for movies'}
                </Text>
              }
            </View>
          ) : null
        }
        renderItem={({ item }) => {
          return (
            <View className=" w-[50%]">
              <MovieCard {...item} />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Search;
