import PostListItem from "@/components/PostListItem";
import { View, FlatList, Dimensions } from "react-native";
import posts from "@assets/data/posts.json";

export default function HomeScreen() {
  const { height } = Dimensions.get("window");

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostListItem key={item.id} postItem={item} />
        )}
        showsVerticalScrollIndicator={false}
        snapToInterval={height - 50}
        decelerationRate={"fast"}
      />
    </View>
  );
}
