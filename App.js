import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

// Screens
import HomeScreen from "./screens/HomeScreen";
import MyRidesScreen from "./screens/MyRidesScreen";
import ProfileScreen from "./screens/ProfileScreen";

import BookingSuccessScreen from "./screens/BookingSuccessScreen";
import BookRideScreen from "./screens/BookRideScreen";
import ConfirmBookingScreen from "./screens/ConfirmBookingScreen";
import MapScreen from "./screens/MapScreen";
import PaymentScreen from "./screens/PaymentScreen";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

// Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "MyRides") iconName = "car-outline";
          else if (route.name === "Profile") iconName = "person-outline";

          return <Ionicons name={iconName} size={24} color={color} />;
        },

        tabBarActiveTintColor: "#0A79DF",
        tabBarInactiveTintColor: "#777",

        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          elevation: 15,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MyRides" component={MyRidesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          {/* Main Tabs */}
          <Stack.Screen name="Tabs" component={Tabs} />

          {/* Booking Flow */}
          <Stack.Screen name="BookRide" component={BookRideScreen} />
          <Stack.Screen name="ConfirmBooking" component={ConfirmBookingScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="BookingSuccess" component={BookingSuccessScreen} />

        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
