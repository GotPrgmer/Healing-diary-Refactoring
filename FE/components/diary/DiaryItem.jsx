import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import { GlobalColors } from "./../../constants/color";
import { Ionicons } from "@expo/vector-icons";

const deviceWidth = Dimensions.get("window").width - 50;

const DiaryItem = ({ hashtags, date }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/SAMPLE1.png")}
        style={styles.image}
      />
      <View style={styles.diaryInfo}>
        <Text style={styles.hashtag}>{hashtags}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.circle}>
        <Ionicons name="play" size={16} />
      </View>
    </View>
  );
};

export default DiaryItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: deviceWidth,
    height: 90,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    backgroundColor: GlobalColors.colors.white500,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 24,
    marginBottom: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  diaryInfo: {
    justifyContent: "center",
    marginLeft: 15,
  },
  hashtag: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    fontSize: 12,
    color: GlobalColors.colors.black500,
    marginBottom: 8,
  },
  date: {
    fontFamily: "KoddiUDOnGothic-Regular",
    fontSize: 12,
    color: GlobalColors.colors.gray500,
    marginBottom: 8,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: GlobalColors.colors.primary500,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 25,
  },
});