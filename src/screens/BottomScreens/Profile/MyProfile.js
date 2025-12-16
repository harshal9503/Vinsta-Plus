import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const rs = v => (width / 375) * v;

const MyProfile = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const isValidEmail = value =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSave = () => {
    if (!name.trim()) return Alert.alert('Enter name');
    if (phone.length !== 10) return Alert.alert('Enter valid phone number');
    if (!isValidEmail(email)) return Alert.alert('Enter valid email');
    if (!address.trim()) return Alert.alert('Enter address');

    Alert.alert('Success', 'Profile saved');
  };

  const InputField = ({
    label,
    value,
    setValue,
    placeholder,
    keyboardType,
    multiline,
    maxLength,
  }) => (
    <>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor="#B5B5B5"
          keyboardType={keyboardType}
          multiline={multiline}
          maxLength={maxLength}
          style={[
            styles.input,
            multiline && {
              height: rs(80),
              textAlignVertical: 'top',
            },
          ]}
          blurOnSubmit={false}       // ✅ KEYBOARD FIX
          returnKeyType="done"
        />

        {value.length > 0 && (
          <TouchableOpacity onPress={() => setValue('')}>
            <Text style={styles.clear}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );

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

        <Text style={styles.headerTitle}>My Profile</Text>

        <View style={{ width: rs(24) }} />
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Image */}
        <View style={styles.profileWrapper}>
          <View style={styles.imageBorder}>
            <Image
              source={require('../../../assets/user2.png')}
              style={styles.profileImage}
            />
          </View>

          <TouchableOpacity style={styles.cameraIcon}>
            <Image
              source={require('../../../assets/camera.png')}
              style={{ width: rs(18), height: rs(18) }}
            />
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <InputField
            label="Name"
            value={name}
            setValue={setName}
            placeholder="Enter your name"
            keyboardType="default"
          />

          <InputField
            label="Phone Number"
            value={phone}
            setValue={v => setPhone(v.replace(/[^0-9]/g, ''))}
            placeholder="Enter phone number"
            keyboardType="number-pad"
            maxLength={10}
          />

          <InputField
            label="Gmail"
            value={email}
            setValue={setEmail}
            placeholder="Enter email"
            keyboardType="email-address"
          />

          <InputField
            label="Delivery Address"
            value={address}
            setValue={setAddress}
            placeholder="Enter address"
            multiline
          />

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyProfile;
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
    paddingBottom: rs(10),
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

  profileWrapper: {
    alignItems: 'center',
    marginTop: rs(20),
    marginBottom: rs(30),
  },

  imageBorder: {
    width: rs(110),
    height: rs(110),
    borderRadius: rs(55),
    borderWidth: 3,
    borderColor: '#F2A365',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileImage: {
    width: rs(95),
    height: rs(95),
    borderRadius: rs(47.5),
  },

  cameraIcon: {
    position: 'absolute',
    right: width / 2 - rs(55),
    bottom: rs(5),
    backgroundColor: '#fff',
    width: rs(32),
    height: rs(32),
    borderRadius: rs(16),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  form: {
    paddingHorizontal: rs(20),
  },

  label: {
    fontSize: rs(14),
    fontWeight: '500',
    marginBottom: rs(6),
    marginTop: rs(10),
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: rs(10),
    paddingHorizontal: rs(12),
  },

  input: {
    flex: 1,
    fontSize: rs(14),
    paddingVertical: rs(12),
    color: '#000',
  },

  clear: {
    fontSize: rs(16),
    color: '#999',
    paddingLeft: rs(8),
  },

  saveBtn: {
    backgroundColor: '#15305F',
    height: rs(50),
    borderRadius: rs(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(30),
    marginBottom: rs(40),
  },

  saveText: {
    color: '#fff',
    fontSize: rs(16),
    fontWeight: '600',
  },
});
