import { Appbar, Button } from "react-native-paper";
import React from "react";
import { getHeaderTitle } from "@react-navigation/elements";

export default function MainAppBar(props) {
  const title = getHeaderTitle(props.options, props.route.name);
  console.log(props.navigation);
  return (
    <Appbar.Header style={{ backgroundColor: props.backgroundColor }}>
      {props.back ? (
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
      ) : null}
      <Appbar.Content title={title} />
      {props.showDeleteButton && (
        <Button icon="delete" onPress={props.onDeleteMarkers}>
          Delete Markers
        </Button>
      )}
      {props.back ? null : (
        <Appbar.Action icon={props.icon} onPress={props.getLocation} />
      )}
      {props.back ? null : (
        <Appbar.Action
          icon="cog"
          onPress={() => props.navigation.navigate("Settings")}
        />
      )}
    </Appbar.Header>
  );
}