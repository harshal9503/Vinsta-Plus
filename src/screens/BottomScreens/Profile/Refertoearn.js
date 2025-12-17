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

const ReferToEarn = () => {
  const navigation = useNavigation();
  const { bgColor, textColor } = useColor();
  const referralCode = 'XYJLHG';

  const handleCopy = () => {
    Alert.alert('Copied', 'Referral code copied');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Share referral code');
  };

  const handleWhatsapp = () => {
    Alert.alert('Whatsapp', 'Invite via Whatsapp');
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

        <Text style={styles.headerTitle}>Refer to Earn</Text>
        <View style={{ width: rs(40) }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Referral Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Invitation Code</Text>

          <View style={styles.codeBox}>
            <Text style={styles.codeText}>{referralCode}</Text>

            <View style={styles.iconRow}>
              <TouchableOpacity onPress={handleCopy}>
                <Image
                  source={require('../../../assets/copy.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleShare}>
                <Image
                  source={require('../../../assets/share1.png')}
                  style={[styles.icon, { marginLeft: rs(12) }]}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.whatsappBtn, { backgroundColor: bgColor }]}
            onPress={handleWhatsapp}
          >
            <Image
              source={require('../../../assets/whatsapp.png')}
              style={styles.whatsappIcon}
            />
            <Text style={[styles.whatsappText, { color: textColor }]}>Invite Via Whatsapp</Text>
          </TouchableOpacity>

          <View style={styles.infoRow}>
            <Text style={styles.infoText}>
              How to invite friend's and win award
            </Text>
            <Image
              source={require('../../../assets/help.png')}
              style={styles.helpIcon}
            />
          </View>
        </View>

        {/* Bottom Cards */}
        <View style={styles.bottomRow}>
          <TouchableOpacity style={styles.bottomCard}>
            <Image
              source={require('../../../assets/earned.png')}
              style={styles.bottomImage}
            />
            <Text style={styles.bottomText}>Earned Reward's</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomCard}>
            <Image
              source={require('../../../assets/earned.png')}
              style={styles.bottomImage}
            />
            <Text style={styles.bottomText}>Track Referral's</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReferToEarn;

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
    paddingHorizontal: rs(20),
    paddingBottom: isIOS ? rs(100) : rs(90),
    paddingTop: rs(10),
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: rs(14),
    padding: rs(16),
    elevation: 3,
    marginTop: rs(10),
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

  cardTitle: {
    fontSize: fontScale(rs(14)),
    fontWeight: '500',
    marginBottom: rs(10),
  },

  codeBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: rs(10),
    paddingHorizontal: rs(14),
    paddingVertical: rs(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  codeText: {
    fontSize: fontScale(rs(16)),
    fontWeight: '600',
    letterSpacing: 1,
  },

  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    width: rs(20),
    height: rs(20),
    tintColor: '#000',
  },

  whatsappBtn: {
    borderRadius: rs(12),
    height: rs(50),
    marginTop: rs(18),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  whatsappIcon: {
    width: rs(22),
    height: rs(22),
    marginRight: rs(10),
  },

  whatsappText: {
    fontSize: fontScale(rs(15)),
    fontWeight: '600',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: rs(14),
  },

  infoText: {
    fontSize: fontScale(rs(13)),
    color: '#444',
  },

  helpIcon: {
    width: rs(18),
    height: rs(18),
    tintColor: '#F57C00',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rs(25),
  },

  bottomCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: rs(14),
    paddingVertical: rs(18),
    alignItems: 'center',
    elevation: 3,
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

  bottomImage: {
    width: rs(45),
    height: rs(45),
    marginBottom: rs(10),
  },

  bottomText: {
    fontSize: fontScale(rs(14)),
    fontWeight: '500',
  },
});
