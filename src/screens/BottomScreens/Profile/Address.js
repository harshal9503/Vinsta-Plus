import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColor } from '../../../util/ColorSwitcher';

const { width, height } = Dimensions.get('window');
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

const Address = () => {
  const navigation = useNavigation();
  const { bgColor, textColor } = useColor();

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      icon: require('../../../assets/ghar.png'),
      name: 'Harshal Sharma',
      address:
        '320 Koregaon park lane to, 4 opposite to B.M.W. showroom, Indore M.P.',
      landmark: 'Near BMW Showroom',
      phone: '+91 98765 43210',
    },
    {
      id: 2,
      type: 'Office',
      icon: require('../../../assets/office.png'),
      name: 'Vinsta Plus Application',
      address:
        '789 Corporate Avenue, Scheme 54, Vijay Nagar, Indore M.P.',
      landmark: 'Behind City Mall',
      phone: '+91 98765 43210',
    },
  ]);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [addressType, setAddressType] = useState('Home');

  const handleDeletePress = id => {
    setAddressToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    setAddresses(prev => prev.filter(a => a.id !== addressToDelete));
    setIsDeleteModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />

      {/* Header */}
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

        <Text style={styles.headerTitle}>My Addresses</Text>

        <View style={{ width: responsiveSize(40) }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Saved Addresses</Text>

        {addresses.map(item => (
          <View key={item.id} style={styles.card}>
            {/* Left Content */}
            <View style={styles.cardContent}>
              <View style={styles.titleRow}>
                <Image source={item.icon} style={styles.typeIcon} />
                <Text style={styles.typeText}>{item.type}</Text>
              </View>

              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.text}>{item.address}</Text>
              <Text style={styles.landmark}>
                Landmark: <Text style={styles.landmarkText}>{item.landmark}</Text>
              </Text>
              <Text style={styles.phone}>{item.phone}</Text>
            </View>

            {/* Delete Strip */}
            <TouchableOpacity
              style={styles.deleteStrip}
              onPress={() => handleDeletePress(item.id)}
            >
              <Image
                source={require('../../../assets/delete.png')}
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
          </View>
        ))}

        {/* Add Button */}
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: bgColor }]}
          onPress={() => setIsAddModalVisible(true)}
        >
          <Text style={[styles.addText, { color: textColor }]}>+ Add New Address</Text>
        </TouchableOpacity>

        {/* Extra padding for bottom tab */}
        <View style={{ height: responsiveSize(80) }} />
      </ScrollView>

      {/* Delete Modal */}
      <Modal transparent visible={isDeleteModalVisible}>
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Text style={styles.popupText}>Delete this address?</Text>
            <View style={styles.row}>
              <TouchableOpacity onPress={confirmDelete}>
                <Text style={styles.yes}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsDeleteModalVisible(false)}>
                <Text style={styles.no}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Address Bottom Sheet */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent
      >
        <View style={styles.bottomOverlay}>
          <View style={styles.bottomSheet}>
            {/* Header */}
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Add New Address</Text>
              <TouchableOpacity
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={() => setIsAddModalVisible(false)}
              >
                <Text style={styles.close}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput style={styles.input} placeholder="Enter your name" />

              <Text style={styles.label}>Phone Number *</Text>
              <View style={styles.phoneRow}>
                <View style={styles.countryCode}>
                  <Text>+91</Text>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Enter 10-digit number"
                  keyboardType="number-pad"
                />
              </View>

              <Text style={styles.label}>House/Flat/Block No. *</Text>
              <TextInput style={styles.input} placeholder="Enter house/flat/block no." />

              <Text style={styles.label}>Area/Street/Sector *</Text>
              <TextInput style={styles.input} placeholder="Enter area/street/sector" />

              <Text style={styles.label}>Landmark (Optional)</Text>
              <TextInput style={styles.input} placeholder="E.g. Near City Mall" />

              <Text style={styles.label}>City *</Text>
              <TextInput style={styles.input} placeholder="Enter city" />

              <Text style={styles.label}>Pincode *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter 6-digit pincode"
                keyboardType="number-pad"
              />

              <Text style={styles.label}>Save Address As *</Text>

              <View style={styles.typeRow}>
                {['Home', 'Office', 'Other'].map(type => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setAddressType(type)}
                    style={[
                      styles.typeBox,
                      addressType === type && [styles.typeBoxActive, { borderColor: bgColor }],
                    ]}
                  >
                    <Text
                      style={[
                        styles.typeText2,
                        addressType === type && [styles.typeTextActive, { color: bgColor }],
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={[styles.saveBtnLarge, { backgroundColor: bgColor }]}>
                <Text style={[styles.saveBtnText, { color: textColor }]}>Save Address</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: isIOS ? responsiveSize(100) : responsiveSize(90),
    paddingHorizontal: responsiveSize(16),
    paddingTop: responsiveSize(10),
  },

  /* HEADER - Same as reference */
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

  sectionTitle: {
    fontSize: fontScale(responsiveSize(16)),
    fontWeight: '600',
    marginBottom: responsiveSize(12),
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    borderRadius: scaleSize(responsiveSize(14)),
    marginBottom: responsiveSize(14),
    overflow: 'hidden',
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

  cardContent: {
    flex: 1,
    padding: responsiveSize(14),
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveSize(6),
  },

  typeIcon: {
    width: responsiveSize(18),
    height: responsiveSize(18),
    marginRight: responsiveSize(6),
  },

  typeText: {
    fontSize: fontScale(responsiveSize(15)),
    fontWeight: '600',
    color: '#15305F',
  },

  name: {
    fontSize: fontScale(responsiveSize(15)),
    fontWeight: '600',
    marginBottom: responsiveSize(4),
  },

  text: {
    fontSize: fontScale(responsiveSize(14)),
    color: '#333',
    lineHeight: responsiveSize(20),
  },

  landmark: {
    marginTop: responsiveSize(6),
    fontSize: fontScale(responsiveSize(13)),
    fontStyle: 'italic',
  },

  landmarkText: {
    color: '#555',
  },

  phone: {
    marginTop: responsiveSize(6),
    fontSize: fontScale(responsiveSize(14)),
    fontWeight: '500',
  },

  deleteStrip: {
    width: responsiveSize(56),
    backgroundColor: '#FFE6E6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteIcon: {
    width: responsiveSize(22),
    height: responsiveSize(22),
    tintColor: '#E53935',
  },

  addBtn: {
    paddingVertical: responsiveSize(14),
    borderRadius: scaleSize(responsiveSize(10)),
    alignItems: 'center',
    marginTop: responsiveSize(24),
  },

  addText: {
    fontSize: fontScale(responsiveSize(16)),
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  popup: {
    width: '80%',
    backgroundColor: '#fff',
    padding: responsiveSize(20),
    borderRadius: responsiveSize(12),
  },

  popupText: {
    fontSize: fontScale(responsiveSize(16)),
    marginBottom: responsiveSize(16),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  yes: {
    fontSize: fontScale(responsiveSize(16)),
    color: 'red',
  },

  no: {
    fontSize: fontScale(responsiveSize(16)),
    color: '#007AFF',
  },

  bottomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: responsiveSize(24),
    borderTopRightRadius: responsiveSize(24),
    padding: responsiveSize(16),
    maxHeight: '90%',
  },

  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveSize(10),
  },

  sheetTitle: {
    fontSize: fontScale(responsiveSize(18)),
    fontWeight: '600',
  },

  close: {
    fontSize: responsiveSize(22),
  },

  label: {
    fontSize: fontScale(responsiveSize(14)),
    fontWeight: '500',
    marginTop: responsiveSize(14),
  },

  input: {
    backgroundColor: '#F3F3F3',
    borderRadius: scaleSize(responsiveSize(10)),
    padding: responsiveSize(12),
    marginTop: responsiveSize(6),
  },

  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveSize(6),
  },

  countryCode: {
    backgroundColor: '#F3F3F3',
    padding: responsiveSize(12),
    borderRadius: scaleSize(responsiveSize(10)),
    marginRight: responsiveSize(8),
  },

  phoneInput: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    padding: responsiveSize(12),
    borderRadius: scaleSize(responsiveSize(10)),
  },

  typeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveSize(12),
  },

  typeBox: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    paddingVertical: responsiveSize(14),
    borderRadius: scaleSize(responsiveSize(14)),
    alignItems: 'center',
    marginHorizontal: responsiveSize(4),
  },

  typeBoxActive: {
    borderWidth: 2,
  },

  typeText2: {
    fontSize: fontScale(responsiveSize(15)),
    color: '#666',
  },

  typeTextActive: {
    fontWeight: '600',
  },

  saveBtnLarge: {
    paddingVertical: responsiveSize(16),
    borderRadius: scaleSize(responsiveSize(14)),
    alignItems: 'center',
    marginVertical: responsiveSize(24),
  },

  saveBtnText: {
    fontSize: fontScale(responsiveSize(18)),
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
