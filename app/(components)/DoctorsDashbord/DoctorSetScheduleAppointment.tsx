import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import Header from "../ReusableComponent/Header";
import DoctorBottomTab from "../ReusableComponent/DoctorBottomTab";
import AsyncStorage from "@react-native-async-storage/async-storage";
const DoctorSetScheduleAppointment = () => {
  const [selectedTab, setSelectedTab] = useState("Appointment");
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedDays, setSelectedDays] = useState([
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
  ]);
  const [fromTime, setFromTime] = useState("04:30");
  const [toTime, setToTime] = useState("09:30");
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [isFromTime, setIsFromTime] = useState(true);
  const [startingDate, setStartingDate] = useState(null);
  const [endingDate, setEndingDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleDayPress = (day) => {
    const today = new Date();
    const selectedDay = new Date(day.timestamp);

    if (selectedDay.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
      Alert.alert("Invalid Date", "You cannot select a past date.");
      return;
    }

    if (selectedDay.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
      if (
        selectedDay.getHours() < today.getHours() ||
        (selectedDay.getHours() === today.getHours() &&
          selectedDay.getMinutes() < today.getMinutes())
      ) {
        Alert.alert("Invalid Time", "You cannot select a past time today.");
        return;
      }
    }

    if (startingDate && endingDate) {
      setSelectedDates({});
      setStartingDate(null);
      setEndingDate(null);
    }

    if (!startingDate) {
      setStartingDate(day);
      setSelectedDates({
        [day.dateString]: {
          selected: true,
          marked: true,
          selectedColor: "#1E8161",
        },
      });
    } else if (!endingDate) {
      if (day.timestamp < startingDate.timestamp) {
        Alert.alert(
          "Invalid Selection",
          "Ending date cannot be before the starting date."
        );
        return;
      }

      if (startingDate.dateString === day.dateString) {
        setEndingDate(day);
        setSelectedDates({
          [day.dateString]: {
            selected: true,
            marked: true,
            selectedColor: "#1E8161",
          },
        });
        setFromTime("04:30");
        setToTime("04:31");
      } else {
        setEndingDate(day);
        setSelectedDates({
          [startingDate.dateString]: {
            selected: true,
            marked: true,
            selectedColor: "#1E8161",
          },
          [day.dateString]: {
            selected: true,
            marked: true,
            selectedColor: "#1E8161",
          },
        });
      }
    }
  };

  const handleDaySelection = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const handleTimeSelection = (selectedHour, selectedMinute) => {
    const formattedTime = `${selectedHour.toString().padStart(2, "0")}:${selectedMinute
      .toString()
      .padStart(2, "0")}`;
    if (isFromTime) {
      setFromTime(formattedTime);
    } else {
      setToTime(formattedTime);
    }
    setIsTimePickerVisible(false);
  };

  const formatDateTime = (day, time) => {
    const date = new Date(day.timestamp);
    const [hours, minutes] = time.split(":");
    date.setUTCHours(parseInt(hours), parseInt(minutes), 0, 0);
    return date.toISOString();
  };

  const postAvailability = async () => {
    if (startingDate && fromTime && toTime) {
      const finalEndingDate = endingDate || startingDate;
  
      const starting_date = formatDateTime(startingDate, fromTime);
      const ending_date = formatDateTime(finalEndingDate, toTime);
  
      console.log("Posting availability:", {
        starting_date,
        ending_date,
      });
  
      const accessToken = await AsyncStorage.getItem("accessToken");
      setLoading(true);
      try {
        const response = await fetch(
          "https://beok.onrender.com/doctor/availabilities/",
          {
            method: "POST",
            headers: {
              Authorization: `JWT ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              starting_date,
              ending_date,
            }),
          }
        );
  
        if (!response.ok) {
          const errorData = await response.json();
          console.log("Error:", response.status, errorData);
          throw new Error("Something went wrong!");
        }
  
        const data = await response.json();
        console.log("Response:", data);
        Alert.alert("Success", "Availability schedule successfully posted!");
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false); 
      }
    } else {
      Alert.alert(
        "Incomplete Information",
        "Please select both dates and times."
      );
    }
  };
  
  

  return (
    <View style={styles.container}>
      <View>
        <Header title={undefined} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === "Appointment" && styles.activeTab,
            ]}
            onPress={() => setSelectedTab("Appointment")}
          >
            <Text
              style={
                selectedTab === "Appointment"
                  ? styles.activeTabText
                  : styles.tabText
              }
            >
              Appointment & Schedule
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, selectedTab === "Calendar" && styles.activeTab]}
            onPress={() => setSelectedTab("Calendar")}
          >
            <Ionicons
              name="calendar"
              style={
                selectedTab === "Calendar"
                  ? styles.activecalendalIcon
                  : styles.calendarIcon
              }
            />
            <Text
              style={
                selectedTab === "Calendar"
                  ? styles.activeTabText
                  : styles.tabText
              }
            >
              My Calendar
            </Text>
          </TouchableOpacity>
        </View>
        {selectedTab === "Appointment" ? (
          <View>
            <Text style={styles.availabilityText}>My Availability</Text>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={selectedDates}
              theme={{
                selectedDayBackgroundColor: "#1E8161",
                todayTextColor: "#1E8161",
                arrowColor: "#1E8161",
              }}
              style={styles.calendar}
            />
            <Text style={styles.TimeRange}>Time Range</Text>
            <View style={styles.daysContainer}>
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.day,
                    selectedDays.includes(day) && styles.selectedDay,
                  ]}
                  onPress={() => handleDaySelection(day)}
                >
                  <Text
                    style={[
                      styles.dayText,
                      selectedDays.includes(day) && styles.selectedDayText,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <ScrollView></ScrollView>
            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>From</Text>
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => {
                  setIsFromTime(true);
                  setIsTimePickerVisible(true);
                }}
              >
                <Text style={styles.timeText}>{fromTime}</Text>
              </TouchableOpacity>
              <Text style={styles.timeLabel}>To</Text>
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => {
                  setIsFromTime(false);
                  setIsTimePickerVisible(true);
                }}
              >
                <Text style={styles.timeText}>{toTime}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.scheduleButtonContiner}>
              <TouchableOpacity
                style={styles.scheduleButton}
                onPress={postAvailability}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.scheduleButtonText}>
                    Set your schedule
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <View>
              <Text style={styles.availabilityText}>My Availability</Text>
              <View style={styles.daysContainer}>
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.day,
                      selectedDays.includes(day) && styles.selectedDay,
                    ]}
                    onPress={() => handleDaySelection(day)}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        selectedDays.includes(day) && styles.selectedDayText,
                      ]}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.timeLabel}>From</Text>
                <TouchableOpacity
                  style={styles.timeButton}
                  onPress={() => {
                    setIsFromTime(true);
                    setIsTimePickerVisible(true);
                  }}
                >
                  <Text style={styles.timeText}>{fromTime}</Text>
                </TouchableOpacity>
                <Text style={styles.timeLabel}>To</Text>
                <TouchableOpacity
                  style={styles.timeButton}
                  onPress={() => {
                    setIsFromTime(false);
                    setIsTimePickerVisible(true);
                  }}
                >
                  <Text style={styles.timeText}>{toTime}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.scheduleButtonContiner}>
              <TouchableOpacity style={styles.scheduleButton}>
                <Text style={styles.scheduleButtonText}>
                  Schedule an appointment
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
      <TimePickerModal
        visible={isTimePickerVisible}
        onClose={() => setIsTimePickerVisible(false)}
        onTimeSelected={handleTimeSelection}
      />
      <View>
        <DoctorBottomTab />
      </View>
    </View>
  );
};

const screenHeight = Dimensions.get("window").height;

const TimePickerModal = ({ visible, onClose, onTimeSelected }) => {
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.concelConfirmContainer}>
          <View style={styles.concelConfirm}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                if (selectedHour !== null && selectedMinute !== null) {
                  onTimeSelected(selectedHour, selectedMinute);
                  setSelectedHour(null);
                  setSelectedMinute(null);
                } else {
                  Alert.alert(
                    "Incomplete Selection",
                    "Please select both hour and minute."
                  );
                }
              }}
            >
              <Ionicons name="checkmark" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                onClose();
                setSelectedHour(null);
                setSelectedMinute(null);
              }}
            >
              <Ionicons name="close" size={24} color="#FF0000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.modalContentContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Time</Text>

            <View style={styles.timePickerContainer}>
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {hours.map((hour) => (
                  <TouchableOpacity
                    key={hour}
                    style={[
                      styles.timeOption,
                      selectedHour === hour && styles.selectedTimeOption,
                    ]}
                    onPress={() => setSelectedHour(hour)}
                  >
                    <Text
                      style={[
                        styles.timeText,
                        selectedHour === hour && styles.selectedTimeText,
                      ]}
                    >
                      {hour.toString().padStart(2, "0")}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {minutes.map((minute) => (
                  <TouchableOpacity
                    key={minute}
                    style={[
                      styles.timeOption,
                      selectedMinute === minute && styles.selectedTimeOption,
                    ]}
                    onPress={() => setSelectedMinute(minute)}
                  >
                    <Text
                      style={[
                        styles.timeText,
                        selectedMinute === minute && styles.selectedTimeText,
                      ]}
                    >
                      {minute.toString().padStart(2, "0")}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1E8161",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  tab: {
    paddingVertical: 7,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#1E8161",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    width: "45%",
    justifyContent: "center",
  },
  tabText: {
    color: "#7E7E7E",
    fontSize: 11,
    fontWeight: "regular",
  },
  calendarIcon: {
    color: "#7E7E7E",
    fontSize: 20,
    marginRight: 10,
  },
  activeTabText: {
    color: "white",
    fontSize: 12,
    fontWeight:"bold"
  },
  activecalendalIcon: {
    color: "white",
    fontSize: 20,
    marginRight: 10,
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: "regular",
    paddingLeft: 28,
    marginTop: 10,
  },
  calendar: {
    borderRadius: 10,
    padding: 20,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  TimeRange: {
    paddingLeft: 20,
    fontSize: 14,
    fontWeight: "regular",
  },
  day: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDay: {
    backgroundColor: "#1E8161",
  },
  dayText: {
    color: "#1E8161",
  },
  selectedDayText: {
    color: "white",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  timeLabel: {
    fontSize: 12,
    marginHorizontal: 5,
  },
  timeButton: {
    borderWidth: 1,
    borderColor: "#D1D1D1",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    color: "#263238",
  },
  timeText: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold",
  },
  scheduleButton: {
    backgroundColor: "#1E8161",
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    width: "70%",
    justifyContent: "center",
  },
  scheduleButtonContiner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // marginTop: 10,
  },
  scheduleButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "regular",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "30%",
    height: screenHeight * 0.5,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    paddingLeft: 0,
    justifyContent: "space-around",
    paddingRight: 0,
  },
  modalTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1E8161",
  },
  timePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scrollViewContent: {
    alignItems: "center",
  },
  timeOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  selectedTimeOption: {
    backgroundColor: "#1E8161",
    borderRadius: 5,
  },
  selectedTimeText: {
    color: "#fff",
  },
  confirmButton: {
    backgroundColor: "#1E8161",
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  confirmButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },

  cancelButtonText: {
    fontSize: 18,
    color: "#1E8161",
    fontWeight: "bold",
  },
  concelConfirm: {
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    zIndex: 1,
    width: "30%",
  },
  concelConfirmContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalContentContainer: {
    alignItems: "center",
  },
});

export default DoctorSetScheduleAppointment;
