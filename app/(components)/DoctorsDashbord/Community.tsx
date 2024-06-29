import { View, Text } from "react-native";
import React from "react";
import DoctorBottomTab from "../ReusableComponent/DoctorBottomTab";
import Header from "../ReusableComponent/Header";
const Community = () => {
  return (
    <View>
      <Header title={undefined} />
      <View>
        <Text>Community</Text>
      </View>
      <DoctorBottomTab />
    </View>
  );
};

export default Community;
