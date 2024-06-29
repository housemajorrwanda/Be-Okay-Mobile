import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Pressable,
} from "react-native";

import {
  MaterialIcons,
  FontAwesome5,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import Modal from "react-native-modal";
import DoctorBottomTab from "../ReusableComponent/DoctorBottomTab";
import { useNavigation } from "@react-navigation/native";
import {NavigationProps} from "../../(app)/types"
const DoctorChatSupport = () => {
  const navigation = useNavigation<NavigationProps>()
  const [description, setDescription] = useState("");
  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [male, female] = useState(null);
  const [gender, setgender] = useState("yes");
  const [selectedmedicationHistory, setSelectedmedicationHistory] = useState(
    []
  );
  const [selectedDays, setSelectedDays] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setModalVisible(true);
  };

  const navigateToBack = () => {
    navigation.navigate("DoctorsDashbord");
  };

  const handleSendMessage = () => {
    if (description.trim() === "") return;
    const newMessage = { text: description, type: "sent" };
    setMessages([...messages, newMessage]);
    setDescription("");

    setTimeout(() => {
      const receivedMessage = {
        text: "Thank you for contacting us!",
        type: "received",
      };
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    }, 2000);
  };
  // Medication history
  const medicationHistory = [
    "Allergies",
    "Previous Surgeries",
    "Family illness",
    "Chronic illness",
    "Current Medication",
    "Pain Part",
  ];
  const handleMedicalHistorySelect = (medicationHistory: string) => {
    if (selectedmedicationHistory.includes(medicationHistory)) {
      setSelectedmedicationHistory(
        selectedmedicationHistory.filter((item) => item !== medicationHistory)
      );
    } else {
      setSelectedmedicationHistory([
        ...selectedmedicationHistory,
        medicationHistory,
      ]);
    }
  };

  const renderModalContent = () => {
    switch (selectedOption) {
      case "E-Prescription":
        return (
          <ScrollView>
            <View style={styles.headerIcon}>
              <Pressable style={styles.backbutton}>
                <Text style={styles.backText}>Back</Text>
              </Pressable>
              <View style={styles.refreshClosebutton}>
                <Pressable style={styles.refreshbutton}>
                  <Image source={require("../assets/Refreshbutton.png")} />
                </Pressable>
              <Pressable style={styles.closebutton} 
                            onPress={() => setSelectedOption("")}
              >
                  <Image source={require("../assets/CloseImage.png")} />
                </Pressable>
              </View>
            </View>
            <Pressable style={styles.modalView}>
              <Text style={styles.headerText}>Medical form</Text>
              <Text style={styles.modalHeader}>E-Prescription</Text>
            </Pressable>
            {/* Patient Info */}
            <View style={styles.sectionContainer}>
              <Text style={styles.patientinfoText}>Patient info</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Enter Full Name"
              />
              <View style={styles.rowContainer}>
                <TextInput
                  style={styles.inputFieldHalf}
                  placeholder="Date of birth"
                />
                <View>
                  <View style={styles.radioContainer}>
                    <Text style={styles.genderText}>Gender</Text>

                    <TouchableOpacity
                      style={[
                        styles.radio,
                        male === "yes" && styles.selectedRadio,
                      ]}
                      onPress={() => setgender("yes")}
                    >
                      <View style={styles.radioCircle}>
                        {gender === "yes" && (
                          <View style={styles.radioInnerCircle} />
                        )}
                      </View>
                      <Text style={styles.radioText}>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.radio,
                        male === "no" && styles.selectedRadio,
                      ]}
                      onPress={() => setgender("no")}
                    >
                      <View style={styles.radioCircle}>
                        {gender === "no" && (
                          <View style={styles.radioInnerCircle} />
                        )}
                      </View>
                      <Text style={styles.radioText}>Female</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.TwoFieldContainer}>
              <TextInput style={styles.inputField1} placeholder="Phone Number" />
              <TextInput style={styles.inputField2} placeholder="Email" />
              </View>
      
            </View>

            {/* Medical History */}
            <View style={styles.sectionContainer}>
              <View style={styles.section}>
                <Text style={styles.questionText}>Medical History</Text>
                <View
                  style={[styles.symptomContainer, { flexDirection: "row" }]}
                >
                  <View style={styles.verticalSymptomContainer}>
                    {medicationHistory.slice(3).map((medicationHistory) => (
                      <TouchableOpacity
                        key={medicationHistory}
                        style={[
                          styles.radio,
                          selectedmedicationHistory.includes(
                            medicationHistory
                          ) && styles.selectedRadio,
                        ]}
                        onPress={() =>
                          handleMedicalHistorySelect(medicationHistory)
                        }
                      >
                        <View style={styles.radioCircle}>
                          {selectedmedicationHistory.includes(
                            medicationHistory
                          ) && <View style={styles.radioInnerCircle} />}
                        </View>
                        <Text style={styles.radioText}>
                          {medicationHistory}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.verticalSymptomContainer}>
                    {medicationHistory.slice(0, 3).map((medicationHistory) => (
                      <TouchableOpacity
                        key={medicationHistory}
                        style={[
                          styles.radio,
                          selectedmedicationHistory.includes(
                            medicationHistory
                          ) && styles.selectedRadio,
                        ]}
                        onPress={() =>
                          handleMedicalHistorySelect(medicationHistory)
                        }
                      >
                        <View style={styles.radioCircle}>
                          {selectedmedicationHistory.includes(
                            medicationHistory
                          ) && <View style={styles.radioInnerCircle} />}
                        </View>
                        <Text style={styles.radioText}>
                          {medicationHistory}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>

            {/* Diagnosis and Medication */}
            <View style={styles.PossibleEffective}>
              <TextInput
                style={styles.inputFieldLarge}
                placeholder="Possible Diagnosis"
                multiline
              />
              <TextInput
                style={styles.inputEffective}
                placeholder="Effective Date"
              />
            </View>
            <View style={styles.addmedicationsection}>
              <TextInput
                style={styles.inputFieldSmall}
                placeholder="Add medication"
              />
              <TextInput style={styles.inputFieldSmall} placeholder="Days" />
              <TextInput
                style={styles.inputFieldSmall}
                placeholder="Refill Date"
              />
            </View>
            <View style={styles.QuantityContainer}>
               <Text style={styles.quantitytext}>
                  Quantity
              </Text>
              <View style={styles.QuantityContainerrow}>
              <TextInput style={styles.inputFieldSmallQuantity} placeholder="Morning" />
              <TextInput style={styles.inputFieldSmallQuantity} placeholder="Noon" />
              <TextInput style={styles.inputFieldSmallQuantity} placeholder="Evening" />
              </View>
            </View>

            {/* Medication List */}
            <View style={styles.medicationList}>
              <Text style={styles.medicationListtext}>Acetaminophen 20mg</Text>
              <Text style={styles.removeText}>Remove</Text>
            </View>
            <View style={styles.medicationList}>
            <Text style={styles.medicationListtext}>Acetaminophen 20mg</Text>

              <Text style={styles.removeText}>Remove</Text>
            </View>
            <View style={styles.medicationList}>
            <Text style={styles.medicationListtext}>Acetaminophen 20mg</Text>

              <Text style={styles.removeText}>Remove</Text>
            </View>

            {/* Doctor Info */}
            <View style={styles.detailsContainer}>
            <View style={{flex:1}}>
              <TextInput style={styles.inputFielddoctorDetails} placeholder="Doctor name" />
              <TextInput
                style={styles.inputFielddoctorDetails}
                placeholder="License number"
              />
              <TextInput style={styles.inputFielddoctorDetails} placeholder="Phone number" />

            {/* Notes */}
  
            </View>
            <View style={{flex:1}}>

            <TextInput
              style={styles.inputFieldNote}
              placeholder="Note"
              multiline
            />
            </View>

    

            </View>
            {/* Submit Button */}
            <View style={styles.submitbottoncontainer}>
            <Pressable style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
            </View>

          </ScrollView>
        );
      case "Lab Test":
        return (
          <ScrollView>
            <View style={styles.headerIcon}>
              <Pressable style={styles.backbutton}>
                <Text style={styles.backText}>Back</Text>
              </Pressable>
              <View style={styles.refreshClosebutton}>
                <Pressable style={styles.refreshbutton}>
                  <Image source={require("../assets/Refreshbutton.png")} />
                </Pressable>
              <Pressable style={styles.closebutton} 
                            onPress={() => setSelectedOption("")}
              >
                  <Image source={require("../assets/CloseImage.png")} />
                </Pressable>
              </View>
            </View>
            <Pressable style={styles.modalView}>
              <Text style={styles.headerText}>Medical form</Text>
              <Text style={styles.modalHeader}>Lab Test</Text>
            </Pressable>
            {/* Patient Info */}
            <View style={styles.sectionContainer}>
              <Text style={styles.patientinfoText}>Patient info</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Enter Full Name"
              />
              <View style={styles.rowContainer}>
                <TextInput
                  style={styles.inputFieldHalf}
                  placeholder="Date of birth"
                />
                <View>
                  <View style={styles.radioContainer}>
                    <Text style={styles.genderText}>Gender</Text>

                    <TouchableOpacity
                      style={[
                        styles.radio,
                        male === "yes" && styles.selectedRadio,
                      ]}
                      onPress={() => setgender("yes")}
                    >
                      <View style={styles.radioCircle}>
                        {gender === "yes" && (
                          <View style={styles.radioInnerCircle} />
                        )}
                      </View>
                      <Text style={styles.radioText}>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.radio,
                        male === "no" && styles.selectedRadio,
                      ]}
                      onPress={() => setgender("no")}
                    >
                      <View style={styles.radioCircle}>
                        {gender === "no" && (
                          <View style={styles.radioInnerCircle} />
                        )}
                      </View>
                      <Text style={styles.radioText}>Female</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.TwoFieldContainer}>
              <TextInput style={styles.inputField1} placeholder="Phone Number" />
              <TextInput style={styles.inputField2} placeholder="Email" />
              </View>
            </View>

            {/* Medical History */}
            <View style={styles.sectionContainer}>
              <View style={styles.section}>
                <Text style={styles.questionText}>Medical History</Text>
                <View
                  style={[styles.symptomContainer, { flexDirection: "row" }]}
                >
                  <View style={styles.verticalSymptomContainer}>
                    {medicationHistory.slice(3).map((medicationHistory) => (
                      <TouchableOpacity
                        key={medicationHistory}
                        style={[
                          styles.radio,
                          selectedmedicationHistory.includes(
                            medicationHistory
                          ) && styles.selectedRadio,
                        ]}
                        onPress={() =>
                          handleMedicalHistorySelect(medicationHistory)
                        }
                      >
                        <View style={styles.radioCircle}>
                          {selectedmedicationHistory.includes(
                            medicationHistory
                          ) && <View style={styles.radioInnerCircle} />}
                        </View>
                        <Text style={styles.radioText}>
                          {medicationHistory}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.verticalSymptomContainer}>
                    {medicationHistory.slice(0, 3).map((medicationHistory) => (
                      <TouchableOpacity
                        key={medicationHistory}
                        style={[
                          styles.radio,
                          selectedmedicationHistory.includes(
                            medicationHistory
                          ) && styles.selectedRadio,
                        ]}
                        onPress={() =>
                          handleMedicalHistorySelect(medicationHistory)
                        }
                      >
                        <View style={styles.radioCircle}>
                          {selectedmedicationHistory.includes(
                            medicationHistory
                          ) && <View style={styles.radioInnerCircle} />}
                        </View>
                        <Text style={styles.radioText}>
                          {medicationHistory}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>
            <View>
            <View style={styles.TwoFieldContainer}>
              <TextInput style={styles.inputField1} placeholder="Tast name" />
              <TextInput style={styles.inputField2} placeholder="Sample Test" />
              </View>
            </View>

            {/* Lab Purpose for test */}
            <View style={styles.PossibleEffective}>
              <TextInput
                style={styles.inputFieldPurpose}
                placeholder="Purpose for test"
                multiline
              />
              <TextInput
                style={styles.inputEffectivedays}
                placeholder=" Days"
              />
              <TextInput
                style={styles.inputEffectivedays}
                placeholder="Effective Date"
              />
            </View>


            {/* Medication List */}
            <View style={styles.medicationList}>
              <Text style={styles.medicationListtext}>Blood Test</Text>
              <Text style={styles.removeText}>Remove</Text>
            </View>
            <View style={styles.medicationList}>
            <Text style={styles.medicationListtext}>Blood Test</Text>


              <Text style={styles.removeText}>Remove</Text>
            </View>
            <View style={styles.medicationList}>
            <Text style={styles.medicationListtext}>Blood Test</Text>


              <Text style={styles.removeText}>Remove</Text>
            </View>

            {/* Doctor Info */}
            <View style={styles.detailsContainer}>
            <View style={{flex:1}}>
              <TextInput style={styles.inputFielddoctorDetails} placeholder="Doctor name" />
              <TextInput
                style={styles.inputFielddoctorDetails}
                placeholder="License number"
              />
              <TextInput style={styles.inputFielddoctorDetails} placeholder="Phone number" />

            {/* Notes */}
  
            </View>
            <View style={{flex:1}}>

            <TextInput
              style={styles.inputFieldNote}
              placeholder="Note"
              multiline
            />
            </View>

    

            </View>
            {/* Submit Button */}
            <View style={styles.submitbottoncontainer}>
            <Pressable style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
            </View>

          </ScrollView>
        );
      case "Medical Recommendation":
        return (
          <ScrollView>
            <View style={styles.headerIcon}>
              <Pressable style={styles.backbutton}>
                <Text style={styles.backText}>Back</Text>
              </Pressable>
              <View style={styles.refreshClosebutton}>
                <Pressable style={styles.refreshbutton}>
                  <Image source={require("../assets/Refreshbutton.png")} />
                </Pressable>
                <Pressable
                  style={styles.closebutton}
                  onPress={() => setSelectedOption("")}
                >
                  <Image source={require("../assets/CloseImage.png")} />
                </Pressable>
              </View>
            </View>
            <Pressable style={styles.modalView}>
              <Text style={styles.headerText}>Medical form</Text>
              <Text style={styles.modalHeader}>Medical Recommendation</Text>
            </Pressable>
            {/* Patient Info */}
            <View style={styles.sectionContainer}>
              <Text style={styles.patientinfoText}>Patient info</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Enter Full Name"
              />
              <View style={styles.rowContainer}>
                <TextInput
                  style={styles.inputFieldHalf}
                  placeholder="Date of birth"
                />
                <View>
                  <View style={styles.radioContainer}>
                    <Text style={styles.genderText}>Gender</Text>

                    <TouchableOpacity
                      style={[
                        styles.radio,
                        male === "yes" && styles.selectedRadio,
                      ]}
                      onPress={() => setgender("yes")}
                    >
                      <View style={styles.radioCircle}>
                        {gender === "yes" && (
                          <View style={styles.radioInnerCircle} />
                        )}
                      </View>
                      <Text style={styles.radioText}>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.radio,
                        male === "no" && styles.selectedRadio,
                      ]}
                      onPress={() => setgender("no")}
                    >
                      <View style={styles.radioCircle}>
                        {gender === "no" && (
                          <View style={styles.radioInnerCircle} />
                        )}
                      </View>
                      <Text style={styles.radioText}>Female</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.TwoFieldContainer}>
                <TextInput
                  style={styles.inputField1}
                  placeholder="Phone Number"
                />
                <TextInput style={styles.inputField2} placeholder="Email" />
              </View>
            </View>

            {/* Medical History */}
            <View style={styles.sectionContainer}>
              <View style={styles.section}>
                <Text style={styles.questionText}>Medical History</Text>
                <View
                  style={[styles.symptomContainer, { flexDirection: "row" }]}
                >
                  <View style={styles.verticalSymptomContainer}>
                    {medicationHistory.slice(3).map((medicationHistory) => (
                      <TouchableOpacity
                        key={medicationHistory}
                        style={[
                          styles.radio,
                          selectedmedicationHistory.includes(
                            medicationHistory
                          ) && styles.selectedRadio,
                        ]}
                        onPress={() =>
                          handleMedicalHistorySelect(medicationHistory)
                        }
                      >
                        <View style={styles.radioCircle}>
                          {selectedmedicationHistory.includes(
                            medicationHistory
                          ) && <View style={styles.radioInnerCircle} />}
                        </View>
                        <Text style={styles.radioText}>
                          {medicationHistory}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.verticalSymptomContainer}>
                    {medicationHistory.slice(0, 3).map((medicationHistory) => (
                      <TouchableOpacity
                        key={medicationHistory}
                        style={[
                          styles.radio,
                          selectedmedicationHistory.includes(
                            medicationHistory
                          ) && styles.selectedRadio,
                        ]}
                        onPress={() =>
                          handleMedicalHistorySelect(medicationHistory)
                        }
                      >
                        <View style={styles.radioCircle}>
                          {selectedmedicationHistory.includes(
                            medicationHistory
                          ) && <View style={styles.radioInnerCircle} />}
                        </View>
                        <Text style={styles.radioText}>
                          {medicationHistory}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View style={styles.TwoFieldContainer}>
                <TextInput
                  style={styles.inputField1}
                  placeholder="Recommendation"
                />
                <TextInput style={styles.inputField2} placeholder="Email" />
              </View>
            </View>

            {/*Two period for selecting day, month and years with their numerical number*/}
            <View>
              <View>
              <Text style={styles.periodText}>
                  Period
                </Text>
              </View>
              <View>
   
              </View>
              <View style={styles.PeriodContainer}>
              <TextInput
                  style={styles.inputPeriod1}
                  placeholder="Enter Period"
                />
                <TextInput style={styles.inputPeriod1} placeholder="Frequency" />
              </View>

            </View>

            {/* Medication List */}
            <View style={styles.medicationList}>
              <Text style={styles.medicationListtext}>Kinestherapy </Text>
              <Text style={styles.removeText}>Remove</Text>
            </View>
            <View style={styles.medicationList}>
              <Text style={styles.medicationListtext}>Kinestherapy </Text>

              <Text style={styles.removeText}>Remove</Text>
            </View>
            <View style={styles.medicationList}>
              <Text style={styles.medicationListtext}>Kinestherapy</Text>

              <Text style={styles.removeText}>Remove</Text>
            </View>

            {/* Doctor Info */}
            <View style={styles.detailsContainer}>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={styles.inputFielddoctorDetails}
                  placeholder="Doctor name"
                />
                <TextInput
                  style={styles.inputFielddoctorDetails}
                  placeholder="License number"
                />
                <TextInput
                  style={styles.inputFielddoctorDetails}
                  placeholder="Phone number"
                />

                {/* Notes */}
              </View>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={styles.inputFieldNote}
                  placeholder="Note"
                  multiline
                />
              </View>
            </View>
            {/* Submit Button */}
            <View style={styles.submitbottoncontainer}>
              <Pressable style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </Pressable>
            </View>
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateToBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>consultation</Text>
      </View>

      <View style={styles.headerIcons}>
        <View style={styles.chatSupportContainer}>
          <Image
            source={require("../assets/doctorchat.png")}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>Dr. Frank</Text>
            <Text style={styles.chatSupportText}>12h:30 - 17h:30</Text>
          </View>
        </View>
        <View style={styles.iconConatainer}>
          <TouchableOpacity style={styles.leaveButton}>
            <Text style={styles.leaveButtonText}>Leave</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.callIcons}>
            <Ionicons name="call" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.callIcons}>
            <Ionicons name="videocam" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Support Section */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.medicationContainer}>
          <Text style={styles.medicationText}>
            Press the bottle to add medication for the patient
          </Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={require("../assets/bottle-icon.png")}
              style={styles.bottleIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Message Display Section */}
        <View style={styles.messagesContainer}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                message.type === "sent"
                  ? styles.sentMessage
                  : styles.receivedMessage,
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Input Section for Sending Messages */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Say something"
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity style={styles.iconButton}>
          <Text>
            <Entypo name="camera" size={20} color="#fff" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.voiceNoteButton}>
          <FontAwesome5 name="microphone" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <MaterialIcons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Select Option</Text>
            <Pressable  onPress={() => setModalVisible(false)} >
            <Image source={require("../assets/CloseImage.png")} />

            </Pressable>

            <TouchableOpacity
              onPress={() => handleSelectOption("E-Prescription")}
              style={styles.optionButton}
            >
              <Text style={styles.optionText}>E-Prescription</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSelectOption("Lab Test")}
              style={styles.optionButton}
            >
              <Text style={styles.optionText}>Lab Test</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSelectOption("Medical Recommendation")}
              style={styles.optionButton}
            >
              <Text style={styles.optionText}>Medical Recommendation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Conditional Modal Content */}
      <Modal
        isVisible={!!selectedOption}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={() => setSelectedOption("")}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {renderModalContent()}
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation Tabs */}
      <DoctorBottomTab />
    </View>
  );
};

