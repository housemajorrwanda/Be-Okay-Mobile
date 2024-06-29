import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  Modal
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons, FontAwesome5, Ionicons, Entypo } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import DoctorBottomTab from "../ReusableComponent/DoctorBottomTab";
const Consultation = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Consultation");
  const [activeSection, setActiveSection] = useState("Request");
 const [showModel,setshowModel]=useState(false)
  const [bookedDates, setBookedDates] = useState({
    "2024-07-26": { marked: true, dotColor: "red" },
    "2024-07-27": { marked: true, dotColor: "blue" },
  });
  const navigateToDoctorSetScheduleAppointment = () => {
    router.push("./DoctorSetScheduleAppointment");
  };

  const navigateTo = (screen) => {
    setActiveTab(screen);
    router.push(`./${screen}`);
  };

  const navigateToDoctorEditProfile = () => {
    router.push("./DoctorEditProfile");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.checkProfileConatiner}>
          <Pressable onPress={navigateToDoctorEditProfile}>
            <Image
              source={require("../assets/DoctorImage.png")}
              style={styles.profileImage}
            />
          </Pressable>
        </View>
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>NGOGA Innocent</Text>
          <Text style={styles.secondName}>Patrick</Text>
          <Text style={styles.ProfileName}>Ophtalmologist</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 30,
              marginTop: 3,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Image source={require("../assets/yearicon.png")}></Image>
              <Text style={{ color: "white" }}>11 Years</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Text style={{ color: "white" }}>3.5</Text>
              <Image source={require("../assets/star.png")}></Image>
            </View>
          </View>
        </View>
        <View style={styles.logoutNotificationContainer}>
          <TouchableOpacity style={styles.logout}>
            <Text style={styles.LogoutText}>Logout</Text>
          </TouchableOpacity>
          <View style={styles.headerIcons}>
          <TouchableOpacity onPress={()=>{router.push("./DoctorChatsupport")}}>
          <Ionicons
              name="chatbubble-ellipses-outline"
              size={30}
              color="white"
            />
          </TouchableOpacity>

            <Ionicons name="notifications-sharp" size={30} color="white" />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.containerDoctor}>
          <View style={styles.line}></View>
          <View>
            <Text style={styles.UpcomingConsultation}>
              Upcoming Consultation
            </Text>
            <View style={styles.DoctorContainer}>
              <View style={styles.consultationContainer}>
                <Text style={styles.hourText}>12:00</Text>
                <View style={styles.consultationImage}>
                  <Image
                    source={require("../assets/DoctorImage.png")}
                    style={styles.consultatioImage}
                  />
                </View>
                <View style={styles.ngongainnocentConatiner}>
                  <Text style={styles.ngongainnocent}>
                    NGOGA Innocent Patrick
                  </Text>
                </View>
                <View style={styles.startbuttonConatiner}>
                  <Pressable
                    style={styles.startbutton}
                    onPress={navigateToDoctorSetScheduleAppointment}
                  >
                    <Text style={styles.starttext}>Start</Text>
                  </Pressable>
                </View>
              </View>
              <View style={styles.consultationContainer}>
                <Text style={styles.hourText}>12:00</Text>
                <View style={styles.consultationImage}>
                  <Image
                    source={require("../assets/Doctor1.png")}
                    style={styles.consultatioImage}
                  />
                </View>
                <View style={styles.ngongainnocentConatiner}>
                  <Text style={styles.ngongainnocent}>
                    NGOGA Innocent Patrick
                  </Text>
                </View>
                <View style={styles.startbuttonConatiner}>
                  <Pressable style={styles.startbutton}>
                    <Text style={styles.starttext}>Start</Text>
                  </Pressable>
                </View>
              </View>
              <View style={styles.consultationContainer}>
                <Text style={styles.hourText}>12:00</Text>
                <View style={styles.consultationImage}>
                  <Image
                    source={require("../assets/Doctor2.png")}
                    style={styles.consultatioImage}
                  />
                </View>
                <View style={styles.ngongainnocentConatiner}>
                  <Text style={styles.ngongainnocent}>
                    NGOGA Innocent Patrick
                  </Text>
                </View>
                <View style={styles.startbuttonConatiner}>
                  <Pressable style={styles.startbutton}>
                    <Text style={styles.starttext}>Start</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.viewIfo}>
            <View style={styles.infoButtons}>
              <TouchableOpacity
                style={
                  activeSection === "Request"
                    ? styles.infoButtonActive
                    : styles.infoButton
                }
                onPress={() => setActiveSection("Request")}
              >
                <Text
                  style={
                    activeSection === "Request"
                      ? styles.infoButtonTextActive
                      : styles.infoButtonText
                  }
                >
                  Requests
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  activeSection === "Calendar"
                    ? styles.infoButtonActive
                    : styles.infoButton
                }
                onPress={() => setActiveSection("Calendar")}
              >
                <Text
                  style={
                    activeSection === "Calendar"
                      ? styles.infoButtonTextActive
                      : styles.infoButtonText
                  }
                >
                  My Calendar
                </Text>
              </TouchableOpacity>
            </View>
            {/* Profile Information */}

            {activeSection === "Request" && (
              <View>
                <View>
                <TouchableOpacity onPress={()=>{setshowModel(true)}}>
                <View style={styles.DoctorContainerDets}>
                  <View>
                    <Image
                      source={require("../assets/DoctorImag.png")}
                      style={styles.DoctorImage}
                    ></Image>
                  </View>
                  <View style={styles.genContainer}>
                    <View style={styles.DoctorContainerSu}>
                      <View style={styles.DoctorContainerSubt}>
                        <Text style={styles.nametext}>
                          NGOGA Innocent Patrick
                        </Text>
                      </View>
                      <View style={styles.DoctorContainerSubt}>
                        <Text style={styles.subText}>Time: 2:00 PM</Text>
                        <Text style={styles.subText}>Date: 12 April 2024</Text>
                      </View>
                      <View style={styles.DoctorContainerSubt}>
                        <Text style={styles.subText}>Gender: Female</Text>
                        <Text style={styles.subText}>Age: 27</Text>
                      </View>
                    </View>
                    <View>
                      <Image
                        source={require("../assets/phoneIcon.png")}
                      ></Image>
                    </View>
                  </View>
                </View>
                </TouchableOpacity>

                </View>


              </View>
            )}

            {activeSection === "Calendar" && (
              <View>
                <Calendar
                  markedDates={bookedDates}
                  theme={{
                    selectedDayBackgroundColor: "#00adf5",
                    todayTextColor: "#00adf5",
                    arrowColor: "orange",
                    textDayFontWeight: "300",
                    textMonthFontWeight: "bold",
                    textDayHeaderFontWeight: "300",
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16,
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
            {/* Modal for displaying disease details */}
            <Modal
        visible={showModel}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setshowModel(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Fertility Counseling</Text>
            <Text style={styles.modalDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minent, sunt in culpa qui officia deserunt mollit anim id est laborum."
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setshowModel(false)}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.Rejectbutton}
                onPress={() => setshowModel(false)}
              >
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <DoctorBottomTab />
      </View>
    </View>
  );
};

export default Consultation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C7751",
  },
  scrollContainer: {},
  containerDoctor: {
    backgroundColor: "#0C7751",
    // paddingBottom: 20,
    paddingTop: 110,
    padding: 15,
    borderColor: "#0C7751",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "white",
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0C7751",
    padding: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingBottom: 10,
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
  bookedDate: {
    backgroundColor: "#93BD68",
    // Change to your desired color
    borderRadius: 20,
    padding: 5,
    textAlign: "center",
  },
  LogoutText: {
    fontSize: 16,
    color: "#8BB85C",
    fontWeight: "bold",
  },
  profileName: {
    color: "#FFFDFD",
    fontSize: 18,
    fontWeight: "bold",
  },
  ProfileName: {
    fontSize: 16,
    marginTop: 10,
    color: "white",
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

  checkProfileConatiner: {
    width: 80,
    height: 80,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    objectFit: "contain",
  },
  UpcomingConsultation: {
    color: "white",
    fontWeight: "regular",
    marginTop: 5,
    fontSize: 16,
    marginBottom: 5,
  },
  consultationContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    width: 106,
    height: 132,
    paddingRight: 5,
  },
  hourText: {
    display: "flex",
    justifyContent: "flex-end",
    textAlign: "right",
    fontSize: 8,
    fontWeight: "bold",
  },
  consultationImage: {
    height: 67,
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    alignItems: "center",
    width: "100%",
  },
  consultatioImage: {
    width: 67,
    height: 67,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    objectFit: "contain",
  },
  ngongainnocentConatiner: {
    width: "100%",
    alignItems: "center",
    paddingTop: 3,
  },
  ngongainnocent: {
    fontSize: 8,
    width: "80%",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
  },
  startbutton: {
    backgroundColor: "#0C7751",
    width: 82,
    height: 21,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 3,
  },
  starttext: {
    color: "white",
    fontSize: 11,
    fontWeight: "medium",
  },
  startbuttonConatiner: {
    width: "100%",
    alignItems: "center",
  },
  DoctorContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingBottom: 15,
    paddingTop:10
  },
  infoButton: {
    borderRadius: 10,
    backgroundColor: "#0C7751",
    width: 170,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  infoButtonActive: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0C7751",
    width: 170,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  infoButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "regular",
    letterSpacing: 1,
  },
  infoButtonTextActive: {
    color: "#0C7751",
    fontSize: 14,
    fontWeight: "regular",
    letterSpacing: 1,
  },

  familyInfo: {
    // padding: 10,
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
    backgroundColor: "white",
    paddingTop: 2,
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
  requestInformation: {
    backgroundColor: "red",
    // paddingLeft: 15,
  },
  familyContainer: {
    width: "100%",
    paddingTop: 10,
    padding: 15,
    borderColor: "#8BB85C",
    backgroundColor: "blue",
    paddingBottom: 10,
  },
  FamilyInformation: {
    width: "100%",
    padding: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 1,
  },
  familyMemberImage: {
    width: 75,
    height: 75,
    borderRadius: 37,
    marginRight: 20,
    backgroundColor: "red",
  },
  familyMemberDetails: {
    display: "flex",
    flexDirection: "row",
    width: "75%",
    justifyContent: "space-between",
  },
  familyMemberInfo: {
    color: "black",
    marginBottom: 10,
    fontSize: 11,
  },

  viewInforLast: {
    alignItems: "flex-end",
  },
  familyMemberName: {
    fontWeight: "bold",
    marginBottom: 7,
  },
  DoctorImage: {
    width: 55,
    height: 55,
    borderRadius: 38,
    objectFit: "contain",

  },

  DoctorContainerDets: {
    display: "flex",
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"center",
  },
  DoctorContainerSub: {
    width: "86%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 2,
  },
  DoctorContainerSubt: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
  },

  DoctorContainerSu: {},
  subText: {
    fontSize: 11,
    marginTop: 2,
    marginBottom: 2,
  },
  nametext: {
    fontSize: 15,
    fontWeight: "semibold",
  },
  imageText: {
    height: 15,
    objectFit: "contain",
    display: "flex",
    justifyContent: "flex-end",
    textAlign: "right",
    backgroundColor: "red",
    width: "50%",
  },
  genContainer: {
    display: "flex",
    flexDirection: "row",
    width: "79%",
    justifyContent: "space-between",
    borderLeftColor: "white",
    borderRightColor: "white",
    borderBottomColor: "white",
    borderWidth:1,
    borderTopColor:"black",
    padding:4,
  },

  viewIfo: {
    backgroundColor: "white",
    zIndex: 1,
    paddingTop: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: 475,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "85%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 12,
    fontWeight: "regular",
    marginBottom: 10,
    color:"#0C7751"
  },
  modalDescription: {
    fontSize: 12,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    padding: 10,
    backgroundColor: "#0C7751",
    borderRadius: 13,
    width: "45%",
    alignItems: "center",
    paddingTop:8,
    paddingBottom:8
  },
  Rejectbutton:{
    padding: 10,
    backgroundColor: "#A30606",
    borderRadius: 13,
    width: "45%",
    alignItems: "center",
    paddingTop:8,
    paddingBottom:8
  },
  buttonText: {
    color: "white",
    fontSize: 12,
  },
});
