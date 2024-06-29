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
import { MaterialIcons } from "@expo/vector-icons";
import Header1 from "../ReusableComponent/Header1";
import BottomTabs1 from "../ReusableComponent/BottomTabs1";
const CheckSuport = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Consultation");
  const [description, setDescription] = useState("");
  const [messages, setMessages] = useState([]);

  const navigateToBack = () => {
    router.push("./ChatBoxConsultationBodyImagemapping");
  };

  const navigateTo = (screen) => {
    setActiveTab(screen);
    router.push(`./${screen}`);
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
      {/* Header */}
      <Header1 />
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Chat Support Section */}
        <View style={styles.chatSupportContainer}>
          <Image source={require("../assets/head2.png")}></Image>
          <Text style={styles.chatSupportText}>
            Feel free to contact us; our support team will reach you shortly.
          </Text>
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
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <MaterialIcons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Tabs */}
      <BottomTabs1 />
    </View>
  );
};

export default CheckSuport;

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
    justifyContent: "space-between",
    backgroundColor: "#93BD68",
    padding: 15,
    paddingBottom: 20,
    paddingTop: 20,
    zIndex: 1,
  },
  profileImage: {
    width: 25,
    height: 25,
    objectFit: "contain",
  },
  checkProfileConatiner: {
    backgroundColor: "#B2C3FF",
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    color: "#FFFDFD",
    fontSize: 14,
    fontWeight: "regular",
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  chatSupportContainer: {
    display: "flex",
    padding: 20,
    backgroundColor: "#E6FFCC",
    borderRadius: 52,
    margin: 10,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  chatSupportText: {
    fontSize: 14,
    color: "#777777",
    width: "70%",
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
    backgroundColor: "#93BD68",
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
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
});
