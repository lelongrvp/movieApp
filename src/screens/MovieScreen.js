import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Image,
  Dimensions,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";

const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-20";

var { width, height } = Dimensions.get("window");

const MovieScreen = () => {
  let movieName = "Batman Begins";
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, setFavorite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Call api to get movie details
  }, [item]);

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
        <View>
          <Image
            source={require("../../assets/images/dummy.png")}
            style={{ width, height: height * 0.55 }}
            className={ios ? "" : "mt-10"}
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0.5 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>
      {/* Movie Detail */}
      <View style={{ marginTop: -(height * 0.07) }} className="space-y-3">
        {/* Movie Title */}
        <Text className="text-white text-center text-3xl font-bold tracking-wide">
          {movieName}
        </Text>
        {/* Status, release, runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Released • 2022 • 2h 32m
        </Text>
        {/* Genre */}
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-light text-sm text-center">
            Action •
          </Text>
          <Text className="text-neutral-400 font-light text-sm text-center">
            Superhero •
          </Text>
          <Text className="text-neutral-400 font-light text-sm text-center">
            Comedy
          </Text>
        </View>
        {/* Description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          Super-Hero partners Scott Lang and Hope van Dyne are on a new mission
          to uncover secrets from their past.
        </Text>
      </View>
      {/* Cast */}
      <Cast cast={cast} navigation={navigation} />

      {/* Similar Movies */}
      <MovieList title="Similar Movies" data={similarMovies} hide={true} />
    </ScrollView>
  );
};

export default MovieScreen;
