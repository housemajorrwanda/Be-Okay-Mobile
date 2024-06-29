import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import CheckBox from "react-native-check-box";
import { AntDesign } from "@expo/vector-icons";
import { AirbnbRating } from "react-native-ratings";
import BottomTabs1 from "../ReusableComponent/BottomTabs1";

const PaymentResult = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);

  const [issues, setIssues] = useState({
    doctorsIssues: false,
    aiAccuracyError: false,
    appResponse: false,
    otherIssues: "",
  });

  const handleRating = (rating) => {
    setSelectedRating(rating);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleCheckboxChange = (issue) => {
    setIssues((prev) => ({
      ...prev,
      [issue]: !prev[issue],
    }));
  };
  const isSubmitDisabled = selectedRating !== 1;
  const isRateDisabled = selectedRating === null || selectedRating < 1;

  return (
    <View style={styles.container}>
      {/* Header with back button and title */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}>
          <AntDesign name="arrowleft" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Consultation Results</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Doctor and Illness Information */}
        <View style={styles.illnessContainer}>
          <Text style={styles.doctorTitle}>Dr. Emile Results</Text>
          <View style={styles.illnessDetailsContainer}>
            <Text style={styles.illnessTitle}>Illness Details</Text>
            <Text style={styles.illnessName}>Fabry Disease</Text>
            <Text style={styles.illnessDescription}>
              Fabry disease is a rare genetic disease that is passed down
              through your family. It affects organs all around your body,
              including your heart, brain and kidneys, and can cause them to get
              less blood than they need. Over time, this can cause chronic
              kidney disease or kidney failure.
            </Text>
          </View>

          {/* Recommended Medication */}
          <View style={styles.medicationContainer}>
            <View style={styles.recomendations}>
              <Image source={require("../assets/Drug.png")} />
              <Text style={styles.recommendationTitle}>
                Recommended Medication
              </Text>
            </View>

            <View style={styles.medicationList}>
              {["ACE inhibitors", "Ibuprofen", "Naproxen"].map(
                (medication, index) => (
                  <View key={index} style={styles.medicationPill}>
                    <Text style={styles.medicationText}>{medication}</Text>
                  </View>
                )
              )}
            </View>
          </View>
        </View>

        {/* Recommended Doctors */}
        <View style={styles.recommendedDoctorsContainer}>
          <View style={styles.recommendationHeader}>
            <Text style={styles.recommendationTitle}>Recommended Doctors</Text>
            <View style={styles.atleastseemore}>
              <Text style={styles.consultationReminder}>
                consult a doctor at least in 3 days
              </Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreText}>see more</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.doctorsScroll}
          >
            {[
              "Dr. Jules",
              "Dr. James",
              "Dr. Anne",
              "Dr. Jeanne",
              "Dr. J",
              "Dr Chriss",
            ].map((doctor, index) => (
              <View key={index} style={styles.doctorCircle}>
                <Image
                  source={require("../assets/checkProfile.png")}
                  style={styles.doctorImage}
                />
                <Text style={styles.doctorName}>{doctor}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Pharmacy Information */}
          <View style={styles.pharmacyContainer}>
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <View key={index} style={styles.pharmacyCard}>
                  <View style={styles.pharmacyInfo}>
                    <View>
                      <Text style={styles.pharmacyName}>VIVA Pharmacy</Text>
                      <View style={styles.pharmacyRow}>
                        <Text style={styles.pharmacyDistance}>500 m</Text>
                        <Text style={styles.pharmacyStatus}>Open</Text>
                      </View>
                    </View>

                    <View>
                      <View>
                        <Text style={styles.pharmacyName}>
                          The cure Pharmacy
                        </Text>
                      </View>
                      <View style={styles.pharmacyRow}>
                        <Text style={styles.pharmacyDistance}>1.5 Km</Text>
                        <Text style={styles.pharmacyOpening}>
                          Open till 20H
                        </Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => setIsModalVisible(true)}
                  >
                    <Text style={styles.bookButtonText}>Book appointment</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>

      {/* Rating Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.rateServiceHeader}>
              <Text style={styles.modalText}>Rate our service</Text>
            </View>

            <AirbnbRating
              count={5}
              reviews={["Very Poor", "Good", "Good", "Good", "Good"]}
              defaultRating={0}
              size={20}
              onFinishRating={(rating) => handleRating(rating)}
            />

            {selectedRating === 1 && (
              <View style={styles.checkboxContainer}>
                <View style={styles.checkRow}>
                  <CheckBox
                    isChecked={issues.doctorsIssues}
                    onClick={() => handleCheckboxChange("doctorsIssues")}
                  />
                  <Text>Doctor's Issues</Text>
                </View>
                <View style={styles.checkRow}>
                  <CheckBox
                    isChecked={issues.aiAccuracyError}
                    onClick={() => handleCheckboxChange("aiAccuracyError")}
                  />
                  <Text>AI Accuracy Error</Text>
                </View>
                <View style={styles.checkRow}>
                  <CheckBox
                    isChecked={issues.appResponse}
                    onClick={() => handleCheckboxChange("appResponse")}
                  />
                  <Text>App Response and Crashing</Text>
                </View>
                <TextInput
                  style={styles.feedbackInput}
                  onChangeText={(text) =>
                    setIssues((prev) => ({ ...prev, otherIssues: text }))
                  }
                  value={issues.otherIssues}
                  placeholder="Other issues"
                  placeholderTextColor="black"
                />
              </View>
            )}

            <View style={styles.submitView}>
              {selectedRating === 1 ? (
                <TouchableOpacity
                  onPress={() => closeModal()}
                  style={styles.submitButton}
                >
                  <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => closeModal()}
                    style={styles.notNowButton}
                  >
                    <Text style={styles.notNowText}>Not Now</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleRating(selectedRating)}
                    style={[
                      styles.rateButton,
                      !isRateDisabled
                        ? styles.rateButtonActive
                        : styles.rateButtonDisabled,
                    ]}
                    disabled={isRateDisabled}
                  >
                    <Text
                      style={[
                        styles.rateButtonText,
                        isRateDisabled && styles.rateButtonTextDisabled,
                      ]}
                    >
                      Rate
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>

      <View>
        <BottomTabs1 activeTab="Home" />
      </View>
    </View>
  );
};

export default PaymentResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#93BD68",
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 50,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  scrollContainer: {
    paddingBottom: 0,
  },
  illnessContainer: {
    padding: 15,
    borderRadius: 10,
    paddingBottom: 0,
  },
  doctorTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  illnessDetailsContainer: {
    marginBottom: 15,
  },
  illnessTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  illnessName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 5,
  },
  illnessDescription: {
    fontSize: 12,
    color: "#777",
    lineHeight: 18,
  },
  medicationContainer: {
    marginBottom: 15,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#757575",
    marginBottom: 5,
  },
  medicationList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  medicationPill: {
    paddingVertical: 5,
    paddingHorizontal: 3,
    marginRight: 10,
    borderWidth: 1,
    borderBottomColor: "black",
    borderTopColor: "white",
    borderRightColor: "white",
    borderLeftColor: "white",
  },
  medicationText: {
    fontSize: 12,
    color: "#333",
  },
  recommendedDoctorsContainer: {
    padding: 15,
    paddingTop: 0,
  },
  recommendationHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  consultationReminder: {
    fontSize: 12,
    color: "#757575",
  },
  seeMoreText: {
    fontSize: 12,
    color: "#63A81C",
  },
  doctorsScroll: {
    flexDirection: "row",
    marginBottom: 15,
  },
  doctorCircle: {
    alignItems: "center",
    marginRight: 15,
  },
  doctorImage: {
    width: 56,
    height: 56,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#93BD68",
    objectFit: "contain",
  },
  doctorName: {
    fontSize: 10,
    color: "#333",
    marginTop: 5,
  },
  pharmacyContainer: {
    marginTop: 10,
  },
  pharmacyCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  pharmacyInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
  },
  pharmacyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  pharmacyName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginRight: 5,
  },
  pharmacyDistance: {
    fontSize: 10,
    color: "#9D9D9D",
    marginRight: 5,
  },
  pharmacyStatus: {
    fontSize: 10,
    color: "#9D9D9D",
    marginRight: 5,
  },
  pharmacyOpening: {
    fontSize: 10,
    color: "#9D9D9D",
  },
  bookButton: {
    backgroundColor: "#93BD68",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  bookButtonText: {
    color: "white",
    fontSize: 12,
  },
  bottomTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    width: "70%",
  },
  rateServiceHeader: {
    backgroundColor: "#93BD68",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  modalText: {
    marginBottom: 24,
    color: "white",
    fontWeight: "bold",
  },
  feedbackInput: {
    height: 40,
    width: "120%",
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    margin: 5,
    marginTop: 40,
    borderRadius: 10,
  },
  checkboxContainer: {
    marginBottom: 15,
    alignItems: "flex-start",
    width: "80%",
    padding: 20,
    paddingLeft: 30,
  },
  recomendations: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  atleastseemore: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 5,
    marginBottom: 10,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  submitButton: {
    backgroundColor: "#93BD68",
    width: "80%",
    alignItems: "center",
    padding: 7,
    borderRadius: 20,
    justifyContent: "center",
  },
  submitView: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
  },
  submitText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  notNowButton: {
    borderRadius: 5,
    flex: 1,
    paddingLeft: 150,
  },
  notNowText: {
    fontWeight: "bold",
    color: "black",
  },
  rateButton: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  rateButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  rateButtonTextDisabled: {
    backgroundColor: "#fff",
    color: "#a0a0a0",
  },
  rateButtonDisabled: {
    backgroundColor: "#fff",
  },
  rateButtonActive: {
    backgroundColor: "#fff",
  },
});
