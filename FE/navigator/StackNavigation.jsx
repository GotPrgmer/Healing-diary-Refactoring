import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalColors } from "../constants/color";
import BottomTabs from "./BottomTabs";
import LoginScreen from "./../screens/LoginScreen";
import DiaryDetail from "./../components/diaryDetail/DiaryDetail";
import Date from "../ui/Date";
import MakingScreen from "../screens/MakingScreen";
import { Text, TouchableOpacity } from "react-native";
import MakingDetailScreen from "../screens/MakingDetailScreen";
import Hashtag from "../components/making/Hashtag";
import MakingHashScreen from "../screens/MakingHashScreen";
import GroupDetailScreen from "../screens/GroupDetailScreen";
import UserInformScreen from "../screens/UserInformScreen";

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator
        initialRouteName="userinform"
        component= {UserInformScreen}
        > */}
      <Stack.Navigator
        initialRouteName="diaryBottomTab"
        screenOptions={{
          headerStyle: {
            backgroundColor: GlobalColors.colors.background500,
          },
          headerTintColor: GlobalColors.colors.black500,
        }}
      >
        <Stack.Screen
          name="diaryBottomTab"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="diaryDetail"
          component={DiaryDetail}
          options={{
            headerTitle: () => <Date />,
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: GlobalColors.colors.primary500,
            },
          }}
        />
        <Stack.Screen
          name="Making"
          component={MakingScreen}
          options={({ navigation }) => ({
            headerTitle: "",
            headerBackTitleVisible: false,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("MakingDetail")}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>다음</Text>
              </TouchableOpacity>
            ),
            headerTitle: () => <Date />,
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: GlobalColors.colors.primary500,
            },
          })}
        />
        <Stack.Screen
          name="MakingDetail"
          component={MakingDetailScreen}
          options={({ navigation }) => ({
            title: "",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("MakingDetail")}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>완료</Text>
              </TouchableOpacity>
            ),
            headerTitle: () => <Date />,
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: GlobalColors.colors.primary500,
            },
          })}
        />

        <Stack.Screen
          name="MakingHash"
          component={MakingHashScreen}
          options={{
            title: "",
            headerTitle: () => <Date />,
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: GlobalColors.colors.primary500,
            },
          }}
        />
        <Stack.Screen
          name="groupDetail"
          component={GroupDetailScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="userinform"
          component={UserInformScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigation;
