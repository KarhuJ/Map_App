import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Map({ props }) {
  return (
    <MapView
      style={styles.map}
      region={props.location}
      mapType={props.mapType}
      onLongPress={props.onLongPress}
    ></MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
