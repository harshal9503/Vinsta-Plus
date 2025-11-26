import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;

const COLORS = {
  button: '#15305f',
  delivered: '#34A853',
  gray: '#999',
  lightGray: '#eee',
  text: '#222',
  background: '#fff',
  border: '#EBEBEB',
  tabBackground: '#F3F6FB',
};

const orderData = {
  past: [
    {
      id: '#265896',
      name: 'I Phone 17 Plus',
      price: '₹ 50000.00',
      soldBy: 'Grocery Store',
      status: 'Delivered',
      image: require('../../../assets/mobile2.png'),
    },
    {
      id: '#265897',
      name: 'I Phone 17 Plus',
      price: '₹ 50000.00',
      soldBy: 'Grocery Store',
      status: 'Delivered',
      image: require('../../../assets/mobile2.png'),
    },
    {
      id: '#265898',
      name: 'I Phone 17 Plus',
      price: '₹ 50000.00',
      soldBy: 'Grocery Store',
      status: 'Delivered',
      image: require('../../../assets/mobile2.png'),
    },
  ],
  upcoming: [
    {
      id: '#265899',
      name: 'I Phone 17 Plus',
      price: '₹ 50000.00',
      soldBy: 'Grocery Store',
      status: 'On the way',
      arrival: '25 min',
      image: require('../../../assets/mobile2.png'),
    },
    {
      id: '#265900',
      name: 'I Phone 17 Plus',
      price: '₹ 50000.00',
      soldBy: 'Grocery Store',
      status: 'On the way',
      arrival: '25 min',
      image: require('../../../assets/mobile2.png'),
    },
    {
      id: '#265901',
      name: 'I Phone 17 Plus',
      price: '₹ 50000.00',
      soldBy: 'Grocery Store',
      status: 'On the way',
      arrival: '25 min',
      image: require('../../../assets/mobile2.png'),
    },
    {
      id: '#265902',
      name: 'I Phone 17 Plus',
      price: '₹ 50000.00',
      soldBy: 'Grocery Store',
      status: 'On the way',
      arrival: '25 min',
      image: require('../../../assets/mobile2.png'),
    },
  ],
};

