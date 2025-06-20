import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../Constants/Theme';

const { width, height } = Dimensions.get('window');

const SignUpStepThree = ({ signupData, setSignupData, goToStep, navigation }) => {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  

  // Form fields
  const [formData, setFormData] = useState({
    fullName: signupData.profile.fullName || '',
    username: signupData.profile.username || '',
    phoneNumber: signupData.profile.phoneNumber || '',
    password: signupData.profile.password || '',
    confirmPassword: signupData.profile.confirmPassword || '',
    avatar: signupData.profile.avatar || null,
    gender: signupData.profile.gender || 'male',
  });

  // Handle form input changes
  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle avatar selection
  const handleSelectAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      handleChange('avatar', result.assets[0].uri);
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Enter a valid phone number';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Update signup data with profile information
      setSignupData(prev => ({
        ...prev,
        profile: {
          ...formData
        },
        stepThreeCompleted: true
      }));
      
      // Navigate to home screen or next step
      navigation.replace('Home');
    }, 1500);
  };

  // Clear errors after timeout
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => setErrors({}), 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
          <ScrollView
       
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Text style={styles.appName}>Complete Profile</Text>
              <Text style={styles.subtitle}>
                Add your personal information
              </Text>
            </View>
              
            {/* Avatar Selection */}
            <View style={styles.avatarContainer}>
              <TouchableOpacity 
                style={styles.profilePicContainer}
                onPress={handleSelectAvatar}
                activeOpacity={0.8}
              >
                <View style={styles.profilePicPlaceholder}>
                  {formData.avatar ? (
                    <Image 
                      source={{ uri: formData.avatar }} 
                      style={styles.avatar} 
                    />
                  ) : (
                    <Icon name="user-plus" size={32} color={colors.primary} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            
            <View style={styles.formContainer}>
              {/* Full Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <View style={[
                  styles.inputContainer,
                  errors.fullName && { borderColor: colors.error }
                ]}>
                  <Icon name="user" size={18} color={colors.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    value={formData.fullName}
                    onChangeText={(text) => handleChange('fullName', text)}
                    style={styles.input}
                    placeholder="John Doe"
                    placeholderTextColor={colors.placeholder}
                  />
                </View>
                {errors.fullName && (
                  <Text style={styles.errorText}>{errors.fullName}</Text>
                )}
              </View>
              
              {/* Username */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Username</Text>
                <View style={[
                  styles.inputContainer,
                  errors.username && { borderColor: colors.error }
                ]}>
                  <Icon name="at" size={18} color={colors.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    value={formData.username}
                    onChangeText={(text) => handleChange('username', text)}
                    style={styles.input}
                    placeholder="johndoe"
                    placeholderTextColor={colors.placeholder}
                    autoCapitalize="none"
                  />
                </View>
                {errors.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}
              </View>
              
              {/* Phone Number */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <View style={[
                  styles.inputContainer,
                  errors.phoneNumber && { borderColor: colors.error }
                ]}>
                  <Icon name="phone" size={18} color={colors.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    value={formData.phoneNumber}
                    onChangeText={(text) => handleChange('phoneNumber', text)}
                    style={styles.input}
                    placeholder="+1 123 456 7890"
                    placeholderTextColor={colors.placeholder}
                    keyboardType="phone-pad"
                  />
                </View>
                {errors.phoneNumber && (
                  <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                )}
              </View>
              
              {/* Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={[
                  styles.inputContainer,
                  errors.password && { borderColor: colors.error }
                ]}>
                  <Icon name="lock" size={18} color={colors.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    value={formData.password}
                    onChangeText={(text) => handleChange('password', text)}
                    style={styles.input}
                    placeholder="Create a password"
                    placeholderTextColor={colors.placeholder}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    style={styles.passwordToggle}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Icon 
                      name={showPassword ? 'eye-slash' : 'eye'} 
                      size={18} 
                      color={colors.textSecondary} 
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
              
              {/* Confirm Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={[
                  styles.inputContainer,
                  errors.confirmPassword && { borderColor: colors.error }
                ]}>
                  <Icon name="lock" size={18} color={colors.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleChange('confirmPassword', text)}
                    style={styles.input}
                    placeholder="Confirm your password"
                    placeholderTextColor={colors.placeholder}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity
                    style={styles.passwordToggle}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Icon 
                      name={showConfirmPassword ? 'eye-slash' : 'eye'} 
                      size={18} 
                      color={colors.textSecondary} 
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>
              
              {/* Gender Selection */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Gender</Text>
                <View style={styles.genderContainer}>
                  {['male', 'female'].map((gender) => (
                    <TouchableOpacity
                      key={gender}
                      style={[
                        styles.genderOption,
                        formData.gender === gender && styles.genderOptionSelected
                      ]}
                      onPress={() => handleChange('gender', gender)}
                      activeOpacity={0.8}
                    >
                      <Icon 
                        name={gender === 'male' ? 'male' : 'female'} 
                        size={20} 
                        color={formData.gender === gender ? colors.card : colors.primary} 
                        style={styles.genderIcon}
                      />
                      <Text style={[
                        styles.genderText,
                        formData.gender === gender && styles.genderTextSelected
                      ]}>
                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
            
            {/* Submit Button */}
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[colors.primary, colors.secondary]}
                  style={[styles.button, isLoading && { opacity: 0.7 }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  {isLoading ? (
                    <ActivityIndicator color={colors.card} size="small" />
                  ) : (
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText}>Complete</Text>
                      <Icon 
                        name="arrow-right" 
                        size={16} 
                        color={colors.card} 
                        style={styles.buttonIcon} 
                      />
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  formContainer: {
    width: '100%',
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    marginTop: 30
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    paddingHorizontal: 20,
  },
  profilePicContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  profilePicPlaceholder: {
    width: 95,
    height: 95,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  inputGroup: {
    marginBottom: 15,
    width: '100%',
  },
  label: {
    fontSize: 12,
    marginBottom: 6,
    fontWeight: '500',
    color: colors.textPrimary,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.card,
    height: 50,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  inputIcon: {
    marginRight: 10,
  },
  errorText: {
    color: colors.error,
    fontSize: 13,
    marginTop: 6,
    marginLeft: 4,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  passwordToggle: {
    padding: 8,
    marginLeft: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  genderOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: colors.accent,
  },
  genderOptionSelected: {
    backgroundColor: colors.primary,
  },
  genderIcon: {
    marginRight: 8,
  },
  genderText: {
    color: colors.textPrimary,
    fontWeight: '600',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  genderTextSelected: {
    color: colors.card,
  },
  footer: {
    marginTop: 20,
    width: '100%',
  },
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  buttonIcon: {
    marginLeft: 10,
  },
});

export default SignUpStepThree;