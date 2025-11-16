import { Post } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { useVideoPlayer, VideoView } from "expo-video";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

type VideoItemProps = {
  postItem: Post;
};

export default function PostListItem({ postItem }: VideoItemProps) {
  const { height } = Dimensions.get("window");

  const { video_url, nrOfComments, nrOfLikes, nrOfShares, description, user } =
    postItem;

  const player = useVideoPlayer(video_url, (player) => {
    player.loop = true;
    // player.play();
  });

  return (
    <View
      style={{
        height: height - 50,
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
          <Text style={styles.interactionText}>{nrOfLikes[0]?.count || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.interactionButton}
          onPress={() => console.log("Comment Pressed")}
        >
          <Ionicons name="chatbubbles" size={33} color="#fff" />
          <Text style={styles.interactionText}>
            {nrOfComments[0]?.count || 0}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.interactionButton}
          onPress={() => console.log("Share Pressed")}
        >
          <Ionicons name="arrow-redo" size={33} color="#fff" />
          <Text style={styles.interactionText}>
            {nrOfShares[0]?.count || 0}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.avatar}
          onPress={() => console.log("Profile Pressed")}
        >
          <Text style={styles.avatarText}>
            {user?.username.charAt(0).toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.videoInfo}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.description}>{description}</Text>
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
