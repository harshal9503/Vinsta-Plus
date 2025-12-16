import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
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

// Scale size for dimensions
const scaleSize = size => {
  return isIOS ? size * 1.02 : size;
};

const settingsData = [
  { id: 1, title: 'Account Setting', icon: require('../../../assets/ac.png') },
  { id: 2, title: "Sound's and voice", icon: require('../../../assets/sound.png') },
  { id: 3, title: 'Language', icon: require('../../../assets/language.png') },
  { id: 4, title: 'Notification Setting', icon: require('../../../assets/notisetting.png') },
  { id: 5, title: 'Account management', icon: require('../../../assets/acmanage.png') },
  { id: 6, title: 'About us', icon: require('../../../assets/aboutus.png') },
  { id: 7, title: 'Share app', icon: require('../../../assets/share1.png') },
];

const Settings = () => {
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
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: rs(40) }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Settings List */}
        {settingsData.map(item => (
          <TouchableOpacity key={item.id} style={styles.row}>
            <View style={styles.rowLeft}>
              <Image source={item.icon} style={styles.rowIcon} />
              <Text style={styles.rowText}>{item.title}</Text>
            </View>
            <Image
              source={require('../../../assets/arrow-right.png')}
              style={styles.arrow}
            />
          </TouchableOpacity>
        ))}

        {/* Delete Account */}
        <TouchableOpacity style={styles.deleteAccountRow}>
          <Image
            source={require('../../../assets/delete.png')}
            style={[styles.rowIcon, { tintColor: '#d32f2f' }]}
          />
          <Text style={styles.deleteAccountText}>Delete Account</Text>
        </TouchableOpacity>

        {/* Extra padding for bottom tab */}
        <View style={{ height: rs(80) }} />
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scrollContent: {
    paddingBottom: isIOS ? rs(100) : rs(90),
    paddingHorizontal: rs(16),
    paddingTop: rs(10),
  },

  /* Header - Address Screen Style */
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

  /* Settings Rows - Card Style */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: rs(14),
    paddingHorizontal: rs(16),
    backgroundColor: '#F7F7F7',
    marginBottom: rs(12),
    borderRadius: rs(14),
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
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowIcon: {
    width: rs(22),
    height: rs(22),
    tintColor: '#000',
    marginRight: rs(14),
  },
  rowText: {
    fontSize: fontScale(rs(15)),
    color: '#000',
    fontWeight: '500',
  },
  arrow: {
    width: rs(20),
    height: rs(20),
    tintColor: '#8b8b8bff',
  },

  /* Delete Account Row */
  deleteAccountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rs(16),
    paddingHorizontal: rs(16),
    backgroundColor: '#FFE6E6',
    borderRadius: rs(14),
    marginBottom: rs(12),
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
  deleteAccountText: {
    fontSize: fontScale(rs(15)),
    color: '#d32f2f',
    marginLeft: rs(14),
    fontWeight: '500',
  },
});
