import { Ionicons } from "@expo/vector-icons";
import { useVideoPlayer, VideoView } from "expo-video";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

const videoSource = {
  uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
};

export default function PostListItem() {
  const { height } = Dimensions.get("window");
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View
      style={{
        height: height - 55,
      }}
    >
      <VideoView
        style={{
          flex: 1,
        }}
        player={player}
        allowsFullscreen={false}
        allowsPictureInPicture={false}
        contentFit="cover"
        nativeControls={false}
      />

      <View style={styles.interactionBar}>
        <TouchableOpacity
          style={styles.interactionButton}
          onPress={() => console.log("Like Pressed")}
        >
          <Ionicons name="heart" size={33} color="#fff" />
          <Text style={styles.interactionText}>0</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.interactionButton}
          onPress={() => console.log("Comment Pressed")}
        >
          <Ionicons name="chatbubbles" size={33} color="#fff" />
          <Text style={styles.interactionText}>0</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.interactionButton}
          onPress={() => console.log("Share Pressed")}
        >
          <Ionicons name="arrow-redo" size={33} color="#fff" />
          <Text style={styles.interactionText}>20</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.avatar}
          onPress={() => console.log("Profile Pressed")}
        >
          <Text style={styles.avatarText}>A</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.videoInfo}>
        <Text style={styles.username}>Abc</Text>
        <Text style={styles.description}>Hello World!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  interactionBar: {
    position: "absolute",
    bottom: 20,
    right: 20,
    alignContent: "center",
    gap: 25,
  },
  interactionButton: {
    alignItems: "center",
    gap: 5,
  },
  interactionText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  videoInfo: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 100, // 可以防止文字被超過遮擋右側按鈕
    gap: 5,
  },
  username: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  description: {
    color: "#fff",
  },
});
