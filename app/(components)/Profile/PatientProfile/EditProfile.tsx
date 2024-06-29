import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Animated,
  PanResponder,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Header1 from "../../ReusableComponent/Header1";
import BottomTabs1 from "../../ReusableComponent/BottomTabs1";
const markerWidth = 10;
const EditProfile = () => {
  const editProfile = () => {
    router.push("./EditProfile");
  };
  const router = useRouter();

  const [names, setNames] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("Male");
  const [bloodType, setBloodType] = useState("A");
  const [isPregnant, setIsPregnant] = useState(false);
  const [maritalStatus, setMaritalStatus] = useState("");
  const [allergies, setAllergies] = useState("");
  const [chronicIllness, setChronicIllness] = useState("");
  const [currentTreatment, setCurrentTreatment] = useState("");
  const [habits, setHabits] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dependentInfo, setDependentInfo] = useState({
    name: "",
    gender: "",
    age: "",
    location: "",
    relationship: "",
  });

  const handleBloodTypeChange = (type: React.SetStateAction<string>) => {
    setBloodType(type);
  };

  const monthMarkers = [1, 3, 6, 9];
  const [selectedMonth, setSelectedMonth] = useState(1);
  const progressWidth = 300;
  const animatedValue = new Animated.Value(
    (progressWidth / 8) * (selectedMonth - 1)
  );
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      let newMonth = Math.min(
        Math.max(
          1,
          Math.round(gestureState.dx / (progressWidth / 8) + selectedMonth)
        ),
        9
      );
      setSelectedMonth(newMonth);
      Animated.spring(animatedValue, {
        toValue: (progressWidth / 8) * (newMonth - 1),
        useNativeDriver: false,
      }).start();
    },
    onPanResponderRelease: () => {
      setSelectedMonth(Math.round(selectedMonth));
    },
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibledepInfo, setModalVisibledepInfo] = useState(false);
  const handleMaritalStatusChange = (status) => {
    setMaritalStatus(status);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Header1 />
      <View>
        {/* Scrollable Content */}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          style={styles.scrollView}
        >
          <View>
            <View style={styles.profileSection}>
              <View style={styles.profileImageIconContainer}>
                <View style={styles.profileImageIcon}>
                  <Image source={require("../../assets/Patientprofile.png")} />
                  <Text style={styles.sectionTitle}>Patient Profile</Text>
                </View>

                <View style={styles.circularProgressContainer}>
                  <AnimatedCircularProgress
                    size={50}
                    width={5}
                    fill={20}
                    tintColor="#8BB85C"
                    backgroundColor="#e0e0e0"
                  >
                    {(fill) => (
                      <Text style={styles.progressText}>
                        {`${Math.round(fill)}%`}
                      </Text>
                    )}
                  </AnimatedCircularProgress>
                </View>
              </View>
              <View style={styles.lineBar}>
                <View style={styles.lineBarLine}></View>
              </View>
              <Text style={styles.names}>Names</Text>
              <TextInput
                style={styles.input}
                placeholder="Separate names by space"
                value={names}
                onChangeText={setNames}
              />
              <View style={styles.GroupInput}>
                <View style={styles.groupinput}>
                  <Text style={styles.names}>Date of Birth</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="DD / MM / YYYY"
                    value={dateOfBirth}
                    onChangeText={setDateOfBirth}
                  />
                </View>
                <View style={styles.groupinput}>
                  <Text style={styles.names}>Gender</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Gender"
                    value={gender}
                    editable={false}
                  />
                </View>
              </View>

              <View>
                <Text style={styles.names}>Blood Type</Text>
                <View style={styles.bloodGroupContainer}>
                  <TouchableOpacity
                    onPress={() => handleBloodTypeChange("A")}
                    style={[
                      styles.bloodGroupButton,
                      bloodType === "A" && styles.activeBloodGroupButton,
                    ]}
                  >
                    <Text
                      style={[
                        styles.bloodGroupText,
                        bloodType === "A" && styles.activeBloodGroupText,
                      ]}
                    >
                      A
                    </Text>
                    {bloodType === "A" && (
                      <View style={styles.activeIndicator} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleBloodTypeChange("AB")}
                    style={[
                      styles.bloodGroupButton,
                      bloodType === "AB" && styles.activeBloodGroupButton,
                    ]}
                  >
                    <Text
                      style={[
                        styles.bloodGroupText,
                        bloodType === "AB" && styles.activeBloodGroupText,
                      ]}
                    >
                      AB
                    </Text>
                    {bloodType === "AB" && (
                      <View style={styles.activeIndicator} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleBloodTypeChange("B")}
                    style={[
                      styles.bloodGroupButton,
                      bloodType === "B" && styles.activeBloodGroupButton,
                    ]}
                  >
                    <Text
                      style={[
                        styles.bloodGroupText,
                        bloodType === "B" && styles.activeBloodGroupText,
                      ]}
                    >
                      B
                    </Text>
                    {bloodType === "B" && (
                      <View style={styles.activeIndicator} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleBloodTypeChange("0")}
                    style={[
                      styles.bloodGroupButton,
                      bloodType === "0" && styles.activeBloodGroupButton,
                    ]}
                  >
                    <Text
                      style={[
                        styles.bloodGroupText,
                        bloodType === "0" && styles.activeBloodGroupText,
                      ]}
                    >
                      0
                    </Text>
                    {bloodType === "0" && (
                      <View style={styles.activeIndicator} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleBloodTypeChange("Unknown")}
                    style={[
                      styles.bloodGroupButtons,
                      bloodType === "Unknown" && styles.activeBloodGroupButton,
                    ]}
                  >
                    <Text
                      style={[
                        styles.bloodGroupTextu,
                        bloodType === "Unknown" && styles.activeBloodGroupText,
                      ]}
                    >
                      Unknown
                    </Text>
                    {bloodType === "Unknown" && (
                      <View style={styles.activeIndicator} />
                    )}
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.inputBlood}
                  placeholder="Blood Type"
                  value={bloodType}
                  editable={false}
                />
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Pregnant Status</Text>
                <TouchableOpacity
                  style={styles.maritalStatus}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.maritalStatusText}>Marital status</Text>
                </TouchableOpacity>
              </View>

              <View>
                {/* Pregnance status monthly dynamic tract line */}
                <View style={styles.progressLineContainer}>
                  <View style={styles.progressLine}>
                    {monthMarkers.map((marker, index) => (
                      <View
                        key={index}
                        style={[
                          styles.monthMarker,
                          { left: `${(marker / 9) * 100}%` },
                        ]}
                      >
                        <Text style={styles.markerText}>{marker}M</Text>
                      </View>
                    ))}
                    <Animated.View
                      {...panResponder.panHandlers}
                      style={[
                        styles.selector,
                        {
                          transform: [
                            {
                              translateX: animatedValue,
                            },
                          ],
                        },
                      ]}
                    />
                  </View>
                </View>
                <Text style={styles.selectedMonthText}>
                  Selected Month: {selectedMonth}
                </Text>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Marital Status"
                value={maritalStatus}
                onChangeText={setMaritalStatus}
              />
              <View>
                <Text style={styles.names}>Health Info</Text>
                <View style={styles.GroupInput}>
                  <View style={styles.groupinput}>
                    <TextInput
                      style={styles.input}
                      placeholder="Allergies"
                      value={allergies}
                      onChangeText={setAllergies}
                    />
                  </View>
                  <View style={styles.groupinput}>
                    <TextInput
                      style={styles.input}
                      placeholder="Chronic Illness"
                      value={chronicIllness}
                      onChangeText={setChronicIllness}
                    />
                  </View>
                </View>

                <View style={styles.GroupInput}>
                  <View style={styles.groupinput}>
                    <TextInput
                      style={styles.input}
                      placeholder="Current Treatment"
                      value={currentTreatment}
                      onChangeText={setCurrentTreatment}
                    />
                  </View>
                  <View style={styles.groupinput}>
                    <TextInput
                      style={styles.input}
                      placeholder="Habits & Addictions"
                      value={habits}
                      onChangeText={setHabits}
                    />
                  </View>
                </View>
              </View>

              <View>
                <Text style={styles.names}>Contact Info</Text>

                <View style={styles.GroupInput}>
                  <View style={styles.groupinput}>
                    <TextInput
                      style={styles.input}
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                    />
                  </View>
                  <View style={styles.groupinput}>
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisibledepInfo(true)}
              >
                <Text style={styles.addButtonText}>
                  Add Family & Dependents
                </Text>
              </TouchableOpacity>
            </View>

            <Modal
              visible={modalVisibledepInfo}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setModalVisibledepInfo(false)}
            >
              <View style={styles.dependentInfo}>
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() => setModalVisibledepInfo(false)}
                >
                  <Text style={styles.doneButtonText}>X</Text>
                </TouchableOpacity>
                <Text style={styles.sectionTitle}>Dependent Info</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={dependentInfo.name}
                  onChangeText={(value) =>
                    setDependentInfo({ ...dependentInfo, name: value })
                  }
                />
                <View style={styles.HalfInputContainer}>
                  <TextInput
                    style={styles.HalfInput}
                    placeholder="Gender"
                    value={dependentInfo.gender}
                    onChangeText={(value) =>
                      setDependentInfo({ ...dependentInfo, gender: value })
                    }
                  />
                  <TextInput
                    style={styles.HalfInput}
                    placeholder="Age"
                    value={dependentInfo.age}
                    onChangeText={(value) =>
                      setDependentInfo({ ...dependentInfo, age: value })
                    }
                  />
                </View>

                <View style={styles.HalfInputContainer}>
                  <TextInput
                    style={styles.HalfInput}
                    placeholder="Location"
                    value={dependentInfo.location}
                    onChangeText={(value) =>
                      setDependentInfo({ ...dependentInfo, location: value })
                    }
                  />
                  <TextInput
                    style={styles.HalfInput}
                    placeholder="Relationship"
                    value={dependentInfo.relationship}
                    onChangeText={(value) =>
                      setDependentInfo({
                        ...dependentInfo,
                        relationship: value,
                      })
                    }
                  />
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
        {/* Marital Status Modal */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {["Single", "Married", "Divorced", "Widowed", "LGBTQ+"].map(
                (status) => (
                  <TouchableOpacity
                    key={status}
                    style={styles.modalOption}
                    onPress={() => handleMaritalStatusChange(status)}
                  >
                    <Text style={styles.modalOptionText}>{status}</Text>
                  </TouchableOpacity>
                )
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      {/* Bottom Tab Bar */}
        <BottomTabs1/>
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
  bloodGroupButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#e0e0e0",
    alignItems: "center",
    marginRight: 5,
    position: "relative",
    justifyContent: "center",
    width: 25,
    height: 25,
    textAlign: "center",
  },
  bloodGroupButtons: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    alignItems: "center",
    marginRight: 5,
    position: "relative",
    justifyContent: "center",
    width: 74,
    height: 25,
    textAlign: "center",
    backgroundColor: "#D9D9D9",
    padding: 2,
    fontSize: 10,
    borderRadius: 10,
  },
  activeBloodGroupButton: {
    borderColor: "#4CAF50",
  },
  bloodGroupText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#B7B7B7",
  },
  bloodGroupTextu: {
    fontSize: 10,
    fontWeight: "bold",
  },
  activeIndicator: {
    position: "absolute",
    bottom: -5,
    left: "50%",
    transform: [{ translateX: -10 }],
    width: 20,
    height: 2,
    backgroundColor: "#4CAF50",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  scrollView: {
    marginTop: 100,
    backgroundColor: "#FFFDFD",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 0,
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
  names: {
    fontSize: 12,
    fontWeight: "regular",
    marginBottom: 1,
  },
  circularProgressContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  progressText: {
    fontSize: 12,
    color: "#000",
  },
  bloodGroupContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
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
  SaveNotificationContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  Save: {
    position: "relative",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    bottom: -5,
    width: 66,
    height: 27,
    borderRadius: 10,
  },
  SaveText: {
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

  ProfileName: {
    fontSize: 16,
    marginTop: 10,
    color: "white",
  },

  activeBloodGroupText: {
    color: "#A30606",
    fontSize: 14,
    fontWeight: "bold",
  },
  maritalStatus: {
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E1E1E1",
    width: 120,
    height: 35,
    borderRadius: 36,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  maritalStatusText: {
    fontSize: 12,
    fontWeight: "regular",
    color: "#C2C2C2",
  },
  familyInfo: {
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
  profileSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "regular",
    color: "#4E4E4E",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 36,
    paddingLeft: 10,
    marginBottom: 2,
    width: "100%",
  },
  HalfInput: {
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 36,
    paddingLeft: 10,
    marginBottom: 2,
    width: "48%",
  },

  inputBlood: {
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 36,
    paddingLeft: 10,
    marginBottom: 10,
    marginTop: 10,

    width: "100%",
  },
  groupinput: {
    borderRadius: 8,
    marginBottom: 10,
    width: "48%",
    height: "auto",
  },
  GroupInput: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    // backgroundColor: "red",
    justifyContent: "space-between",
  },
  label: {
    flex: 1,
    fontSize: 12,
    fontWeight: "regular",
    color: "#787878",
  },
  addButton: {
    backgroundColor: "#A0C953",
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  dependentInfo: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    borderRadius: 8,
    position: "relative",
    top: "60%",
    borderWidth: 1,
    borderColor: "#696C70",
    width: "90%",
    justifyContent: "center",
    left: "5%",
    paddingTop: 0,
  },
  doneButton: {
    // backgroundColor: "#A0C953",
    padding: 10,
    alignItems: "flex-end",
    borderRadius: 8,
    color: "black",
  },
  doneButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  profileImageIcon: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    // backgroundColor:"blue",
    gap: 5,
  },
  profileImageIconContainer: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 5,
  },
  lineBar: {
    width: "100%",
    height: 5,
    backgroundColor: "#E2E2E2",
    marginBottom: 2,
  },
  lineBarLine: {
    width: "20%",
    height: 5,
    backgroundColor: "#93BD68",
  },
  progressLineContainer: {
    marginVertical: 2,
  },
  progressLine: {
    height: 5,
    backgroundColor: "#CCCCCC",
    position: "relative",
    width: "100%",
  },
  monthMarker: {
    position: "absolute",
    top: -10,
    width: markerWidth,
    height: markerWidth,
    backgroundColor: "#FFFFFF",
    borderColor: "#333333",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  markerText: {
    fontSize: 10,
  },
  selector: {
    position: "absolute",
    top: -15,
    width: markerWidth,
    height: markerWidth,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedMonthText: {
    textAlign: "center",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "rgba(0,0,0,0.5)",
    position: "relative",
    top: "57%",
    left: "23%",
  },
  modalContent: {
    backgroundColor: "#8BB85C",
    borderRadius: 10,
    padding: 20,
    width: 156,
    height: 210,
    alignItems: "center",
  },
  modalOption: {
    width: "100%",
    alignItems: "center",
  },
  modalOptionText: {
    fontSize: 16,
    color: "white",
    borderWidth: 1,
    width: "100%",
    textAlign: "center",
    borderLeftColor: "#8BB85C",
    borderTopColor: "white",
    borderRightColor: "#8BB85C",
    borderBottomColor: "#8BB85C",
    lineHeight: 30,
  },
  closeButton: {
    marginTop: 0,
  },
  closeButtonText: {
    fontSize: 16,
    color: "black",
  },
  HalfInputContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default EditProfile;
