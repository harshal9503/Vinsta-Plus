import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Modal,
  Linking,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColor } from '../../../util/ColorSwitcher';
import { ScrollView } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window');

const OrderDetail = ({ route }) => {
  const navigation = useNavigation();
  const { order } = route.params || {};
  const { bgColor, textColor } = useColor();
  const [showReturnPopup, setShowReturnPopup] = useState(false);

  const handleCall = () => {
    const phoneNumber = '+911234567890';
    Linking.openURL(`tel:${phoneNumber}`).catch(err => {
      console.log('Error making phone call:', err);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />

      {/* ================= Header ================= */}
      <View style={[styles.header, { backgroundColor: '#fff' }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.iconBtn, { backgroundColor: textColor }]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Image
            source={require('../../../assets/back.png')}
            style={[styles.backIcon, { tintColor: bgColor }]}
          />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerText, { color: '#000' }]}>
            Order Detail
          </Text>
        </View>
        
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollArea} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* ================= PHONE CARD ================= */}
        <View style={styles.orderContent}>
          <Image
            source={order?.image || require('../../../assets/mobile2.png')}
            style={styles.productImage}
          />

          <View style={styles.orderText}>
            <Text style={[styles.orderId, { color: bgColor }]}>
              {order?.id}
            </Text>

            <Text style={[styles.productName, { color: '#000' }]}>
              {order?.name}
            </Text>

            <View style={styles.soldRow}>
              <Text style={[styles.soldBy, { color: bgColor }]}>
                Sold By:{' '}
                <Text style={{ color: '#919291' }}>
                  {order?.soldBy}
                </Text>
              </Text>

              <Text style={styles.dot}>•</Text>

              <Text
                style={[
                  styles.status,
                  {
                    color:
                      order?.status === 'Delivered'
                        ? '#34A853'
                        : '#FFA500',
                  },
                ]}
              >
                {order?.status}
              </Text>
            </View>
          </View>
        </View>

        {/* ================= DETAILS CARD (SEPARATE) ================= */}
        <View style={[styles.detailsCard, { backgroundColor: '#f8f8f8' }]}>
          <Text style={[styles.detailsTitle, { color: '#000' }]}>Details</Text>

          <Text style={[styles.addressText, { color: '#555' }]}>
            6391 Elgin St. Celina, Delaware 10299
          </Text>

          <View style={styles.userRow}>
            <View style={styles.userLeft}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                style={styles.userAvatar}
              />

              <View>
                <Text style={[styles.userId, { color: '#c0bfbf' }]}>ID: DKS-501F9</Text>
                <Text style={[styles.userName, { color: '#000' }]}>Mann Sharma</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.callBtn, { backgroundColor: bgColor }]} 
              onPress={handleCall}
              activeOpacity={0.85}
            >
              <Image
                source={require('../../../assets/call.png')}
                style={[styles.callIcon, { tintColor: textColor }]}
              />
              <Text style={[styles.callText, { color: textColor }]}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= ORDER ITEM CARD ================= */}
        <View style={styles.orderTitleContainer}>
          <Text style={[styles.orderTitle, { color: '#000' }]}>Orders Item's</Text>
        </View>

        <View style={[styles.orderCard, { backgroundColor: '#fff' }]}>
          {/* Left Image */}
          <Image
            source={require('../../../assets/mobile3.png')}
            style={styles.itemImage}
          />

          {/* Middle Content */}
          <View style={styles.itemContent}>
            <Text style={[styles.itemName, { color: '#000' }]}>I Phone 17 Plus</Text>

            <Text style={[styles.soldByText, { color: '#6B7280' }]}>
              Sold By : <Text style={[styles.storeName, { color: bgColor }]}>Grocery Store</Text>
            </Text>

            <View style={styles.bottomRow}>
              <Text style={[styles.price, { color: '#000' }]}>₹124050.00</Text>

              {/* Quantity Controls */}
              <View style={styles.qtyContainer}>
                <TouchableOpacity style={[styles.qtyBtn, { borderColor: bgColor }]}>
                  <Text style={[styles.qtyBtnText, { color: bgColor }]}>−</Text>
                </TouchableOpacity>

                <Text style={[styles.qtyText, { color: '#000' }]}>02</Text>

                <TouchableOpacity style={[styles.qtyBtnDark, { backgroundColor: bgColor }]}>
                  <Text style={[styles.qtyBtnTextDark, { color: textColor }]}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Close Icon */}
          <TouchableOpacity style={styles.closeBtn}>
            <Text style={[styles.closeText, { color: bgColor }]}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* ================= ORDER ITEM CARD 2 ================= */}
        <View style={[styles.orderCard, { backgroundColor: '#fff' }]}>
          {/* Left Image */}
          <Image
            source={require('../../../assets/mobile3.png')}
            style={styles.itemImage}
          />

          {/* Middle Content */}
          <View style={styles.itemContent}>
            <Text style={[styles.itemName, { color: '#000' }]}>I Phone 17 Plus</Text>

            <Text style={[styles.soldByText, { color: '#6B7280' }]}>
              Sold By : <Text style={[styles.storeName, { color: bgColor }]}>Grocery Store</Text>
            </Text>

            <View style={styles.bottomRow}>
              <Text style={[styles.price, { color: '#000' }]}>₹124050.00</Text>

              {/* Quantity Controls */}
              <View style={styles.qtyContainer}>
                <TouchableOpacity style={[styles.qtyBtn, { borderColor: bgColor }]}>
                  <Text style={[styles.qtyBtnText, { color: bgColor }]}>−</Text>
                </TouchableOpacity>

                <Text style={[styles.qtyText, { color: '#000' }]}>02</Text>

                <TouchableOpacity style={[styles.qtyBtnDark, { backgroundColor: bgColor }]}>
                  <Text style={[styles.qtyBtnTextDark, { color: textColor }]}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Close Icon */}
          <TouchableOpacity style={styles.closeBtn}>
            <Text style={[styles.closeText, { color: bgColor }]}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* ================= Bottom Section ================= */}
        <View style={styles.bottomcontainer}>
          <View style={styles.totalRow}>
            <Text style={[styles.totalText, { color: '#000' }]}>Total</Text>
            <Text style={[styles.amountText, { color: '#000' }]}>₹ 59890.00</Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.returnButton]}
              onPress={() => setShowReturnPopup(true)}
            >
              <Text style={[styles.buttonText, styles.returnButtonText, { color: '#000' }]}>
                RETURN ORDER
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.reorderButton, { backgroundColor: bgColor }]}>
              <Text style={[styles.buttonText, styles.reorderButtonText, { color: textColor }]}>
                RE-ORDER
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* ================= RETURN ORDER POPUP ================= */}
      <Modal transparent visible={showReturnPopup} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: '#fff' }]}>
            {/* Icon */}
            <View style={[styles.iconCircle, { backgroundColor: bgColor }]}>
              <Image
                source={require('../../../assets/wallet.png')}
                style={{ width: 28, height: 28, tintColor: textColor }}
              />
            </View>

            <Text style={[styles.modalTitle, { color: '#000' }]}>Return Order</Text>

            <Text style={[styles.modalDesc, { color: '#666' }]}>
              Order send back are only allowed for damaged items. Continue if
              your order is damaged
            </Text>

            {/* Buttons */}
            <TouchableOpacity
              style={[styles.keepBtn, { backgroundColor: '#F58220' }]}
              onPress={() => setShowReturnPopup(false)}
            >
              <Text style={[styles.keepText, { color: '#fff' }]}>Keep order</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sendBtn, { backgroundColor: '#EFEFEF' }]}
              onPress={() => {
                setShowReturnPopup(false);
                // navigation.navigate('ReturnOrder'); // optional
              }}
            >
              <Text style={[styles.sendText, { color: '#555' }]}>Send Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  /* ---------- Header ---------- */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#fff',
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
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
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
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },

  /* ---------- Phone Card ---------- */
  orderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 12,
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
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  orderText: {
    flex: 1,
    paddingLeft: 15,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
    marginBottom: 4,
  },
  soldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  soldBy: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'Figtree-Medium',
  },
  dot: {
    fontSize: 22,
    lineHeight: 18,
    color: '#C4C4C4',
    marginHorizontal: 8,
  },
  status: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'Figtree-Medium',
  },

  /* ---------- Details Card ---------- */
  detailsCard: {
    marginHorizontal: 20,
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 14,
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
    marginBottom: 6,
  },
  addressText: {
    fontSize: 15,
    fontFamily: 'Figtree-Regular',
    lineHeight: 20,
    marginBottom: 14,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  userId: {
    fontSize: 13,
    fontFamily: 'Figtree-Regular',
    marginBottom: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
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
  callIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 6,
  },
  callText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
  },

  /* ---------- Order Item Card ---------- */
  orderTitleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 10,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
  },
  orderCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
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
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    resizeMode: 'contain',
    backgroundColor: '#F3F3F3',
  },
  itemContent: {
    flex: 1,
    paddingLeft: 14,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
    marginBottom: 4,
  },
  soldByText: {
    fontSize: 13,
    fontFamily: 'Figtree-Medium',
    marginBottom: 10,
  },
  storeName: {
    fontWeight: '500',
    fontFamily: 'Figtree-Medium',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
  },
  qtyText: {
    marginHorizontal: 12,
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
  },
  qtyBtnDark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnTextDark: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
  },

  /* ---------- Bottom Section ---------- */
  bottomcontainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  totalText: {
    fontSize: 16,
    fontFamily: 'Figtree-SemiBold',
    fontWeight: '600',
  },
  amountText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
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
  returnButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  reorderButton: {
    backgroundColor: '#1E3A8A',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
  },
  returnButtonText: {
    color: '#000',
  },
  reorderButtonText: {
    color: '#fff',
  },

  /* ---------- Return Order Popup ---------- */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: width * 0.85,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDesc: {
    fontSize: 14,
    fontFamily: 'Figtree-Medium',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  keepBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  keepText: {
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
    fontSize: 16,
  },
  sendBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  sendText: {
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
    fontSize: 16,
  },
});