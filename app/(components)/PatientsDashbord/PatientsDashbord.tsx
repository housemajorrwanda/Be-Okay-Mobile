import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import DatePicker from "react-native-modern-datepicker";

const PatientDashboard = () => {
  const [currentScreen, setCurrentScreen] = useState("appointment");
  const [selectedDate, setSelectedDate] = useState("");

  const patientData = [
    {
      title: "Blood Group",
      image: require("../assets/BloodGroup.png"),
      group: "A",
      backgroundColor: "#F6E1E1",
    },
    {
      title: "Lab Test",
      image: require("../assets/blood-test 2.png"),
      group: "Mammogram",
      backgroundColor: "#67C3AC",
    },
    {
      title: "Illness",
      image: require("../assets/virus-in-dna.png"),
      group: "Breast",
      backgroundColor: "#AED9F1",
    },
    {
      title: "Treatment Group",
      image: require("../assets/medicine.png"),
      group: "Paracetamol",
      backgroundColor: "#97C496",
    },
  ];

  const patientService = [
    {
      title: "Checkup",
      image: require("../assets/checkup.png"),
      price: "Price: 800 Rwf",
      backgroundColor: "#67C3AC",
    },
    {
      title: "Consultation",
      image: require("../assets/Homecare.png"),
      price: "Price: 800 Rwf",
      backgroundColor: "#F6E1E1",
    },
    {
      title: "Homecare",
      image: require("../assets/Consultation.png"),
      price: "Price: 20000 Rwf",
      backgroundColor: "#97C496",
    },
  ];

  const handleNavigate = (screen) => {
    if (screen !== "calendar") {
      setCurrentScreen("appointment");
    } else {
      setCurrentScreen(screen);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.header}>
          <View>
            <Image
              source={require("../assets/profileImage.png")}
              style={styles.profileImage}
            />
            <View style={styles.activeIcon} />
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>NGOGA Innocent</Text>
            <Text style={styles.secondName}>Patrick</Text>
          </View>
          <View style={styles.headerIcons}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={30}
              color="white"
            />
            <Ionicons name="notifications-sharp" size={30} color="white" />
          </View>
        </View>
        <View style={styles.healthStatusText}>
          <Text style={styles.healthStatus}>Health Status</Text>
          <Text style={styles.last30days}>last 30 days</Text>
        </View>
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
          <View style={styles.lookingFor}>
            <Text style={styles.lookingFortext}>What are you looking for?</Text>
          </View>
          <View style={styles.patientDataContainer}>
            {patientService.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.patientDataResultContainer,
                  { backgroundColor: item.backgroundColor },
                ]}
              >
                <Text style={styles.resultTitle}>{item.title}</Text>
                <View style={styles.PatientDataGroup}>
                  <Image source={item.image} style={styles.patientDataImage} />
                  <View style={styles.patientDataPrice}>
                    <Text style={styles.Price}>{item.price}</Text>
                  </View>
                </View>
                <View />
              </View>
            ))}
          </View>
          <View style={styles.AppointmentSchedule}>
            <View>
              <Pressable
                onPress={() => handleNavigate("appointment")}
                style={[
                  styles.button,
                  currentScreen === "appointment" && styles.activeButton,
                ]}
              >
                <Text
                  style={[
                    styles.AppointmentScheduleText,
                    currentScreen === "appointment" && styles.activeButtonText,
                  ]}
                >
                  Appointment & Schedule{" "}
                </Text>
              </Pressable>
            </View>
            <View style={styles.calendar}>
              <Pressable
                onPress={() => handleNavigate("calendar")}
                style={[
                  styles.button,
                  currentScreen === "calendar" && styles.activeButton,
                ]}
              >
                <MaterialCommunityIcons
                  name="calendar-month-outline"
                  size={20}
                  color="#C2C2C2"
                />
                <Text
                  style={[
                    styles.myCalender,
                    currentScreen === "calendar" && styles.activeButtonText,
                  ]}
                >
                  My Calendar
                </Text>
              </Pressable>
            </View>
          </View>
          {currentScreen === "appointment" && (
            <View>
              <View style={styles.appointmentScreen}>
                <View style={styles.dateAndmonth}>
                  <Text style={styles.febdate}>12</Text>
                  <Text style={styles.febdate}>Feb</Text>
                </View>
                <View>
                  <Text style={styles.date}>15 June 2024 | 2:00 PM </Text>
                  <Text style={styles.statusNames}>Dr. Issa </Text>
                </View>
                <View>
                  <View style={styles.Icons}>
                    <View>
                      <MaterialIcons
                        name="phone-iphone"
                        style={styles.checkIcon}
                      />
                    </View>
                    <Image
                      source={require("../assets/check-money.png")}
                      style={styles.Checkup}
                    />
                  </View>
                  <Pressable style={styles.joinText}>
                    <Text style={styles.join}>Join</Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.appointmentScreen}>
                <View style={styles.dateAndmonth}>
                  <Text style={styles.febdate}>12</Text>
                  <Text style={styles.febdate}>Feb</Text>
                </View>
                <View>
                  <Text style={styles.date}>15 June 2024 | 2:00 PM </Text>
                  <Text style={styles.statusNames}>Dr. Issa </Text>
                </View>
                <View>
                  <View style={styles.Icons}>
                    <View>
                      <MaterialIcons
                        name="phone-iphone"
                        style={styles.checkIcon}
                      />
                    </View>
                    <Image
                      source={require("../assets/check-money.png")}
                      style={styles.Checkup}
                    />
                  </View>
                  <Pressable style={styles.joinText}>
                    <Text style={styles.join}>Join</Text>
                  </Pressable>
                </View>
              </View>
              <View style={styles.appointmentScreen}>
                <View style={styles.dateAndmonth}>
                  <Text style={styles.febdate}>12</Text>
                  <Text style={styles.febdate}>Feb</Text>
                </View>
                <View>
                  <Text style={styles.date}>15 June 2024 | 2:00 PM </Text>
                  <Text style={styles.statusNames}>Dr. Issa </Text>
                </View>
                <View>
                  <View style={styles.Icons}>
                    <View>
                      <MaterialIcons
                        name="phone-iphone"
                        style={styles.checkIcon}
                      />
                    </View>
                    <Image
                      source={require("../assets/check-money.png")}
                      style={styles.Checkup}
                    />
                  </View>
                  <Pressable style={styles.joinText}>
                    <Text style={styles.join}>Join</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
          {currentScreen === "calendar" && (
            <View style={styles.calendarScreen}>
              <DatePicker
                mode="calendar"
                selected={selectedDate}
                onDateChange={(date) => setSelectedDate(date)}
                options={{
                  backgroundColor: "#E8FFCF",
                  textHeaderColor: "#8E9E7B",
                  textDefaultColor: "#69695D",
                  selectedTextColor: "#FFFFFF",
                  mainColor: "#93BD68",
                  textSecondaryColor: "#69695D",
                  borderColor: "rgba(122, 146, 165, 0.1)",
                  textFontSize:16,
                  
                }}
                current="2024-06-23"
              />
              {selectedDate && (
                <Text style={styles.selectedDateText}>
                  Selected Date: {selectedDate}
                </Text>
              )}
            </View>
          )}
          <View style={styles.bottomNavigation}>
            <Pressable onPress={() => handleNavigate("home")}>
              <MaterialIcons name="home" size={24} color="#93BD68" />
              <Text style={styles.navText}>Home</Text>
            </Pressable>
            <Pressable onPress={() => handleNavigate("consultation")}>
              <MaterialCommunityIcons
                name="stethoscope"
                size={24}
                color="#93BD68"
              />
              <Text style={styles.navText}>Consultation</Text>
            </Pressable>
            <Pressable onPress={() => handleNavigate("others")}>
              <MaterialIcons name="more-horiz" size={24} color="#93BD68" />
              <Text style={styles.navText}>Others</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PatientDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
  healthStatusText: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    paddingRight: 20,
    paddingLeft: 20,
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  healthStatus: {
    color: "#000000",
  },
  last30days: {
    color: "#CCCCCC",
    fontSize: 14,
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

  lookingFor: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 13,
  },
  lookingFortext: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "light",
  },
  patientDataResultContainer: {
    position: "relative",
    height: 120,
    width: 100,
    borderRadius: 12,
    borderColor: "#cccc",
    backgroundColor: "black",
  },
  patientDataImage: {
    width: 60,
    height: 60,
  },
  patientDataPrice: {
    position: "relative",
    top: 18,
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
  AppointmentSchedule: {
    fontSize: 14,
    width: "100%",
    padding: 15,
    paddingBottom: 13,
    paddingTop: 13,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
  },
  AppointmentScheduleText: {
    color: "#C2C2C2",
    fontSize: 14,
  },
  calendar: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
  },
  myCalender: {
    color: "#C2C2C2",
    fontWeight: "semibold",
  },
  appointmentScreen: {
    width: "100%",
    padding: 15,
    paddingBottom: 13,
    paddingTop: 13,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  calendarScreen: {
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#E8FFCF",
    borderRadius: 16,
    marginHorizontal: 20,
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  navText: {
    fontSize: 12,
    color: "#93BD68",
    marginTop: 4,
  },
  dateAndmonth: {
    backgroundColor: "#CFDEFF",
    borderRadius: 25,
    height: 48,
    width: 48,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  febdate: {
    width: "50%",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
  },
  date: {
    color: "#D9D9D9",
    fontSize: 15,
    fontWeight: "bold",
  },
  statusNames: {
    color: "#000",
    marginTop: 3,
    fontSize: 15,
  },
  Icons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  Checkup: {
    width: 23,
    height: 23,
    textAlign: "center",
  },
  checkIcon: {
    fontSize: 20,
    marginTop: 4,
  },
  joinText: {
    backgroundColor: "#93BD68",
    marginTop: 3,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: 45,
    height: 20,
    borderRadius: 5,
    color: "white",
  },
  join: {
    color: "white",
    fontSize: 10,
  },

  selectedDateText: {
    fontSize: 16,
    color: "#4E6B58",
    textAlign:'center'
  },

  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 2,
    textAlign: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },

  activeButton: {
    backgroundColor: "#E5FFCA",
    borderRadius: 15,
  },
  activeButtonText: {
    color: "#93BD68",
    fontWeight: "bold",
  },
});
