// File: src/screens/BottomScreens/Home/GroceryHome.js
import React from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, FlatList, Dimensions, StatusBar, Platform
} from 'react-native';
import { useColor } from '../../../util/ColorSwitcher';

const { width, height } = Dimensions.get('window');

// Responsive sizing
const responsiveSize = (size) => (width / 375) * size;
const isSmallScreen = width < 375;

// Get proper status bar height for both platforms
const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    // iPhone 14/15: 47, iPhone 12/13: 47, iPhone 11/X: 44, older: 20
    return height >= 812 ? 44 : 20; // For notch and non-notch iPhones
  }
  return StatusBar.currentHeight || 24;
};

const statusBarHeight = getStatusBarHeight();

const assets = {
  location: require('../../../assets/location.png'),
  dropdown: require('../../../assets/dropdown.png'),
  user: require('../../../assets/user2.png'),
  search: require('../../../assets/search.png'),
  filter: require('../../../assets/filter.png'),
  specialoffer: require('../../../assets/s2.png'),
  store: require('../../../assets/store.png'),
  heart: require('../../../assets/heart.png'),
  star: require('../../../assets/star.png'),
  bike: require('../../../assets/bike.png'),
  clock: require('../../../assets/clock.png'),
  fruit: require('../../../assets/fruit.png'),
  
  // Grocery specific assets
  citrus: require('../../../assets/fruit.png'),
  berries: require('../../../assets/g1.png'),
  melons: require('../../../assets/g2.png'),
  stone: require('../../../assets/g3.png'),
  pear: require('../../../assets/g4.png'),
  vine: require('../../../assets/g5.png'),
  dry: require('../../../assets/g6.png'),
  exotic: require('../../../assets/g4.png'),
  leafy: require('../../../assets/g1.png'),
  root: require('../../../assets/g3.png'),
  bulb: require('../../../assets/g6.png'),
  legume: require('../../../assets/g1.png'),
  cruciferous: require('../../../assets/g5.png'),
  tuber: require('../../../assets/g2.png'),
  stalk: require('../../../assets/g3.png'),
  herbs: require('../../../assets/fruit.png'),
  
  // Category icons
  all: require('../../../assets/all.png'),
  grocery: require('../../../assets/grocery.png'),
  electronics: require('../../../assets/electronics.png'),
  health: require('../../../assets/health.png'),
};

const dummyStores = Array.from({ length: 5 }).map((_, i) => ({ id: i.toString() }));
const fruitsData = Array.from({ length: 8 }).map((_, i) => ({ id: i.toString() }));
const vegetablesData = Array.from({ length: 8 }).map((_, i) => ({ id: i.toString() }));

