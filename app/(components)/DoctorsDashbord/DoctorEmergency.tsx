import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import Header from "../ReusableComponent/Header";
import DoctorBottomTab from "../ReusableComponent/DoctorBottomTab";

const DoctorEmergency = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header title={undefined} />
      </View>

      <View style={styles.content}>
        <TouchableOpacity>
          <View style={styles.DoctorContainerDets}>
            <View style={styles.genContainer}>
              <View style={styles.DoctorContainerSu}>
                <View style={styles.DoctorContainerSubt}>
                  <Text style={styles.nametext}>NGOGA Innocent Patrick</Text>
                </View>
                <View style={styles.DoctorContainerSubt}>
                  <Text style={styles.subText}>Time: 2:00 PM</Text>
                  <Text style={styles.subText}>Date: 12 April 2024</Text>
                </View>
                <View style={styles.DoctorContainerSubt}>
                  <Text style={styles.subText}>Gender: Female</Text>
                  <Text style={styles.subText}>Age: 27</Text>
                </View>
              </View>
              <View>
                <Image source={require("../assets/phoneIcon.png")} />
              </View>
            </View>
          </View>

          <View style={styles.DoctorContainerDets}>
            <View style={styles.genContainer}>
              <View style={styles.DoctorContainerSu}>
                <View style={styles.DoctorContainerSubt}>
                  <Text style={styles.nametext}>NGOGA Innocent Patrick</Text>
                </View>
                <View style={styles.DoctorContainerSubt}>
                  <Text style={styles.subText}>Time: 2:00 PM</Text>
                  <Text style={styles.subText}>Date: 12 April 2024</Text>
                </View>
                <View style={styles.DoctorContainerSubt}>
                  <Text style={styles.subText}>Gender: Female</Text>
                  <Text style={styles.subText}>Age: 27</Text>
                </View>
              </View>
              <View>
                <Image source={require("../assets/phoneIcon.png")} />
              </View>
            </View>
          </View>

          <View style={styles.DoctorContainerDets}>
            <View style={styles.genContainer}>
              <View style={styles.DoctorContainerSu}>
                <View style={styles.DoctorContainerSubt}>
                  <Text style={styles.nametext}>NGOGA Innocent Patrick</Text>
                </View>
                <View style={styles.DoctorContainerSubt}>
                  <Text style={styles.subText}>Time: 2:00 PM</Text>
                  <Text style={styles.subText}>Date: 12 April 2024</Text>
                </View>
                <View style={styles.DoctorContainerSubt}>
                  <Text style={styles.subText}>Gender: Female</Text>
                  <Text style={styles.subText}>Age: 27</Text>
                </View>
              </View>
              <View>
                <Image source={require("../assets/phoneIcon.png")} />
              </View>
            </View>
          </View>

          <View style={styles.DoctorContainerDets}>
            <View style={styles.genContainer}>
              <View style={styles.DoctorContainerSu}>
                <View style={styles.DoctorContainerSubt}>
                  <Text style={styles.nametext}>NGOGA Innocent Patrick</Text>
                </View>
                <View style={styles.DoctorContainerSubt}>
                  <Text style={styles.subText}>Time: 2:00 PM</Text>
                  <Text style={styles.subText}>Date: 12 April 2024</Text>
                </View>
                <View style={styles.DoctorContainerSubt}>
                  <Text style={styles.subText}>Gender: Female</Text>
                  <Text style={styles.subText}>Age: 27</Text>
                </View>
              </View>
              <View>
                <Image source={require("../assets/phoneIcon.png")} />
              </View>
            </View>
          </View>

          <View style={styles.DoctorContainerDets}>
            <View style={styles.genContainer}>
              <View style={styles.DoctorContainerSu}>
                <View style={styles.DoctorContainerSubt}>
                  <Text style={styles.nametext}>NGOGA Innocent Patrick</Text>
                </View>
                <View style={styles.DoctorContainerSubt}>
                  <Text style={styles.subText}>Time: 2:00 PM</Text>
                  <Text style={styles.subText}>Date: 12 April 2024</Text>
                </View>
                <View style={styles.DoctorContainerSubt}>
                  <Text style={styles.subText}>Gender: Female</Text>
                  <Text style={styles.subText}>Age: 27</Text>
                </View>
              </View>
              <View>
                <Image source={require("../assets/phoneIcon.png")} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomTabContainer}>
        <DoctorBottomTab />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 100,
  },
  content: {
    flex: 1,
  },
  bottomTabContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  DoctorContainerDets: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  DoctorImage: {
    width: 55,
    height: 55,
    borderRadius: 38,
  },
  genContainer: {
    flexDirection: "row",
    width: "79%",
    justifyContent: "space-between",
    padding: 4,
  },
  DoctorContainerSu: {},
  DoctorContainerSubt: {
    flexDirection: "row",
    gap: 30,
  },
  subText: {
    fontSize: 11,
    marginTop: 2,
    marginBottom: 2,
  },
  nametext: {
    fontSize: 15,
    fontWeight: "semibold",
  },
});

export default DoctorEmergency;
