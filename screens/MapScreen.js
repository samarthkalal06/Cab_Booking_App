import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

const ORS_KEY =
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjFmNWFmZDE2YjJkMTRiNjc4NzRiMTY4Y2RjNWNmMWIzIiwiaCI6Im11cm11cjY0In0=";

// Free Geocoding
const getLatLng = async (place) => {
  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(
      place + ", India"
    )}&limit=1`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.features || data.features.length === 0) return null;

    const coords = data.features[0].geometry.coordinates;

    return {
      lat: coords[1],
      lng: coords[0],
    };
  } catch (err) {
    console.log("Geocode error:", err);
    return null;
  }
};

export default function MapScreen({ route, navigation }) {
  const { pickup, drop, cab } = route.params;

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [polylineCoords, setPolylineCoords] = useState([]);
  const [fare, setFare] = useState(null);

  const mapRef = useRef(null);

  const getRoute = async (fromLoc, toLoc) => {
    try {
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_KEY}&start=${fromLoc.lng},${fromLoc.lat}&end=${toLoc.lng},${toLoc.lat}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!data.features || !data.features.length) {
        Alert.alert("Route Error", "Could not find a route.");
        return;
      }

      const coords = data.features[0].geometry.coordinates;

      setPolylineCoords(
        coords.map((c) => ({
          latitude: c[1],
          longitude: c[0],
        }))
      );

      const meters = data.features[0].properties.summary.distance;
      const km = meters / 1000;
      setFare((50 + km * 12).toFixed(2));
    } catch (err) {
      console.log("Route error:", err);
      Alert.alert("Network Error", "Unable to fetch route.");
    }
  };

  useEffect(() => {
    const load = async () => {
      const fromLoc = await getLatLng(pickup);
      const toLoc = await getLatLng(drop);

      if (!fromLoc || !toLoc) {
        Alert.alert("Invalid location", "Enter more specific names");
        return;
      }

      setFrom({ latitude: fromLoc.lat, longitude: fromLoc.lng });
      setTo({ latitude: toLoc.lat, longitude: toLoc.lng });

      getRoute(fromLoc, toLoc);
    };

    load();
  }, []);

  if (!from || !to) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading route...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: from.latitude,
          longitude: from.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={from} title="Pickup" pinColor="green" />
        <Marker coordinate={to} title="Drop" pinColor="red" />

        {polylineCoords.length > 0 && (
          <Polyline
            strokeColor="blue"
            strokeWidth={4}
            coordinates={polylineCoords}
          />
        )}
      </MapView>

      {fare && (
        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            backgroundColor: "white",
            padding: 15,
            borderRadius: 10,
            elevation: 4,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Estimated Fare: ₹{fare}
          </Text>

          <TouchableOpacity
            style={{
              marginTop: 10,
              backgroundColor: "green",
              padding: 12,
              borderRadius: 10,
              alignItems: "center",
            }}
            onPress={() =>
              navigation.navigate("Payment", {
                pickup,
                drop,
                cab,
                fare,
              })
            }
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              Proceed to Payment
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
