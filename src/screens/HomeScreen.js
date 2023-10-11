import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
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

const HomeScreen = () => {
  const navigation = useNavigation();
  const [trending, setTrending] = useState([1, 2, 3]);
  const [upcoming, setUpcoming] = useState([1, 2, 3, 4, 5, 6]);
  const [topRated, setTopRated] = useState([1, 2, 3, 4, 5, 6]);
  const [isLoading, setLoading] = useState(false);

  const handleClick = () => {
    console.log("Clicked");
  };

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
          <TrendingMovies data={trending} handleClick={handleClick} />

          {/* Upcoming Movies */}
          <MovieList title="Upcoming Movies" data={upcoming} />

          {/* Top rated Movies */}
          <MovieList title="Top Rated Movies" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
