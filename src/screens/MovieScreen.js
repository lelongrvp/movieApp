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
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/movieData";
import Loading from "../components/Loading";

const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-20";

var { width, height } = Dimensions.get("window");

const MovieScreen = () => {
  // let movieName = "Batman Begins";
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, setFavorite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState({});

  const getMovieDetails = async () => {
    const data = await fetchMovieDetails(item.id);
    if (data) setMovieDetails(data);
    setLoading(false);
  };

  const getCast = async () => {
    const data = await fetchMovieCredits(item.id);
    if (data && data.cast) setCast(data.cast);
    setLoading(false);
  };

  const getSimilarMovies = async () => {
    const data = await fetchSimilarMovies(item.id);
    if (data && data.results) setSimilarMovies(data.results);
    setLoading(false);
  };

  useEffect(() => {
    getMovieDetails();
    getSimilarMovies();
    getCast();
  }, []);

  return (
    // check loading
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
        {isLoading ? (
          <Loading />
        ) : (
          <View>
            <Image
              // source={require("../../assets/images/dummy.png")}
              source={{ uri: image500(movieDetails.poster_path) }}
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
        )}
      </View>
      {/* Movie Detail */}
      <View style={{ marginTop: -(height * 0.07) }} className="space-y-2">
        {/* Movie Title */}
        <Text className="text-white text-center text-3xl font-bold tracking-wide px-2">
          {movieDetails?.title}
        </Text>
        {/* Status, release, runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Release Date: {movieDetails?.release_date}
        </Text>
        <Text
          className="font-semibold text-base text-center"
          style={{ color: item.vote_average > 7 ? "#4dff17" : "#f56642" }}
        >
          {movieDetails.vote_average?.toFixed(1)} ★
        </Text>
        {/* Genre */}
        <View className="flex-row justify-center space-x-2">
          {movieDetails.genres &&
            movieDetails.genres.map((genre, index) => (
              <Text
                key={index}
                className="text-neutral-400 font-light text-sm text-center"
              >
                {genre.name}
              </Text>
            ))}
        </View>
        {/* Description */}
        <Text className="text-neutral-400 mx-5 tracking-wide">
          {movieDetails?.overview}
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
