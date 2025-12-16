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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const rs = size => (width / 375) * size;

const transactions = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

const MyWallet = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/back.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My E-Wallet</Text>

        <View style={styles.headerRight}>
          <Image
            source={require('../../../assets/s1.png')}
            style={styles.icon}
          />
          <Image
            source={require('../../../assets/options.png')}
            style={[styles.icon, { marginLeft: rs(12) }]}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Wallet Card */}
        <View style={styles.walletCard}>
          <View style={styles.cardTop}>
            <View>
              <Text style={styles.name}>Harshal Sharma</Text>
              <Text style={styles.number}>1234567890</Text>
            </View>

            <Image
              source={require('../../../assets/splash.png')}
              style={styles.logo}
            />
          </View>

          <Text style={styles.balanceLabel}>Your balance</Text>

          <View style={styles.balanceRow}>
            <Text style={styles.balance}>₹ 70,000</Text>

            <TouchableOpacity style={styles.topUpBtn}>
              <Text style={styles.topUpText}>Top Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transaction History */}
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>Transaction History</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>

        {transactions.map(item => (
          <View key={item.id} style={styles.transactionRow}>
            <Image
              source={require('../../../assets/mobile2.png')}
              style={styles.transactionImage}
            />

            <View style={styles.transactionCenter}>
              <Text style={styles.transactionTitle}>i Phone 17 Plus</Text>
              <Text style={styles.transactionSub}>
                22 Sep, 9.00 • 3 Items
              </Text>
            </View>

            <View style={styles.transactionRight}>
              <Text style={styles.amount}>₹ 50,000</Text>
              <Text style={styles.orderType}>Orders</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MyWallet;

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
    paddingBottom: rs(12),
    paddingHorizontal: rs(16),
  },
  headerTitle: {
    fontSize: rs(18),
    fontWeight: '600',
    color: '#000',
  },
  icon: {
    width: rs(22),
    height: rs(22),
    tintColor: '#000',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  /* Wallet Card */
  walletCard: {
    backgroundColor: '#15305F',
    marginHorizontal: rs(16),
    borderRadius: rs(18),
    padding: rs(18),
    marginBottom: rs(20),
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    color: '#fff',
    fontSize: rs(16),
    fontWeight: '600',
  },
  number: {
    color: '#f1f1f1',
    fontSize: rs(13),
    marginTop: 2,
  },
  logo: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(10),
  },
  balanceLabel: {
    color: '#f1f1f1',
    marginTop: rs(18),
    fontSize: rs(13),
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: rs(8),
  },
  balance: {
    fontSize: rs(26),
    fontWeight: '700',
    color: '#fff',
  },
  topUpBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: rs(18),
    paddingVertical: rs(6),
    borderRadius: rs(20),
  },
  topUpText: {
    color: '#000',
    fontWeight: '600',
  },

  /* History */
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: rs(16),
    marginBottom: rs(8),
  },
  historyTitle: {
    fontSize: rs(16),
    fontWeight: '600',
  },
  seeAll: {
    color: '#dfa214ff',
    fontSize: rs(14),
    fontWeight: '600',
  },

  /* Transaction Row */
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(16),
    paddingVertical: rs(12),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionImage: {
    width: rs(46),
    height: rs(46),
    borderRadius: rs(23),
  },
  transactionCenter: {
    flex: 1,
    marginLeft: rs(12),
  },
  transactionTitle: {
    fontSize: rs(15),
    fontWeight: '600',
  },
  transactionSub: {
    fontSize: rs(12),
    color: '#777',
    marginTop: 2,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: rs(15),
    fontWeight: '600',
  },
  orderType: {
    fontSize: rs(12),
    color: '#777',
    marginTop: 2,
  },
});
