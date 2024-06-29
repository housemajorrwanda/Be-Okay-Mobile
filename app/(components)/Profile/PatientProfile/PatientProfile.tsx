import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useState } from "react";
import Header1 from "../../ReusableComponent/Header1";
import BottomTabs1 from "../../ReusableComponent/BottomTabs1";
const PatientProfile = () => {

  const [activeSection, setActiveSection] = useState("personal");
  const patientData = [
    {
      title: "Blood Group",
      image: require("../../assets/BloodGroup.png"),
      group: "A",
      backgroundColor: "#F6E1E1",
    },
    {
      title: "Lab Test",
      image: require("../../assets/blood-test 2.png"),
      group: "Mammogram",
      backgroundColor: "#67C3AC",
    },
    {
      title: "Illness",
      image: require("../../assets/virus-in-dna.png"),
      group: "Breast",
      backgroundColor: "#AED9F1",
    },
    {
      title: "Treatment Group",
      image: require("../../assets/medicine.png"),
      group: "Paracetamol",
      backgroundColor: "#97C496",
    },
  ];

  const patientService = [
    {
      times: "2",
      image: require("../../assets/Stomach1.png"),
      desease: "Ulcers",
      backgroundColor: "#67C3AC",
    },
    {
      times: "12",
      image: require("../../assets/Cough-cold.png"),
      desease: "Flu",
      backgroundColor: "#F6E1E1",
    },
    {
      times: "10",
      image: require("../../assets/Eye.png"),
      desease: "Myopia",
      backgroundColor: "#97C496",
    },
    {
      times: "15",
      image: require("../../assets/Teeth.png"),
      desease: "Teeth",
      backgroundColor: "#97C496",
    },
  ];
  return (
    <View style={styles.container}>

       <Header1/>
      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
      >
        <View style={styles.infoButtons}>
          <TouchableOpacity
            style={
              activeSection === "personal"
                ? styles.infoButtonActive
                : styles.infoButton
            }
            onPress={() => setActiveSection("personal")}
          >
            <Text
              style={
                activeSection === "personal"
                  ? styles.infoButtonTextActive
                  : styles.infoButtonText
              }
            >
              Personal Info
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              activeSection === "health"
                ? styles.infoButtonActive
                : styles.infoButton
            }
            onPress={() => setActiveSection("health")}
          >
            <Text
              style={
                activeSection === "health"
                  ? styles.infoButtonTextActive
                  : styles.infoButtonText
              }
            >
              Health Info
            </Text>
          </TouchableOpacity>
        </View>
        {/* Profile Information */}
        {activeSection === "personal" && (
          <View style={styles.profileInfo}>
            <View style={styles.informationStatus}>
              <View>
                <Text style={styles.infoLabel}>Name</Text>
                <Text style={styles.infoValue}>NGOGA Innocent Patrick</Text>
              </View>
              <View style={styles.infoDetails}>
                <View>
                  <Text style={styles.infoLabel}>Gender</Text>
                  <Text style={styles.infoValue}>Male</Text>
                  <Text style={styles.infoLabel}>Location</Text>
                  <Text style={styles.infoValue}>Nyarugenge</Text>
                </View>
                <View>
                  <Text style={styles.infoLabel}>Date of Birth</Text>
                  <Text style={styles.infoValue}>12 June 2001</Text>
                  <Text style={styles.infoLabel}>Contact</Text>
                  <Text style={styles.infoValue}>+250788258922</Text>
                </View>

                <View>
                  <Text style={styles.infoLabel}>Marital Status</Text>
                  <Text style={styles.infoValue}>Married</Text>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>
                    gasigwa.issa123@gmail.com
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.FamilyInformation}>
              {/* Family & Dependents Info */}
              <View style={styles.familyInfo}>

                {[
                  {
                    name: "UMURERWA Magnifique",
                    relationship: "Daughter",
                    gender: "Female",
                    age: 27,
                    condition: "Asthma",
                    image: require("../../assets/profileImage.png"),
                  },
                  {
                    name: "NGOGA Innocent Patrick",
                    relationship: "Spouse",
                    gender: "Male",
                    age: 27,
                    condition: "unavailable Data",
                    image: require("../../assets/profileImage.png"),
                  },
                  {
                    name: "NGOGA Innocent Patrick",
                    relationship: "Brother",
                    gender: "Male",
                    age: 27,
                    condition: "Asthma",
                    image: require("../../assets/profileImage.png"),
                  },
                ].map((member, index) => (
                  <View key={index} style={styles.familyContainer}>
                    <View style={styles.familyMember}>
                      <Image
                        source={member.image}
                        style={styles.familyMemberImage}
                      />
                      <View style={styles.familyMemberDetails}>
                        <View>
                          <Text style={styles.familyMemberName}>
                            {member.name}
                          </Text>
                          <Text style={styles.familyMemberInfo}>
                            Relationship: {member.relationship}
                          </Text>
                          <Text style={styles.familyMemberInfo}>
                            Medical Condition: {member.condition}
                          </Text>
                        </View>
                        <View style={styles.viewInforLast}>
                          <Text style={styles.familyMemberInfo}>
                            Age: {member.age}
                          </Text>
                          <Text style={styles.familyMemberInfo}>
                            Gender: {member.gender}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {activeSection === "health" && (
          <View>
            <Text style={styles.subtitle}>Overview</Text>
            <View style={styles.patientsResultContainer}>
              {patientData.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.resultContainer,
                    { backgroundColor: item.backgroundColor },
                  ]}
                >
                  <Text style={styles.resultTitle}>{item.title}</Text>
                  <View style={styles.BloodGroup}>
                    <Image source={item.image} style={styles.diseasesImage} />
                    <View style={styles.GroupContainer}>
                      <Text style={styles.Group}>{item.group}</Text>
                    </View>
                    
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#FFFFFF",
                      marginBottom: 5,
                    }}
                  />
                </View>
              ))}
            </View>
            <View>
              <View>
                <View>
                  <Text style={styles.subtitle}>
                    Disease tracking (Pathology)
                  </Text>
                </View>
                <View style={styles.patientDataContainer}>
                  {patientService.map((item, index) => (
                    <View
                      key={index}
                      style={[styles.patientDataResultContainer]}
                    >
                      <Text style={styles.resulttimes}>{item.times}</Text>
                      <View style={styles.PatientDataGroup}>
                        <Image
                          source={item.image}
                          style={styles.patientDataImage}
                        />
                        <View style={styles.patientDataPrice}>
                          <Text style={styles.Price}>{item.desease}</Text>
                        </View>
                      </View>
                      <View />
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.DeseasesInformation}>
                {/* Family & Dependents Info */}
                <View style={styles.familyInfo}>
                  <Text style={styles.familyInfoHeader}>
                    Family & Dependents Info
                  </Text>
                  {[
                    {
                      name: "UMURERWA Magnifique",
                      relationship: "Daughter",
                      gender: "Female",
                      age: 27,
                      condition: "Asthma",
                      image: require("../../assets/Patientimage.png"),
                    },
                    {
                      name: "NGOGA Innocent Patrick",
                      relationship: "Spouse",
                      gender: "Male",
                      age: 27,
                      condition: "unavailable Data",
                      image: require("../../assets/Patientimage.png"),
                    },
                    {
                      name: "NGOGA Innocent Patrick",
                      relationship: "Brother",
                      gender: "Male",
                      age: 27,
                      condition: "Asthma",
                      image: require("../../assets/Patientimage.png"),
                    },
                  ].map((member, index) => (
                    <View key={index} style={styles.familyContainer}>
                      <View style={styles.familyMember}>
                        <Image
                          source={member.image}
                          style={styles.familyMemberImage}
                        />
                        <View style={styles.familyMemberDetails}>
                          <View>
                            <Text style={styles.familyMemberName}>
                              {member.name}
                            </Text>
                            <Text style={styles.familyMemberInfo}>
                              Relationship: {member.relationship}
                            </Text>
                            <Text style={styles.familyMemberInfo}>
                              Mutual Disease: {member.condition}
                            </Text>
                          </View>
                          <View style={styles.viewInforLast}>
                            <Text style={styles.familyMemberInfo}>
                              Age: {member.age}
                            </Text>
                            <Text style={styles.familyMemberInfo}>
                              Gender: {member.gender}
                            </Text>
                            <TouchableOpacity style={styles.checkup}>
                              <Text style={styles.checkText}>Checkup</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
     <BottomTabs1 activeTab="Home"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#93BD68",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#93BD68",
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
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
  subtitle: {
    fontWeight: "bold",
    color: "black",
    fontSize: 14,
    marginLeft: 15,
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
  scrollView: {
    marginTop: 115,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 20,
    width: "100%",
  },
  checkup: {
    backgroundColor: "#8BB85C",
    width: 65,
    borderRadius: 8,
    height: 20,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  checkText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
  },
  patientDataContainer: {
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 13,
    paddingTop: 13,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
  },
  Price: {
    color: "#263238",
    fontSize: 10,
    fontWeight: "semibold",
  },
  patientDataResultContainer: {
    position: "relative",
    height: 80,
    width: 80,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#97C496",
    backgroundColor: "white",
  },
  patientDataImage: {
    width: 30,
    height: 30,
  },
  patientDataPrice: {
    position: "relative",
    top: 5,
    fontSize: 10,
    fontWeight: "semibold",
    color: "black",
  },
  PatientDataGroup: {
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    paddingTop: 7,
    paddingBottom: 8,
    marginBottom: 3,
  },

  informationStatus: {
    padding: 10,
  },
  logoutNotificationContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  logout: {
    position: "relative",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    bottom: 7,
    width: 66,
    height: 27,
    borderRadius: 10,
  },
  LogoutText: {
    fontSize: 16,
    color: "#8BB85C",
    fontWeight: "bold",
  },

  scrollContainer: {
    paddingBottom: 60,
  },
  profileInfo: {
    backgroundColor: "#FFF",
    borderRadius: 8,
  },
  infoButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
  },
  infoButton: {
    borderRadius: 10,
    backgroundColor: "#8BB85C",
    width: 170,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  infoButtonActive: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#8BB85C",
    width: 170,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  infoButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  infoButtonTextActive: {
    color: "#8BB85C",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  infoDetails: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoLabel: {
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 16,
  },
  ProfileName: {
    fontSize: 16,
    marginTop: 10,
    color: "white",
  },
  infoValue: {
    fontSize: 12,
    marginTop: 10,
  },
  familyInfo: {
    // backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 8,
    paddingRight: 0,
    paddingLeft: 0,
  },
  familyInfoHeader: {
    marginBottom: 10,
    fontSize: 16,
    color: "#8BB85C",
    fontWeight: "medium",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  familyMember: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
    borderWidth: 1,
    borderTopColor: "black",
    borderRightColor: "white",
    borderLeftColor: "white",
    borderBottomColor: "white",
    paddingTop: 2,
  },
  familyMemberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  familyMemberDetails: {
    display: "flex",
    flexDirection: "row",
    width: "75%",
    justifyContent: "space-between",
  },
  familyMemberName: {
    fontWeight: "bold",
    marginBottom: 7,
  },
  familyMemberInfo: {
    color: "black",
    marginBottom: 10,
    fontSize: 11,
  },

  viewInforLast: {
    alignItems: "flex-end",
  },
  bottomTabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabButton: {
    alignItems: "center",
  },
  tabButtonText: {
    fontSize: 12,
    color: "#4F4F4F",
  },
  familyContainer: {
    width: "100%",
    paddingTop: 10,
    padding: 10,
    borderColor: "#8BB85C",
  },
  FamilyInformation: {
    width: "100%",
    padding: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 1,
    borderColor: "#8BB85C",
  },
  DeseasesInformation: {
    width: "100%",
    padding: 10,
  },
  patientsResultContainer: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    paddingBottom: 13,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
  },
  resultContainer: {
    position: "relative",
    height: 80,
    width: 80,
    borderRadius: 12,
    borderColor: "#cccc",
    marginBottom: 3,
    backgroundColor: "black",
  },
  resultTitle: {
    backgroundColor: "#747474",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    color: "white",
    fontSize: 10,
    fontWeight: "medium",
    textAlign: "center",
    paddingTop: 2,
    paddingBottom: 2,
  },
  resulttimes: {
    display: "flex",
    justifyContent: "center",
    fontSize: 10,
    color: "white",
    backgroundColor: "#67C3AC",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 16,
    height: 16,
    position: "relative",
    left: 58,
    top: 4,
    paddingTop: 1,
    paddingRight: 1,
    paddingLeft: 1,
  },
  BloodGroup: {
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    paddingTop: 7,
    paddingBottom: 8,
    marginBottom: 3,
  },
  GroupContainer: {
    position: "absolute",
    width: "100%",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    textAlign: "center",
    alignItems: "center",
    top: 49,
  },
  Group: {
    color: "#263238",
    fontSize: 10,
    fontWeight: "semibold",
  },
  diseasesImage: {
    height: 28,
    width: 32,
  },
  imageIcon:{
    width:30,
    height:20,

  }
});

export default PatientProfile;
