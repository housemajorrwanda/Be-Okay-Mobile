import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";
import DoctorBottomTab from "../ReusableComponent/DoctorBottomTab";

const posts = [
  {
    id: "1",
    username: "Dr. Smith",
    timeAgo: "2d",
    content:
      "Understanding the symptoms of chronic pain and management techniques.",
    media: [require("../assets/join1.png")],
    options: ["Chronic Pain", "Symptoms", "Management"],
    statistics: {
      views: 49000,
      likes: 329,
      comments: 30,
      reposts: 228,
    },
  },
  {
    id: "2",
    username: "Dr. Smith",
    timeAgo: "2d",
    content:
      "Understanding the symptoms of chronic pain and management techniques.",
    media: [require("../assets/join2.png"), require("../assets/join3.png")],
    options: ["Chronic Pain", "Symptoms", "Management"],
    statistics: {
      views: 49000,
      likes: 329,
      comments: 30,
      reposts: 228,
    },
  },
  {
    id: "3",
    username: "Dr. Jane",
    timeAgo: "1d",
    content: "Exploring advancements in telemedicine and patient care.",
    media: [
      require("../assets/join2.png"),
      require("../assets/join3.png"),
      require("../assets/join3.png"),
    ],
    options: ["Telemedicine", "Patient Care", "Technology"],
    statistics: {
      views: 75000,
      likes: 520,
      comments: 45,
      reposts: 180,
    },
  },
  {
    id: "4",
    username: "Health News",
    timeAgo: "3h",
    content: "Latest research in cardiovascular health and treatments.",
    media: [
      require("../assets/join1.png"),
      require("../assets/join2.png"),
      require("../assets/join3.png"),
      require("../assets/join3.png"),
    ],
    options: ["Cardiovascular", "Research", "Treatments"],
    statistics: {
      views: 30000,
      likes: 150,
      comments: 10,
      reposts: 60,
    },
  },
];

const JoinMyCommunity = () => {
  const renderMedia = (media: any[]) => {
    const mediaCount = media.length;

    if (mediaCount === 1) {
      return (
        <View style={styles.mediaContainer}>
          <Image source={media[0]} style={styles.singleMedia} />
        </View>
      );
    } else if (mediaCount === 2) {
      return (
        <View style={styles.mediaContainer}>
          <View style={styles.twoMediaContainer}>
            <Image source={media[0]} style={styles.twoMedia} />
            <Image source={media[1]} style={styles.twoMedia} />
          </View>
        </View>
      );
    } else if (mediaCount === 3) {
      return (
        <View style={styles.mediaContainer}>
          <View style={styles.threeMediaContainer}>
            <Image source={media[0]} style={styles.largeMedia} />
            <View style={styles.smallMediaContainer}>
              <Image source={media[1]} style={styles.smallMedia} />
              <Image source={media[2]} style={styles.smallMedia} />
            </View>
          </View>
        </View>
      );
    } else if (mediaCount === 4) {
      return (
        <View style={styles.mediaContainer}>
          <View style={styles.fourMediaContainer}>
            <Image source={media[0]} style={styles.fourMedia} />
            <Image source={media[1]} style={styles.fourMedia} />
            <Image source={media[2]} style={styles.fourMedia} />
            <Image source={media[3]} style={styles.fourMedia} />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.mediaContainer}>
        {media.map((item, index) => (
          <Image
            key={index.toString()}
            source={item}
            style={styles.defaultMedia}
          />
        ))}
      </View>
    );
  };

  const renderPost = ({ item }: any) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image
          source={require("../assets/gentlaDoctor.png")}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.timeAgo}>{item.timeAgo}</Text>
        </View>
      </View>
      <Text style={styles.postContent}>{item.content}</Text>
      {renderMedia(item.media)}
      <FlatList
        data={item.options}
        keyExtractor={(option) => option}
        renderItem={({ item: option }) => (
          <View style={styles.optionContainer}>
            <Text style={styles.optionText}>{option}</Text>
          </View>
        )}
      />
      <View style={styles.actionIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="eye" size={24} color="black" />
          <Text style={styles.iconText}>{item.statistics.views}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <AntDesign name="like2" size={24} color="black" />
          <Text style={styles.iconText}>{item.statistics.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="comment" size={24} color="black" />
          <Text style={styles.iconText}>{item.statistics.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="repeat" size={24} color="black" />
          <Text style={styles.iconText}>{item.statistics.reposts}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="bookmark" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="share" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="format-quote" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
      <DoctorBottomTab />
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
    justifyContent: "space-between",
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
    width: "75%",
    color: "white",
    // marginRight:10
  },

  activeNowContainer: {
    paddingVertical: 3,
    paddingHorizontal: 15,
  },
  listContent: {
    paddingBottom: 60, // Ensure there's space for the bottom tab
  },
  postCard: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
  },
  timeAgo: {
    fontSize: 12,
    color: "#777",
  },
  postContent: {
    fontSize: 14,
    marginVertical: 5,
  },
  mediaContainer: {
    marginVertical: 10,
  },
  singleMedia: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  message1: {
    // marginRight: 9,
  },
  twoMediaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  twoMedia: {
    width: "49%",
    height: 150,
    borderRadius: 10,
  },
  threeMediaContainer: {
    flexDirection: "row",
  },
  fourMediaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  fourMedia: {
    width: "49%",
    height: 95,
    borderRadius: 10,
    marginVertical: 2.5,
  },
  largeMedia: {
    width: "60%",
    height: 200,
    borderRadius: 10,
    marginRight: 5,
  },
  smallMediaContainer: {
    width: "40%",
    justifyContent: "space-between",
  },
  smallMedia: {
    width: "100%",
    height: 95,
    borderRadius: 10,
    marginVertical: 2.5,
  },
  defaultMedia: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  optionContainer: {
    marginTop: 5,
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  actionIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconText: {
    fontSize: 12,
    marginLeft: 5,
  },
});

export default JoinMyCommunity;
