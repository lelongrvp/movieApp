import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { image185 } from "../api/movieData";

var { width, height } = Dimensions.get("window");

const MovieList = ({ title, data, hide }) => {
  // let movieName = "One Flew Over the Cuckoo's Nest";
  const navigation = useNavigation();

  if (!Array.isArray(data)) {
    console.error("Data is not an array:", data);
    // You can add additional handling here based on your requirements
    return null;
  }

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-2xl font-bold">{title}</Text>
        {!hide && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data?.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => navigation.push("Movie", item)}
          >
            <View className="space-y-1 mr-4">
              <Image
                // source={require("../../assets/images/dummy.png")}
                source={{ uri: image185(item.poster_path) }}
                className="rounded-3xl"
                style={{ width: width * 0.33, height: height * 0.22 }}
              />
              <Text
                className="text-neutral-50 ml-2 text-[12px] text-center"
                style={{ maxWidth: width * 0.33 }}
              >
                {item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieList;
