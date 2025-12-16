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

const { width, height } = Dimensions.get('window');
const rs = v => (width / 375) * v;

const HelpScreen = () => {
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

        <Text style={styles.headerTitle}>Help</Text>
        <View style={{ width: rs(22) }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
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

  content: {
    padding: rs(20),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? rs(55) : rs(45),
    paddingBottom: rs(15),
    paddingHorizontal: rs(20),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  backIcon: {
    width: rs(22),
    height: rs(22),
    resizeMode: 'contain',
  },

  headerTitle: {
    fontSize: rs(18),
    fontFamily: 'Figtree-Bold',
    color: '#000',
    fontWeight: 'bold',
  },

  title: {
    fontSize: rs(22),
    fontFamily: 'Figtree-Bold',
    marginBottom: rs(15),
    color: '#000',
    fontWeight: 'bold',
  },

  paragraph: {
    fontSize: rs(14),
    fontFamily: 'Figtree-Regular',
    marginBottom: rs(20),
    lineHeight: rs(22),
    color: '#444',
  },

  box: {
    padding: rs(16),
    borderRadius: rs(12),
    marginBottom: rs(12),
    backgroundColor: '#f7f7f7',
  },

  boxText: {
    fontSize: rs(14),
    fontFamily: 'Figtree-SemiBold',
    color: '#171717ff',
    fontWeight: '700',
    marginLeft: rs(8),
  },
});