export default DoctorChatSupport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0C7751",
    padding: 15,
    zIndex: 1,
    marginBottom: 10,
    gap: 20,
  },
  headerTitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "regular",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 20,
    paddingLeft: 20,
  },
  leaveButton: {
    backgroundColor: "#8C1D18",
    borderRadius: 25,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  leaveButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  chatSupportContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#E6FFCC",
    borderRadius: 20,
  },
  doctorDetailsContainer:{
    flexDirection:"row",
    width:"100%",
    justifyContent:"space-between"
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  chatSupportText: {
    fontSize: 10,
    color: "#818181",
  },
  medicationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEFFDC",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  medicationText: {
    fontSize: 14,
    color: "#777",
    width: "40%",
  },
  bottleIcon: {
    width: 57,
    height: 55,
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  sentMessage: {
    backgroundColor: "#e0ffe0",
    alignSelf: "flex-end",
  },
  receivedMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 14,
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 75,
    left: 10,
    right: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  sendButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0C7751",
    padding: 8,
    borderRadius: 50,
    height: 36,
    width: 36,
  },
  voiceNoteButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0C7751",
    borderRadius: 18,
    height: 36,
    width: 36,
  },
  iconButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0C7751",
    borderRadius: 18,
    height: 36,
    width: 36,
  },
  callIcons: {
    backgroundColor: "#0C7751",
    padding: 6,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  iconConatainer: {
    flexDirection: "row",
    gap: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 0,
    alignItems: "center",
    paddingTop: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  modalView: {
    backgroundColor: "#0C7751",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
    height: 40,
    borderRadius: 8,
  },
  section: {
    // marginBottom: 10,
  },
  patientinfoText: {
    fontSize: 12,
    fontWeight: "medium",
    marginBottom: 5,
  },
  modalHeader: {
    fontSize: 12,
    color: "white",
    fontWeight: "regular",
  },
  optionButton: {
    padding: 10,
    backgroundColor: "#e0f7fa",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
  optionText: {
    fontSize: 16,
    color: "#00796b",
  },
  closeButton: {
    backgroundColor: "#8C1D18",
  },
  modalContent: {
    width: "100%",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#0C7751",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    width:120,
    alignItems:"center",
    marginBottom:10
  },
  submitbottoncontainer:{
    // backgroundColor:"red",
    alignItems:"center"
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },

  sectionContainer: {
    // marginBottom: 3,
  },
  doctorDetails:{
    flexDirection:"column"
  },
  addmedicationsection:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:10

  },
  PossibleEffective:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between"

  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: "medium",
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  QuantityContainer:{
display:"flex",
flexDirection:"row"
  },
  QuantityContainerrow:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center",
    marginBottom:5
  },
  quantitytext:{
    color:"#58565D",
    fontSize:10,
    fontWeight:"medium",
    alignItems:"center",
    marginTop:5
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#0C7751",
    borderRadius: 8,
    // padding: 2,
    marginBottom: 10,
    width: "100%",
    paddingLeft: 10,
        fontSize:10,
    fontWeight:"medium"
  },
  TwoFieldContainer:{
flexDirection:"row",
justifyContent:"space-between"
  },
  inputField1:{
    borderWidth: 1,
    borderColor: "#0C7751",
    borderRadius: 8,
    // padding: 2,
    marginBottom: 10,
    width: "48%",
    paddingLeft: 10,
        fontSize:10,
    fontWeight:"medium"
  },
  inputField2:{
    borderWidth: 1,
    borderColor: "#0C7751",
    borderRadius: 8,
    // padding: 2,
    marginBottom: 10,
    width: "48%",
    paddingLeft: 10,
        fontSize:10,
    fontWeight:"medium"
  },
  inputPeriod1:{
    borderWidth: 1,
    borderColor: "#0C7751",
    borderRadius: 8,
    // padding: 2,
    marginBottom: 10,
    width: "48%",
    paddingLeft: 10,
        fontSize:10,
    fontWeight:"medium"
  },
  inputFielddoctorDetails:{
    borderWidth: 1,
    borderColor: "#0C7751",
    borderRadius: 8,
    paddingLeft: 10,
    fontSize:10,
fontWeight:"medium",
marginBottom:5,
width:"96%"
  },
  inputFieldHalf: {
    borderWidth: 1,
    borderColor: "#0C7751",
    borderRadius: 8,
    marginBottom: 10,
    width: "48%",
    paddingLeft: 10,
    fontSize:10,
    fontWeight:"medium"
  },
  inputEffective:{
    borderWidth: 1,
    borderColor: "#0C7751",
    borderRadius: 8,
    height:25,
    width:"30%",
    paddingLeft:3,
    fontSize:10,
    fontWeight:"medium"
  },
  inputaddmedication:{
    borderWidth: 1,
    borderColor: "#0C7751",
    borderRadius: 8,
    height:25,
    paddingLeft:3,
    fontSize:10,
    fontWeight:"medium",
    justifyContent:"space-between"
  },
  inputFieldSmall: {
    borderWidth: 1,
    borderColor: "#0C7751",
    borderRadius: 8,
    height:25,
    paddingLeft:3,
    fontSize:10,
    fontWeight:"medium",
    width:"32%",

  },
  inputFieldSmallQuantity:{
    borderWidth: 1,
    borderColor: "#0C7751",
    borderRadius: 8,
    height:25,
    paddingLeft:3,
    fontSize:10,
    fontWeight:"medium",
    width:"25%",
    marginRight:5,
marginLeft:5,
  },
  inputFieldLarge: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 70,
    textAlignVertical: "top",
    width: "65%",
  },
  inputFieldPurpose:{
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 70,
    textAlignVertical: "top",
    width: "50%",
  },
  inputEffectivedays:{
    borderWidth: 1,
    borderColor: "#0C7751",
    borderRadius: 8,
    height:25,
    paddingLeft:3,
    fontSize:10,
    fontWeight:"medium",
    width:"23%",
  },
  genContainer:{
    display:"flex",
    flexDirection:"row",
    gap:10,
    alignItems:"center",
    // justifyContent:"space-between"
  },
  periodText:{
    fontSize:10
  },
  inputFieldNote:{
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 100,
    textAlignVertical: "top",
    width: "100%",
  },
  detailsContainer:{
flexDirection:"row",
justifyContent:"space-between",
  },
  genderText: {
    marginRight: 5,
    fontSize: 10,
  },
  genderOption: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 2,
  },
  medicationList: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap:30
  },
  medicationListtext:{
    fontSize:10,
    fontWeight:"medium"
  },
  removeText: {
    color: "#A30606",
    fontSize:10,
    fontWeight:"regular"
    },
  backbutton: {
    backgroundColor: "#0C7751",
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    borderRadius: 10,
  },
  backText: {
    color: "white",
  },
  headerIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  refreshClosebutton: {
    flexDirection: "row",
    gap: 10,
  },
  refreshbutton: {
    backgroundColor: "#E3FFFC",
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  closebutton: {
    backgroundColor: "#E3FFFC",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  radioContainer: {
    flexDirection: "row",
    marginBottom: 0,
  },
  radio: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 3,
  },
  selectedRadio: {
    borderColor: "red",
  },
  radioCircle: {
    height: 15,
    width: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D9F4BD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "#D9F4BD",
    marginBottom:5

  },
  radioInnerCircle: {
    height: 8,
    width: 8,
    borderRadius: 6,
    backgroundColor: "#93BD68",

  },
  radioText: {
    fontSize: 10,
    color: "black",
    marginBottom:5

  },
  questionText: {
    fontSize: 12,
    color: "#787878",
    marginBottom: 10,
    fontWeight: "regular",
  },
  symptomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  verticalSymptomContainer: {
    width: "48%",
  },
  PeriodContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between"
  }
});
