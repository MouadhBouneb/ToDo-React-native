// AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// Import SignUpScreen
import Icon from 'react-native-vector-icons/FontAwesome';
import SignUpScreen from '../screens/signup';
import SignInScreen from '../screens/signin';
import TaskDoneScreen from '../screens/taskDoneScreen';
import TaskInitScreen from '../screens/taskInitScreen';
import TaskInProgressScreen from '../screens/taskInProgress';
import DetailScreen from '../screens/detailScreen';
import EditScreen from '../screens/editScreen';
import SideBar from '../components/sideBar';
import HomeScreen from '../screens/homeScreen';
import { useDispatch, useSelector } from 'react-redux';


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const AuthStack = createStackNavigator(); // New stack navigator for authentication screens

const TaskStack = () => (
  <Tab.Navigator >
    {/* Existing tab configurations */}
    <Tab.Screen name="calendar" component={HomeScreen} options={{headerShown: false,
      tabBarIcon: ({ color, size }) => <Icon name="calendar" size={size} color={color} />,
    }} />
    <Tab.Screen name="ToDo" component={TaskInitScreen} options={{ headerShown: false,
      tabBarIcon: ({ color, size }) => <Icon name="list" size={size} color={color} />,
    }} />
    <Tab.Screen name="In Progress" component={TaskInProgressScreen} options={{ headerShown: false,
      tabBarIcon: ({ color, size }) => <Icon name="spinner" size={size} color={color} />,
    }} />
    <Tab.Screen name="Done" component={TaskDoneScreen} options={{headerShown: false,
      tabBarIcon: ({ color, size }) => <Icon name="check" size={size} color={color} />,
    }} />
  </Tab.Navigator>
);

const AuthNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
);

const AppNavigator = () => {
  
  const token = useSelector((state) => state)
  console.log("toekn",token)
 return (
  
  <NavigationContainer>
    {
      !Boolean(token?.auth?.token) ? 
    <AuthNavigator/> :
    <Drawer.Navigator drawerContent={(props) => <SideBar {...props} />}>
      <Drawer.Screen name="Home" component={TaskStack} options={{
        drawerIcon: ({ color, size }) => <Icon name="calendar" size={size} color={color} />,
      }} />
      <Drawer.Screen name="ToDo" component={TaskInitScreen} options={{
        drawerIcon: ({ color, size }) => <Icon name="list" size={size} color={color} />,
      }} />
      <Drawer.Screen name="In Progress" component={TaskInProgressScreen} options={{
        drawerIcon: ({ color, size }) => <Icon name="spinner" size={size} color={color} />,
      }} />
      <Drawer.Screen name="Task Detail" component={DetailScreen} options={{ drawerLabel: () => null }} />
      <Drawer.Screen name="Task Edit" component={EditScreen} options={{ drawerLabel: () => null }} />
    </Drawer.Navigator>
    }
  </NavigationContainer>
);
}
export default AppNavigator;
