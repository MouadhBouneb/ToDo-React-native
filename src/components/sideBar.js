// components/Sidebar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import CustomButton from './customButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SideBar = (props) => {
  const { navigation, state } = props;

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  if (!state || !navigation) {
    console.error('State or navigation is undefined');
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sidebar Header</Text>
      </View>
      <DrawerItemList {...props} />
      <View style={styles.header}>
        <CustomButton title={'Logout'} onPress={() => { AsyncStorage.clear(), handleNavigation('SignUp') }} style={styles.delete}></CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  delete: {
    backgroundColor: '#FA1111',
    color: '#FFFFFF',
    padding: 8,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#002551',
  },
  headerText: {
    fontSize: 18,
    color: '#002551',
  },
  label: {
    fontSize: 16,
    color: '#002551',
  },
  icon: {
    fontSize: 24,
    color: '#002551',
  },
  activeItem: {
    backgroundColor: '#002551',
  },
  activeLabel: {
    color: '#fff',
  },
  activeIcon: {
    color: '#fff',
  },
});

export default SideBar;
