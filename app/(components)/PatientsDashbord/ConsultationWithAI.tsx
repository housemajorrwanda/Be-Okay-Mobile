import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import {NavigationProps} from "../../(app)/types"

import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { SelectList } from "react-native-dropdown-select-list";
import BottomTabs1 from "../ReusableComponent/BottomTabs1";
const ConsultationWithAI = () => {
  const navigation = useNavigation<NavigationProps>()

  const [activeTab, setActiveTab] = useState("Consultation");
  const [consultedDoctor, setConsultedDoctor] = useState("yes");
  const [pregnant, setpregnant] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [agree, setAgree] = useState(false);
  const [painDuration, setPainDuration] = useState(3);
  const [painDurationUnit, setPainDurationUnit] = useState("days");
  const [selected, setSelected] = React.useState("");

  const unitLimits = {
    days: { min: 1, max: 30 },
    months: { min: 1, max: 12 },
    years: { min: 1, max: 10 },
    decades: { min: 1, max: 5 },
  };

  const data = [
    { key: "1", value: "Allergies" },
    { key: "2", value: "Pollen" },
    { key: "3", value: "Dust" },
    { key: "4", value: "Peanuts" },
  ];
  const FamilydiseaseData = [
    { key: "1", value: "Diabetes" },
    { key: "2", value: "Hypertension" },
    { key: "3", value: "Heart Disease" },
  ];

  const AddictionhabitsData = [
    { key: "1", value: "Smoking" },
    { key: "2", value: "Alcohol" },
    { key: "3", value: "Drugs" },
  ];
  const PainDurationUnitData = [
    { key: "1", value: "Days" },
    { key: "2", value: "Months" },
    { key: "3", value: "Years" },
    { key: "4", value: "Decades" },
  ];
  // painDurationUnit
  const symptoms = [
    "hot",
    "fatigue",
    "vomiting",
    "headache",
    "No Appetite",
    "cough",
    "cantSleep",
    "weightLoss",
    "sneezing",
    "dryMouth",
  ];

  const navigateToBack = () => {
    navigation.navigate("Consultation");
  };



  const handleSymptomSelect = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((item) => item !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const navigateToConsultationResult=()=>{
    navigation.navigate("ConsultationResult")
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateToBack} style={styles.backButton}>
          <AntDesign name="arrowleft" style={styles.backButtonText} />
          <Text style={styles.headerIllness}>Consultation</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.ContentContainer}>
          <View style={styles.section}>
            <Text style={styles.infoText}>
              You're going to take a consultation with AI
            </Text>
            <View style={styles.aiResponseContainer}>
              <Text style={styles.aiResponseText}>
                Automated AI provide accurate solution 98% Based on the
                information and illness details you provide.%
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Did you consult with a Doctor?
            </Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={[
                  styles.radio,
                  pregnant === "yes" && styles.selectedRadio,
                ]}
                onPress={() => setConsultedDoctor("yes")}
              >
                <View style={styles.radioCircle}>
                  {consultedDoctor === "yes" && (
                    <View style={styles.radioInnerCircle} />
                  )}
                </View>
                <Text style={styles.radioText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radio,
                  pregnant === "no" && styles.selectedRadio,
                ]}
                onPress={() => setConsultedDoctor("no")}
              >
                <View style={styles.radioCircle}>
                  {consultedDoctor === "no" && (
                    <View style={styles.radioInnerCircle} />
                  )}
                </View>
                <Text style={styles.radioText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.questionText}>Describe your illness</Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe your illness"
            />
          </View>
          <View style={styles.section}>
            <View style={styles.searchInputContainer1}>
              <View style={styles.searchIconConatiner}>
                <AntDesign
                  name="search1"
                  size={20}
                  color="#aaa"
                  style={styles.searchIcon}
                />
              </View>

              <TextInput
                style={styles.searchInput}
                placeholder="Type previous illness"
              />
            </View>

            <View style={styles.searchInputContainer2}>
              <View style={styles.searchIconConatiner}>
                <AntDesign
                  name="search1"
                  size={20}
                  color="#aaa"
                  style={styles.searchIcon}
                />
              </View>

              <TextInput
                style={styles.searchInput}
                placeholder="Type Previous treatment"
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.questionText}>Symptoms & vital signs</Text>
            <View style={styles.symptomContainer}>
              <View style={styles.verticalSymptomContainer}>
                {symptoms.slice(0, 5).map((symptom) => (
                  <TouchableOpacity
                    key={symptom}
                    style={[
                      styles.radio,
                      selectedSymptoms.includes(symptom) &&
                        styles.selectedRadio,
                    ]}
                    onPress={() => handleSymptomSelect(symptom)}
                  >
                    <View style={styles.radioCircle}>
                      {selectedSymptoms.includes(symptom) && (
                        <View style={styles.radioInnerCircle} />
                      )}
                    </View>
                    <Text style={styles.radioText}>{symptom}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.verticalSymptomContainer}>
                {symptoms.slice(5).map((symptom) => (
                  <TouchableOpacity
                    key={symptom}
                    style={[
                      styles.radio,
                      selectedSymptoms.includes(symptom) &&
                        styles.selectedRadio,
                    ]}
                    onPress={() => handleSymptomSelect(symptom)}
                  >
                    <View style={styles.radioCircle}>
                      {selectedSymptoms.includes(symptom) && (
                        <View style={styles.radioInnerCircle} />
                      )}
                    </View>
                    <Text style={styles.radioText}>{symptom}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.section}>
            <SelectList
              setSelected={(val: React.SetStateAction<string>) =>
                setSelected(val)
              }
              dropdownItemStyles={{ backgroundColor: "#93BD68" }}
              data={data}
              save="value"
              placeholder="Select Deseases"
              dropdownTextStyles={{ color: "white" }}
              dropdownStyles={{
                backgroundColor: "#93BD68",
                borderColor: "#93BD68",
                maxHeight: 160,
              }}
            />
          </View>

          <View style={styles.section}>
            <SelectList
              setSelected={(val: React.SetStateAction<string>) =>
                setSelected(val)
              }
              dropdownItemStyles={{ backgroundColor: "#93BD68" }}
              data={data}
              save="value"
              placeholder="current treatment"
              dropdownTextStyles={{ color: "white" }}
              dropdownStyles={{
                backgroundColor: "#93BD68",
                borderColor: "#93BD68",
                maxHeight: 160,
              }}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.questionText}>Are you Pregnant</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={[
                  styles.radio,
                  consultedDoctor === "yes" && styles.selectedRadio,
                ]}
                onPress={() => setpregnant("yes")}
              >
                <View style={styles.radioCircle}>
                  {consultedDoctor === "yes" && (
                    <View style={styles.radioInnerCircle} />
                  )}
                </View>
                <Text style={styles.radioText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radio,
                  consultedDoctor === "no" && styles.selectedRadio,
                ]}
                onPress={() => setpregnant("no")}
              >
                <View style={styles.radioCircle}>
                  {consultedDoctor === "no" && (
                    <View style={styles.radioInnerCircle} />
                  )}
                </View>
                <Text style={styles.radioText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={styles.questionText}>Pain Duration</Text>
            <View style={styles.DataPickerContainer}>
              <View style={styles.picker}>
                <Picker
                  selectedValue={painDurationUnit}
                  
                  onValueChange={(itemValue) => {
                    setPainDurationUnit(itemValue);
                    setPainDuration(unitLimits[itemValue].min);
                  }}
                >
                  <Picker.Item label="Days" value="days" />
                  <Picker.Item label="Months" value="months" />
                  <Picker.Item label="Years" value="years" />
                  <Picker.Item label="Decades" value="decades" />
                </Picker>

              </View>
              <View>
                <Slider
                  style={styles.slider}
                  minimumValue={unitLimits[painDurationUnit].min}
                  maximumValue={unitLimits[painDurationUnit].max}
                  step={1}
                  value={painDuration}
                  onValueChange={setPainDuration}
                  minimumTrackTintColor="#92E3A9"
                  maximumTrackTintColor="#000000"
                  thumbTintColor="#92E3A9"
                />
              </View>
            </View>
            <View>
            <Text style={styles.painDurationText}>
                  {painDuration}{" "}
                  {painDurationUnit.charAt(0).toUpperCase() +
                    painDurationUnit.slice(1)}
                </Text>
            </View>
          </View>

          <View style={styles.section}>
            <SelectList
              setSelected={(val: React.SetStateAction<string>) =>
                setSelected(val)
              }
              dropdownItemStyles={{ backgroundColor: "#93BD68" }}
              data={FamilydiseaseData}
              save="value"
              placeholder="Select Any Famaily disease"
              dropdownTextStyles={{ color: "white" }}
              dropdownStyles={{
                backgroundColor: "#93BD68",
                borderColor: "#93BD68",
                maxHeight: 160,
              }}
            />
          </View>
          <View style={styles.section}>
            <SelectList
              setSelected={(val: React.SetStateAction<string>) =>
                setSelected(val)
              }
              dropdownItemStyles={{ backgroundColor: "#93BD68" }}
              data={AddictionhabitsData}
              save="value"
              placeholder="Addiction habits"
              dropdownTextStyles={{ color: "white" }}
              dropdownStyles={{
                backgroundColor: "#93BD68",
                borderColor: "#93BD68",
                maxHeight: 160,
              }}
            />
          </View>
          <View style={styles.section}>
            <View style={styles.agreementContainer}>
              <View style={styles.switch}>
                <Switch
                  value={agree}
                  onValueChange={setAgree}
                  trackColor={{ false: "#D9F4BD", true: "#D9F4BD" }}
                  thumbColor={agree ? "#93BD68" : "#93BD68"}
                />
              </View>

              <Text style={styles.agreementText}>
                I agree to the terms and conditions
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={navigateToConsultationResult}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomTabs1 activeTab="Home"/>
    </View>
  );
};

export default ConsultationWithAI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 140,
    marginTop: 80,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#93BD68",
    padding: 15,
    paddingBottom: 10,
    paddingTop: 30,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 1,
  },
  headerIllness: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 2,
  },
  backButtonText: {
    fontSize: 20,
    color: "white",
  },
  ContentContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
    marginBottom: 10,
  },
  aiResponseContainer: {
    backgroundColor: "#21C074",
    padding: 15,
    borderRadius: 5,
  },
  aiResponseText: {
    color: "white",
    fontSize: 14,
  },
  questionText: {
    fontSize: 12,
    color: "#787878",
    marginBottom: 10,
    fontWeight: "regular",
  },
  
  radioContainer: {
    flexDirection: "row",
    marginBottom: 0,
  },
  radio: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
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
  },
  radioInnerCircle: {
    height: 8,
    width: 8,
    borderRadius: 6,
    backgroundColor: "#93BD68",
  },
  radioText: {
    fontSize: 16,
    color: "black",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
    height: 100,
    marginBottom: 0,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 10,
    padding: 10,
  },
  searchInputContainer2: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    paddingRight: 0,
    marginBottom: 0,
  },
  searchInputContainer1: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    paddingRight: 0,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: -10,
  },
  searchInput: {
    flex: 1,
    height: 25,
  },
  symptomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  verticalSymptomContainer: {
    width: "48%",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#787878",
    borderRadius: 5,
    marginBottom: 10,
    width: 130,
  },
  bottomTabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#f0f8ff",
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: "#222",
  },
  activeTabText: {
    color: "#93BD68",
  },
  searchIconConatiner: {
    position: "relative",
    left: 330,
  },
  slider: {
    width: 250,
    height: 30,
    padding: 2,
    borderRadius: 50,
  },
  sliderText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },
  agreementContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  agreementText: {
    marginLeft: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#93BD68",
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
  },
  switch: {
    backgroundColor: "#D9F4BD",
    paddingRight:10,
    height:30,
    justifyContent:"center",
    borderRadius:24,
    alignItems:"center",
    paddingBottom:2,
    paddingLeft:10,

  },
  painDureationContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  DataPickerContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  painDurationText:{
    padding:2,
    paddingBottom:10,
    paddingLeft:10,
    fontSize:15,
    fontWeight:"bold",
    color:"#787878"
  }
});
