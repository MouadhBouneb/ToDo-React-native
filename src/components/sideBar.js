// components/Sidebar.js
import React from 'react';
import { View, Text } from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';

const SideBar = (props) => {
  const { navigation, state } = props;

  console.log('Sidebar props:', props);

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  if (!state || !navigation) {
    console.error('State or navigation is undefined');
    return null;
  }

  return (
    <View>
      <View style={{ padding: 16 }}>
        <Text>Sidebar Header</Text>
      </View>
      <DrawerItemList {...props} />
    </View>
  );
};

export default SideBar;
