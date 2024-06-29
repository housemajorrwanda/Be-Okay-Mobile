import { StackNavigationProp } from '@react-navigation/stack';

// Define the types for each screen, making sure to set `undefined` if no parameters are passed
export type RootStackParamList = {
  SplashScreen: undefined;
  GetStarted: undefined;
  SignupMix: undefined;
  ConsultationWithAI: undefined;
  ConsultationWithDoctor:undefined;
  Join: undefined;
  DoctorSignup: undefined;
  PatientNormalSignUp: undefined;
  ConfirmResetPassword: undefined;
  DoctorConfirmPassCheckSuportword: undefined;
  DoctorLoginPage: undefined;
  DoctorPasswordEmailForget: undefined;
  DoctorVerifyAccount: undefined;
  NewConfirmPassword: undefined;
  PasswordEmailForget: undefined;
  ResendCodeForEmailField: undefined;
  Community: undefined;
  DoctorChatSupport: undefined;
  DoctorEditProfile: undefined;
  DoctorEmergency: undefined;
  DoctorsDashbord: undefined;
  DoctorSetScheduleAppointment: undefined;
  JoinMyCommunity: undefined;
  MyCommunity: undefined;
  TimePicker: undefined;
  LoginPage: undefined;
  ResendCodeForEmailFieldPatient: undefined;
  ConfirmResetPasswordPatient: undefined;
  PasswordEmailForgetPatient: undefined;
  PatientNewConfirmPassword: undefined;
  PatientNormalSigningUp: undefined;
  AppointmentDetails: undefined;
  ChatBoxConsultationBodyImageMapping: undefined;
  CheckSupport: undefined;
  Checkup: undefined;
  Consultation: undefined;
  ConsultationResult: undefined;
  ConsultationTypeResult: undefined;
  Emergency: undefined;
  Head: undefined;
  HomeCare: undefined;
  Hospitals: undefined;
  LeftArmPage: undefined;
  LeftLegPage: undefined;
  MedicalLabTest: undefined;
  MedicalRecommendationForm: undefined;
  MedicalReport: undefined;
  NeckChest: undefined;
  PatientBookDoctorAppointment: undefined;
  PaymentResult: undefined;
  ReproductiveOrgan: undefined;
  RightArmPage: undefined;
  RightLegPage: undefined;
  TrunkPage: undefined;
  NormalSignUp:undefined,
  PatientsDashbord:undefined,
  DoctorVerifyaccount:undefined,
  Verifyaccount:undefined,
  DoctorChatsupport:undefined,
  ChatBoxConsultationBodyImagemapping:undefined,
  ConsultationWithHomecareForm:undefined,
  paymentResult:undefined,
  CheckSuport:undefined,
  EditProfile:undefined,
  joinMyCommunity:undefined
};

// Create a type for navigation props based on the RootStackParamList
export type NavigationProps = StackNavigationProp<RootStackParamList>;
