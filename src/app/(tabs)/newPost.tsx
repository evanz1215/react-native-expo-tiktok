import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
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

  return (
    <View>
      <CameraView style={styles.camera} facing={facing} />
      <View>
        <Ionicons
          name="close"
          size={40}
          color="white"
          onPress={() => {
            router.back();
          }}
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
});
