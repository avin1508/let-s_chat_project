import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../Constants/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { completeRegisterApi } from '../../reduxToolkit/slices/authSlice';

const { width, height } = Dimensions.get('window');

const SignUpStepThree = ({ signupData, setSignupData, goToStep, navigation }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { user, userLoading, userError } = useSelector(state => state.auth);

  // Form fields
  const [formData, setFormData] = useState({
    fullName: signupData.profile.fullName || '',
    phoneNumber: signupData.profile.phoneNumber || '',
    password: signupData.profile.password || '',
    confirmPassword: signupData.profile.confirmPassword || '',
    avatar: signupData.profile.avatar || null,
  });

  // Handle form input changes
  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (name === 'phoneNumber' && errors.phoneNumber) {
      setErrors(prev => ({...prev, phoneNumber: ''}));
    }
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
    
    if (formData.password !== formData.confirmPassword || !formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.fullName);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('password', formData.password);
      
      // Handle profile picture if exists
      if (formData.avatar) {
        const filename = formData.avatar.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image';
        
        formDataToSend.append('profilePic', {
          uri: formData.avatar,
          name: filename,
          type,
        });
      }

      // Dispatch the action
      const response = await dispatch(
        completeRegisterApi({
          fullName: formData.fullName,
          number: formData.phoneNumber,
          password: formData.password,
          profilePic: formData.avatar ? {
            uri: formData.avatar,
            name: formData.avatar.split('/').pop(),
            type: 'image/jpeg',
          } : null,
          token: signupData.token
        })
      ).unwrap();

      // Handle successful registration
      if (response) {
        setSignupData(prev => ({
          ...prev,
          profile: {
            ...formData
          },
          stepThreeCompleted: true
        }));
      }
    } catch (error) {
      console.log("Registration error:", error);
      // Handle phone number already registered error
      if (error.message && error.message.includes("Phone number already registered")) {
        setErrors(prev => ({
          ...prev,
          phoneNumber: "Phone number already registered"
        }));
      }
    }
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
                returnKeyType="next"
              />
            </View>
            <View style={{height: 19}}>
              {errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}
            </View>
          </View>
          
          {/* Phone Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={[
              styles.inputContainer,
              (errors.phoneNumber) && { borderColor: colors.error }
            ]}>
              <Icon name="phone" size={19} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                value={formData.phoneNumber}
                onChangeText={(text) => handleChange('phoneNumber', text)}
                style={styles.input}
                placeholder="+91 123 456 7890"
                placeholderTextColor={colors.placeholder}
                keyboardType="phone-pad"
                returnKeyType="next"
              />
            </View>
            <View style={{height: 19}}>
              {errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}
            </View>
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
                returnKeyType="next"
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
            <View style={{height: 19}}>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
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
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
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
            <View style={{height: 19}}>
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>
          </View>
        </View>
        
        {/* Submit Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={userLoading || signupData.stepThreeCompleted === true}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              style={[styles.button, userLoading && { opacity: 0.7 }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {userLoading ? (
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
      </View>
    </TouchableWithoutFeedback>
  );
};

// ... (keep your existing styles unchanged)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 30,
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
    marginBottom: 10,
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
    fontSize: 10,
    marginTop: 6,
    marginLeft: 4,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  passwordToggle: {
    padding: 8,
    marginLeft: 10,
  },
  footer: {
    marginTop: 20,
    width: '100%',
    marginBottom: 30,
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