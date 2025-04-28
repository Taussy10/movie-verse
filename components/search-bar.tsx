import { View, Text, Image, TextInput } from 'react-native'
import {useState} from 'react'
import { icons } from '~/constants/icons'

const SearchBar = () => {
    const [inputValue, setInputValue] = useState("")
  return (
    <View className='flex-row items-center  bg-secondary  rounded-full
     px-5 py-4
    '>
        <Image 
        source={icons.search}
        className='  size-5'
        resizeMode= "contain"
        // Changes the color of all non-transparent pixels to the tintColor.
        // Don't know what does it mean ? Color of image outline 
 tintColor= "#ab8bff"
        />
        <TextInput 
        placeholder='Search through 300+ movies online'
         placeholderTextColor="#a8b5db"
        className='  flex-1 ml-2  text-white  '
        onPress={() => {}}
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
          
        />
        
      {/* <Text className=' text-white'>SearchBar</Text> */}
    </View>
  )
}

export default SearchBar