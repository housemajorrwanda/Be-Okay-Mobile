import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

function Eprescriptionform() {
  const [name, setName] = useState("UWASE KANEZA Sabrine");

  const patientInfo = [
    { label: "Full name", value: name },
    { label: "Date of Birth", value: "10/05/2002" },
    { label: "Gender", value: "Female" },
    { label: "Tel", value: "+250783500317" },
    { label: "Email", value: "uwakanesasabrine123@gmail.com" },
  ];

  const medicalHistoryItems = [
    { label: "Allergies", checked: true, details: "Gastric Surgery" },
    { label: "Previous Surgeries", checked: true, details: "Gastric Surgery" },
    { label: "Family illness", checked: false, details: "" },
    { label: "Chronic illness", checked: true, details: "Asthma" },
    { label: "Current Medication", checked: true, details: "Gastric Surgery" },
    { label: "Pain Part", checked: true, details: "Stomach" },
  ];

  const doctorInfo = [
    { label: "Doctor Name", value: "Dr. NKURUNZIZA Richard" },
    { label: "License Number", value: "LLM12OV2021" },
    { label: "Mobile Number", value: "+250783457112" },
  ];
  const renderInfoSection = (title: string, info: any[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.genValueContainer}>
      <Text style={styles.bold}>Full Name:</Text>
      <View style={styles.valueContainerText}>
          <Text style={styles.valueText}>{info[0].value}</Text>
      </View>
    </View>
      <View style={styles.row}>
        <View style={styles.genValueContainer}>
          <Text style={styles.bold}>Date of Birth:</Text>
          <View style={styles.valueContainerTextHalf}>

          <Text style={styles.valueText}>{info[1].value}</Text>
          </View>
        </View>
        <View style={styles.genValueContainer}>
          <Text style={styles.bold}>Gender:</Text>
          <View style={styles.valueContainerTextHalf}>

          <Text style={styles.valueText}>{info[2].value}</Text>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.genValueContainer}>
          <Text style={styles.bold}>Email:</Text>
          <View style={styles.valueContainerTextHalf}>

          <Text style={styles.valueText}>{info[3].value}</Text>
          </View>
        </View>
        <View style={styles.genValueContainer}>
          <Text style={styles.bold}>Tel:</Text>
          <View style={styles.valueContainerTextHalf}>

          <Text style={styles.valueText}>{info[4].value}</Text>
          </View>
        </View>
      </View>
    </View>
  );
  
  const RadioButton = ({ selected }) => (
    <View style={styles.radioCircle}>
      {selected && <View style={styles.selectedRb} />}
    </View>
  );
  const renderMedicalHistoryItems = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Medical History</Text>
      <View style={styles.medicalHistoryContainer}>
        {medicalHistoryItems.map((item, index) => (
          <View style={styles.medicalHistoryItem} key={index}>
            <View style={styles.checkboxContainer}>
              <RadioButton selected={item.checked} />
              <Text style={styles.medicalHistoryLabel}>{item.label}</Text>
            </View>
            {item.checked && item.details && (
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsText}>{item.details}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );

  const renderDoctorInfoSection = (title: string, info: any[]) => (
    <View style={styles.DoctorInfosectionContainer}>
      <View style={styles.DoctorInfosection}>
        <View>
          {info.map((item, index) => (
            <View key={index}>
              <View>
                <Text style={styles.doctorlabel}>{item.label}:</Text>
                <Text style={styles.doctorValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doea
            commodo consequat. Duis aut Eproident, sunt in culpa qui officia
            deserunt mollit anim id est laborum
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.emailphone}>
          housemajorrwanda@gmail.com, Tel:+250788258922,Kicukiro-Sonatube
        </Text>
      </View>
    </View>
  );

  const renderMedicalResults = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Medical Result</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 3,
          marginBottom: 10,
        }}
      >
        <Text>Possible Diognosis:</Text>
        <Text style={{ fontWeight: "bold" }}>UIcers</Text>
      </View>
      <View style={styles.medicalResultContainer}>
        <View style={{height:"auto"}}>
          <Text style={{ marginBottom: 4,fontWeight:"bold" }}>Medication</Text>
          <Text style={{ marginBottom: 4 }}>Acetaminophen 20mg</Text>
          <Text style={{ marginBottom: 4 }}>Medication</Text>
          <Text style={{ marginBottom: 4 }}>Acetaminophen 20mg</Text>

        </View>
        <View style={styles.timeConsumingcontainer}>
          <View>
            <Text>Morning</Text>
            <View style={styles.timesView}>
              <Text style={styles.timesText}>3</Text>
              <Text style={styles.timesText}>3</Text>
              <Text style={styles.timesText}>3</Text>
            </View>
          </View>
          <View>
            <Text>Noon</Text>
            <View style={styles.timesView}>
              <Text style={styles.timesText}>3</Text>
              <Text style={styles.timesText}>3</Text>
              <Text style={styles.timesText}>3</Text>
            </View>
          </View>
          <View>
            <Text>Evening</Text>
            <View style={styles.timesView}>
              <Text style={styles.timesText}>3</Text>
              <Text style={styles.timesText}>3</Text>
              <Text style={styles.timesText}>3</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 5,
        }}
      >
        <Text>Qty:32 Capsules</Text>
        <Text>Days:10 Refill Date 20 July 2024</Text>
      </View>
    </View>
  );

  const html = `
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Medical Form</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;Period
            background-color: #e7ebed;
        }
        .container {
            width: 100%;
            background-color: #fff;
            border-radius: 8px;
        }
        .header-content-container {
            background-color: #0C7751;
            padding: 15px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-right: 28;
            padding-top: 0,
            padding-bottom: 5,
        }
        .logo-container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .logo-image {
            width: 70px;
            height: 60px;
        }
        .header-medical-info {
            text-align: center;
            color: white;
        }
        .header-text {
            font-size: 16px;
            font-weight: bold;
        }
        .header-subtitle {
            font-size: 11px;
            margin-bottom: 3px;
        }
        .national-emblem-overview {
            width: 67px;
            height: 73px;
        }
        .section {
            padding: 15px;
            margin-bottom: 5px;
        }
        .section-title {
            font-size: 18px;
            background-color: #0C7751;
            color: white;
            padding: 6px;
            border-radius: 8px;
            margin-bottom: 5px;
            padding-left: 20px;
        }
        .gen-value-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

        }
 
        .key-container {
            width: 40%;

        }
        .value-container {
            width: 100%;
            align-items: center;
            border-bottom: 1px solid black;
            background-color: transparent;
            justify-content: center,
            text-align: center;
            padding-bottom: -20;
            

        }
        .value-text {
            font-size: 10px;
            font-weight: bold;

        }
        .doctor-info-section-container {
            padding: 15px;
            margin-bottom: 5px;
            background-color: #B9DAED;
            border-radius: 10px;
            margin-top: 10px;
        }
        .doctor-info-section {
            display: flex;
        }
        .description {
            width: 50%;
            background-color: white;
            padding: 5px;
            border-radius: 10px;
            font-size: 9px;
            font-weight: bold;
        }
        .email-phone {
            font-size: 10px;
            font-weight: bold;
            margin-top: 10px;
        }
        .medical-history-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        .medical-history-item {
            width: 48%;
            margin-bottom: 10px;
        }
        .checkbox-container {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .radio-circle {
            height: 18px;
            width: 18px;
            border-radius: 9px;
            border: 1px solid #B9DAED;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 8px;
        }
        .selected-rb {
            width: 9px;
            height: 9px;
            border-radius: 6px;
            background-color: #B9DAED;
        }
        .medical-history-label {
            font-size: 12px;
            font-weight: bold;
        }
        .details-container {
            margin-top: 5px;
            padding: 3px;
            background-color: #B9DAED;
            border-radius: 5px;
            padding-left: 10px;
        }
        .details-text {
            font-size: 12px;
        }
    
        .generate-report {
            margin: 15px;
            background-color: #1c766e;
            border-radius: 10px;
            padding: 5px;
            text-align: center;
            width: 50%;
            color: white;
            font-weight: bold;
        }
            .beokay-text{
            color:white
            }
            .doctor-row {
            display:flex;
            flex-direction: column;
            }
            .info-time {
            display:flex;
            flex-direction:row;
            justify-content:space-between
            }
            .section {
  padding: 10px;
}

.section-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.row {
  display: flex;
  align-items: center;
  gap: 3px;
  margin-bottom: 10px;
}

.bold-text {
  font-weight: bold;
}

.medical-result-container {
  display: flex;
  justify-content: space-between;
}

.medication-text {
  margin-bottom: 4px;
}

.time-consuming-container {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.times-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.times-text {
  background-color: #B9DAED;
  padding: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  font-weight: bold;
  border-radius: 5px;
  margin-bottom: 4px;
  font-size: 10px;
  text-align: center;
}

    </style>
</head>
<body>
    <div class="container">
        <div class="header-content-container">
            <div class="logo-container">
                <img src="https://res.cloudinary.com/dtl8gpxzt/image/upload/v1723292668/Be-Okay_logo_uve3xq.png" alt="Be Okay Logo" class="logo-image" />
                <p class="beokay-text">Be Okay</p>
            </div>
            <div class="header-medical-info">
                <p class="header-text">Medical Form</p>
                <p class="header-subtitle">Medical LabTest</p>
                <p class="header-subtitle">Time: 12, June, 2024</p>
            </div>
            <img src="https://res.cloudinary.com/dtl8gpxzt/image/upload/v1723292585/NationalEmblemOverview_gjkhxf.png" alt="National Emblem" class="national-emblem-overview" />
        </div>

        <!-- Patient Info Section -->
<!-- Patient Info Section -->
<div class="section">
    <h2 class="section-title">Patient’s Info</h2>
    <div class="gen-value-container">
        <div class="key-container"><b>Full name:</b></div>
        <center class="value-container"><p class="value-text">UWASE KANEZA Sabrine</p></center>
    </div>
    <div class="gen-value-container">
        <div class="key-container"><b>Date of Birth:</b></div>
        <center class="value-container"><p class="value-text">10/05/2002</p></center>
        <div class="key-container"><b>Gender:</b></div>
        <center class="value-container"><p class="value-text">Female</p></center>
    </div>
    <div class="gen-value-container">
        <div class="key-container"><b>Email:</b></div>
        <center class="value-container"><p class="value-text">uwakanesasabrine123@gmail.com</p></center>
        <div class="key-container"><b>Tel:</b></div>
        <center class="value-container"><p class="value-text">+250783500317</p></center>
    </div>
</div>


        <!-- Medical History Items -->
        <div class="section">
            <h2 class="section-title">Medical History</h2>
            <div class="medical-history-container">
                ${medicalHistoryItems
                  .map(
                    (item) => `
                    <div class="medical-history-item">
                        <div class="checkbox-container">
                            <div class="radio-circle">${item.checked ? `<div class="selected-rb"></div>` : ""}</div>
                            <p class="medical-history-label">${item.label}</p>
                        </div>
                        ${
                          item.checked && item.details
                            ? `
                            <div class="details-container">
                                <p class="details-text">${item.details}</p>
                            </div>
                        `
                            : ""
                        }
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>

        <!-- Medical Result  -->
<div class="section">
  <h2 class="section-title">Medical Result</h2>
  <div class="row">
    <p>Possible Diagnosis:</p>
    <p class="bold-text">Ulcers</p>
  </div>
  <div class="medical-result-container">
    <div>
      <p class="medication-text">Medication</p>
      <p class="medication-text">Medication</p>
      <p class="medication-text">Medication</p>
    </div>
    <div class="time-consuming-container">
      <div>
        <p>Morning</p>
        <div class="times-view">
          <p class="times-text">3</p>
          <p class="times-text">3</p>
          <p class="times-text">3</p>
        </div>
      </div>
      <div>
        <p>Noon</p>
        <div class="times-view">
          <p class="times-text">3</p>
          <p class="times-text">3</p>
          <p class="times-text">3</p>
        </div>
      </div>
      <div>
        <p>Evening</p>
        <div class="times-view">
          <p class="times-text">3</p>
          <p class="times-text">3</p>
          <p class="times-text">3</p>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <p>Qty: 32 Capsules</p>
    <p>Days: 10 Refill Date 20 July 2024</p>
  </div>
</div>


        <!-- Doctor Info Section -->
        <div class="doctor-info-section-container">
            <div class="doctor-info-section">
                ${doctorInfo
                  .map(
                    (item) => `
                    <div class="doctorrow">
                    <div>
                    <p><b class="doctor-label">${item.label}:</b></p>
                    
                    </div>
                    <div>
                        <p class="doctor-value">${item.value}</p>
                    
                    </div>
                    </div>
                `
                  )
                  .join("")}
                <div class="description">
                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doea
                       commodo consequat. Duis aut Eproident, sunt in culpa qui officia
                       deserunt mollit anim id est laborum</p>
                </div>
            </div>
            <p class="email-phone">housemajorrwanda@gmail.com, Tel:+250788258922, Kicukiro-Sonatube</p>
        </div>
    </div>
</body>
</html>

  `;

  const generatePdf = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.HeaderContentContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/Be-Okay_logo.png")}
              style={styles.logoImage}
            />
            <Text style={styles.beokayText}>Be Okay</Text>
          </View>
          <View style={styles.headermedicalinfo}>
            <Text style={styles.headerText}>Medical Form</Text>
            <Text style={styles.headerSubtitle}>E-Prescription</Text>
            <Text style={styles.headerSubtitle}>Time: 12, June, 2024</Text>
          </View>
          <View>
            <Image
              source={require("../assets/NationalEmblemOverview.png")}
              style={styles.NationalEmblemOverview}
            />
          </View>
        </View>
        {renderInfoSection("Patient’s Info", patientInfo)}
        {renderMedicalHistoryItems()}
        {renderMedicalResults()}
        {renderDoctorInfoSection("", doctorInfo)}
      </View>
      <View style={styles.generateDocument}>
        <Pressable onPress={generatePdf} style={styles.generateReport}>
          <Text style={styles.generateText}>Generate PDF</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#e7ebed",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "100%",
    overflow: "hidden",
  },
  HeaderContentContainer: {
    backgroundColor: "#0C7751",
    padding: 15,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 28,
    paddingTop: 0,
    paddingBottom: 5,
  },
  logoImage: {
    width: 70,
    height: 75,
    objectFit: "contain",
  },
  headermedicalinfo: {
    alignItems: "center",
    marginTop: 30,
  },
  beokayText: {
    color: "white",
    fontSize: 12,
    fontWeight: "semibold",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "semibold",
    marginBottom: 3,
  },

  KeyContainer: {
    width: "27%",
  },
  valueContainer: {
    width: "73%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: -1,
    backgroundColor: "transparent",
  },

  NationalEmblemOverview: {
    width: 67,
    height: 73,
    objectFit: "contain",
  },
  headerSubtitle: {
    color: "white",
    fontSize: 11,
    fontWeight: "medium",
    marginBottom: 3,
  },
  valuetext: {
    fontSize: 10,
    fontWeight: "bold",
  },
  valueContainerText:{
    fontWeight: "bold",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: -10,
    backgroundColor: "transparent",
    width:"70%"
    
  },

  valueContainerTextHalf:{
    fontWeight: "bold",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: -10,
    backgroundColor: "transparent",
    paddingHorizontal:10
  },
  section: {
    padding: 15,
    marginBottom: 5,
    paddingTop: 5,
    paddingBottom: 0,
  },
  DoctorInfosection: {
    flexDirection: "row",
    backgroundColor: "#B9DAED",
    justifyContent: "space-between",
  },
  DoctorInfosectionContainer: {
    padding: 15,
    marginBottom: 5,
    paddingTop: 10,
    backgroundColor: "#B9DAED",
    margin: 15,
    marginTop: 10,
    borderRadius: 10,
    paddingBottom: 5,
  },
  emailphone: {
    fontSize: 10,
    fontWeight: "bold",
  },
  description: {
    width: "50%",
    backgroundColor: "white",
    padding: 5,
    // marginBottom:10,
    borderRadius: 10,
  },
  descriptionText: {
    fontSize: 9,
    fontWeight: "bold",
  },
  doctorlabel: {
    fontSize: 11,
    fontWeight: "regular",
  },
  doctorValue: {
    fontSize: 11,
    fontWeight: "bold",
  },
  medicalHistoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  medicalHistoryItem: {
    width: "48%", // to fit two items per row
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    fontSize: 18,
    marginRight: 5,
  },
  radioCircle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#B9DAED",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  selectedRb: {
    width: 9,
    height: 9,
    borderRadius: 6,
    backgroundColor: "#B9DAED",
  },

  medicalHistoryLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
  detailsContainer: {
    marginTop: 5,
    padding: 3,
    backgroundColor: "#B9DAED",
    borderRadius: 5,
    paddingLeft: 10,
  },
  detailsText: {
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    backgroundColor: "#0C7751",
    color: "white",
    padding: 6,
    borderRadius: 8,
    marginBottom: 5,
    paddingLeft: 20,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 3,
    paddingLeft: 3,
  },
  infoTime: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  bold: {
    fontWeight: "bold",
    fontSize: 16,
  },
  Period: {
    fontWeight: "medium",
    fontSize: 10,
    marginRight: 3,
  },
  PeriodText: {
    fontSize: 10,
    fontWeight: "bold",
  },

  generateReport: {
    marginLeft: 15,
    backgroundColor: "#1c766e",
    marginRight: 15,
    borderRadius: 10,
    padding: 5,
    width: "50%",
    alignItems: "center",
  },
  generateDocument: {
    flexDirection: "row",
    justifyContent: "center",
  },
  generateText: {
    color: "white",
    fontWeight: "bold",
  },
  medicalResultContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeConsumingcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 30,
  },
  timesView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  timesText: {
    backgroundColor: "#B9DAED",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 2,
    paddingBottom: 2,
    fontWeight: "bold",
    borderRadius: 5,
    marginBottom: 4,
    fontSize: 10,
  },
  row: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: 5,
    
  },
  genValueContainer: {
    flexDirection:"row",
    alignItems:"center",
    // justifyContent:"center"
  },
  valueText: {
    fontSize: 10,
    fontWeight: 'bold',
    margin:5
  },
  
});

export default Eprescriptionform;
