// CancelOrder.jsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform,
  Modal,
  FlatList,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useColor } from '../../../util/ColorSwitcher'; // Import ColorSwitcher

const { width, height } = Dimensions.get('window');

const MAP_HEIGHT = height * 0.32;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight;

const IMAGES = {
  mapbg: require('../../../assets/mapbgg.png'),
  location: require('../../../assets/location.png'),
  greendrop: require('../../../assets/drop.png'),
  boy: require('../../../assets/user2.png'),
  bikee: require('../../../assets/bike.png'),
  h1: require('../../../assets/office.png'),
  h2: require('../../../assets/ghar.png'),
  tick: require('../../../assets/tick.png'),
  back: require('../../../assets/back.png'),
  upload: require('../../../assets/upload.png'),
  close: require('../../../assets/close.png'),
};

const CancelOrder = () => {
  const navigation = useNavigation();
  const { bgColor, textColor } = useColor(); // Use ColorSwitcher
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showCanceledPopup, setShowCanceledPopup] = useState(false);
  const [showImagePickerPopup, setShowImagePickerPopup] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [maxImagesReached, setMaxImagesReached] = useState(false);

  const MAX_IMAGES = 5;

  const handlePressCancel = () => {
    if (uploadedImages.length > 0) {
      setShowCancelPopup(true);
    }
  };

  const handleConfirmCancel = () => {
    setShowCancelPopup(false);
    setShowCanceledPopup(true);
    setTimeout(() => {
      setShowCanceledPopup(false);
      navigation.goBack();
    }, 1500);
  };

  const handleKeepOrder = () => navigation.goBack();

  const openImagePickerPopup = () => {
    if (uploadedImages.length >= MAX_IMAGES) {
      setMaxImagesReached(true);
      return;
    }
    setShowImagePickerPopup(true);
  };

  const closeImagePickerPopup = () => {
    setShowImagePickerPopup(false);
    setMaxImagesReached(false);
  };

  // Request camera permissions for Android
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const getCheckPermissionPromise = () => {
          if (Platform.Version >= 33) {
            return Promise.all([
              PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
              PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
            ]).then(
              ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
                hasReadMediaImagesPermission && hasReadMediaVideoPermission,
            );
          } else {
            return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
          }
        };

        const hasPermission = await getCheckPermissionPromise();
        if (hasPermission) {
          return true;
        }

        const getRequestPermissionPromise = () => {
          if (Platform.Version >= 33) {
            return PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
              PermissionsAndroid.PERMISSIONS.CAMERA,
            ]).then(
              (statuses) =>
                statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
                  PermissionsAndroid.RESULTS.GRANTED &&
                statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
                  PermissionsAndroid.RESULTS.GRANTED &&
                statuses[PermissionsAndroid.PERMISSIONS.CAMERA] ===
                  PermissionsAndroid.RESULTS.GRANTED,
            );
          } else {
            return PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              PermissionsAndroid.PERMISSIONS.CAMERA,
            ]).then((statuses) => 
              statuses[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
                PermissionsAndroid.RESULTS.GRANTED &&
              statuses[PermissionsAndroid.PERMISSIONS.CAMERA] ===
                PermissionsAndroid.RESULTS.GRANTED
            );
          }
        };

        const granted = await getRequestPermissionPromise();
        return granted;
      } catch (err) {
        console.warn('Camera permission error:', err);
        return false;
      }
    }
    return true; // iOS handles permissions differently via Info.plist
  };

  const openCamera = async () => {
    closeImagePickerPopup();
    
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Camera permission is required to take photos',
        [{ text: 'OK' }]
      );
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        saveToPhotos: true,
        cameraType: 'back',
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.error) {
          console.log('Camera Error: ', response.error);
          Alert.alert('Error', 'Failed to take photo');
        } else if (response.assets && response.assets[0]) {
          const newImage = {
            id: Date.now().toString(),
            uri: response.assets[0].uri,
          };
          setUploadedImages(prev => [...prev, newImage]);
          if (uploadedImages.length + 1 >= MAX_IMAGES) {
            setMaxImagesReached(true);
          }
        }
      }
    );
  };

  const openGallery = async () => {
    closeImagePickerPopup();
    
    if (Platform.OS === 'android') {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'Storage permission is required to access photos',
          [{ text: 'OK' }]
        );
        return;
      }
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        selectionLimit: MAX_IMAGES - uploadedImages.length,
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          Alert.alert('Error', 'Failed to load images');
        } else if (response.assets && response.assets.length > 0) {
          const newImages = response.assets.map((asset, index) => ({
            id: Date.now().toString() + index,
            uri: asset.uri,
          }));
          setUploadedImages(prev => [...prev, ...newImages]);
          if (uploadedImages.length + response.assets.length >= MAX_IMAGES) {
            setMaxImagesReached(true);
          }
        }
      }
    );
  };

  const removeImage = (id) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
    if (maxImagesReached && uploadedImages.length <= MAX_IMAGES) {
      setMaxImagesReached(false);
    }
  };

  const renderImageItem = ({ item }) => (
    <View style={styles.imageItemContainer}>
      <Image 
        source={{ uri: item.uri }} 
        style={styles.uploadedImageThumb}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={styles.removeImageBtn}
        onPress={() => removeImage(item.id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Image
          source={IMAGES.close}
          style={[styles.removeIcon, { tintColor: '#fff' }]}
        />
      </TouchableOpacity>
    </View>
  );

  const getUploadButtonPosition = () => {
    return uploadedImages.length === 0 ? 'center' : 'right';
  };

  const renderUploadButton = () => {
    const buttonPosition = getUploadButtonPosition();
    
    if (uploadedImages.length < MAX_IMAGES) {
      return (
        <TouchableOpacity 
          style={[
            styles.uploadButtonContainer,
            buttonPosition === 'center' ? styles.uploadButtonCenter : styles.uploadButtonRight
          ]}
          onPress={openImagePickerPopup}
          activeOpacity={0.7}
        >
          <View style={[styles.uploadButton, { backgroundColor: bgColor }]}>
            <Image
              source={IMAGES.upload}
              style={[styles.uploadButtonIcon, { tintColor: textColor }]}
            />
          </View>
          <Text style={[styles.uploadButtonText, { color: textColor }]}>
            {uploadedImages.length === 0 ? 'Upload' : 'Add more'}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={[
          styles.uploadButtonContainer,
          buttonPosition === 'center' ? styles.uploadButtonCenter : styles.uploadButtonRight
        ]}>
          <View style={[styles.uploadButton, styles.uploadButtonDisabled]}>
            <Image
              source={IMAGES.upload}
              style={[styles.uploadButtonIcon, { tintColor: '#999' }]}
            />
          </View>
          <Text style={[styles.uploadButtonText, { color: '#999' }]}>
            Maximum reached
          </Text>
        </View>
      );
    }
  };

  const markerSize = Math.min(34, width * 0.085);
  const startX = width * 0.5 - markerSize / 2;
  const startY = MAP_HEIGHT * 0.32;
  const verticalLength = MAP_HEIGHT * 0.18;
  const horizontalLength = width * 0.27;
  const vertical1Y = startY + verticalLength;
  const horizontalRightX = startX + horizontalLength;
  const vertical2Y = vertical1Y + verticalLength;
  const leftY = vertical2Y;
  const boyX = startX + horizontalLength / 2;
  const boyY = vertical1Y + verticalLength / 2;

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />

      {/* Fixed Map Area */}
      <View style={[styles.fixedMapArea, { height: MAP_HEIGHT }]}>
        <View style={styles.statusBarOverlay} />
        <Image source={IMAGES.mapbg} style={styles.mapBg} />

        {/* Header */}
        <View style={[styles.header, { top: STATUS_BAR_HEIGHT + 10 }]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.iconBtn, { backgroundColor: textColor }]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Image
              source={IMAGES.back}
              style={[styles.backIcon, { tintColor: bgColor }]}
            />
          </TouchableOpacity>
          <View style={{ width: 40 }} />
        </View>

        {/* Route Map */}
        <View style={styles.absFill}>
          <Image
            source={IMAGES.location}
            style={[
              styles.markerIcon,
              {
                width: markerSize,
                height: markerSize,
                position: 'absolute',
                top: startY,
                left: startX,
                tintColor: bgColor,
              },
            ]}
          />
          <View
            style={[
              styles.routeLine,
              {
                position: 'absolute',
                top: startY + markerSize / 2,
                left: startX + markerSize / 2 - 2,
                height: verticalLength,
                width: 4,
                backgroundColor: bgColor,
              },
            ]}
          />
          <View
            style={[
              styles.routeLine,
              {
                position: 'absolute',
                top: vertical1Y + markerSize / 2,
                left: startX + markerSize / 2,
                height: 4,
                width: horizontalLength,
                backgroundColor: bgColor,
              },
            ]}
          />
          <View
            style={[
              styles.routeLine,
              {
                position: 'absolute',
                top: vertical1Y + markerSize / 2,
                left: horizontalRightX + markerSize / 2 - 2,
                height: verticalLength,
                width: 4,
                backgroundColor: bgColor,
              },
            ]}
          />
          <View
            style={[
              styles.routeLine,
              {
                position: 'absolute',
                top: vertical2Y + markerSize / 2,
                left: startX + markerSize / 2,
                height: 4,
                width: horizontalLength,
                backgroundColor: bgColor,
              },
            ]}
          />
          <Image
            source={IMAGES.boy}
            style={[
              styles.boyIcon,
              {
                width: Math.min(44, width * 0.12),
                height: Math.min(44, width * 0.12),
                borderRadius: Math.min(22, (width * 0.12) / 2),
                position: 'absolute',
                top: boyY,
                left: boyX,
                borderColor: bgColor,
              },
            ]}
          />
          <Image
            source={IMAGES.greendrop}
            style={[
              styles.markerIcon,
              {
                width: markerSize,
                height: markerSize,
                position: 'absolute',
                top: leftY,
                left: startX,
                tintColor: bgColor,
              },
            ]}
          />
        </View>
      </View>

      {/* Order Status Section */}
      <View style={styles.timerSection}>
        <View style={styles.orderStatusSection}>
          <View style={[styles.orderStatusRow, { backgroundColor: '#f8f8f8' }]}>
            <Image
              source={IMAGES.bikee}
              style={[
                styles.bikeImg,
                {
                  width: Math.min(38, width * 0.1),
                  height: Math.min(38, width * 0.1),
                  tintColor: bgColor,
                },
              ]}
            />
            <View style={styles.orderStatusTextContainer}>
              <Text style={[styles.orderStatusText, { fontSize: Math.min(16, width * 0.045) }]}>
                Your order is Delivered
              </Text>
              <Text style={[styles.orderStatusTime, { fontSize: Math.min(14, width * 0.038) }]}>
                at 5.52 p.m.
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Store and Address Section */}
        <View style={[styles.storeAddressCard, { backgroundColor: '#f8f8f8' }]}>
          <View style={styles.storeAddressRow}>
            <View style={styles.addressIconContainer}>
              <Image
                source={IMAGES.h1}
                style={[
                  styles.addressIcon,
                  {
                    width: Math.min(24, width * 0.06),
                    height: Math.min(24, width * 0.06),
                    tintColor: bgColor,
                  },
                ]}
              />
            </View>
            <View style={styles.addressTextContainer}>
              <Text style={[styles.addressLabel, { fontSize: Math.min(14, width * 0.037) }]}>
                From :-{' '}
                <Text style={[styles.addressValue, { color: 'black' }]}>
                  Rahat Grocery Store
                </Text>
              </Text>
            </View>
          </View>

          <View style={[styles.storeAddressRow, { marginTop: 12 }]}>
            <View style={styles.addressIconContainer}>
              <Image
                source={IMAGES.h2}
                style={[
                  styles.addressIcon,
                  {
                    width: Math.min(24, width * 0.06),
                    height: Math.min(24, width * 0.06),
                    tintColor: bgColor,
                  },
                ]}
              />
            </View>
            <View style={styles.addressTextContainer}>
              <Text style={[styles.addressLabel, { fontSize: Math.min(14, width * 0.037) }]}>
                To :-{' '}
                <Text style={[styles.addressValue, { color: 'black' }]}>
                  Behria sector 8, building 6.8 Apart 37 D
                </Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Upload Image Section */}
        <View style={styles.uploadSection}>
          <Text style={[styles.uploadTitle, { fontSize: Math.min(15, width * 0.04) }]}>
            Upload images ({uploadedImages.length}/{MAX_IMAGES})
          </Text>
          <Text style={[styles.uploadSubtitle, { fontSize: Math.min(13, width * 0.035) }]}>
            {uploadedImages.length > 0 
              ? `${uploadedImages.length} image${uploadedImages.length > 1 ? 's' : ''} uploaded` 
              : 'Upload images as proof'}
          </Text>

          {/* Upload Container */}
          <View style={styles.uploadContainer}>
            {uploadedImages.length > 0 && (
              <FlatList
                data={uploadedImages}
                renderItem={renderImageItem}
                keyExtractor={(item) => item.id}
                numColumns={4}
                scrollEnabled={false}
                columnWrapperStyle={styles.imagesGridRow}
                contentContainerStyle={styles.imagesGridContainer}
              />
            )}

            {renderUploadButton()}
          </View>
        </View>

        {/* Note Section */}
        <View style={styles.noteSection}>
          <Text style={[styles.noteText, { fontSize: Math.min(13, width * 0.035) }]}>
            Please note: This order can only be back only when product is damaged or defective.
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[
              styles.cancelBtn,
              { 
                backgroundColor: uploadedImages.length > 0 ? bgColor : '#f3f3f3',
                opacity: uploadedImages.length > 0 ? 1 : 0.5
              }
            ]}
            onPress={uploadedImages.length > 0 ? handlePressCancel : null}
            disabled={uploadedImages.length === 0}
          >
            <Text
              style={[
                styles.cancelBtnText,
                { 
                  color: uploadedImages.length > 0 ? textColor : '#000'
                }
              ]}
            >
              Cancel Order
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keepBtn, { backgroundColor: bgColor }]}
            onPress={handleKeepOrder}
          >
            <Text
              style={[
                styles.keepBtnText,
                {
                  fontSize: Math.min(16, width * 0.04),
                  color: textColor,
                },
              ]}
            >
              Keep Order
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Image Picker Popup */}
      <Modal
        transparent
        visible={showImagePickerPopup}
        animationType="fade"
        onRequestClose={closeImagePickerPopup}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <Text style={[styles.popupTitle, { color: textColor }]}>Upload Image</Text>
            <Text style={[styles.popupSubtitle, { color: '#666' }]}>
              Choose an option to upload image
            </Text>
            
            <TouchableOpacity
              style={[styles.imageOptionBtn, { backgroundColor: bgColor }]}
              onPress={openCamera}
            >
              <Text style={[styles.imageOptionText, { color: textColor }]}>Take a Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.imageOptionBtn, { backgroundColor: bgColor }]}
              onPress={openGallery}
            >
              <Text style={[styles.imageOptionText, { color: textColor }]}>Choose from Gallery</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.imageOptionBtn, { backgroundColor: '#f0f0f0' }]}
              onPress={closeImagePickerPopup}
            >
              <Text style={[styles.imageOptionText, { color: '#000' }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Max Images Reached Popup */}
      <Modal
        transparent
        visible={maxImagesReached}
        animationType="fade"
        onRequestClose={() => setMaxImagesReached(false)}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <Text style={[styles.popupTitle, { color: textColor }]}>Maximum Images Reached</Text>
            <Text style={[styles.maxImagesPopupText, { color: '#666' }]}>
              You can only upload up to {MAX_IMAGES} images. Please remove some images to add more.
            </Text>
            <TouchableOpacity
              style={[styles.popupBtn, { backgroundColor: bgColor }]}
              onPress={() => setMaxImagesReached(false)}
            >
              <Text style={[styles.popupBtnText, { color: textColor }]}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Cancel Confirmation Popup */}
      <Modal transparent visible={showCancelPopup} animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <Text style={[styles.popupTitle, { color: textColor }]}>
              Are you sure want to cancel?
            </Text>
            <Text style={[styles.popupSubtitle, { color: '#666' }]}>
              This action cannot be undone
            </Text>
            <View style={styles.popupBtnRow}>
              <TouchableOpacity
                style={[styles.popupBtn, { backgroundColor: bgColor }]}
                onPress={handleConfirmCancel}
              >
                <Text style={[styles.popupBtnText, { color: textColor }]}>Yes, Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.popupBtn, { backgroundColor: '#f0f0f0' }]}
                onPress={() => setShowCancelPopup(false)}
              >
                <Text style={[styles.popupBtnText, { color: '#000' }]}>No, Keep</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Canceled Success Popup */}
      <Modal transparent visible={showCanceledPopup} animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <Image
              source={IMAGES.tick}
              style={[
                styles.tickIconLarge,
                { tintColor: bgColor },
              ]}
            />
            <Text style={[styles.popupTitle, { color: textColor }]}>
              Order Canceled
            </Text>
            <Text style={[styles.popupSubtitle, { color: '#666' }]}>
              Your order has been successfully canceled
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CancelOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'rgba(255,255,255,0.9)',
    zIndex: 11,
  },
  fixedMapArea: {
    width: '100%',
    backgroundColor: '#f5f4f9',
    position: 'relative',
    overflow: 'hidden',
  },
  mapBg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  header: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
    paddingTop: 10,
    paddingBottom: 10,
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
  },
  absFill: { ...StyleSheet.absoluteFillObject, zIndex: 2 },
  markerIcon: { resizeMode: 'contain' },
  boyIcon: {
    borderWidth: 2,
    backgroundColor: '#fff',
    zIndex: 4,
  },
  routeLine: {
    borderRadius: 2,
  },
  timerSection: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    marginTop: -10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  orderStatusSection: {
    marginHorizontal: 20,
  },
  orderStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 15,
  },
  bikeImg: {
    resizeMode: 'contain',
    marginRight: 15,
  },
  orderStatusTextContainer: {
    flex: 1,
  },
  orderStatusText: {
    fontWeight: '600',
    marginBottom: 2,
    fontFamily: 'Figtree-SemiBold',
    color: '#000',
  },
  orderStatusTime: {
    color: '#666',
    fontWeight: '500',
    fontFamily: 'Figtree-Medium',
  },
  scrollArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  storeAddressCard: {
    borderRadius: 12,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  storeAddressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressIconContainer: {
    width: 30,
    alignItems: 'center',
  },
  addressIcon: {
    resizeMode: 'contain',
  },
  addressTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  addressLabel: {
    color: '#444',
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: 'Figtree-Medium',
  },
  addressValue: {
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
  },
  uploadSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  uploadTitle: {
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'Figtree-SemiBold',
    color: '#000',
  },
  uploadSubtitle: {
    color: '#888',
    marginBottom: 15,
    fontWeight: '500',
    fontFamily: 'Figtree-Medium',
  },
  uploadContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    padding: 15,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  uploadedImageThumb: {
    width: 60,
    height: 60,
    borderRadius: 8,
    margin: 4,
  },
  imagesGridContainer: {
    flex: 1,
  },
  imagesGridRow: {
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  imageItemContainer: {
    position: 'relative',
    margin: 4,
  },
  removeImageBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: 5 }, { translateY: -5 }],
  },
  removeIcon: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
  uploadButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    width: 60,
    height: 80,
  },
  uploadButtonCenter: {
    alignSelf: 'center',
  },
  uploadButtonRight: {
    alignSelf: 'flex-end',
  },
  uploadButton: {
    width: 60,
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  uploadButtonDisabled: {
    backgroundColor: '#f0f0f0',
  },
  uploadButtonIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  uploadButtonText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Figtree-Medium',
    textAlign: 'center',
  },
  noteSection: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  noteText: {
    color: '#F44336',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: 'Figtree-Medium',
  },
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 9,
  },
  cancelBtnText: {
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
    fontSize: 16,
  },
  keepBtn: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 9,
  },
  keepBtnText: {
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  popupBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: width * 0.85,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  popupTitle: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 8,
    fontFamily: 'Figtree-Bold',
    textAlign: 'center',
  },
  popupSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Figtree-Medium',
    lineHeight: 20,
  },
  popupBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  popupBtn: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    minHeight: 44,
    justifyContent: 'center',
  },
  popupBtnText: {
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Figtree-SemiBold',
  },
  tickIconLarge: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  imageOptionBtn: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  imageOptionText: {
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Figtree-SemiBold',
  },
  maxImagesPopupText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Figtree-Medium',
    lineHeight: 20,
  },
});