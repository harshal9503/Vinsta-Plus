import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const responsiveSize = size => (width / 375) * size;

const RatingModal = ({
  visible,
  onClose,
  selectedStars,
  onStarPress,
  reviewText,
  setReviewText,
  onSubmit,
  bgColor,
  orderData
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              onPress={onClose}
              activeOpacity={0.7}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              {/* <Image
                source={require('../../../assets/back.png')}
                style={styles.modalBackIcon}
              /> */}
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Leave a Review</Text>
            <View style={{ width: responsiveSize(20) }} />
          </View>

          {/* Order Card */}
          <View style={styles.reviewCard}>
            <Image
              source={orderData?.image || require('../../../assets/mobile2.png')}
              style={styles.foodImg}
            />
            <View style={styles.reviewCardContent}>
              <Text style={[styles.orderId, { color: bgColor }]}>
                {orderData?.id || '#265896'}
              </Text>
              <Text style={styles.orderTitle}>
                {orderData?.name || 'Product Name'}
              </Text>
              <Text style={styles.orderMeta}>
                Sold By: {orderData?.soldBy || 'Store Name'}
              </Text>
            </View>
            <Text style={styles.price}>
              {orderData?.price || '₹ 50000.00'}
            </Text>
          </View>

          {/* Rating Section */}
          <Text style={styles.howText}>How is your order?</Text>
          <Text style={styles.subHowText}>
            Please give your rating & also your review...
          </Text>

          {/* Stars Row */}
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => onStarPress(star === selectedStars ? 0 : star)}
                activeOpacity={0.7}
              >
                <Image
                  source={require('../../../assets/star.png')}
                  style={[
                    styles.starRatingIcon,
                    selectedStars >= star
                      ? { tintColor: bgColor }
                      : { tintColor: '#000' }
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Review Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputBox}
              placeholder="Write your review..."
              placeholderTextColor="#999"
              value={reviewText}
              onChangeText={setReviewText}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Buttons */}
          <View style={styles.modalBtnRow}>
            <TouchableOpacity
              style={styles.modalCancelBtn}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalSubmitBtn, { backgroundColor: bgColor }]}
              onPress={onSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: responsiveSize(24),
    borderTopRightRadius: responsiveSize(24),
    padding: responsiveSize(20),
    paddingTop: responsiveSize(24),
    paddingBottom: responsiveSize(30),
    maxHeight: height * 0.85,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsiveSize(20),
    paddingHorizontal: responsiveSize(4),
  },
  modalBackIcon: {
    width: responsiveSize(20),
    height: responsiveSize(20),
    resizeMode: 'contain',
    tintColor: '#000',
  },
  modalTitle: {
    fontSize: responsiveSize(18),
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    flex: 1,
    marginLeft: responsiveSize(20),
  },
  reviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: responsiveSize(14),
    borderRadius: responsiveSize(12),
    marginBottom: responsiveSize(24),
    borderWidth: 1,
    borderColor: '#eee',
  },
  foodImg: {
    width: responsiveSize(60),
    height: responsiveSize(60),
    borderRadius: responsiveSize(8),
    marginRight: responsiveSize(12),
  },
  reviewCardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  orderId: {
    fontSize: responsiveSize(12),
    fontWeight: '600',
    marginBottom: responsiveSize(4),
  },
  orderTitle: {
    fontSize: responsiveSize(16),
    fontWeight: '700',
    color: '#000',
    marginBottom: responsiveSize(4),
  },
  orderMeta: {
    fontSize: responsiveSize(12),
    color: '#666',
    fontWeight: '500',
  },
  price: {
    fontSize: responsiveSize(16),
    fontWeight: '700',
    color: '#000',
  },
  howText: {
    fontSize: responsiveSize(18),
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: responsiveSize(6),
  },
  subHowText: {
    fontSize: responsiveSize(14),
    color: '#666',
    textAlign: 'center',
    marginBottom: responsiveSize(24),
    fontWeight: '500',
    lineHeight: responsiveSize(20),
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveSize(28),
    gap: responsiveSize(6),
  },
  starRatingIcon: {
    width: responsiveSize(28),
    height: responsiveSize(28),
    resizeMode: 'contain',
  },
  inputContainer: {
    marginBottom: responsiveSize(28),
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: responsiveSize(12),
    padding: responsiveSize(14),
    height: responsiveSize(120),
    fontSize: responsiveSize(14),
    color: '#000',
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    fontWeight: '500',
    lineHeight: responsiveSize(20),
  },
  modalBtnRow: {
    flexDirection: 'row',
    gap: responsiveSize(12),
    marginHorizontal: responsiveSize(4),
  },
  modalCancelBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: responsiveSize(10),
    paddingVertical: responsiveSize(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSubmitBtn: {
    flex: 1,
    borderRadius: responsiveSize(10),
    paddingVertical: responsiveSize(15),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cancelText: {
    fontSize: responsiveSize(14),
    fontWeight: '600',
    color: '#666',
  },
  submitText: {
    fontSize: responsiveSize(14),
    fontWeight: '600',
    color: '#fff',
  },
});

export default RatingModal;
