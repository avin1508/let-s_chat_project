import { createNativeStackNavigator } from "@react-navigation/native-stack"

import UsersListScreen from "../pages/AppPages/UsersListScreen"
import ChatScreen from "../pages/AppPages/ChatScreen"
import ProfileScreen from "../pages/AppPages/ProfileScreen"
import UserProfileScreen from "../pages/AppPages/UserProfileScreen"
import StatusScreen from "../pages/AppPages/StatusScreen"

import AppTabNavigation from "./AppTabNavigation"

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tabs" component={AppTabNavigation} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="UsersProfileScreen" component={UserProfileScreen} />
    </Stack.Navigator>
  )
}

export default AppNavigation