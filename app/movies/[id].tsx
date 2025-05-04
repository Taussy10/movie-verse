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
    className=' bg-primary flex-1'
     >
      <FlatList 
      // cause we are getting data in {}
      data={[movies]}
      renderItem={({item}) => {
        console.log("item :",item);

        // let  duration = 100
         function inMinutes(duration) {
          const forHour = duration/60
          const hours = Math.floor(forHour)
          // it gives reminder 
          const forMinutes = hours % 60
          const minutes = Math.round(forMinutes*60)

          console.log("Hour :",hours);
          console.log("Shesh :",forHour);
          console.log("Shesh :",forMinutes);
          console.log("Minutes :",minutes);
          // // 90/60 = 1.5  
          // .5 *60 = 30 minutes
          return `${hours}h ${minutes}m`;
         }
         inMinutes(100)

         function formatDuration(duration) {
          const hours = Math.floor(duration / 60);
          const minutes = Math.round(duration % 60);
          return `${hours}h ${minutes}m`;
        }
        return(
       <View>
        <Image
        source={{
          uri: item?.poster_path
            ? `https://image.tmdb.org/t/p/w500${item?.poster_path}`
            : 'https://imgs.search.brave.com/_Svg6-LpfcJeA2e4HQl40eXQb6pFpYAn8H2ueohz8oc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA2LzU3LzM3LzAx/LzM2MF9GXzY1NzM3/MDE1MF9wZE5lRzVw/akk5NzZaYXNWYktO/OVZxSDFyZm95a2RZ/VS5qcGc',
        }}
        className="  h-96  w-full rounded-xl p-4"
        resizeMode="cover"
      />

{/* Container for details */}
<View className=' px-4'>
 <Text className=' text-xl font-bold text-white'>{item?.original_title}</Text>


{/* Container for date , duration */}
<View className=' flex-row gap-2'>
<Text className=' font-semibold text-white'>{item?.release_date?.slice(0,4)}</Text>

{/* Maybe it's not dot it's an image */}
<Text className=' font-bold text-2xl text-white'>.</Text>
<Text className=' font-semibold text-white'>{formatDuration(item?.runtime)}</Text>
</View>
  

  {/* Container for  Overview  */}
  <View className=' mb-6'>
  <Text className='  font-semibold text-text  mb-2 '>Overview</Text>
        <Text className=' font-semibold text-white'>{item?.overview}.</Text>
  </View>

{/* For released date and status  */}
<View className=' mb-6 flex-row justify-between px-2'>

  {/* For released date */}
<View>
<Text className=' text-text font-semibold'> Release Date</Text>
<Text className=' font-semibold text-white'>{item?.release_date}</Text>
</View>

<View>
<Text className=' text-text font-semibold'> Status</Text>
 <Text className=' font-semibold text-white'>{item?.status}</Text>
</View>

</View>

{/* For generes */}
<View className=' flex-row '>
{  
  item?.genres.map((item) => {
    console.log(item);
    
    return(
      // this container for between the elements
      <View   className=' p-2  mr-2  mb-3 rounded-lg bg-blue-600' >
        <Text className=' font-semibold text-white'>{item.name}</Text>
      </View>
    )
  })
}
</View>




{/* For Budget and revenue*/}
<View className=' mb-6 flex-row justify-between px-2'>

  {/* For budget date */}
<View>
<Text className=' text-text font-semibold'>Budget</Text>
<Text className=' font-semibold text-white'>${item?.budget/1000000} Million</Text>
</View>

<View>
<Text className=' text-text font-semibold'> Revenue</Text>
 <Text className=' font-semibold text-white'>${Math.round(item?.revenue/1000000)} Million</Text>
</View>

</View>


 
        {/* <Text className=' font-semibold text-white'>{item?.runtime/60}</Text> */}
        <Text className=' font-semibold text-white'>${item?.production_countries[0].name}  </Text>
        <Text className=' font-semibold text-white'>{item?.revenue}</Text>
  

</View>
        



        {/* Texts show text string not boolean values */}
        {/* <Text className=' text- text-white'>{item?.adult}</Text> */}
        <Text className=' text- text-white'>{item?.budget}</Text>
       </View>
        )
      }}
      />
  
    </SafeAreaView>
  );
};

export default MovieDetails;
