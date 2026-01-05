import {
  CameraView,
  CameraType,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as Linking from "expo-linking";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";

export default function NewPostScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [video, setVideo] = useState<string>();
  const [description, setDescription] = useState<string>("");

  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();

  const videoPlayer = useVideoPlayer(null, (player) => {
    player.loop = true;
  });

  useEffect(() => {
    (async () => {
      if (permission && !permission.granted && permission.canAskAgain) {
        await requestPermission();
      }

      if (
        micPermission &&
        !micPermission.granted &&
        micPermission.canAskAgain
      ) {
        await requestMicPermission();
      }
    })();
  }, [permission, micPermission]);

  if (!permission || !micPermission) {
    return <View />;
  }

  if (
    (permission && !permission.granted && !permission.canAskAgain) ||
    (micPermission && !micPermission.granted && !micPermission.canAskAgain)
  ) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need your permission to use the camera and microphone
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

  const dismissVideo = () => {};

  const stopRecording = () => {
    setIsRecording(false);
    cameraRef.current?.stopRecording();
  };

  const startRecording = async () => {
    setIsRecording(true);
    const recordedVideo = await cameraRef.current?.recordAsync();

    if (recordedVideo?.uri) {
      console.log(recordedVideo.uri);
    }
  };

  const renderCamera = () => {
    return (
      <View style={{ flex: 1 }}>
        <CameraView
          mode="video"
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
        />
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
            style={[styles.recordButton, isRecording && styles.recordingButton]}
            onPress={isRecording ? stopRecording : startRecording}
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
  };

  const renderRecorderVideo = () => {
    return (
      <View style={{ flex: 1 }}>
        <Ionicons
          name="close"
          size={32}
          color="white"
          onPress={dismissVideo}
          style={styles.closeIcon}
        />

        <View>
          <VideoView
            player={videoPlayer}
            contentFit="cover"
            style={styles.video}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Add a description..."
          placeholderTextColor="#888"
          multiline
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity>
          <Text style={styles.postText}>Post</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return <>{video ? renderRecorderVideo() : renderCamera()}</>;
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
  recordingButton: {
    backgroundColor: "#F44336",
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
  closeIcon: {},
  video: {},
  input: {},
  postText: {},
});
