import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/movieData";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleClick = () => {
    console.log("Clicked");
  };

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    // console.log(data);
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    // console.log(data);
    if (data && data.results) setUpcoming(data.results);
    setLoading(false);
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    // console.log(data);
    if (data && data.results) setTopRated(data.results);
    setLoading(false);
  };

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  return (
    <View className="flex-1 bg-neutral-800">
      {/* Search bar and logo */}
      <SafeAreaView className="mb-3 mt-20">
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon color="white" size="30" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending Movie */}
          {trending.length > 0 && (
            <TrendingMovies data={trending} handleClick={handleClick} />
          )}

          {/* Upcoming Movies */}
          {upcoming.length > 0 && (
            <MovieList title="Upcoming Movies" data={upcoming} />
          )}

          {/* Top rated Movies */}
          {topRated.length > 0 && (
            <MovieList title="Top Rated Movies" data={topRated} />
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
