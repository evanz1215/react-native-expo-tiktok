import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function NewPostScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return <View />;
  }

  if (permission && !permission.granted && !permission.canAskAgain) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need your permission to use the camera
        </Text>
        <Button
          title="Grant Permission"
          onPress={() => Linking.openSettings()}
        />
      </View>
    );
  }

  const toggleCamera = () =>
    setFacing((current) => (current === "back" ? "front" : "back"));

  const selectFromGallery = () => {};

  return (
    <View style={{ flex: 1 }}>
      <CameraView style={styles.camera} facing={facing} />
      <View style={styles.tobBar}>
        <Ionicons
          name="close"
          size={40}
          color="white"
          onPress={() => {
            router.back();
          }}
        />
      </View>

      <View style={styles.bottomControls}>
        <Ionicons
          name="images"
          size={40}
          color="white"
          onPress={selectFromGallery}
        />
        <TouchableOpacity
          style={styles.recordButton}
          onPress={() => console.log("Start")}
        />

        <Ionicons
          name="camera-reverse"
          size={40}
          color="white"
          onPress={toggleCamera}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  permissionText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
  camera: {
    flex: 1,
  },
  recordButton: {
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 40,
  },
  tobBar: {
    position: "absolute",
    top: 50,
    left: 10,
  },
  bottomControls: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
});
