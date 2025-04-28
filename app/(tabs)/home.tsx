import { View, Text, Image, ImageBackground, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '~/constants/images'
import { icons } from '~/constants/icons'
import SearchBar from '~/components/search-bar'
import { useRouter } from 'expo-router'

const Home = () => {
  const router = useRouter();
  return (
    // <SafeAreaView
    // Sometimes you don't need this for whole screenpx-4
    // className=' flex-1  bg-primary'>
      // {/* Divide screen in three parts
      // 1. Top: logo and search 
      // 2. Popular movide row wise
      // 3. Showing only 3 movie par row 
      // */}
      <View className='  flex-1  bg-primary'>
      <Image source={images.bg}
      className=' flex-1 absolute w-full z-0'/>

      <ScrollView
      className=' flex-1 px-5 '
      contentContainerStyle = {{minHeight: "100%", paddingBottom: 10,}}
        showsVerticalScrollIndicator = {false}
      >
<Image source={icons.logo} className='w-12 h-10  mt-20 mb-5 mx-auto' />
<Text className=' text-xl text-white'>Home</Text>


<View className=' flex-1 mt-5 '>

  <SearchBar 
  onPress={()=> router.push("/search")}
  placeholder={'Search through 300+ movies online'}

  />

</View>
      </ScrollView>
      </View>
    // </SafeAreaView>
  )
}

export default Home