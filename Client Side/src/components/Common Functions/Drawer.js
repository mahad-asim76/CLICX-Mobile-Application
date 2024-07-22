import React, {useEffect, useRef} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Drawer = ({ isOpen, onClose, contentType }) => {
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : -width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const renderContent = () => {
    switch (contentType) {
      case 'pulse':
        return <Text>This is the Pulse content.</Text>;
      case 'finances':
        return <Text>This is the Finances content.</Text>;
      default:
        return <Text>No content available.</Text>;
    }
  };

  return (
    <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
      <View style={styles.drawerContent}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
         {renderContent()}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.8,
    height: '100%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  drawerContent: {
    padding: 20,
  },
  closeBtn: {
    backgroundColor: 'transparent',
  },
  closeText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default Drawer;
