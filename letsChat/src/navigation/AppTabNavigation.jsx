import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UsersListScreen from "../pages/AppPages/UsersListScreen";
import StatusScreen from "../pages/AppPages/StatusScreen";
import ProfileScreen from "../pages/AppPages/ProfileScreen";
import Icon from 'react-native-vector-icons/Ionicons'; // More professional icons
import colors from "../Constants/Theme";

const Tab = createBottomTabNavigator();

const AppTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconSize = 24;

          if (route.name === 'Chat') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } else if (route.name === 'Status') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={iconSize} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 0,
          height: 60,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 10,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
      })}
    >
      <Tab.Screen 
        name="Chat" 
        component={UsersListScreen} 
        options={{
          tabBarLabel: 'Chats',
        }}
      />
      <Tab.Screen 
        name="Status" 
        component={StatusScreen} 
        options={{
          tabBarLabel: 'Status',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabNavigation;