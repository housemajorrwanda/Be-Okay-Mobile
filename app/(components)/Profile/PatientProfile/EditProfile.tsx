import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {NavigationProps} from "../../../(app)/types"
import { Ionicons } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import BottomTabs1 from "../../ReusableComponent/BottomTabs1";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";

const markerWidth = 10;
const EditProfile = () => {
  // State variables
  const navigation = useNavigation<NavigationProps>()

  const [names, setNames] = useState("");
  const [fullName, setfullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("Male");
  const [bloodType, setBloodType] = useState("A+");
  const [isPregnant, setIsPregnant] = useState(false);
  const [maritalStatus, setMaritalStatus] = useState("");
  const [allergies, setAllergies] = useState("");
  const [chronicIllness, setChronicIllness] = useState("");
  const [currentTreatment, setCurrentTreatment] = useState("");
  const [habits, setHabits] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [progress, setProgress] = useState(20);

  const allergyOptions = [
    "Airborne/ Environmental",
    "Dust mites",
    "Pet dander",
    "Mold",
    "Cockroaches",
    "Milk",
    "Eggs",
    "Wheat",
    "Soy",
    "Peanuts",
    "Tree nuts",
    "Shellfish",
    "Fish",
    "Drugs/ Pills",
    "Bee, wasp, hornet, yellow jacket stings",
    "Skin Allergies/ nickel, poison ivy, latex",
  ];

  const chronicIllnessOptions = [
    "Heart disease",
    "Hypertension (High blood pressure)",
    "Heart failure",
    "Asthma",
    "Lungs problem",
    "Diabetes 1,2",
    "Gestational diabetes",
    "One-sided Headache",
    "Muscle pain (neck, shoulder, back, chest, arms & legs)",
    "Joint pain (knee & elbow)",
  ];
  const HabittsaddictionOptions = [
    "Habits& Addiction ",
    "Alcohol",
    "Nicotine",
    "Drugs (cocaine, heroin, Opium)",
    "Prescription medications",
    "Gambling",
    "Gaming addiction",
    " Sexual addiction",
  ];
  const [dependentInfo, setDependentInfo] = useState({
    name: "",
    gender: "",
    age: "",
    location: "",
    relationship: "",
  });
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibledepInfo, setModalVisibledepInfo] = useState(false);

  const [profileImage, setProfileImage] = useState(null);

  const navigateTCheckSupport = () => {
    navigation.navigate("CheckSuport");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setProfileImage(uri);
      uploadImage(uri);
    }
  };
  const dependentpickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setProfileImage(uri);
      uploadImage(uri);
    }
  };

  const uploadImage = async (uri: string) => {
    const formData = new FormData();

    formData.append("image", {
      uri,
      name: "profile.jpg",
      type: "image/jpeg",
    } as any);

    const accessToken = await AsyncStorage.getItem("accessToken");
    try {
      const response = await fetch(
        "https://beok.onrender.com/users/profile-picture/",
        {
          method: "POST",
          headers: {
            Authorization: `JWT ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Image uploaded successfully:", result);
      } else {
        console.error("Image upload failed:", result);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleBloodTypeChange = (type) => {
    const validBloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
    if (validBloodTypes.includes(type)) {
      setBloodType(type);
    }
  };

  const [selectedMonth, setSelectedMonth] = useState(1);
  const handleMaritalStatusChange = (status) => {
    setMaritalStatus(status);
    setModalVisible(false);
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      console.log("Access Token:", accessToken);

      const response = await fetch(
        "https://beok.onrender.com/patients/profile/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setfullName(data.personal_information.full_name || "");

        console.log("Fetched Profile Data:", data);
        // Populate the state variables with the fetched data
        setNames(data.personal_information.full_name || "");
        setDateOfBirth(data.personal_information.date_of_birth || "");
        setGender(data.personal_information.gender || "Male");
        setBloodType(data.blood_group || "A+");
        setIsPregnant(data.is_pregnant || false);
        setMaritalStatus(data.personal_information.marital_status || "");
        setAllergies(data.alergies || "");
        setChronicIllness(data.chronic_diseases || "");
        setCurrentTreatment(data.current_prescription || "");
        setHabits(data.habits || "");
        setPhoneNumber(data.personal_information.phone_number || "");
        setEmail(data.personal_information.email || "");

        setProfileImage(data.personal_information.profile_image || null);

        if (data.dependents_profile.length > 0) {
          const dependent = data.dependents_profile[0];
          setDependentInfo({
            name: dependent.name || "",
            gender: dependent.gender || "",
            age: dependent.age || "",
            location: dependent.location || "",
            relationship: dependent.relationship || "",
          });
        }
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch profile data:", errorData);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await fetch(
        "https://beok.onrender.com/patients/profile/",
        {
          method: "PATCH",
          headers: {
            Authorization: `JWT ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            names: names || null,
            full_name: fullName,
            date_of_birth: dateOfBirth || null,
            gender: gender || "Male",
            blood_group: bloodType || "A+",
            is_pregnant: isPregnant,
            marital_status: maritalStatus || null,
            alergies: allergies || null,
            chronic_diseases: chronicIllness || null,
            current_prescription: currentTreatment || null,
            habits: habits || null,
            phone_number: phoneNumber || null,
            email: email || null,
            dependent_info: {
              name: dependentInfo.name || null,
              gender: dependentInfo.gender || null,
              age: dependentInfo.age || null,
              location: dependentInfo.location || null,
              relationship: dependentInfo.relationship || null,
            },
            profile_image: profileImage || null,
          }),
        }
      );
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setModalMessage("Profile updated successfully.");
        setIsError(false);
      } else {
        setModalMessage("Failed to update profile.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setModalMessage("An error occurred while updating the profile.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("../../assets/profileImage.png")
            }
            style={styles.profileImage}
          />
          <Ionicons
            name="camera-outline"
            size={30}
            color="white"
            style={styles.cameraIcon}
          />
          <View style={styles.activeIcon} />
        </TouchableOpacity>
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{fullName}</Text>
          <Text style={styles.ProfileName}>Profile</Text>
        </View>

        <View style={styles.logoutNotificationContainer}>
          <TouchableOpacity
            style={[styles.logout, styles.saveButton]}
            onPress={updateProfile}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Save</Text>
            )}
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={navigateTCheckSupport}>
              <Image source={require("../../assets/MessengerIcon.png")} />
            </TouchableOpacity>

            <Ionicons name="notifications-sharp" size={30} color="white" />
          </View>
        </View>
      </View>
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
                    editable={true}
                    onChangeText={(text) => setGender(text)}
                  />
                </View>
              </View>

              <View style={styles.bloodGroupContainer}>
                <TouchableOpacity
                  onPress={() => handleBloodTypeChange("A+")}
                  style={[
                    styles.bloodGroupButton,
                    bloodType === "A+" && styles.activeBloodGroupButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.bloodGroupText,
                      bloodType === "A+" && styles.activeBloodGroupText,
                    ]}
                  >
                    A+
                  </Text>
                  {bloodType === "A+" && (
                    <View style={styles.activeIndicator} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleBloodTypeChange("A-")}
                  style={[
                    styles.bloodGroupButton,
                    bloodType === "A-" && styles.activeBloodGroupButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.bloodGroupText,
                      bloodType === "A-" && styles.activeBloodGroupText,
                    ]}
                  >
                    A-
                  </Text>
                  {bloodType === "A-" && (
                    <View style={styles.activeIndicator} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleBloodTypeChange("B+")}
                  style={[
                    styles.bloodGroupButton,
                    bloodType === "B+" && styles.activeBloodGroupButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.bloodGroupText,
                      bloodType === "B+" && styles.activeBloodGroupText,
                    ]}
                  >
                    B+
                  </Text>
                  {bloodType === "B+" && (
                    <View style={styles.activeIndicator} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleBloodTypeChange("B-")}
                  style={[
                    styles.bloodGroupButton,
                    bloodType === "B-" && styles.activeBloodGroupButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.bloodGroupText,
                      bloodType === "B-" && styles.activeBloodGroupText,
                    ]}
                  >
                    B-
                  </Text>
                  {bloodType === "B-" && (
                    <View style={styles.activeIndicator} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleBloodTypeChange("O+")}
                  style={[
                    styles.bloodGroupButton,
                    bloodType === "O+" && styles.activeBloodGroupButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.bloodGroupText,
                      bloodType === "O+" && styles.activeBloodGroupText,
                    ]}
                  >
                    O+
                  </Text>
                  {bloodType === "O+" && (
                    <View style={styles.activeIndicator} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleBloodTypeChange("O-")}
                  style={[
                    styles.bloodGroupButton,
                    bloodType === "O-" && styles.activeBloodGroupButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.bloodGroupText,
                      bloodType === "O-" && styles.activeBloodGroupText,
                    ]}
                  >
                    O-
                  </Text>
                  {bloodType === "O-" && (
                    <View style={styles.activeIndicator} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleBloodTypeChange("AB+")}
                  style={[
                    styles.bloodGroupButton,
                    bloodType === "AB+" && styles.activeBloodGroupButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.bloodGroupText,
                      bloodType === "AB+" && styles.activeBloodGroupText,
                    ]}
                  >
                    AB+
                  </Text>
                  {bloodType === "AB+" && (
                    <View style={styles.activeIndicator} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleBloodTypeChange("AB-")}
                  style={[
                    styles.bloodGroupButton,
                    bloodType === "AB-" && styles.activeBloodGroupButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.bloodGroupText,
                      bloodType === "AB-" && styles.activeBloodGroupText,
                    ]}
                  >
                    AB-
                  </Text>
                  {bloodType === "AB-" && (
                    <View style={styles.activeIndicator} />
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Marital Status</Text>
                <TouchableOpacity
                  style={styles.maritalStatus}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.maritalStatusText}>
                    {maritalStatus ? maritalStatus : "Select Marital Status"}
                  </Text>
                </TouchableOpacity>
              </View>

              <View>
                <Slider
                  style={styles.slider}
                  minimumValue={1}
                  maximumValue={9}
                  step={1}
                  value={selectedMonth}
                  onValueChange={(value) => {
                    setSelectedMonth(value);
                  }}
                  minimumTrackTintColor="#8BB85C"
                  maximumTrackTintColor="#000"
                  thumbTintColor="#8BB85C"
                />
                <View style={styles.monthContainer}>
                  <Text>1 Month</Text>
                  <Text>3 Month</Text>
                  <Text>6 Month</Text>
                  <Text>9 Month</Text>
                </View>
                <Text style={styles.selectedMonthText}>
                  Selected Month: {selectedMonth}
                </Text>
              </View>
              <View>
                <Text style={styles.names}>Health Info</Text>

                <View style={styles.GroupInput}>
                  {/* Allergies Picker */}
                  <View style={styles.groupinputPicker}>
                    <Picker
                      selectedValue={allergies}
                      onValueChange={(itemValue) => setAllergies(itemValue)}
                      style={styles.pickerSmall}
                    >
                      <Picker.Item
                        label="Change Allergies"
                        value=""
                        enabled={false}
                        style={styles.pickerItemSmall}
                      />
                      {allergyOptions.map((allergy, index) => (
                        <Picker.Item
                          label={allergy}
                          value={allergy}
                          key={index}
                        />
                      ))}
                    </Picker>
                  </View>

                  {/* Chronic Illness Picker */}
                  <View style={styles.groupinputPicker}>
                    <Picker
                      selectedValue={chronicIllness}
                      onValueChange={(itemValue) =>
                        setChronicIllness(itemValue)
                      }
                      style={styles.pickerSmall}
                    >
                      <Picker.Item
                        label="Change Chronic Illness"
                        value=""
                        enabled={false}
                        style={styles.pickerItemSmall}
                      />
                      {chronicIllnessOptions.map((illness, index) => (
                        <Picker.Item
                          label={illness}
                          value={illness}
                          key={index}
                        />
                      ))}
                    </Picker>
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
                  <View style={styles.groupinputPickers}>
                    <Picker
                      selectedValue={habits}
                      onValueChange={(itemValue) => setHabits(itemValue)}
                      style={styles.pickerSmall}
                    >
                      <Picker.Item
                        label="Select Habit/addiction"
                        value=""
                        enabled={false}
                        style={styles.pickerItemSmall}
                      />
                      {HabittsaddictionOptions.map((habits, index) => (
                        <Picker.Item
                          label={habits}
                          value={habits}
                          key={index}
                        />
                      ))}
                    </Picker>
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
                <TouchableOpacity onPress={dependentpickImage}>
                  <View style={styles.headerModal}>
                    <Image
                      style={styles.depProfileImage}
                      source={require("../../assets/profileImage.png")}
                    />
                    <TouchableOpacity
                      style={styles.doneButton}
                      onPress={() => setModalVisibledepInfo(false)}
                    >
                      <Text style={styles.doneButtonText}>X</Text>
                    </TouchableOpacity>
                  </View>
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
                <View style={styles.doneView}>
                  <TouchableOpacity style={styles.donebutton}>
                    <Text style={styles.donetext}>Done</Text>
                  </TouchableOpacity>
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
      <View style={styles.buttomTabs}>
      <BottomTabs1 activeTab="Home" />
      </View>
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
    borderRadius: 40,
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
  donetext: {
    color: "white",
  },
  subtitle: {
    fontWeight: "bold",
    color: "black",
    fontSize: 14,
    marginLeft: 15,
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
    padding: 2,
    fontSize: 10,
    borderRadius: 10,
  },
  depProfileImage: {
    width: 50,
    height: 50,
    objectFit: "contain",
    borderRadius: 50,
    marginTop: 10,
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

  slider: {
    width: "100%",
  },
  donebutton: {
    backgroundColor: "#4CAF50",
    padding: 5,
    width: "30%",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 5,
  },
  doneView: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  scrollView: {
    marginTop: 110,
    backgroundColor: "#FFFDFD",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 0,
    width: "100%",
  },
  monthContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
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
  picker: {
    borderWidth: 1,
    borderColor: "#787878",
    borderRadius: 5,
    marginBottom: 10,
    width: 130,
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
    marginTop: 10,
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
  pickerSmall: {
    fontSize: 12,
  },
  pickerItemSmall: {
    fontSize: 12,
    height: 30,
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

  activeBloodGroupText: {
    color: "#A30606",
    fontSize: 14,
    fontWeight: "bold",
  },
  maritalStatus: {
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#cccc",
    width: 120,
    height: 35,
    borderRadius: 36,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    elevation: 1,
  },
  maritalStatusText: {
    fontSize: 12,
    fontWeight: "regular",
    color: "#000",
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
  groupinputPicker: {
    borderRadius: 20,
    marginBottom: 10,
    width: "48%",
    elevation: 3,
    backgroundColor: "white",
  },
  groupinputPickers: {
    borderRadius: 20,
    marginBottom: 10,
    width: "48%",
    backgroundColor: "white",
  },
  GroupInput: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
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
    top: "50%",
    borderWidth: 1,
    borderColor: "#696C70",
    width: "90%",
    justifyContent: "center",
    left: "5%",
    paddingTop: 0,
  },
  doneButton: {
    padding: 10,
    alignItems: "flex-end",
    borderRadius: 8,
    color: "black",
  },
  doneButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  headerModal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
  },

  profileImageIcon: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
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
  saveButton: {
    backgroundColor: "#8BB85C",
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
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

  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  profileDetails: {
    display: "flex",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
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
  ProfileName: {
    fontSize: 16,
    marginTop: 10,
    color: "white",
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

  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 4,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  successText: {
    color: "#5CB85C",
  },
  errorText: {
    color: "#D9534F",
  },
  buttomTabs:{
    position:"absolute",
    bottom:0,
    width:"100%",
    zIndex:1
  }
});

export default EditProfile;
