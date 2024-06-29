import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";

const ReproductiveOrgan = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Home');

  const navigateToBack = () => {
    router.push("./ChatBoxConsultationBodyImagemapping");
  };

  const navigateTo = (screen) => {
    setActiveTab(screen);
    router.push(`./${screen}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View>
            <Image source={require("../assets/profileImage.png")} style={styles.profileImage} />
            <View style={styles.activeIcon} />
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>NGOGA Innocent</Text>
            <Text style={styles.secondName}>Patrick</Text>
          </View>
          <View style={styles.headerIcons}>
            <Ionicons name="chatbubble-ellipses-outline" size={30} color="white" />
            <Ionicons name="notifications-sharp" size={30} color="white" />
          </View>
        </View>

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
              <Image source={require("../assets/ReproductiveOrgan.png")} />
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

      <View style={styles.bottomTabContainer}>
        <TouchableOpacity style={[styles.tabItem, activeTab === 'Home' && styles.activeTab]} onPress={() => navigateTo('Home')}>
          <MaterialIcons name="home" size={24} color={activeTab === 'Home' ? "#93BD68" : "#222"} />
          <Text style={[styles.tabText, activeTab === 'Home' && styles.activeTabText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, activeTab === 'Consultation' && styles.activeTab]} onPress={() => navigateTo('Consultation')}>
          <MaterialIcons name="chat" size={24} color={activeTab === 'Consultation' ? "#93BD68" : "#222"} />
          <Text style={[styles.tabText, activeTab === 'Consultation' && styles.activeTabText]}>Consultation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, activeTab === 'Checkup' && styles.activeTab]} onPress={() => navigateTo('Checkup')}>
          <MaterialIcons name="event" size={24} color={activeTab === 'Checkup' ? "#93BD68" : "#222"} />
          <Text style={[styles.tabText, activeTab === 'Checkup' && styles.activeTabText]}>Checkup</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, activeTab === 'Emergency' && styles.activeTab]} onPress={() => navigateTo('Emergency')}>
          <MaterialIcons name="warning" size={24} color={activeTab === 'Emergency' ? "#93BD68" : "#222"} />
          <Text style={[styles.tabText, activeTab === 'Emergency' && styles.activeTabText]}>Emergency</Text>
        </TouchableOpacity>
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

export default ReproductiveOrgan;
