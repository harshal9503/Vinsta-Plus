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
import { useColor } from '../../../util/ColorSwitcher';

const { width, height } = Dimensions.get('window');
const rs = size => (width / 375) * size;

// Platform detection
const isIOS = Platform.OS === 'ios';

// Responsive font scaling
const fontScale = size => {
  return isIOS ? size * 0.95 : size;
};

const Support = () => {
  const navigation = useNavigation();
  const { bgColor, textColor } = useColor();

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
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Image
            source={require('../../../assets/back.png')}
            style={[styles.icon, { tintColor: bgColor }]}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Support</Text>
        <View style={{ width: rs(40) }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Options</Text>

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
              style={[styles.chevronIcon, { tintColor: '#8b8b8bff' }]}
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
              style={[styles.chevronIcon, { tintColor: '#8b8b8bff' }]}
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
              style={[styles.chevronIcon, { tintColor: '#8b8b8bff' }]}
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
              style={[styles.chevronIcon, { tintColor: '#8b8b8bff' }]}
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

  scrollContent: {
    paddingBottom: isIOS ? rs(100) : rs(90),
    paddingHorizontal: rs(20),
    paddingTop: rs(10),
  },

  section: {
    marginTop: rs(25),
  },

  sectionTitle: {
    fontSize: fontScale(rs(15)),
    fontWeight: '700',
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
    backgroundColor: '#F7F7F7',
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
    marginRight: rs(12),
  },

  contactTextContainer: {
    flex: 1,
  },

  contactTitle: {
    fontSize: fontScale(rs(14)),
    color: '#000',
    fontWeight: '700',
  },

  contactDescription: {
    fontSize: fontScale(rs(12)),
    color: '#666',
    marginTop: rs(2),
  },

  chevronIcon: {
    width: rs(16),
    height: rs(16),
  },

  supportInfo: {
    alignItems: 'center',
    marginTop: rs(30),
    paddingTop: rs(20),
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },

  supportHours: {
    fontSize: fontScale(rs(13)),
    color: '#000',
  },

  responseTime: {
    fontSize: fontScale(rs(13)),
    color: '#000',
    marginTop: rs(6),
  },
});
