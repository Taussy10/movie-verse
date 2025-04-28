import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '~/constants/icons';
import { images } from '~/constants/images';

const Index = () => {
  return (
    <SafeAreaView
    className=' flex-1 p-4'>
      <Image source={images.bg} />
      <Text
      className='text-secondary text-3xl  '>Index</Text>
    </SafeAreaView>
  );
};

export default Index;
