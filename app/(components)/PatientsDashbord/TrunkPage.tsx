import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {NavigationProps} from "../../(app)/types"
import { AntDesign } from "@expo/vector-icons";
import Header1 from "../ReusableComponent/Header1";
import BottomTabs1 from "../ReusableComponent/BottomTabs1";
const TrunkPage = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const navigation = useNavigation<NavigationProps>()

  const navigateToBack = () => {
    navigation.navigate("ChatBoxConsultationBodyImagemapping");
  };
;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Header1/>
        <View style={styles.SupDeseasesContainer}>
          <Text style={styles.addressConsultation}>Address your Consultation </Text>
          <View style={styles.DeseasesContainer}>
            <View style={styles.subDeseasesContainer}>
              <View>
                <Text>Unknown</Text>
              </View>
              <View>
                <Text>Respiratory</Text>
              </View>
              <View>
                <Text>Med. Interne</Text>
              </View>
              <View>
                <Text>Pediatry</Text>
              </View>
            </View>
            <View style={styles.ViewAll}>
              <Text>View All</Text>
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity onPress={navigateToBack} style={styles.backButton}>
            <AntDesign name="arrowleft" style={styles.backButtonText} />
            <Text style={styles.headerIllness}>Internal Medicine</Text>
          </TouchableOpacity>
          <View style={styles.headerContainer}>
            <View>
              <Image source={require("../assets/Abdomin.png")} />
            </View>
            <View>
              <TouchableOpacity style={styles.detailOption}>
                <View>
                  <Image source={require("../assets/Liver.jpg")} />
                </View>
                <Text style={styles.detailOptionText}>Liver</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.detailOption}>
                <View>
                  <Image source={require("../assets/Spleen.png")} />
                </View>
                <Text style={styles.detailOptionText}>Pancreas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.detailOption}>
                <View>
                  <Image source={require("../assets/Intestin.png")} />
                </View>
                <Text style={styles.detailOptionText}>Intestin</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.detailOption}>
                <View>
                  <Image source={require("../assets/Stomach.png")} />
                </View>
                <Text style={styles.detailOptionText}>Stomach</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.detailOption}>
                <View>
                  <Image source={require("../assets/Kidneys.png")} />
                </View>
                <Text style={styles.detailOptionText}>Kidney</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.Others}>
                <Text style={styles.othersText}>Others</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    paddingBottom: 60, // Space for the bottom tab bar
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
  Others: {
    backgroundColor: "#93BD68",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
    color: "white",
    width: 135,
  },
  othersText: {
    color: "white",
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


});

export default TrunkPage;
