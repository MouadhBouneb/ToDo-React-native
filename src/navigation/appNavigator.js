import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DetailScreen from '../screens/detailScreen';
import EditScreen from '../screens/editScreen';
import SideBar from '../components/sideBar';
import TaskInProgressScreen from '../screens/taskInProgress';
import TaskInitScreen from '../screens/taskInitScreen';
import HomeScreen from '../screens/homeScreen';
import TaskDoneScreen from '../screens/taskDoneScreen';


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TaskStack = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="ToDo" component={TaskInitScreen} />
    <Tab.Screen name="In Progress" component={TaskInProgressScreen} />
    <Tab.Screen name="Done" component={TaskDoneScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator drawerContent={(props) => <SideBar {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="ToDo" component={TaskInitScreen} />
      <Drawer.Screen name="In Progress" component={TaskInProgressScreen} />
      <Drawer.Screen name="Done" component={TaskDoneScreen} />
      <Drawer.Screen name="TaskDetail" component={DetailScreen} options={{ drawerLabel: () => null }} />
      <Drawer.Screen name="TaskEdit" component={EditScreen} options={{ drawerLabel: () => null }} />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
