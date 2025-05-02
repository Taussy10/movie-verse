import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, Redirect, router } from 'expo-router'

const Onboarding = () => {
   if (true) {
      return <Redirect href={"/search-input"} />
      
    }
  
  return (
    <SafeAreaView
    className=' flex-1 px-4'>
      <Text>Onboarding</Text>
      {/* <Button 
      title='Movie to detals'
      onPress={() =>
 router.push(
  {
    pathname: "movie/[id]",
    params: 'Avengers',
  }
) }/> */}
      <Button 
      title='Movie to home'
      onPress={() => router.push("/home")}/>
      <Link href="/movie/hello">
      <Text>Move to details screen</Text>
      </Link>
    </SafeAreaView>
  )
}

export default Onboarding