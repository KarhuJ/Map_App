import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { PaperProvider } from "react-native-paper";
import MainAppBar from "./components/MainAppBar";
import MapView, { Marker } from "react-native-maps";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "./screens/settings";

const settings = {
  backgroundColor: "grey",
};

const icons = {
  location_not_found: "crosshairs",
  location_found: "crosshairs-gps",
  location_searching: "crosshairs-question",
};

export default function App() {
  const [icon, setIcon] = useState(icons.location_not_found);
  const [location, setLocation] = useState({
    latitude: 65.08,
    longitude: 25.48,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markers, setMarkers] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [mapType, setMapType] = useState("standard");

  const getLocation = async () => {
    setIcon(icons.location_searching);
    let { status } = await Location.requestForegroundPermissionsAsync();
    try {
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setIcon(icons.location_found);
      setLocation({
        ...location,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.log("Error getting location", error);
    }
  };

  const handleLongPress = (event) => {
    const newMarker = {
      id: Date.now(),
      coordinate: event.nativeEvent.coordinate,
      title: "New Marker",
      description: "Added on long press",
      pinColor: "blue",
    };

    setMarkers([...markers, newMarker]);
    setShowDeleteButton(true);
  };

  const onDeleteMarkers = () => {
    setMarkers([]);
    setShowDeleteButton(false);
  };

  const Stack = createNativeStackNavigator();

  /* useEffect(() => {
    getLocation();
  }, []);*/

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Map"
          screenOptions={{
            header: (props) => (
              <MainAppBar
                {...props}
                backgroundColor={settings.backgroundColor}
                icon={icon}
                getLocation={getLocation}
                showDeleteButton={showDeleteButton}
                onDeleteMarkers={onDeleteMarkers}
              />
            ),
          }}
        >
          
          <Stack.Screen name="Map">
            {() => (
              <SafeAreaView style={styles.container}>
                <MapView
                  style={styles.map}
                  region={location}
                  onLongPress={handleLongPress}
                  mapType={mapType}
                >
                  <Marker
                    coordinate={{
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }}
                    title="Your Location"
                    description="This is where you are"
                    pinColor="red"
                  />
                  {markers.map((marker) => (
                    <Marker
                      key={marker.id}
                      coordinate={marker.coordinate}
                      title={marker.title}
                      description={marker.description}
                      pinColor={marker.pinColor}
                    />
                  ))}
                </MapView>
              </SafeAreaView>
            )}
          </Stack.Screen>

          
          <Stack.Screen name="Settings">
            {() => (
              <Settings
                backgroundColor={settings.backgroundColor}
                mapType={mapType}
                setMapType={setMapType}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
