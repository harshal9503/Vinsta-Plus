import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  Linking,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const rs = v => (width / 375) * v;

const Support = () => {
  const navigation = useNavigation();

  const openEmail = () => {
    Linking.openURL('mailto:support@vinsta.com').catch(() =>
      Alert.alert('Error', 'Could not open email client.'),
    );
  };

  const openPhone = () => {
    Linking.openURL('tel:+911234567890').catch(() =>
      Alert.alert('Error', 'Could not open phone dialer.'),
    );
  };

  const openWebsite = () => {
    Linking.openURL('https://vinsta.com/support').catch(() =>
      Alert.alert('Error', 'Could not open browser.'),
    );
  };

  const openFAQ = () => {
    const whatsappURL = `whatsapp://send?phone=+911234567890`;

    Linking.canOpenURL(whatsappURL)
      .then(supported => {
        if (supported) {
          Linking.openURL(whatsappURL);
        } else {
          Alert.alert(
            'WhatsApp not installed',
            'Please install WhatsApp to contact support.',
          );
        }
      })
      .catch(() => {
        Alert.alert('Error', 'Could not open WhatsApp.');
      });
  };

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

        <Text style={styles.headerTitle}>Support</Text>
        <View style={{ width: rs(22) }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Options </Text>

          {/* Email */}
          <TouchableOpacity style={styles.contactItem} onPress={openEmail}>
            <View style={styles.contactInfo}>
              <Image
                source={require('../../../assets/email.png')}
                style={styles.contactIcon}
              />
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactTitle}>Email Support</Text>
                <Text style={styles.contactDescription}>
                  support@vinsta.com
                </Text>
              </View>
            </View>

            <Image
              source={require('../../../assets/right-arrow.png')}
              style={styles.chevronIcon}
            />
          </TouchableOpacity>

          {/* Phone */}
          <TouchableOpacity style={styles.contactItem} onPress={openPhone}>
            <View style={styles.contactInfo}>
              <Image
                source={require('../../../assets/phone.png')}
                style={styles.contactIcon}
              />
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactTitle}>Phone Support</Text>
                <Text style={styles.contactDescription}>
                  +91 1234567890
                </Text>
              </View>
            </View>

            <Image
              source={require('../../../assets/right-arrow.png')}
              style={styles.chevronIcon}
            />
          </TouchableOpacity>

          {/* Website */}
          <TouchableOpacity style={styles.contactItem} onPress={openWebsite}>
            <View style={styles.contactInfo}>
              <Image
                source={require('../../../assets/website.png')}
                style={styles.contactIcon}
              />
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactTitle}>Help Center</Text>
                <Text style={styles.contactDescription}>
                  VinstaPlus.com/support
                </Text>
              </View>
            </View>

            <Image
              source={require('../../../assets/right-arrow.png')}
              style={styles.chevronIcon}
            />
          </TouchableOpacity>

          {/* FAQ */}
          <TouchableOpacity style={styles.contactItem} onPress={openFAQ}>
            <View style={styles.contactInfo}>
              <Image
                source={require('../../../assets/faq.png')}
                style={styles.contactIcon}
              />
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactTitle}>FAQ</Text>
                <Text style={styles.contactDescription}>
                  Frequently asked questions
                </Text>
              </View>
            </View>

            <Image
              source={require('../../../assets/right-arrow.png')}
              style={styles.chevronIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Support Info */}
        <View style={styles.supportInfo}>
          <Text style={styles.supportHours}>📞 Support Hours: 24/7</Text>
          <Text style={styles.responseTime}>
            ⏰ Average Response Time: 2 hours
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Support;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontWeight: '700',
  },

  scrollContent: {
    paddingBottom: rs(50),
    paddingHorizontal: rs(20),
  },

  section: {
    marginTop: rs(25),
  },

  sectionTitle: {
    fontSize: rs(15),
    fontWeight: '700',
    fontFamily: 'Figtree-SemiBold',
    marginBottom: rs(15),
    marginLeft: rs(5),
    color: '#000',
    
  },

  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: rs(12),
    padding: rs(16),
    marginBottom: rs(12),
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: rs(3),
        shadowOffset: { height: rs(1) },
      },
      android: {
        elevation: 2,
      },
    }),
  },

  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  contactIcon: {
    width: rs(24),
    height: rs(24),
    resizeMode: 'contain',
    marginRight: rs(12),
  },

  contactTextContainer: {
    flex: 1,
  },

  contactTitle: {
    fontSize: rs(14),
    fontFamily: 'Figtree-SemiBold',
    color: '#000',
    fontWeight: '700',
  },

  contactDescription: {
    fontSize: rs(12),
    fontFamily: 'Figtree-Regular',
    color: '#666',
    marginTop: rs(2),
  },

  chevronIcon: {
    width: rs(16),
    height: rs(16),
    resizeMode: 'contain',
  },

  supportInfo: {
    alignItems: 'center',
    marginTop: rs(30),
    paddingTop: rs(20),
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },

  supportHours: {
    fontSize: rs(13),
    fontFamily: 'Figtree-Medium',
    color: '#000',
  },

  responseTime: {
    fontSize: rs(13),
    fontFamily: 'Figtree-Medium',
    color: '#000',
    marginTop: rs(6),
  },
});
