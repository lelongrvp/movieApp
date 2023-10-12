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
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../components/MovieList";
import {
  fetchPersonDetails,
  fetchPersonMovies,
  image500,
} from "../api/movieData";
import Modal from "react-native-modal";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-20";

const PersonScreen = () => {
  const { params: item } = useRoute();
  const [isFavorite, setFavorite] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [personDetails, setPersonDetails] = useState({});
  const [ownMovies, setOwnMovies] = useState([]);
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  const getPersonDetails = async () => {
    const data = await fetchPersonDetails(item.id);
    if (data) setPersonDetails(data);
    setLoading(false);
  };

  const getPersonMovies = async () => {
    const data = await fetchPersonMovies(item.id);
    if (data && data.cast) setOwnMovies(data.cast);
    setLoading(false);
  };

  useEffect(() => {
    // console.log(item.id);
    getPersonDetails();
    getPersonMovies();
  }, []);

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
            // source={require("../../assets/images/actor.png")}
            source={{ uri: image500(personDetails.profile_path) }}
            style={{ height: height * 0.43, width: width * 0.74 }}
            className="object-cover"
          />
        </View>
        {/* Actor Name */}
        <Text className="text-white text-center text-3xl font-bold tracking-wide">
          {personDetails.name}
        </Text>
        {/* Origins */}
        <Text className="text-neutral-400 font-light text-sm text-center mb-3">
          {personDetails.place_of_birth}
        </Text>
        {/* Information */}
        <View className="w-[90%] rounded-3xl flex-row justify-center space-x-4 my-3 bg-neutral-700 p-4">
          <View className="items-center">
            <Text className="text-white text-md font-bold tracking-wide">
              Gender
            </Text>
            <Text className="text-neutral-300 text-xs font-normal tracking-wide">
              {(personDetails.gender === 0 && "Not set") ||
                (personDetails.gender === 1 && "Female") ||
                (personDetails.gender === 2 && "Male") ||
                (personDetails.gender === 3 && "Non-binary")}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-md font-bold tracking-wide">
              Birthday
            </Text>
            <Text className="text-neutral-300 text-xs font-normal tracking-wide">
              {personDetails.birthday || "null"}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-md font-bold tracking-wide">
              Known For
            </Text>
            <Text className="text-neutral-300 text-xs font-normal tracking-wide">
              {personDetails.known_for_department}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-md font-bold tracking-wide">
              Popularity
            </Text>
            <Text className="text-neutral-300 text-xs font-normal tracking-wide">
              {personDetails.popularity?.toFixed(1)}
            </Text>
          </View>
        </View>
        {/* Biography */}
        <Text className="text-white mx-4 font-bold text-lg tracking-wide">
          Biography
        </Text>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Text className="text-neutral-400 mx-4 tracking-wide">
            {personDetails.biography?.length > 200 &&
              personDetails.biography.slice(0, 200) + "..."}
          </Text>
        </TouchableOpacity>
        {showModal && (
          <Modal
            isVisible={showModal}
            backdropOpacity={0.7}
            onBackdropPress={() => setShowModal(false)}
            style={{ justifyContent: "center" }}
          >
            <View className="absolute bg-neutral-700 mx-5 p-5 z-10 backdrop-blur-md rounded-xl h-[50%]">
              <Text className="text-white font-bold text-xl my-3">
                Biography
              </Text>
              <ScrollView>
                <Text className="text-white">{personDetails.biography}</Text>
              </ScrollView>
              <TouchableOpacity
                className="p-3 w-fit bg-[#c69b1c] rounded-xl mt-5 shadow-2xl items-center"
                onPress={() => setShowModal(false)}
              >
                <Text className="text-neutral-800">Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>
      <MovieList title="Also in" hide={true} data={ownMovies} />
    </ScrollView>
  );
};

export default PersonScreen;
