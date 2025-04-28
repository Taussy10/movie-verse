import { Redirect } from 'expo-router';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '~/constants/icons';
import { images } from '~/constants/images';

const Index = () => {
  if (true) {
    return <Redirect href={"/onboarding"} />
    
  }

  return (
  <SafeAreaView
    // In main screen add left right padding: px-4
    // p-4 then it will give padding on top make our layout bad 
    // so not top only left and right 
    className=' flex-1 px-4  items-center'>
      <Image source={images.bg} />
      <Text
      className='text-secondary text-3xl'>Index</Text>
    </SafeAreaView>
  );
};

export default Index;
