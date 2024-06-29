import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DoctorBottomTab from "../ReusableComponent/DoctorBottomTab";
import { useNavigation } from "@react-navigation/native";
import {NavigationProps} from "../../(app)/types"
const activeUsers = [
  {
    id: "1",
    name: "User1",
    avatar: require("../assets/gentlaDoctor.png"),
  },
  {
    id: "2",
    name: "User2",
    avatar: require("../assets/gentlaDoctor.png"),
  },
  {
    id: "3",
    name: "User3",
    avatar: require("../assets/gentlaDoctor.png"),
  },
  {
    id: "4",
    name: "User4",
    avatar: require("../assets/gentlaDoctor.png"),
  },
  {
    id: "5",
    name: "User5",
    avatar: require("../assets/gentlaDoctor.png"),
  },
  {
    id: "6",
    name: "User6",
    avatar: require("../assets/gentlaDoctor.png"),
  },
  {
    id: "7",
    name: "User7",
    avatar: require("../assets/gentlaDoctor.png"),
  },
  {
    id: "8",
    name: "User8",
    avatar: require("../assets/gentlaDoctor.png"),
  },
];

const groupSuggestions = [
  {
    id: "1",
    name: "Angel Service Group",
    image: require("../assets/join1.png"),
  },
  {
    id: "2",
    name: "Muhima Social Group",
    image: require("../assets/join2.png"),
  },
  {
    id: "3",
    name: "Good Samaritan Bugeesera",
    image: require("../assets/join3.png"),
  },
  {
    id: "4",
    name: "Water of Life Nyagatare",
    image: require("../assets/join1.png"),
  },
  {
    id: "5",
    name: "Good Samaritan Bugeesera",
    image: require("../assets/join3.png"),
  },
  {
    id: "6",
    name: "Water of Life Nyagatare",
    image: require("../assets/join1.png"),
  },
];

const feeds = [
  {
    id: "1",
    name: "Dr. Frank",
    availability: "12h:30 - 17h:30",
    description:
      "Lorem ipsum dolor sit amet consectetur. Molestie quam feugiat.",
    avatar: require("../assets/ProfileImage.png"),
  },
  {
    id: "2",
    name: "Dr. Frank",
    availability: "12h:30 - 17h:30",
    description:
      "Lorem ipsum dolor sit amet consectetur. Molestie quam feugiat.",
    avatar: require("../assets/ProfileImage.png"),
  },
  {
    id: "3",
    name: "Dr. Frank",
    availability: "12h:30 - 17h:30",
    description:
      "Lorem ipsum dolor sit amet consectetur. Molestie quam feugiat.",
    avatar: require("../assets/ProfileImage.png"),
  },
];


const MyCommunity = () => {
  const navigation = useNavigation<NavigationProps>()
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.message1}>
          <Image source={require("../assets/message1.png")} />
        </View>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="#FFFFFF"
          />
        </View>
        <View>
          <Image
            source={require("../assets/DoctorProfilecommunity.png")}
            style={styles.profileImage}
          />
        </View>
      </View>

      {/* Active Now */}
      <View style={styles.activeNowContainer}>
        <Text style={styles.sectionTitle}>Active now</Text>
        <FlatList
          data={activeUsers}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.activeUser}>
              <Image source={item.avatar} style={styles.userAvatar} />
              <View style={styles.activeDot}></View>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Group Suggestions */}
      <View style={styles.groupSuggestionsContainer}>
        <View style={styles.groupHeader}>
          <Text style={styles.sectionTitle}>Group Suggestions</Text>
          <Pressable style={styles.addGroupButton}>
            <Text style={styles.addGroupText}>Add group</Text>
            <MaterialIcons name="group-add" size={12} color="white" />
          </Pressable>
        </View>
        <FlatList
          data={groupSuggestions}
          numColumns={3}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.groupCard}>
              <Image source={item.image} style={styles.groupImage} />
              <Text style={styles.groupName}>{item.name}</Text>
              <View style={styles.overlay} >
                <Pressable style={styles.joinButton}  onPress={() => navigation.navigate("joinMyCommunity")}>
                  <Text style={styles.joinText}>Join</Text>
                </Pressable>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Feeds & Trending News */}
      <View>
      <View style={styles.feedsContainer}>
      <Text style={styles.feedTrendingTitle}>Feeds & Trending News</Text>
        <FlatList
          data={feeds}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.feedCard}>
              <Image source={item.avatar} style={styles.feedAvatar} />
              <View style={styles.feedDetails}>
                <Text style={styles.feedName}>{item.name}</Text>
                <Text style={styles.feedDescription}>{item.description}</Text>
              </View>
              <View style={styles.feedAvailability}>
                <Text style={styles.availableText}>Available</Text>
                <Text style={styles.availabilityText}>{item.availability}</Text>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      </View>


      {/* Footer Navigation */}
      <View style={styles.bottomTab}>
          <DoctorBottomTab/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#106E46",
  },
  searchContainer: {
    backgroundColor: "#106E46",
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRightColor: "#106E46",
    borderTopColor: "#106E46",
    borderLeftColor: "#106E46",
    borderBottomColor: "white",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#106E46",
    borderRadius: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  searchInput: {
    height: 30,
    width: "80%",
    color: "white",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10,
  },
  activeNowContainer: {
    paddingVertical: 3,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 11,
    marginBottom: 3,
    color: "white",
    fontWeight: "regular",
  },
  activeUser: {
    marginRight: 15,
    position: "relative",
  },
  userAvatar: {
    width: 75,
    height: 75,
    borderRadius: 35,
    objectFit: "cover",
  },
  activeDot: {
    width: 10,
    height: 10,
    backgroundColor: "#18B415",
    borderRadius: 5,
    position: "absolute",
    right: 2,
    bottom: 2,
    top: 7,
  },
  groupSuggestionsContainer: {
    paddingHorizontal: 15,
    // marginBottom: 20,
  },
  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  addGroupButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#106E46",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  addGroupText: {
    color: "white",
    marginRight: 5,
    fontSize:10
  },
  feedTrendingTitle:{
    paddingHorizontal:20,
    fontSize:10,
    paddingVertical:20

  },
  groupCard: {
    width: "32%",
    aspectRatio: 1, 
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: "0.9%",
    backgroundColor: "white",
    position: "relative",
  },
  groupImage: {
    width: "102%",
    height: "113%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    // top:0
  },
  groupName: {
    color: "white",
    fontSize: 11,
    width: "60%",
    zIndex: 1,
    position: "absolute",
    left: 6,
  },
  joinButton: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 8,
    marginTop: 5,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
  },
  joinText: {
    color: "white",
    fontSize: 10,
    fontWeight:"bold"
  },
  feedsContainer: {
    backgroundColor:"white",
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    marginTop:4
  },
  feedCard: {
    flexDirection: "row",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    // backgroundColor: "red",
    paddingRight:30,
    paddingLeft:30,
    paddingTop:0,

  },
  feedAvatar: {
    width: 64,
    height: 64,
    borderRadius: 25,
    marginRight: 20,
  },
  feedDetails: {
    flex: 1,
    marginBottom:1
  },
  feedName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  feedDescription: {
    fontSize: 10,
    color: "#333",
    width:"65%"
  },
  feedAvailability: {
    alignItems: "flex-end",
    marginTop:1

  },
  availableText: {
    fontSize: 12,
    color: "#000000",
    fontWeight: "medium",
  },
  availabilityText: {
    fontSize: 10,
    color: "#333",
  },
  footerNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    // shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  message1: {
    marginRight: 9,
  },
  bottomTab: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    paddingVertical: 10,
  },
});

export default MyCommunity;
