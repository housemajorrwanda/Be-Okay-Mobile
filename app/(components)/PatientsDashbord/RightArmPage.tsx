import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Header1 from "../ReusableComponent/Header1";
import BottomTabs1 from "../ReusableComponent/BottomTabs1";
import { useNavigation } from "@react-navigation/native";
import {NavigationProps} from "../../(app)/types";
import ConsultationOptions from "./ConsultationOptions";


const RightArmPage = () => {
  const navigation = useNavigation<NavigationProps>()
  const [activeTab, setActiveTab] = useState('Home');
  const navigateToBack = () => {
    navigation.navigate("ChatBoxConsultationBodyImagemapping");
  };

  const navigateToConsultation = (bodyPart) => {
    navigation.navigate("Consultation", { selectedBodyPart: bodyPart });
  };

  const handleOptionSelected = (option) => {
    navigation.navigate("Consultation", {
      selectedConsultation: {
        title: option.fullName,
        image: option.image
      }
    });
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Header1/>
          <ConsultationOptions onOptionSelected={handleOptionSelected} />
        <View>
          <TouchableOpacity onPress={navigateToBack} style={styles.backButton}>
            <AntDesign name="arrowleft" style={styles.backButtonText} />
            <Text style={styles.headerIllness}>Arm illness</Text>
          </TouchableOpacity>
          <View style={styles.headerContainer}>
            <View>
              <Image source={require("../assets/RightArm.png")}/>
            </View>
            <View style={styles.detailOptionContainer}>
              <TouchableOpacity onPress={() => navigateToConsultation('Right Injury')} style={styles.detailOption}>
                 <View style={styles.circleImage}>
                        <Image source={require("../assets/Injury-arm.png")} style={styles.organImage} />
                  </View>
                <Text style={styles.detailOptionText}>Injury</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigateToConsultation('Right elbow injury')} style={styles.detailOption}>
                  <View style={styles.circleImage}>
                        <Image source={require("../assets/elbow.png")} style={styles.organImage} />
                  </View>
                <Text style={styles.detailOptionText}>Elbow Injury</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigateToConsultation('Right Elbow Pain')} style={styles.detailOption}>
                  <View style={styles.circleImage}>
                          <Image source={require("../assets/elbow-pain.png")} style={styles.organImage} />
                  </View>
                <Text style={styles.detailOptionText}>Elbow Pain</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigateToConsultation('Right Skin Rashes')} style={styles.detailOption}>
                  <View style={styles.circleImage}>
                        <Image source={require("../assets/skinrashes.png")} style={styles.organImage} />
                  </View>
                <Text style={styles.detailOptionText}>Skin Rashes</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.DescribeIlliness}>
                <Text style={styles.DescribeIllinessText}>Describe illness </Text>
              </TouchableOpacity>
        </View>
      </ScrollView>

      <View>
      <BottomTabs1 activeTab="Home"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    paddingBottom: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#93BD68",
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 25,
  },
  profileDetails: {
    display: "flex",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    color: "#FFFDFD",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondName: {
    color: "#FFFDFD",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 80,
    position: "relative",
    top: 25,
  },
  activeIcon: {
    position: "absolute",
    bottom: 55,
    right: 0,
    width: 15,
    height: 15,
    borderRadius: 20,
    backgroundColor: "#18B415",
  },
  headerIllness: {
    fontSize: 16,
    fontWeight: "regular",
  },
  backButton: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    gap: 5,
  },
  backButtonText: {
    fontSize: 20,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  detailOption: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: 5,
    marginBottom: 10,
    alignItems: "center",
    
  },
  detailOptionText: {},
  DeseasesContainer: {
    display: "flex",
    flexDirection: "column",
  },
  subDeseasesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  ViewAll: {
    alignItems: "flex-end",
    marginTop: 5,
  },
  SupDeseasesContainer: {
    margin: 20,
    marginTop: 5,
  },
  addressConsultation: {
    marginBottom: 10,
    color: "black",
    fontWeight: "semibold",
  },
  DescribeIlliness: {
    backgroundColor: "#93BD68",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
    color: "white",
    width:'80%',
    margin:"10%"
  },
  DescribeIllinessText: {
    color: "white",
    fontSize:12,
    fontWeight:'regular'
  },
  bottomTabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  tabItem: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 12,
    color: "#222",
  },
  activeTab: {
    backgroundColor: '#e0f7e4',
  },
  activeTabText: {
    color: "#93BD68",
  },
  detailOptionContainer:{
    display:"flex",
    flexDirection:"column",
  
  },
  
 DeseasesImage:{
  width:36,
  height:36
},
organImage: {
  width: 30,
  height: 30,
  resizeMode: 'contain',
  alignItems: 'center',
},

circleImage: {
  width: 50,
  height: 50,
  borderRadius: 25,  
  borderColor: 'grey',
  borderWidth: 0.5,
  justifyContent: 'center',  
  alignItems: 'center',       
},

});

export default RightArmPage;
