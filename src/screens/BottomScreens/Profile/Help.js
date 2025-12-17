import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColor } from '../../../util/ColorSwitcher';

const { width, height } = Dimensions.get('window');
const rs = size => (width / 375) * size;

// Platform detection
const isIOS = Platform.OS === 'ios';

// Responsive font scaling
const fontScale = size => {
  return isIOS ? size * 0.95 : size;
};

const HelpScreen = () => {
  const navigation = useNavigation();
  const { bgColor, textColor } = useColor();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Image
            source={require('../../../assets/back.png')}
            style={[styles.icon, { tintColor: bgColor }]}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Help</Text>
        <View style={{ width: rs(40) }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Help & Support</Text>

        <Text style={styles.paragraph}>
          This is a dummy help screen. You can add FAQs, contact information,
          troubleshooting steps, or any support-related content here.
        </Text>

        <View style={styles.box}>
          <Text style={styles.boxText}>✔ App Usage Guide</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxText}>✔ Troubleshooting Tips</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxText}>✔ Contact Support</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /* Header */
  header: {
    height: isIOS ? rs(100) : rs(90),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(18),
    justifyContent: 'space-between',
    paddingTop: isIOS ? rs(50) : rs(30),
    paddingBottom: rs(0),
  },
  headerTitle: {
    color: '#fff',
    fontSize: fontScale(rs(20)),
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: rs(10),
  },
  iconBtn: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  icon: {
    width: rs(20),
    height: rs(20),
  },

  content: {
    padding: rs(20),
    paddingBottom: isIOS ? rs(100) : rs(90),
    paddingTop: rs(10),
  },

  title: {
    fontSize: fontScale(rs(22)),
    marginBottom: rs(15),
    color: '#000',
    fontWeight: 'bold',
  },

  paragraph: {
    fontSize: fontScale(rs(14)),
    marginBottom: rs(20),
    lineHeight: rs(22),
    color: '#444',
  },

  box: {
    padding: rs(16),
    borderRadius: rs(12),
    marginBottom: rs(12),
    backgroundColor: '#F7F7F7',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  boxText: {
    fontSize: fontScale(rs(14)),
    color: '#171717ff',
    fontWeight: '700',
    marginLeft: rs(8),
  },
});
