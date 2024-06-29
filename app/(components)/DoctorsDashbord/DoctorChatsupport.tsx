import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import {
  MaterialIcons,
  FontAwesome5,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import DoctorBottomTab from "../ReusableComponent/DoctorBottomTab";
const DoctorChatSupport = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [messages, setMessages] = useState([]);

  const navigateToBack = () => {
    router.push("./DoctorsDashbord");
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
          <TouchableOpacity>
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
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 14,
    color: "#000",
    fontWeight:"bold"
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
    paddingTop:5,
    paddingBottom:5
  },
  medicationText: {
    fontSize: 14,
    color: "#777",
    width:"40%"
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
    backgroundColor:"#0C7751",
    padding:8,
    borderRadius:50,
    height:36,
    width:36
  },
  voiceNoteButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#0C7751",
    borderRadius:18,
    height:36,
    width:36,
  },
  iconButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#0C7751",
    borderRadius:18,
    height:36,
    width:36,
  },
  callIcons: {
    backgroundColor: "#0C7751",
    padding: 6,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  iconConatainer:{
    flexDirection:"row",
    gap:10
  }
});
