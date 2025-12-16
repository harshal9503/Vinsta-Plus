import React from 'react';
import { 
  View, Text, StyleSheet, Image,
  TouchableOpacity, ScrollView, Dimensions,
  StatusBar 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColor } from '../../../util/ColorSwitcher';

const { height, width } = Dimensions.get('window');
const responsiveSize = size => (width / 375) * size;

const MyOrder = () => {
  const navigation = useNavigation(); 
  const { COLORS } = useColor() || {};

  return (
    <View style={[styles.container, { backgroundColor: '#fff' }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image 
            source={require('../../../assets/back.png')} 
            style={styles.backIcon} 
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Orders</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* Orders */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Card 1 */}
        <View style={styles.card}>
          <Text style={styles.orderTitle}>Order #12345</Text>
          <Text style={styles.text}>Status: Delivered</Text>
          <Text style={styles.text}>Date: 25 Oct 2025</Text>
        </View>

        {/* Card 2 */}
        <View style={styles.card}>
          <Text style={styles.orderTitle}>Order #67890</Text>
          <Text style={styles.text}>Status: In Transit</Text>
          <Text style={styles.text}>Date: 27 Oct 2025</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.06,
    paddingBottom: responsiveSize(12),
    paddingHorizontal: responsiveSize(16),
    backgroundColor: '#fff',
  },
  backIcon: {
    width: responsiveSize(22),
    height: responsiveSize(22),
    tintColor: '#000',
  },
  headerTitle: {
    fontSize: responsiveSize(18),
    fontFamily: 'Figtree-Bold',
    color: '#000',
    fontWeight: '700',
  },

  /* Content */
  content: {
    paddingHorizontal: responsiveSize(16),
    paddingTop: responsiveSize(10),
  },

  /* Order Card */
  card: {
    backgroundColor: '#f9f9f9',
    padding: responsiveSize(16),
    borderRadius: responsiveSize(14),
    marginBottom: responsiveSize(14),

    // Android shadow
    elevation: 3,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  orderTitle: {
    fontSize: responsiveSize(16),
    fontFamily: 'Figtree-SemiBold',
    color: '#15305F', // orange like image
    marginBottom: responsiveSize(6),
    fontWeight: '700',
  },

  text: {
    fontSize: responsiveSize(14),
    fontFamily: 'Figtree-Regular',
    color: '#333',
    marginBottom: responsiveSize(2),
  },
});
