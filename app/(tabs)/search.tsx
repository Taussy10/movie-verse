import { View, Text, Image, ImageBackground, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '~/constants/icons';
import { images } from '~/constants/images';
import { useFetch } from '~/hooks/useFetch';
import { fetchMovies } from '~/components/services/api';
import { useState } from 'react';
import SearchBar from '~/components/search-bar';
import MovieCard from '~/components/MovieCard';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    // This query will take search props
  } = useFetch(() => fetchMovies({ query: inputValue }));

  const searchQuery = (text: string) => {
    setInputValue(text);
  };
  console.log('hello');

  return (
    <SafeAreaView className=" flex-1  bg-primary">
      <StatusBar barStyle={'light-content'} />

      <View className=" px-4">
        <FlatList
          data={movies}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <>
              <Image source={images.bg} className=" absolute z-0 w-full  flex-1 " />

              <View className="  items-center justify-center">
                <Image source={icons.logo} className="mx-auto mb-5  mt-20 h-10 w-12" />
              </View>
              <View className=" mb-5">
                <SearchBar
                  placeholder={'Search through 300+ movies online'}
                  inputValue={inputValue}
                  onChangeText={searchQuery}
                />
              </View>
                {moviesLoading ? (
                        <ActivityIndicator color={'#0000ff'} size={'small'} className="  mt-5 self-center" />
                      ) : moviesError && (
                        <Text className=' text-red-500 my-3'>Error: {moviesError?.message} Failed</Text>
                      ) }
                      
            </>
          }
          renderItem={({ item, index }) => {
            return (
              <View className=" w-[50%]">
                <MovieCard {...item} />
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;