export default function GroceryHome({ activeTab, setActiveTab }) {
  const { bgColor, switchColor } = useColor();

  const onCategoryPress = (id) => {
    // Safe check for setActiveTab function
    if (setActiveTab && typeof setActiveTab === 'function') {
      setActiveTab(id);
    }
    switchColor(id);
  };

  const renderStore = ({ item }) => (
    <View style={styles.storeCard}>
      <Image source={assets.store} style={styles.storeImage} resizeMode="cover" />

      {/* HEART TOP RIGHT - Fixed positioning and size */}
      <TouchableOpacity style={styles.heart} activeOpacity={0.8}>
        <Image 
          source={assets.heart} 
          style={styles.heartIcon} 
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View style={styles.storeBody}>

        {/* ⭐ RATING BADGE ABOVE TITLE - Reduced space */}
        <View style={[styles.ratingBadgeNew, { backgroundColor: bgColor }]}>
          <Image 
            source={assets.star} 
            style={styles.starIcon} 
            resizeMode="contain"
          />
          <Text style={styles.ratingTextNew}>4.4</Text>
        </View>

        <Text style={styles.storeTitle}>Grocery Store</Text>

        {/* Delivery row - Fixed icon sizes */}
        <View style={styles.deliveryRow}>
          <View style={styles.deliveryItem}>
            <Image 
              source={assets.bike} 
              style={[styles.metaIcon, { tintColor: bgColor }]} 
              resizeMode="contain"
            />
            <Text style={styles.metaText}>free delivery</Text>
          </View>

          <View style={styles.deliveryItem}>
            <Image 
              source={assets.clock} 
              style={[styles.metaIcon, { tintColor: bgColor }]} 
              resizeMode="contain"
            />
            <Text style={styles.metaText}>10-15 mins</Text>
          </View>
        </View>

        {/* Tags */}
        <View style={styles.tagsRow}>
          <View style={[styles.tag, { borderColor: bgColor }]}>
            <Text style={[styles.tagText, { color: bgColor }]}>Vegetables</Text>
          </View>
          <View style={[styles.tag, { borderColor: bgColor }]}>
            <Text style={[styles.tagText, { color: bgColor }]}>Fruits</Text>
          </View>
        </View>

      </View>
    </View>
  );

  const renderGridItem = (imageSource, label) => (
    <View style={styles.gridItem}>
      <Image source={imageSource} style={styles.gridImage} resizeMode="contain" />
      <Text style={styles.gridLabel} numberOfLines={2}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Header top - Now properly handles both iOS and Android */}
        <View style={[styles.topHeader, { backgroundColor: bgColor }]}>
          {/* iOS Safe Area Spacer */}
          {Platform.OS === 'ios' && <View style={styles.iosSafeArea} />}
          
          <View style={styles.topRow}>
            <View style={styles.locationWrap}>
              <Image 
                source={assets.location} 
                style={styles.iconSmall} 
                resizeMode="contain"
              />
              <View style={styles.locationTextContainer}>
                <Text style={styles.deliverText}>Deliver to</Text>
                
                <View style={styles.addressRow}>
                  <Text style={styles.addressText}>4102 Pretty View Lane</Text>
                  <Image 
                    source={assets.dropdown} 
                    style={styles.dropdown} 
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>

            <Image 
              source={assets.user} 
              style={styles.userIcon} 
              resizeMode="cover"
            />
          </View>

          <Text style={styles.headerTitle}>Everything you need for your kitchen delivered to your door.</Text>

          <View style={styles.searchRow}>
            <View style={styles.searchBox}>
              <Image 
                source={assets.search} 
                style={[styles.searchIcon, { tintColor: bgColor }]} 
                resizeMode="contain"
              />
              <TextInput
                placeholder="Find for Grocery Item's.."
                placeholderTextColor="#bdbdbd"
                style={styles.searchInput}
              />
            </View>

            <TouchableOpacity 
              style={[styles.filterBtn, { borderColor: bgColor }]} 
              activeOpacity={0.8}
            >
              <Image 
                source={assets.filter} 
                style={[styles.filterIcon, { tintColor: bgColor }]} 
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Category row - Now with working navigation */}
        <View style={styles.categoryRow}>
          {[
            { id: 'ALL', icon: assets.all, title: 'All' },
            { id: 'GROCERY', icon: assets.grocery, title: 'Groceries' },
            { id: 'ELECTRONICS', icon: assets.electronics, title: 'Electronics' },
            { id: 'HEALTH', icon: assets.health, title: 'Health' },
          ].map((c) => (
            <TouchableOpacity 
              key={c.id} 
              style={styles.categoryItem} 
              onPress={() => onCategoryPress(c.id)} 
              activeOpacity={0.85}
            >
              <Image 
                source={c.icon} 
                style={[
                  styles.catIcon, 
                  { 
                    tintColor: activeTab === c.id ? bgColor : '#999'
                  }
                ]} 
                resizeMode="contain"
              />
              <Text style={[
                styles.catLabel, 
                { 
                  color: activeTab === c.id ? bgColor : '#333'
                }
              ]}>
                {c.title}
              </Text>
              {activeTab === c.id && (
                <View style={[styles.catUnderline, { backgroundColor: bgColor }]} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Special Offers */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          <Text style={[styles.sectionLink, { color: bgColor }]}>See All</Text>
        </View>

        {/* SPECIAL CARD NOW USING BGCOLOR - Increased height */}
        <View style={[styles.specialCard, { backgroundColor: bgColor }]}>
          <View style={styles.specialLeft}>
            <Text style={styles.specialPercent}>30%</Text>
            <Text style={styles.specialTitle}>Today's Special!</Text>
            <Text style={styles.specialDesc}>
              Get discount for every order, only valid for today
            </Text>
          </View>
          <Image 
            source={assets.specialoffer} 
            style={styles.specialImage} 
            resizeMode="contain" 
          />
        </View>

        {/* Popular Stores */}
        <View style={[styles.sectionHeader, { marginTop: responsiveSize(24) }]}>
          <Text style={styles.sectionTitle}>Popular Store's</Text>
          <Text style={[styles.sectionLink, { color: bgColor }]}>View All</Text>
        </View>

        <FlatList
          data={dummyStores}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(i) => i.id}
          contentContainerStyle={styles.storeListContent}
          renderItem={renderStore}
        />

        {/* Popular Fruits */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Fruits</Text>
        </View>

        <View style={styles.gridWrap}>
          {fruitsData.map((g, idx) => (
            <View key={g.id} style={styles.gridItemWrapper}>
              {
                idx % 8 === 0 ? renderGridItem(assets.citrus, "Citrus Fruits") :
                idx % 8 === 1 ? renderGridItem(assets.berries, "Berries") :
                idx % 8 === 2 ? renderGridItem(assets.melons, "Melons") :
                idx % 8 === 3 ? renderGridItem(assets.stone, "Stone Fruits") :
                idx % 8 === 4 ? renderGridItem(assets.pear, "Pear Family") :
                idx % 8 === 5 ? renderGridItem(assets.vine, "Vine Fruits") :
                idx % 8 === 6 ? renderGridItem(assets.dry, "Dry Fruits") :
                                renderGridItem(assets.exotic, "Exotic Fruits")
              }
            </View>
          ))}
        </View>

        {/* Popular Vegetables */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Vegetable's</Text>
        </View>

        <View style={styles.gridWrap}>
          {vegetablesData.map((g, idx) => (
            <View key={g.id} style={styles.gridItemWrapper}>
              {
                idx % 8 === 0 ? renderGridItem(assets.leafy, "Leafy Vegetables") :
                idx % 8 === 1 ? renderGridItem(assets.root, "Root Vegetables") :
                idx % 8 === 2 ? renderGridItem(assets.bulb, "Bulb Vegetables") :
                idx % 8 === 3 ? renderGridItem(assets.legume, "Leguminous Vegetables") :
                idx % 8 === 4 ? renderGridItem(assets.cruciferous, "Cruciferous Vegetables") :
                idx % 8 === 5 ? renderGridItem(assets.tuber, "Tuber Vegetables") :
                idx % 8 === 6 ? renderGridItem(assets.stalk, "Stalk & Stem Vegetables") :
                                renderGridItem(assets.herbs, "Herbs & Seasonings")
              }
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F8F8' 
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? responsiveSize(100) : responsiveSize(90),
  },

  // HEADER - Proper handling for both iOS and Android
  topHeader: {
    paddingHorizontal: responsiveSize(18),
    paddingBottom: responsiveSize(20),
    borderBottomLeftRadius: responsiveSize(20),
    borderBottomRightRadius: responsiveSize(20),
    // Android uses paddingTop, iOS uses the safe area view
    paddingTop: Platform.OS === 'android' ? statusBarHeight : 20,
  },
  iosSafeArea: {
    height: statusBarHeight,
  },
  topRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? responsiveSize(8) : responsiveSize(20),
  },
  locationWrap: { 
    flexDirection: 'row', 
    alignItems: 'center',
    flex: 1,
  },
  locationTextContainer: {
    marginLeft: responsiveSize(8),
    flex: 1,
  },
  addressRow: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  iconSmall: { 
    width: responsiveSize(18), 
    height: responsiveSize(18), 
    tintColor: '#fff' 
  },
  dropdown: { 
    width: responsiveSize(8), 
    height: responsiveSize(8), 
    tintColor: '#fff',
    marginLeft: responsiveSize(6),
  },

  deliverText: { 
    color: '#fff', 
    fontSize: responsiveSize(12) 
  },
  addressText: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: responsiveSize(14),
  },
  userIcon: { 
    width: responsiveSize(40), 
    height: responsiveSize(40), 
    borderRadius: responsiveSize(20) 
  },
  headerTitle: { 
    color: '#fff', 
    fontSize: responsiveSize(20), 
    fontWeight: '700', 
    marginTop: responsiveSize(16),
    lineHeight: responsiveSize(26),
  },

  searchRow: { 
    flexDirection: 'row', 
    marginTop: responsiveSize(18), 
    alignItems: 'center' 
  },
  searchBox: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    paddingHorizontal: responsiveSize(14), 
    borderRadius: responsiveSize(12),
    height: Platform.OS === 'ios' ? responsiveSize(52) : responsiveSize(50),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: { 
    width: responsiveSize(18), 
    height: responsiveSize(18),
  },
  filterIcon: {
    width: responsiveSize(18), 
    height: responsiveSize(18),
  },
  searchInput: { 
    marginLeft: responsiveSize(10), 
    fontSize: responsiveSize(14), 
    flex: 1,
    color: '#333',
    paddingVertical: 0,
    height: '100%',
  },
  filterBtn: { 
    width: Platform.OS === 'ios' ? responsiveSize(52) : responsiveSize(50), 
    height: Platform.OS === 'ios' ? responsiveSize(52) : responsiveSize(50), 
    marginLeft: responsiveSize(12), 
    backgroundColor: '#fff', 
    borderRadius: responsiveSize(12), 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  // CATEGORY - Fixed to show proper highlighting
  categoryRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: responsiveSize(18), 
    marginTop: responsiveSize(16), 
    backgroundColor: '#fff', 
    paddingVertical: responsiveSize(16),
    marginHorizontal: responsiveSize(8),
    borderRadius: responsiveSize(12),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryItem: { 
    alignItems: 'center', 
    flex: 1,
    paddingHorizontal: responsiveSize(4),
  },
  catIcon: { 
    width: responsiveSize(36), 
    height: responsiveSize(36), 
    marginBottom: responsiveSize(8),
    tintColor: '#999', // Default color
  },
  catLabel: { 
    fontSize: responsiveSize(12), 
    color: '#333', // Default color
    fontWeight: '500',
    textAlign: 'center',
  },
  catUnderline: { 
    height: responsiveSize(3), 
    width: responsiveSize(32), 
    marginTop: responsiveSize(6), 
    borderRadius: responsiveSize(3) 
  },

  // SECTION
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: responsiveSize(24), 
    paddingHorizontal: responsiveSize(18),
    marginBottom: responsiveSize(8),
  },
  sectionTitle: { 
    fontSize: responsiveSize(18), 
    fontWeight: '700', 
    color: '#222' 
  },
  sectionLink: { 
    fontSize: responsiveSize(14), 
    fontWeight: '500' 
  },

  // SPECIAL CARD - Increased height
  specialCard: {
    flexDirection: 'row',
    marginHorizontal: responsiveSize(18),
    padding: responsiveSize(20),
    borderRadius: responsiveSize(16),
    alignItems: 'center',
    marginTop: responsiveSize(12),
    overflow: 'hidden',
    minHeight: responsiveSize(140),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  specialLeft: { flex: 1 },
  specialPercent: { 
    fontSize: responsiveSize(32), 
    fontWeight: '800', 
    color: '#fff' 
  },
  specialTitle: { 
    fontSize: responsiveSize(20), 
    fontWeight: '700', 
    color: '#fff', 
    marginTop: responsiveSize(8) 
  },
  specialDesc: { 
    color: '#fff', 
    marginTop: responsiveSize(8), 
    fontSize: responsiveSize(13), 
    width: '90%',
    lineHeight: responsiveSize(18),
  },
  specialImage: { 
    width: responsiveSize(140), 
    height: responsiveSize(120) 
  },

  // STORE CARDS - Fixed store card height and content with reduced space
  storeListContent: {
    paddingLeft: responsiveSize(15),
    paddingRight: responsiveSize(8),
    paddingBottom: responsiveSize(10),
  },
  storeCard: { 
    width: width * 0.72, 
    marginRight: responsiveSize(16), 
    borderRadius: responsiveSize(16), 
    backgroundColor: '#fff', 
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: responsiveSize(10),
  },
  storeImage: { 
    width: '100%', 
    height: responsiveSize(160),
  },
  heart: { 
    position: 'absolute', 
    right: responsiveSize(12), 
    top: responsiveSize(12), 
    backgroundColor: '#00000066', 
    padding: responsiveSize(8), 
    borderRadius: responsiveSize(20),
    width: responsiveSize(36),
    height: responsiveSize(36),
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    width: responsiveSize(20),
    height: responsiveSize(20),
    tintColor: '#fff',
  },

  storeBody: { 
    padding: responsiveSize(16),
    paddingBottom: responsiveSize(16),
  },

  // ⭐ NEW RATING INSIDE STORE BODY - Reduced space
  ratingBadgeNew: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(5),
    borderRadius: responsiveSize(20),
    alignSelf: 'flex-start',
    marginBottom: responsiveSize(6), // Reduced from 12 to 6
  },
  starIcon: {
    width: responsiveSize(12),
    height: responsiveSize(12),
    marginRight: responsiveSize(6),
    tintColor: '#fff',
  },
  ratingTextNew: { 
    color: '#fff', 
    fontSize: responsiveSize(12), 
    fontWeight: '700' 
  },

  storeTitle: { 
    fontSize: responsiveSize(16), 
    fontWeight: '700', 
    color: '#222',
    marginBottom: responsiveSize(8),
  },
  
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveSize(12),
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: responsiveSize(16),
  },
  metaIcon: { 
    width: responsiveSize(14), 
    height: responsiveSize(14),
  },
  metaText: { 
    color: '#777', 
    fontSize: responsiveSize(12), 
    marginLeft: responsiveSize(6),
    textTransform: 'capitalize',
  },

  tagsRow: { 
    flexDirection: 'row', 
    flexWrap: 'wrap',
  },
  tag: { 
    backgroundColor: 'transparent', 
    paddingHorizontal: responsiveSize(10), 
    paddingVertical: responsiveSize(6), 
    borderRadius: responsiveSize(12),
    borderWidth: 1,
    marginRight: responsiveSize(8),
    marginBottom: responsiveSize(4),
  },
  tagText: { 
    fontSize: responsiveSize(12), 
    fontWeight: '500' 
  },

  // GRID
  gridWrap: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    paddingHorizontal: responsiveSize(15), 
    marginTop: responsiveSize(12), 
    justifyContent: 'space-between',
  },
  gridItemWrapper: {
    width: (width - responsiveSize(60)) / 4,
    marginBottom: responsiveSize(20),
  },
  gridItem: { 
    alignItems: 'center',
    padding: responsiveSize(8),
  },
  gridImage: { 
    width: responsiveSize(60), 
    height: responsiveSize(60) 
  },
  gridLabel: { 
    fontSize: responsiveSize(12), 
    textAlign: 'center', 
    marginTop: responsiveSize(10), 
    color: '#333',
    fontWeight: '500',
    lineHeight: responsiveSize(16),
  },
});