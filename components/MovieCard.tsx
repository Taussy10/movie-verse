import { Link, router } from 'expo-router';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { icons } from '~/constants/icons';
import { useState } from 'react';

// interface propsType {
//   image: string;
//   rating: number;
//   title: string;
// }

// const MovieCard = ({ image, rating, title }: propsType) => {
const MovieCard = ({ id, poster_path, vote_average, original_title, release_date }: Movie) => {
  return (
    // <TouchableOpacity onPress={ router.push({
    //   pathname: '/movie/[id]',
    //   params: id
    // })}>
    //   </TouchableOpacity>
    // <Link href={`movie/${id}`} asChild>
    <TouchableOpacity
      activeOpacity={0.6}
      className=" mb-6 mr-6 "
      onPress={() =>
        router.push({
          pathname: '/movies/[id]',
          // We have to write params in curlies
          params: { id: id.toString() },
        })
      }>
      <Image
        source={{
          uri: poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : 'https://imgs.search.brave.com/_Svg6-LpfcJeA2e4HQl40eXQb6pFpYAn8H2ueohz8oc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA2LzU3LzM3LzAx/LzM2MF9GXzY1NzM3/MDE1MF9wZE5lRzVw/akk5NzZaYXNWYktO/OVZxSDFyZm95a2RZ/VS5qcGc',
        }}
        className="  h-52 w-44 rounded-xl"
        resizeMode="cover"
      />
      {/*Movie Details*/}
      <View>
        <View className=" flex-row gap-1 ">
          <Image source={icons.star} className=" size-4" />
          {/* slice method for string not number */}
          <Text className="  text-sm font-semibold text-white">
            {vote_average.toString().slice(0, 3)}
          </Text>
        </View>
        {/* Genere */}
        {/* <Text className=" text-sm text-white">{item.original_title}</Text>     */}
        <Text
          numberOfLines={1} // Just show text will take only one line
          className=" text-base  font-semibold text-white ">
          {original_title}
        </Text>

        {/* For release date and genere */}
        <View className=" flex-row   items-center justify-between">
          <Text className="  text-xs   text-white ">{release_date?.split('-')[0]}</Text>
          <Text className="  text-xs uppercase text-white">Action</Text>
        </View>
      </View>
    </TouchableOpacity>
    // </Link>
  );
};

export default MovieCard;
