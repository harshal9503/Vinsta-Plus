import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const rs = size => (width / 375) * size;

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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Setting's</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* List */}
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

      {/* Logout */}
      <TouchableOpacity style={styles.logoutRow}>
        <Image
          source={require('../../../assets/logout.png')}
          style={[styles.rowIcon, { tintColor: '#d32f2f' }]}
        />
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.06,
    paddingBottom: rs(15),
    paddingHorizontal: rs(16),
  },
  backIcon: {
    width: rs(22),
    height: rs(22),
    tintColor: '#000',
  },
  headerTitle: {
    fontSize: rs(20),
    fontWeight: '600',
    color: '#000',
  },

  /* Rows */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: rs(14),
    paddingHorizontal: rs(16),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    fontSize: rs(15),
    color: '#000',
  },
  arrow: {
    width: rs(20),
    height: rs(20),
    tintColor: '#8b8b8bff',
  },

  /* Logout */
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rs(16),
    paddingHorizontal: rs(16),
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  logoutText: {
    fontSize: rs(15),
    color: '#d32f2f',
    marginLeft: rs(14),
    fontWeight: '500',
  },
});
