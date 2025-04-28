import { Tabs } from 'expo-router';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { icons } from '~/constants/icons';
import { images } from '~/constants/images';
// const TabBarIcon = ({ image, color}:propsType) => {

interface TabIconTypes {
  icon: string,
  title: string,
  focused: boolean
}


const TabIcon = ({ icon, title, focused }:TabIconTypes) => {
  if (focused) {
    return (
      <View>
        <ImageBackground
          source={images.highlight}
          className="  mt-4  min-h-16 w-full min-w-[100px] flex-1
               flex-row items-center justify-center overflow-hidden rounded-full
              ">
          <Image source={icon} tinitColor="#151312" className="size-5" />
          <Text className=" ml-2 text-base font-semibold text-secondary">{title}</Text>
        </ImageBackground>
      </View>
    );   
  }
 return(
  <View className=' size-full justify-center items-center'>
 <Image source={icon} tinitColor="#a8b5db" className=" size-5" />

  </View>
 )
};

const TabsLayoutout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarItemStyle: {
          // backgroundColor: "green",
          width: "100%",
          height: "100%",
          justifyContent: 'center',
          alignItems: 'center',
          
        },


        tabBarStyle: {
          backgroundColor: "#0f0d23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0f0d23"




        }
        
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.home} title="Home" />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({focused}) => <TabIcon focused={focused} icon={icons.search} title="Search" />,

          //  image={images.star}
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} title="Saved" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayoutout;
