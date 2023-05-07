import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.upperMenu}>
        <DrawerItemList {...props} />
      </View>
      <View style={styles.lowerMenu}>
        <DrawerItem
          label="Зв'язатися з розробником"
          onPress={() => props.navigation.navigate('Зв\'язатися з розробником')}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  upperMenu: {
    flex: 1,
  },
  lowerMenu: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  }
});

export default CustomDrawerContent;