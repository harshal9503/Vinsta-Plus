import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const rs = v => (width / 375) * v;

const ReferToEarn = () => {
  const navigation = useNavigation();
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
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Refer to earn</Text>
        <View style={{ width: rs(24) }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
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
            style={styles.whatsappBtn}
            onPress={handleWhatsapp}
          >
            <Image
              source={require('../../../assets/whatsapp.png')}
              style={styles.whatsappIcon}
            />
            <Text style={styles.whatsappText}>Invite Via Whatsapp</Text>
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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(20),
    paddingTop: rs(45),
    paddingBottom: rs(15),
  },

  backIcon: {
    width: rs(22),
    height: rs(22),
  },

  headerTitle: {
    fontSize: rs(18),
    fontWeight: '600',
    color: '#000',
  },

  content: {
    paddingHorizontal: rs(20),
    paddingBottom: rs(40),
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: rs(14),
    padding: rs(16),
    elevation: 3,
    marginTop: rs(10),
  },

  cardTitle: {
    fontSize: rs(14),
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
    fontSize: rs(16),
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
    backgroundColor: '#15305F',
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
    color: '#fff',
    fontSize: rs(15),
    fontWeight: '600',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: rs(14),
  },

  infoText: {
    fontSize: rs(13),
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
  },

  bottomImage: {
    width: rs(45),
    height: rs(45),
    marginBottom: rs(10),
  },

  bottomText: {
    fontSize: rs(14),
    fontWeight: '500',
  },
});
