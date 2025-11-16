import PostListItem from "@/components/PostListItem";
import { View, FlatList, Dimensions, ViewToken, Text } from "react-native";
import posts from "@assets/data/posts.json";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRef, useState } from "react";

export default function HomeScreen() {
  const { height } = Dimensions.get("window");
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const containerHeight = height - tabBarHeight - (insets.bottom || 0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const onViewableItemChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index || 0);
      }
    }
  );

  console.log("tabBarHeight:", tabBarHeight);
  console.log("currentIndex:", currentIndex);

  return (
    <View style={{ height: containerHeight }}>
      <FlatList
        data={posts}
        renderItem={({ item, index }) => (
          <PostListItem
            key={item.id}
            postItem={item}
            isActive={index === currentIndex}
          />
        )}
        showsVerticalScrollIndicator={false}
        snapToInterval={containerHeight}
        decelerationRate={"fast"}
        disableIntervalMomentum={true}
        onViewableItemsChanged={onViewableItemChanged.current}
      />
    </View>
  );
}
