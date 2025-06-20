import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage from "../pages/authPages/LoginPage";
import ForgetPasswordPage from "../pages/authPages/ForgetPasswordPage";
import SignupFlow from "../pages/authPages/SignupFlow";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="ForgetPasswordPage" component={ForgetPasswordPage} />
      <Stack.Screen name="SignupFlow" component={SignupFlow} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
