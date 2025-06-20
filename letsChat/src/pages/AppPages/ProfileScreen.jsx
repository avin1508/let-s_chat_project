import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  StatusBar, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../Constants/Theme';
import { useEffect } from 'react';
import { getUserProfileApi } from '../../reduxToolkit/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userProfile, userProfileLoading, userProfileError } = useSelector(state => state.user);
  
  useEffect(() => {
    dispatch(getUserProfileApi());
  }, [dispatch]);

  const headerHeight = 80 + StatusBar.currentHeight;

  if (userProfileLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  if (userProfileError) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="exclamation-circle" size={50} color={colors.error} />
        <Text style={styles.errorText}>Failed to load profile</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => dispatch(getUserProfileApi())}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={[
          styles.header,
          { 
            height: headerHeight,
            paddingTop: StatusBar.currentHeight 
          }
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={20} color={colors.card} style={styles.backButton} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="ellipsis-v" size={20} color={colors.card} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Profile Content */}
      <ScrollView style={styles.content}>
        {/* Profile Picture and Basic Info */}
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: userProfile?.data?.profilePic || 'https://i.pravatar.cc/150' }} 
            style={styles.profileImage}
          />
          <Text style={styles.name}>{userProfile?.data?.name || 'No name'}</Text>
          <Text style={styles.status}>Online</Text>
        </View>

        {/* Profile Details */}
        <View style={styles.detailsContainer}>
          {/* About Section */}
          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.sectionContent}>
              {userProfile?.data?.about || 'No bio added yet'}
            </Text>
          </View>

          {/* Contact Info Section */}
          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            
            <View style={styles.infoItem}>
              <Icon name="phone" size={16} color={colors.textSecondary} style={styles.infoIcon} />
              <Text style={styles.infoText}>{userProfile?.data?.phoneNumber || 'Not provided'}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Icon name="envelope" size={16} color={colors.textSecondary} style={styles.infoIcon} />
              <Text style={styles.infoText}>{userProfile?.data?.email || 'Not provided'}</Text>
            </View>
          </View>

          {/* Settings Section */}
          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Settings</Text>
            
            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.settingsLeft}>
                <Icon name="bell" size={16} color={colors.textSecondary} style={styles.settingsIcon} />
                <Text style={styles.settingsText}>Notifications</Text>
              </View>
              <Icon name="chevron-right" size={14} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.settingsLeft}>
                <Icon name="lock" size={16} color={colors.textSecondary} style={styles.settingsIcon} />
                <Text style={styles.settingsText}>Privacy</Text>
              </View>
              <Icon name="chevron-right" size={14} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.settingsLeft}>
                <Icon name="question-circle" size={16} color={colors.textSecondary} style={styles.settingsIcon} />
                <Text style={styles.settingsText}>Help</Text>
              </View>
              <Icon name="chevron-right" size={14} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 20,
    color: colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  errorText: {
    marginTop: 20,
    color: colors.error,
    fontSize: 18,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  retryButtonText: {
    color: colors.card,
    fontWeight: 'bold',
  },
  header: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    flex: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 20,
  },
  headerTitle: {
    color: colors.card,
    fontSize: 20,
    fontWeight: '600',
  },
  iconButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: colors.card,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: colors.accent,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 5,
    textAlign: 'center',
  },
  status: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  detailsContainer: {
    backgroundColor: colors.card,
    paddingHorizontal: 20,
  },
  detailSection: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 15,
  },
  sectionContent: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIcon: {
    marginRight: 15,
    width: 20,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIcon: {
    marginRight: 15,
    width: 20,
  },
  settingsText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default ProfileScreen;