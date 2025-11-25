// ...existing code...
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColor } from '../../../util/ColorSwitcher';

export default function Offers() { 
  const { bgColor, textColor } = useColor();
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}> 
      <Text style={{ color: textColor }}>Offers Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
