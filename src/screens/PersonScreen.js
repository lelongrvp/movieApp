import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import MovieList from "../components/MovieList";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-20";

const PersonScreen = () => {
  const [isFavorite, setFavorite] = useState(false);
  const [ownMovies, setOwnMovies] = useState([1, 2, 3, 4, 5]);
  const navigation = useNavigation();

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* Back button and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={`absolute z-20 w-full flex-row justify-between items-center px-4 ${topMargin}`}
        >
          <TouchableOpacity className="rounded-xl p-1 bg-[#eab308]">
            <ChevronLeftIcon
              size="28"
              strokeWidth={2.5}
              color="#ffffff"
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFavorite(!isFavorite)}>
            <HeartIcon size="35" color={isFavorite ? "#eab308" : "#ffffff"} />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      {/* Actor Detail */}
      <View className="space-y-2 items-center mb-5">
        <View
          className="mt-20 mb-3 overflow-hidden rounded-full w-72 h-72 border border-neutral-300 items-center "
          style={{
            shadowColor: "gray",
            shadowRadius: 40,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 1,
          }}
        >
          <Image
            source={require("../../assets/images/actor.png")}
            style={{ height: height * 0.43, width: width * 0.74 }}
            className="object-cover"
          />
        </View>
        {/* Actor Name */}
        <Text className="text-white text-center text-3xl font-bold tracking-wide">
          Paul Rudd
        </Text>
        {/* Origins */}
        <Text className="text-neutral-400 font-light text-sm text-center mb-3">
          Kenosha, Wisconsin, USA
        </Text>
        {/* Information */}
        <View className="w-[90%] rounded-3xl flex-row justify-center space-x-4 my-3 bg-neutral-700 p-4">
          <View className="items-center">
            <Text className="text-white text-md font-bold tracking-wide">
              Gender
            </Text>
            <Text className="text-neutral-300 text-xs font-normal tracking-wide">
              Male
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-md font-bold tracking-wide">
              Birthday
            </Text>
            <Text className="text-neutral-300 text-xs font-normal tracking-wide">
              1967-11-22
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-md font-bold tracking-wide">
              Known For
            </Text>
            <Text className="text-neutral-300 text-xs font-normal tracking-wide">
              Acting
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-md font-bold tracking-wide">
              Popularity
            </Text>
            <Text className="text-neutral-300 text-xs font-normal tracking-wide">
              18.30%
            </Text>
          </View>
        </View>
        {/* Biography */}
        <Text className="text-white mx-4 font-bold text-lg tracking-wide">
          Biography
        </Text>
        <Text className="text-neutral-400 mx-4 tracking-wide">
          Super-Hero partners Scott Lang and Hope van Dyne are on a new mission
          to uncover secrets from their past.
        </Text>
      </View>
      <MovieList title="Also in" hide={true} data={ownMovies} />
    </ScrollView>
  );
};

export default PersonScreen;
