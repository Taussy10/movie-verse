import { View, Text, TextInput } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// How to implement Search functionality

const SearchInput = () => {
  const [query, setQuery] = useState('');

  console.log('Query :', query);

  // 1. Have a data
  const data = [
    { name: 'Tausif', gender: 'Male', age: 34, class: '1st' },
    { name: 'Ali', gender: 'Male', age: 30, class: '2nd' },
    { name: 'Zoya', gender: 'Female', age: 25, class: '3rd' },
    { name: 'Fatima', gender: 'Female', age: 19, class: '6th' },
  ];

  {
    // What do you want ?
    // Whenever I write name of someone then it should that person data

    // this filter method will return each data
    // according to true or false by includes then
    // it will store filteredData
    // then cause you have used ( ) in arrow function  then it will return automatically
    // no need to return things
    // Learn more here: https://www.notion.so/Movie-verse-1e31cd817c2380ddb28bd1283d0561cf?pvs=4#1e71cd817c238030af7efbcb638cf93a

    const filteredData = data.filter((item) =>
    (
      item.name.toLowerCase().includes(query.toLowerCase())
    )
    );
  }

  return (
    <SafeAreaView className=" flex-1 bg-green-300 px-4">
      {/* 2. use TextInput component from RN */}

      <TextInput
        //  For search component we need 3 main things
        // 2.1 A value props:
        // Why ? Whatever you write in value props it will show in dow
        // in TextInput filed
        // value='This is in TextInput filed'
        // But we don't want static we need dyanmic
        // means ? changing value so need useState cause we
        // are gonna change state of it
        // 2.2: Need useSatae for storing value props(Go above)
        value={query}
        // So value will be in input filed ""(empty string) accordin to useState

        // Now we need to change the value empty string to something
        // we get a props called onChangeText that takes function with params

        // Why? It takes in a params that has value that you wrote in filed

        // onChangeText={ (text) =>console.log("Value in filed",text) }

        // So we can take that params and
        // 1. give it to setQuery() then that will
        // store in it's state and
        // 2. give it to query props and then query props will
        // 3. give it to value props by which you can see whatever text your wrote
        // in filed
        onChangeText={(text: string) => setQuery(text)}
        // This our optional props
        placeholder="Write your text"
        className=" mt-10 rounded-2xl bg-black text-white"
      />
    </SafeAreaView>
  );
};

export default SearchInput;
