import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const MainBodyMapPage = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const [activeTab, setActiveTab] = useState('Home');

  const router = useRouter();

  const handleViewAllClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOptionSelect = (option) => {
    setSelectedPart(option);
    switch (option) {
      case 'Head':
        router.push('./Head');
        break;
      case 'NeckChest':   
        router.push('./NeckChest');
        break;
      case 'Trunk':
        router.push('./TrunkPage');
        break;
      case 'ReproductiveOrgan':
        router.push('./ReproductiveOrgan');
        break;  
      case 'LeftArm':
        router.push('./LeftArmPage');
        break;
      case 'RightArm':
        router.push('./RightArmPage');
        break;
      case 'LeftLeg':
        router.push('./LeftLegPage');
        break;
      case 'RightLeg':
        router.push('./RightLegPage');
        break;
      default:
        break;
    }
  };

  const navigateTo = (screen) => {
    setActiveTab(screen);
    router.push(`./${screen}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
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
          <View style={styles.consultContaiiner}>
            <View style={styles.consultionContainer}>
              <View style={styles.consultionContainerText}>
                <Text style={styles.consultTitle}>Consult with Be Okay</Text>
                <Text style={styles.howareyou}>
                  How are you doing? If there is any help you need, please let Be-Okay know.
                </Text>
              </View>
              <View style={styles.closeIconContainer}>
                <Ionicons name="close-circle" style={styles.closeCircle} />
              </View>
            </View>
          </View>

          <View style={styles.AddressConsultationContainer}>
            <Text style={styles.AdressyourConsultation}>
              Address your Consultation
            </Text>
            <View style={styles.ConsultationContainer}>
              <TouchableOpacity style={styles.adressCategory} onPress={() => handleOptionSelect('Unknown')}>
                <Text style={[styles.adressCategoryText, selectedPart === 'Unknown' && styles.selectedCategoryText]}>Unknown</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.adressCategory} onPress={() => handleOptionSelect('Respiratory')}>
                <Text style={[styles.adressCategoryText, selectedPart === 'Respiratory' && styles.selectedCategoryText]}>Respiratory</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.adressCategory} onPress={() => handleOptionSelect('Head')}>
                <Text style={[styles.adressCategoryText, selectedPart === 'Head' && styles.selectedCategoryText]}>Head</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.adressCategory} onPress={() => handleOptionSelect('Trunk')}>
                <Text style={[styles.adressCategoryText, selectedPart === 'Trunk' && styles.selectedCategoryText]}>Trunk</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.adressCategory} onPress={() => handleOptionSelect('LeftLeg')}>
                <Text style={[styles.adressCategoryText, selectedPart === 'LeftLeg' && styles.selectedCategoryText]}>Left Leg</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.adressCategory} onPress={() => handleOptionSelect('RightLeg')}>
                <Text style={[styles.adressCategoryText, selectedPart === 'RightLeg' && styles.selectedCategoryText]}>Right Leg</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.viewAllContainer} onPress={handleViewAllClick}>
              <Text style={styles.viewAllContainerText}>View All</Text>
            </TouchableOpacity>

            {dropdownVisible && (
              <View style={styles.dropdown}>
                <TouchableOpacity onPress={() => handleOptionSelect('Chest')}>
                  <Text style={styles.dropdownItem}>Chest</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionSelect('Abdomen')}>
                  <Text style={styles.dropdownItem}>Abdomen</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionSelect('Back')}>
                  <Text style={styles.dropdownItem}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionSelect('LeftArm')}>
                  <Text style={styles.dropdownItem}>Left Arm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionSelect('RightArm')}>
                  <Text style={styles.dropdownItem}>Right Arm</Text>
                </TouchableOpacity>
              </View>
            )}

          </View>
          <View>
            <Text style={styles.questionText}>Where do you feel the pain?</Text>
            <View style={styles.bodyMapContainer}>
              <Image source={require("../assets/body2.png")} style={styles.bodyMapImage} />
              <TouchableOpacity style={styles.headTouchArea} onPress={() => handleOptionSelect('Head')} />
              <TouchableOpacity style={styles.NeckChestImageArea} onPress={() => handleOptionSelect('NeckChest')} />

              {/* ReproductiveOrgan */}
              <TouchableOpacity style={styles.trunkTouchArea} onPress={() => handleOptionSelect('Trunk')} />
              <TouchableOpacity style={styles.ReproductiveOrganArea} onPress={() => handleOptionSelect('ReproductiveOrgan')} />

              <TouchableOpacity style={styles.leftArmTouchArea} onPress={() => handleOptionSelect('LeftArm')} />
              <TouchableOpacity style={styles.rightArmTouchArea} onPress={() => handleOptionSelect('RightArm')} />
              <TouchableOpacity style={styles.leftLegTouchArea} onPress={() => handleOptionSelect('LeftLeg')} />
              <TouchableOpacity style={styles.rightLegTouchArea} onPress={() => handleOptionSelect('RightLeg')} />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomTabContainer}>
        <TouchableOpacity style={[styles.tabItem, activeTab === 'Home' && styles.activeTab]} onPress={() => navigateTo('PatientsDashbord')}>
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
  consultionContainer: {
    backgroundColor: "#FFF6C5",
    width: "100%",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
  },
  consultionContainerText: {
    padding: 20,
    width: "80%",
  },
  consultTitle: {
    fontSize: 18,
    color: "#809502",
    fontWeight: "bold",
    marginBottom: 5,
  },
  howareyou: {
    color: "#809502",
    fontWeight: "regular",
    fontSize: 14,
  },
  consultContaiiner: {
    padding: 20,
    paddingBottom: 10,
    marginBottom: 10,
  },
  closeCircle: {
    color: "#93BD68",
    fontSize: 25,
  },
  closeIconContainer: {
    position: "relative",
    height: 30,
    top: 10,
    left: 40,
  },
  AddressConsultationContainer: {
    backgroundColor: "#FEFAFA",
    padding: 20,
    paddingTop: 0,
  },
  ConsultationContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    marginTop: 5,
  },
  AdressyourConsultation: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "regular",
  },
  adressCategory: {
    padding: 2,
    paddingRight: 0,
  },
  adressCategoryText: {
    color: "#5C5C5C",
    fontSize: 12,
    fontWeight: "regular",
  },
  viewAllContainer: {
    alignItems: "flex-end",
  },
  viewAllContainerText: {
    fontSize: 10,
    fontWeight: "regular",
    marginTop: 2,
  },
  dropdown: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    marginTop: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 14,
    color: "#333",
  },
  questionText: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },
  bodyMapContainer: {
    position: "relative",
    alignItems: "center",
  },
  bodyMapImage: {
    width: 131,
    height: 313.56,
    resizeMode: "contain",
  },
  headTouchArea: {
    position: "absolute",
    top: 2,
    width: 40,
    height: 44,
    cursor:'pointer'

  },
  NeckChestImageArea:{
    position: "absolute",
    top: 46,
    width: 48,
    height: 47,
    cursor:'pointer'

  },
  trunkTouchArea: {
    position: "absolute",
    top: 96,
    width: 50,
    height: 60,
  },
  ReproductiveOrganArea:{
    position: "absolute",
    top: 157,
    width: 15,
    height: 18,
    cursor:'pointer'
  },
  leftArmTouchArea: {
    position: "absolute",
    top: 60,
    left: 145,
    width: 30,
    height: 127,
    transform: [{ rotate: '8deg' }],
    opacity:0,
    cursor:'pointer'


  },
  rightArmTouchArea: {
    position: "absolute",
    top: 60,
    right: 145,
    width: 30,
    height: 127,
    transform: [{ rotate: '-8deg' }],
    cursor:'pointer'

  },
  leftLegTouchArea: {
    position: "absolute",
    top:160,
    left: 173,
    width: 28,
    height: 150,
    opacity:0,
    cursor:'pointer'

  },
  rightLegTouchArea: {
    position: "absolute",
    top: 160,
    right: 173,
    width: 28,
    height: 150,
    opacity:0,
    cursor:'pointer'


  },
  selectedCategoryText: {
    fontWeight: "bold",
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

export default MainBodyMapPage;
