import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, Pressable, Dimensions } from "react-native";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

const Head = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [modalVisible, setModalVisible] = useState(false);

  const navigateToBack = () => {
    navigation.navigate("ChatBoxConsultationBodyImagemapping");
  };
  const navigateToConsultation = (bodyPart: String) => {
    navigation.navigate("Consultation", { selectedBodyPart: bodyPart });
  };


  const navigateTo = (screen: React.SetStateAction<string>) => {
    setActiveTab(screen);
    navigation.navigate(screen);
  };
  const [selectedPart, setSelectedPart] = useState(null);

  const consultationOptions = [
    { shortName: "General", fullName: "General Medicine", image: require("../assets/Consultation/medicine.png") },
    { shortName: "Mental", fullName: "Mental Health", image: require("../assets/Consultation/alzeimer.png") },
    { shortName: "Fertility", fullName: "Fertility Counseling", image: require("../assets/Consultation/pregnancy-virus.png")},
    { shortName: "STD's", fullName: "STD's", image: require("../assets/Consultation/sex-problem.png") },
    { shortName: "Pediatric", fullName: "Pediatric Medicine", image: require("../assets/Consultation/pediatric-surgery.png")},
    { shortName: "Gynecology", fullName: "Gynecology", image: require("../assets/Consultation/Gynecology.png") },
    { shortName: "Chronic", fullName: "Chronic illness", image: require("../assets/Consultation/awareness.png")},
    { shortName: "Intestine", fullName: "Intestine Medicine", image: require("../assets/Consultation/intestine.png") },
  ];

  const consultationData = [
    { title: "General Medicine", image: require("../assets/Consultation/medicine.png") },
    { title: "Mental Health", image: require("../assets/Consultation/alzeimer.png") },
    { title: "Fertility Counseling", image: require("../assets/Consultation/pregnancy-virus.png") },
    { title: "STD's", image: require("../assets/Consultation/sex-problem.png") },
    { title: "Pediatric Medecine", image: require("../assets/Consultation/pediatric-surgery.png") },
    { title: "Gynecology", image: require("../assets/Consultation/Gynecology.png") },
    { title: "Chronic illness", image: require("../assets/Consultation/awareness.png") },
    { title: "Intestine Medicine", image: require("../assets/Consultation/intestine.png") },
  ];
 
  const handleOptionSelected = (option: { shortName: string, fullName: string, image: any }) => {
    navigation.navigate("Consultation", {
      selectedConsultation: {
        title: option.fullName,
        image: option.image
      }
    });
  };

  const navigateToConsultationed = (selection: { bodyPart?: string, consultationItem?: ConsultationItem }) => {
    navigation.navigate("Consultation", { 
      selectedBodyPart: selection.bodyPart,
      selectedConsultation: selection.consultationItem 
    });
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.DeseasesContainer}>
            {consultationOptions.map((option, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.optionButton}
                onPress={() => handleOptionSelected(option)}
              >
                <Text style={styles.optionText}>{option.shortName}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <TouchableOpacity
            style={styles.viewAllContainer}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.viewAllContainerText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={navigateToBack} style={styles.backButton}>
            <AntDesign name="arrowleft" style={styles.backButtonText} />
            <Text style={styles.headerIllness}>Head illness</Text>
          </TouchableOpacity>
          <View style={styles.headerContainer}>
          <View>
            <Image source={require("../assets/head.png")}/>
          </View>
          <View style={styles.detailOptionContainer}>
            <TouchableOpacity onPress={() => navigateToConsultation('eye')} style={styles.detailOption}>
              <View>
                <Image source={require("../assets/eye.png")} style={styles.DeseasesImage} />
              </View>
              <Text style={styles.detailOptionText}>Eyes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToConsultation('mouth')} style={styles.detailOption}>
              <View>
                <Image source={require("../assets/Mouth.png")} style={styles.DeseasesImage} />
              </View>
              <Text style={styles.detailOptionText}>Mouth</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToConsultation('teeth')} style={styles.detailOption}>
              <View>
                <Image source={require("../assets/teeth.png")} style={styles.DeseasesImage} />
              </View>
              <Text style={styles.detailOptionText}>Teeth</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToConsultation('tongue')} style={styles.detailOption}>
              <View>
                <Image source={require("../assets/tongue.png")} style={styles.DeseasesImage}/>
              </View>
              <Text style={styles.detailOptionText}>Tongue</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToConsultation('ear')} style={styles.detailOption}>
              <View>
                <Image source={require("../assets/ear.png")}  style={styles.DeseasesImage}/>
              </View>
              <Text style={styles.detailOptionText}>Ears</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToConsultation('nose')} style={styles.detailOption}>
              <View>
                <Image source={require("../assets/nose.png")}  style={styles.DeseasesImage}/>
              </View>
              <Text style={styles.detailOptionText}>Nose</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToConsultation('facial')} style={styles.detailOption}>
              <View >
                <Image source={require("../assets/facial.png")}  style={styles.DeseasesImage}/>
              </View>
              <Text style={styles.detailOptionText}>Facial skincare</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToConsultation('head')} style={styles.detailOption}>
              <View>
                <Image source={require("../assets/relatedHead.png")} style={styles.DeseasesImage}/>
              </View>
              <Text style={styles.detailOptionText}>Head Related</Text>
            </TouchableOpacity>
          </View>
        </View>
          <TouchableOpacity style={styles.DescribeIlliness}>
            <Text style={styles.DescribeIllinessText}>Describe illness </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomTabContainer}>
        <TouchableOpacity style={[styles.tabItem, activeTab === 'Home' && styles.activeTab]} onPress={() => navigateTo('ChatBoxConsultationBodyImagemapping')}>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>

            <ScrollView>
              <View style={styles.gridContainer}>
                {consultationData.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.gridItem}
                    onPress={() => {
                      navigateToConsultationed({ consultationItem: item });
                      setModalVisible(false);
                    }}
                  >
                    <View style={styles.imageLogo}>
                      <Image source={item.image} style={styles.image} />
                    </View>
                    <Text style={styles.title}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    alignItems:"center"

  },
  detailOptionText: {
    color:"black",
    fontSize:14,
    fontWeight:'regular'
  },
  DeseasesContainer: {
    flexDirection: 'row',
    marginTop: 10,
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
    marginBottom: -30,
  },
  addressConsultation: {
    marginBottom: 5,
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

//additional
// DeseasesContainer: {
//   flexDirection: 'row',
//   marginTop: 10,
// },
optionButton: {
  paddingHorizontal: 15,
  paddingVertical: 8,
  marginRight: 10,
  backgroundColor: '#f0f0f0',
  borderRadius: 20,
},
optionText: {
  fontSize: 14,
  color: '#333',
},
viewAllContainer: {
  alignItems: "flex-end",
},
viewAllContainerText: {
  paddingBottom: 10,
  fontSize: 13,
  fontWeight: "bold",
  marginTop: 2,
},

// Added: Styles for the modal
modalContainer: {
  flex: 1,
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  justifyContent: "center",
},
modalView: {
  width: "70%",
  height: height * 0.52,
  backgroundColor: "#D9D9D9",
  padding: 5,
  paddingTop: 5,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  borderRadius: 10,
  position: "absolute",
  right: 10,
},
buttonClose: {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  marginBottom: 15,
  marginTop: 5,
  padding: 10,
  paddingBottom: 0,
  paddingTop: 0,
},
textStyle: {
  fontWeight: "bold",
  color: "black",
  fontSize: 20,
},
gridContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  top: -10,
},
gridItem: {
  width: "30%",
  alignItems: "center",
  marginVertical: 10,
  gap: 5,
  marginRight: 5,
},
imageLogo: {
  width: 60,
  height: 60,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  borderRadius: 50,
  borderWidth: 1,
  borderColor: "#0C7751",
},
image: {
  width: 40,
  height: 40,
  resizeMode: "contain",
},
title: {
  marginTop: 8,
  fontSize: 10,
  textAlign: "center",
  fontWeight: "bold",
  color: "#000000",
},

});

export default Head;