export default function MyOrdersScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleRatePress = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleReorderPress = (order) => {
    navigation.navigate('OrderDetail', { order });
  };

  const handleCardPress = (order) => {
    navigation.navigate('OrderDetail', { order });
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  const confirmRate = () => {
    Alert.alert('Rated', `You rated order ${selectedOrder?.id}`);
    closeModal();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation && navigation.goBack()}
          style={styles.backButton}
        >
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Upcoming' && styles.tabActive,
          ]}
          onPress={() => setActiveTab('Upcoming')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'Upcoming' && styles.tabTextActive,
          ]}>
            Upcoming Order
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Past' && styles.tabActive,
          ]}
          onPress={() => setActiveTab('Past')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'Past' && styles.tabTextActive,
          ]}>
            Past Orders
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'Past' ? (
          orderData.past.map((order, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.orderCard}
              onPress={() => handleCardPress(order)}
            >
              <Image source={order.image} style={styles.productImage} />
              <View style={styles.orderContent}>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.productName}>{order.name}</Text>
                <Text style={styles.productPrice}>{order.price}</Text>
                <Text style={styles.soldBy}>
                  Sold By : <Text style={styles.soldByText}>{order.soldBy}</Text>
                  <Text style={styles.deliveredStatus}> • Delivered</Text>
                </Text>
                <View style={styles.buttonsRow}>
                  <TouchableOpacity 
                    style={styles.rateButton}
                    onPress={() => handleRatePress(order)}
                  >
                    <Text style={styles.rateText}>Rate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.reorderButton}
                    onPress={() => handleReorderPress(order)}
                  >
                    <Text style={styles.reorderText}>Re-Order</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          orderData.upcoming.map((order, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.orderCard}
              onPress={() => handleCardPress(order)}
            >
              <Image source={order.image} style={styles.productImage} />
              <View style={styles.orderContent}>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.productNameLink}>{order.name}</Text>
                <Text style={styles.productPrice}>{order.price}</Text>
                <Text style={styles.soldBy}>
                  Sold By : <Text style={styles.soldByText}>{order.soldBy}</Text>
                </Text>
                <View style={styles.arrivalRow}>
                  <Text style={styles.estimateLabel}>Estimate Arrival</Text>
                  <Text style={styles.estimateTime}>{order.arrival}</Text>
                  <Text style={styles.orderStatus}>{order.status}</Text>
                </View>
                <View style={styles.buttonsRow}>
                  <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.cancelText}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.trackButton}>
                    <Text style={styles.trackText}>TRACK ORDER</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Rate Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Rate this order</Text>
            <Text style={styles.modalOrderText}>
              Order: {selectedOrder?.id}
            </Text>
            <Text style={styles.modalOrderText}>
              {selectedOrder?.name}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalCancelButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirmButton} onPress={confirmRate}>
                <Text style={styles.modalButtonText}>Rate Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: height * 0.06,
    paddingHorizontal: width * 0.05,
    justifyContent: 'space-between',
    paddingBottom: height * 0.0,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  backIcon: { 
    width: isSmallDevice ? 22 : 26, 
    height: isSmallDevice ? 22 : 26, 
    tintColor: COLORS.text 
  },
  headerTitle: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: 0.2,
    textAlign: 'center',
    
  },
  headerPlaceholder: {
    width: isSmallDevice ? 24 : 30,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: width * 0.05,
    marginTop: height * 0.02,
    backgroundColor: COLORS.tabBackground,
    borderRadius: 12,
    overflow: 'hidden',
    minHeight: 50,
  },
  tabButton: {
    flex: 1,
    paddingVertical: height * 0.015,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: COLORS.button,
  },
  tabText: {
    fontSize: isSmallDevice ? 14 : 16,
    color: COLORS.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  tabTextActive: {
    color: COLORS.background,
  },
  scrollContent: {
    paddingTop: height * 0.02,
    paddingBottom: height * 0.1,
    paddingHorizontal: width * 0.02,
  },
  orderCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    marginHorizontal: width * 0.04,
    marginVertical: height * 0.01,
    borderRadius: 16,
    padding: width * 0.04,
    borderColor: COLORS.border,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    elevation: 2,
    minHeight: height * 0.15,
  },
  productImage: { 
    width: isSmallDevice ? 56 : 62, 
    height: isSmallDevice ? 56 : 62, 
    borderRadius: 10 
  },
  orderContent: { 
    flex: 1, 
    marginLeft: width * 0.03,
    justifyContent: 'space-between',
  },
  orderId: { 
    fontSize: isSmallDevice ? 12 : 13, 
    color: '#699BF7', 
    fontWeight: '500' 
  },
  productName: { 
    fontSize: isSmallDevice ? 15 : 16, 
    fontWeight: '600', 
    color: COLORS.text, 
    marginTop: 2 
  },
  productNameLink: {
    fontSize: isSmallDevice ? 15 : 16,
    fontWeight: '600',
    color: COLORS.button,
    marginTop: 2,
    textDecorationLine: 'underline'
  },
  productPrice: { 
    fontSize: isSmallDevice ? 15 : 16, 
    fontWeight: '700', 
    color: COLORS.text, 
    marginTop: 2 
  },
  soldBy: { 
    fontSize: isSmallDevice ? 12 : 13, 
    color: '#444', 
    marginTop: 2 
  },
  soldByText: {
    color: COLORS.gray,
  },
  deliveredStatus: { 
    color: COLORS.delivered, 
    fontWeight: '500', 
    fontSize: isSmallDevice ? 12 : 13 
  },
  arrivalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    flexWrap: 'wrap',
  },
  estimateLabel: { 
    fontSize: isSmallDevice ? 12 : 13, 
    color: '#888' 
  },
  estimateTime: { 
    fontSize: isSmallDevice ? 14 : 16, 
    color: COLORS.text, 
    marginLeft: 4, 
    fontWeight: '500' 
  },
  orderStatus: { 
    fontSize: isSmallDevice ? 12 : 13, 
    color: COLORS.button, 
    fontWeight: 'bold', 
    marginLeft: 12 
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.015,
    gap: width * 0.03,
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  rateButton: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: '#DEE2EB',
    borderRadius: 8,
    paddingHorizontal: isSmallDevice ? 14 : 20,
    paddingVertical: height * 0.012,
    minWidth: isSmallDevice ? width * 0.25 : width * 0.28,
    alignItems: 'center',
  },
  rateText: { 
    color: COLORS.text, 
    fontWeight: '500', 
    fontSize: isSmallDevice ? 12 : 15 
  },
  reorderButton: {
    backgroundColor: COLORS.button,
    borderRadius: 8,
    paddingHorizontal: isSmallDevice ? 14 : 20,
    paddingVertical: height * 0.012,
    minWidth: isSmallDevice ? width * 0.25 : width * 0.28,
    alignItems: 'center',
  },
  reorderText: { 
    color: COLORS.background, 
    fontWeight: '600', 
    fontSize: isSmallDevice ? 12 : 15 
  },
  cancelButton: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: '#DEE2EB',
    borderRadius: 8,
    paddingHorizontal: isSmallDevice ? 10 : 14,
    paddingVertical: height * 0.01,
    minWidth: isSmallDevice ? width * 0.28 : width * 0.3,
    alignItems: 'center',
  },
  cancelText: { 
    color: COLORS.text, 
    fontWeight: '500', 
    fontSize: isSmallDevice ? 11 : 13 
  },
  trackButton: {
    backgroundColor: COLORS.button,
    borderRadius: 8,
    paddingHorizontal: isSmallDevice ? 10 : 14,
    paddingVertical: height * 0.01,
    minWidth: isSmallDevice ? width * 0.28 : width * 0.3,
    alignItems: 'center',
  },
  trackText: { 
    color: COLORS.background, 
    fontWeight: '600', 
    fontSize: isSmallDevice ? 11 : 13 
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
  },
  modalOrderText: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalConfirmButton: {
    flex: 1,
    backgroundColor: COLORS.button,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
});
