import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TextInput,
  Touchable,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useState } from "react";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

var { width, height } = Dimensions.get("window");

const SearchScreen = () => {
  let movieName = "Antman and the Wasp: Quantumania";
  const navigation = useNavigation();
  const [results, setResults] = useState([1, 2, 3, 4, 5]);
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mt-20 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          placeholder="Search Movie..."
          placeholderTextColor={"gray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>
      {/* results */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="space-y-3"
      >
        <Text className="text-white font-semibold ml-1">
          Results ({results.length}):
        </Text>
        <View className="flex-row justify-between flex-wrap">
          {results.map((result, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("Movie", result)}
              >
                <View className="space-y-2 mb-4">
                  <Image
                    className="rounded-3xl"
                    source={require("../../assets/images/dummy.png")}
                    style={{ width: width * 0.44, height: height * 0.3 }}
                  />
                  <Text className="text-neutral-300 ml-1">
                    {movieName.length > 20
                      ? movieName.slice(0, 20) + "..."
                      : movieName}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
