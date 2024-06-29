import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Consultation = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Consultation");
  const [description, setDescription] = useState("");

  const navigateToBack = () => {
    router.push("./ChatBoxConsultationBodyImagemapping");
  };

  const navigateTo = (screen) => {
    setActiveTab(screen);
    router.push(`./${screen}`);
  };


  const navigateToPreConsultationAI = async () => {
    try {
      const selectedOption = await AsyncStorage.getItem('selectedOption');
      if (selectedOption === 'checkup') {
        router.push("./consultationWithAI");
      } else if (selectedOption === 'consultation') {
        router.push("./consultationWithDoctor");
      } else if (selectedOption === 'homecare') {
        router.push("./consultationWithHomecareForm");
      } else {
        Alert.alert("Error", "No option selected in AsyncStorage");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to retrieve data");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View style={styles.checkProfileConatiner}>
            <Image
              source={require("../assets/checkProfile.png")}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.ImageBeokay}>
            <Image
              source={require("../assets/Be-Okay_logo.png")}
              style={styles.BeokayLog}
            />
            <Text style={styles.profileName}>Be-Okay</Text>
          </View>

          <View style={styles.NotificationContainer}>
            <Image
              source={require("../assets/Notification.png")}
              style={styles.Notification}
            />
          </View>
        </View>
        <View style={styles.ContentContainer}>
          <TouchableOpacity onPress={navigateToBack} style={styles.backButton}>
            <AntDesign name="arrowleft" style={styles.backButtonText} />
            <Text style={styles.headerIllness}>Consult with Be Okay</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.wetakecare}>
              We take care of your health as is variable to you!
            </Text>
          </View>

          <View style={styles.SupDeseasesContainer}>
            <Text style={styles.addressConsultation}>
              Address your Consultation{" "}
            </Text>
            <View style={styles.DeseasesContainer}>
              <View style={styles.subDeseasesContainer}>
                <TouchableOpacity>
                  <Text>Unknown</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>Respiratory</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>Med. Interne</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View>
            <Text>Please select</Text>
            <View style={styles.LungContainer}>
              <View>
                <Image source={require("../assets/Lung.png")} />
              </View>
              <View>
                <Text style={styles.Lungs}>Lungs</Text>
              </View>
            </View>
            <View>
              <Text>Describe your illness</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Enter description"
                placeholderTextColor="#666"
                numberOfLines={4}
                multiline={true}
                onChangeText={setDescription}
                value={description}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.nextButton} onPress={navigateToPreConsultationAI}>
            <Text style={styles.textButton}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomTabContainer}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === "Home" && styles.activeTab]}
          onPress={() => navigateTo("ChatBoxConsultationBodyImagemapping")}
        >
          <MaterialIcons
            name="home"
            size={24}
            color={activeTab === "Home" ? "#93BD68" : "#222"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "Home" && styles.activeTabText,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === "Consultation" && styles.activeTab,
          ]}
          onPress={() => navigateTo("Consultation")}
        >
          <MaterialIcons
            name="chat"
            size={24}
            color={activeTab === "Consultation" ? "#93BD68" : "#222"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "Consultation" && styles.activeTabText,
            ]}
          >
            Consultation
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === "Checkup" && styles.activeTab]}
          onPress={() => navigateTo("Checkup")}
        >
          <MaterialIcons
            name="event"
            size={24}
            color={activeTab === "Checkup" ? "#93BD68" : "#222"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "Checkup" && styles.activeTabText,
            ]}
          >
            Checkup
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === "Emergency" && styles.activeTab,
          ]}
          onPress={() => navigateTo("Emergency")}
        >
          <MaterialIcons
            name="warning"
            size={24}
            color={activeTab === "Emergency" ? "#93BD68" : "#222"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "Emergency" && styles.activeTabText,
            ]}
          >
            Emergency
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Consultation;

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
    padding: 15,
    paddingBottom: 20,
    paddingTop: 20,
  },
  profileImage: {
    width: 25,
    height: 25,
    objectFit: "contain",
  },
  checkProfileConatiner: {
    backgroundColor: "#B2C3FF",
    width: 40,
    height: 40,
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  profileDetails: {
    display: "flex",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    color: "#FFFDFD",
    fontSize: 14,
    fontWeight: "regular",
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
    alignItems: "center",
    gap: 2,
    marginBottom: 20,
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
    marginTop: 25,
    marginBottom: 50,
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
    backgroundColor: "#e0f7e4",
  },
  activeTabText: {
    color: "#93BD68",
  },
  Notification: {
    color: "white",
    backgroundColor: "white",
  },
  NotificationContainer: {
    width: 36,
    height: 36,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  BeokayLog: {
    width: 40,
    height: 33,
  },
  ImageBeokay: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 2,
  },
  wetakecare: {
    width: "50%",
    color: "#7E7E7E",
    fontWeight: "regular",
    fontSize: 12,
    lineHeight: 15,
  },
  ContentContainer: {
    padding: 30,
  },
  LungContainer: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
    gap: 10,
  },
  Lungs: {
    fontSize: 18,
    fontWeight: "regular",
    marginBottom: 50,
  },
  textArea: {
    height: 100,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
    marginTop: 20,
  },
  nextButton: {
    width: "100%",
    backgroundColor: "#93BD68",
    padding: 10,
    borderRadius: 36,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    marginTop: 70,
  },
  textButton: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
