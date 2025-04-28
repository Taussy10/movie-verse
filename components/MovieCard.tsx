import { Link } from 'expo-router';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { icons } from '~/constants/icons';

// interface propsType {
//   image: string;
//   rating: number;
//   title: string;
// }

// const MovieCard = ({ image, rating, title }: propsType) => {
const MovieCard = ({id, poster_path, vote_average, original_title,release_date }: Movie) => {
  return (
    <Link 
    href={`movie/${id}` }
    asChild
    >
        <TouchableOpacity
         activeOpacity={0.6}
        className=' mb-6 mr-6 '
        >
      <Image
        source={{ uri: poster_path?`https://image.tmdb.org/t/p/w500${poster_path}` :"https://placehold   .co/600*400/1a1a1a/ffffff.png" }}
        className="  h-52 w-44 rounded-xl"
        resizeMode="cover"
        />
      <View className=" flex-row gap-1 ">
        <Image source={icons.star} className=" size-4" />
        {/* slice method for string not number */}
        <Text className="  text-sm font-semibold text-white">{vote_average.toString().slice(0, 3)}</Text>
      </View>
      {/* Genere */}
      {/* <Text className=" text-sm text-white">{item.original_title}</Text>     */}
      <Text 
    numberOfLines={1} // Just show text will take only one line
      className=" text-base  font-semibold text-white ">{original_title}</Text>

      {/* For release date and genere */}
      <View className=' flex-row   items-center justify-between'>
      <Text className="  text-xs   text-white ">{release_date?.split("-")[0]}</Text>
      <Text className="  text-xs   text-white ">Action</Text>
      </View>
        </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
