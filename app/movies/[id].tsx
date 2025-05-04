import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect } from 'react';
import {  router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFetch from '~/hooks/useFetch';
import { fetchMovieDetails } from '~/components/services/api';
import { icons } from '~/constants/icons';

// this route should be outside the tabs group cause
// we don't want to show tabs on it

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch,
    // This query will take search props
    // actually id will take time to come that's why made it false then need to fetch
  } = useFetch(() => fetchMovieDetails(id as string), false);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  // What about errror ? don't need qki errro home me hi handle kar liye then id pass kar diye to kaise error aayega?

  if (moviesLoading)
    return (
      <SafeAreaView className="flex-1 bg-primary">
        <ActivityIndicator size={'large'} color={'white'} />
      </SafeAreaView>
    );
  // release year , duration
  // stars fsdfsdf
  // overview,
  // release date
  // status: released or not
  // generese
  // countries: where it release
  // budget revenue
  return (
    <SafeAreaView className=" flex-1 bg-primary">
      {/* We don't want to show statusbar in movieDetails screen */}

      <FlatList
        // cause we are getting data in {}
        data={[movies]}
        renderItem={({ item }) => {
          console.log('item :', item);

          // let  duration = 100
          function inMinutes(duration) {
            const forHour = duration / 60;
            const hours = Math.floor(forHour);
            // it gives reminder
            const forMinutes = hours % 60;
            const minutes = Math.round(forMinutes * 60);

            console.log('Hour :', hours);
            console.log('Shesh :', forHour);
            console.log('Shesh :', forMinutes);
            console.log('Minutes :', minutes);
            // // 90/60 = 1.5
            // .5 *60 = 30 minutes
            return `${hours}h ${minutes}m`;
          }
          inMinutes(100);

          function formatDuration(duration: number) {
            const hours = Math.floor(duration / 60);
            const minutes = Math.round(duration % 60);
            return `${hours}h ${minutes}m`;
          }
          return (
            <View className=" pb-9">
              <Image
                source={{
                  uri: item?.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item?.poster_path}`
                    : 'https://imgs.search.brave.com/_Svg6-LpfcJeA2e4HQl40eXQb6pFpYAn8H2ueohz8oc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA2LzU3LzM3LzAx/LzM2MF9GXzY1NzM3/MDE1MF9wZE5lRzVw/akk5NzZaYXNWYktO/OVZxSDFyZm95a2RZ/VS5qcGc',
                }}
                className="  h-[400px]  w-full rounded-xl p-4"
                resizeMode="cover"
              />

              {/* Container for details */}
              <View className=" mt-5 px-5 ">
                <Text className=" mb-3 text-xl font-bold text-white">{item?.original_title}</Text>

                {/* Container for date , duration */}
                <View className=" mb-3 flex-row items-center gap-2">
                  <Text className=" font-semibold text-white">
                    {item?.release_date?.slice(0, 4)}
                  </Text>

                  {/* Maybe it's not dot it's an image */}
                  <Text className=" text-2xl font-bold text-white">.</Text>
                  <Text className=" font-semibold text-white">{formatDuration(item?.runtime)}</Text>
                </View>

                {/* For star and  */}
                <View
                  style={{ width: 80 }}
                  className=" mb-3  mr-2 flex-row items-center  gap-1  rounded-lg bg-blue-600 p-2 ">
                  <Image source={icons.star} className="size-7" />
                  <Text className=" font-semibold text-white">{item?.vote_average}</Text>
                </View>

                {/* Container for  Overview  */}
                <View className=" mb-3">
                  <Text className="  mb-2 font-semibold  text-text ">Overview</Text>
                  <Text className=" font-semibold text-white">{item?.overview}.</Text>
                </View>

                {/* For released date and status  */}
                <View className=" mb-6 flex-row justify-between px-2">
                  {/* For released date */}
                  <View>
                    <Text className=" font-semibold text-text"> Release Date</Text>
                    <Text className=" font-semibold text-white">{item?.release_date}</Text>
                  </View>

                  <View>
                    <Text className=" font-semibold text-text"> Status</Text>
                    <Text className=" font-semibold text-white">{item?.status}</Text>
                  </View>
                </View>

                {/* For generes */}
                <ScrollView horizontal>
                  <View className=" flex-row ">
                    {item?.genres.map((item) => {
                      console.log(item);

                      return (
                        // this container for between the elements
                        <View className=" mb-3  mr-2  rounded-lg bg-blue-600 p-2">
                          <Text className=" font-semibold text-white">{item.name}</Text>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>

                {/* For Budget and revenue*/}
                <View className=" mb-6 flex-row justify-between px-2">
                  {/* For budget date */}
                  <View>
                    <Text className=" font-semibold text-text">Budget</Text>
                    <Text className=" font-semibold text-white">
                      ${item?.budget / 1000000} Million
                    </Text>
                  </View>

                  <View>
                    <Text className=" font-semibold text-text"> Revenue</Text>
                    <Text className=" font-semibold text-white">
                      ${Math.round(item?.revenue / 1000000)} Million
                    </Text>
                  </View>
                </View>

                {/* <Text className=' font-semibold text-white'>{item?.runtime/60}</Text> */}

                {/* Container for Tagline  */}
                <View className=" mb-6">
                  <Text className="  mb-2 font-semibold  text-text ">Tagline</Text>
                  <Text className=" font-semibold text-white">{item?.tagline}.</Text>
                </View>

                {/* Container for Production companies  */}
                <View className=" mb-6">
                  <Text className="  mb-2 font-semibold  text-text ">Production Companies</Text>
                  <ScrollView horizontal>
                    <View className=" flex-row ">
                      {item?.production_companies.map((item) => {
                        console.log(item);

                        return (
                          // this container for between the elements
                          <View className=" mb-3  mr-2  rounded-lg bg-blue-600 p-2">
                            <Text className=" font-semibold text-white">{item.name}</Text>
                          </View>
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>

                <TouchableOpacity
                  className=" flex-row  items-center justify-center  rounded-xl bg-darkAccent p-4 
"
                  //     absolute right-0 left-0 bottom-5  z-40 mx-5
                  activeOpacity={0.8}
                  onPress={() => router.back()}>
                  <Image source={icons.goBack} className=" size-7" />
                  <Text className=" text-base  font-bold ">Visit Homepage</Text>
                </TouchableOpacity>

                {/* End of detail componets */}
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default MovieDetails;
