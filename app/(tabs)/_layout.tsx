import { Tabs } from 'expo-router';

const TabsLayoutout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name="home" 
      options={{
        title: "Home"
      }}
      />
      <Tabs.Screen name="search" 
       options={{
        title: "Search"
      }}
      />
      <Tabs.Screen name="saved"
       options={{
        title: "Saved"
      }}
      />
      <Tabs.Screen name="profile"
       options={{
        title: "Profile"
      }}
      />
    </Tabs>
  );
};

export default TabsLayoutout;
