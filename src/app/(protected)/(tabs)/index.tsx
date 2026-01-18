import FeedTab from "@/components/GenericComponents/FeedTab";
import PostListItem from "@/components/PostListItem";
import { fetchPosts } from "@/services/posts";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TABS = {
  EXPLORER: "Explorer",
  FOLLOWING: "Following",
  FOR_YOU: "For You",
} as const;

export default function HomeScreen() {
  const { height } = Dimensions.get("window");
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const containerHeight = height - tabBarHeight - (insets.bottom || 0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<string>(TABS.FOR_YOU);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => fetchPosts(pageParam),
    initialPageParam: {
      limit: 3,
      cursor: undefined,
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) {
        return undefined;
      }

      return {
        limit: 3,
        cursor: lastPage[lastPage.length - 1].id,
      };
    },
  });

  const posts = useMemo(() => data?.pages.flat() || [], [data]);

  const onViewableItemChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index || 0);
      }
    }
  );

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 18,
          }}
        >
          Error Occurred While Fetching The Posts.
        </Text>
      </View>
    );
  }

  // console.log("tabBarHeight:", tabBarHeight);
  // console.log("currentIndex:", currentIndex);
  // console.log("data", JSON.stringify(data));

  return (
    <View style={{ height: containerHeight }}>
      <View style={styles.topBar}>
        <MaterialIcons name="live-tv" size={24} color="white" />
        <View style={styles.navigationBar}>
          <FeedTab
            title={TABS.EXPLORER}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <FeedTab
            title={TABS.FOLLOWING}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <FeedTab
            title={TABS.FOR_YOU}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </View>
        <Ionicons name="search" size={24} color="white" />
      </View>

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
        onEndReached={() =>
          !isFetchingNextPage && hasNextPage && fetchNextPage()
        }
        onEndReachedThreshold={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    position: "absolute",
    top: 70,
    zIndex: 1,
    paddingHorizontal: 15,
  },
  navigationBar: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    gap: 30,
  },
});
