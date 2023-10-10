import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Cast = ({ cast, navigation }) => {
  let personName = "Paul Rudd";
  let character = "Scott Lang";

  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="mr-4 items-center"
                onPress={() => navigation.navigate("Person", person)}
              >
                <View className="border border-neutral-100 rounded-full h-20 w-20 overflow-hidden">
                  <Image
                    className="object-contain h-full w-full"
                    source={require("../../assets/images/dummy.png")}
                  />
                </View>

                <Text className="text-white text-xs mt-1">{character}</Text>
                <Text className="text-neutral-400 text-xs mt-1">
                  {personName}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;
