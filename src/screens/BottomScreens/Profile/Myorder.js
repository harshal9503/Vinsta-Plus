import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image,
  TouchableOpacity, 
  ScrollView, 
  Dimensions,
  StatusBar,
  Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColor } from '../../../util/ColorSwitcher';

const { height, width } = Dimensions.get('window');
const responsiveSize = size => (width / 375) * size;

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

const MyOrder = () => {
  const navigation = useNavigation(); 
  const { bgColor, textColor } = useColor();

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />

      {/* Header - Same as Address */}
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.iconBtn, { backgroundColor: '#FFFFFF' }]}
        >
          <Image
            source={require('../../../assets/back.png')}
            style={[styles.icon, { tintColor: bgColor }]}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Orders</Text>

        <View style={{ width: responsiveSize(40) }} />
      </View>

      {/* Orders */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Card 1 */}
        <View style={styles.card}>
          <Text style={[styles.orderTitle, { color: bgColor }]}>Order #12345</Text>
          <Text style={styles.text}>Status: Delivered</Text>
          <Text style={styles.text}>Date: 25 Oct 2025</Text>
        </View>

        {/* Card 2 */}
        <View style={styles.card}>
          <Text style={[styles.orderTitle, { color: bgColor }]}>Order #67890</Text>
          <Text style={styles.text}>Status: In Transit</Text>
          <Text style={styles.text}>Date: 27 Oct 2025</Text>
        </View>

        {/* Extra padding for bottom tab */}
        <View style={{ height: responsiveSize(80) }} />
      </ScrollView>
    </View>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: isIOS ? responsiveSize(100) : responsiveSize(90),
    paddingHorizontal: responsiveSize(16),
    paddingTop: responsiveSize(10),
  },

  /* HEADER - Exact same as Address reference */
  header: {
    height: isIOS ? responsiveSize(100) : responsiveSize(90),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(18),
    justifyContent: 'space-between',
    paddingTop: isIOS ? responsiveSize(50) : responsiveSize(30),
    paddingBottom: responsiveSize(0),
  },
  headerTitle: {
    color: '#fff',
    fontSize: responsiveSize(20),
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: responsiveSize(10),
  },
  iconBtn: {
    width: responsiveSize(40),
    height: responsiveSize(40),
    borderRadius: responsiveSize(12),
    justifyContent: 'center',
    alignItems: 'center',
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
    width: responsiveSize(20),
    height: responsiveSize(20),
  },

  /* Order Card - Enhanced with shadows */
  card: {
    backgroundColor: '#f9f9f9',
    padding: responsiveSize(16),
    borderRadius: scaleSize(responsiveSize(14)),
    marginBottom: responsiveSize(14),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  orderTitle: {
    fontSize: fontScale(responsiveSize(16)),
    fontWeight: '700',
    marginBottom: responsiveSize(6),
  },

  text: {
    fontSize: fontScale(responsiveSize(14)),
    color: '#333',
    marginBottom: responsiveSize(2),
  },
});
