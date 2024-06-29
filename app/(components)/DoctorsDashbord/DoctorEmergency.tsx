import { View, Text } from "react-native";
import React from "react";
import DoctorBottomTab from "../ReusableComponent/DoctorBottomTab";
import Header from "../ReusableComponent/Header";
const DoctorEmergency = () => {
  return (
    <View>
      <Header title={undefined} />
      <View>
        <Text>DoctorEmergency</Text>
      </View>
      <DoctorBottomTab />
    </View>
  );
};

export default DoctorEmergency;
