import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Keyboard,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../Constants/Theme';
import { otpRequestForRegister } from '../../reduxToolkit/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';



const windowHeight = Dimensions.get('window').height;

const SignUpStepOne = ({ signupData, setSignupData, goToStep, navigation }) => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFocused, setIsFocused] = useState(false);
  const emailInputRef = useRef(null);

  const { requestOtpData, requestOtpLoading, requestOtpError } = useSelector(state => state.auth)

  console.log("this is the signup dta", signupData?.email)


  
  const validate = () => {
    const newErrors = {};
    if (!signupData.email) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGetOTP = async () => {
    const newErrors = {};
    Keyboard.dismiss();
    if (!validate()) return;
    
    // setIsLoading(true);
    // try {
    //   // Simulate API call
    //   setTimeout(() => {
    //     setIsLoading(false);
    //     setSignupData(prev => ({
    //       ...prev,
    //       stepOneCompleted: true
    //     }));
    //     goToStep(2);
    //   }, 1000);
    // } catch (error) {
    //   setIsLoading(false);
    //   console.error("Failed to request OTP:", error);
    // }

    try {
      const response = await dispatch(otpRequestForRegister({ email: signupData.email })).unwrap();
      console.log("this is the response", response);
      setSignupData(prev => ({
        ...prev,
        stepOneCompleted: true
      }))
      // goToStep(2);
    } catch (error) {
      console.error("Failed to request OTP:", error); 
      newErrors.email = error.message;
      setErrors(newErrors);
    }
  };

  //reset erro after 3 seconds
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={require('../../../assets/chatLogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Create Your Account</Text>
          <Text style={styles.subtitle}>
            Enter your email to get started
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => emailInputRef.current?.focus()}
              style={[
                styles.inputContainer,
                isFocused && styles.inputFocused,
                errors.email && styles.inputError
              ]}
            >
              <Icon 
                name="envelope" 
                size={18} 
                color={isFocused ? colors.primary : colors.textSecondary} 
                style={styles.inputIcon}
              />
              <TextInput
                ref={emailInputRef}
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={colors.placeholder}
                value={signupData.email}
                onChangeText={(text) => {
                  setSignupData(prev => ({ ...prev, email: text }));
                  if (errors.email) setErrors({});
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                returnKeyType="done"
                onSubmitEditing={handleGetOTP}
              />
            </TouchableOpacity>
              <View style={styles.errorContainer}>
                { errors.email && (
                  <>
                  <Icon name="exclamation-circle" size={14} color={colors.error} />
                  <Text style={styles.errorText}>{errors.email}</Text>
                  </>
                )}
              </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleGetOTP}
          disabled={requestOtpLoading}
          activeOpacity={0.8}
          style={styles.buttonShadow}
        >
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            style={[styles.button]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {requestOtpLoading ? (
              <ActivityIndicator color={colors.card} size="small" />
            ) : (
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Get OTP</Text>
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

        <View style={styles.loginPrompt}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
    paddingBottom: 20,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.card,
    height: 56,
    borderColor: colors.primary,
  },
  inputFocused: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  inputError: {
    borderColor: colors.error,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: 0,
    height: '100%',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 4,
    height: 20,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginLeft: 6,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 20,
    paddingBottom: 20,
  },
  buttonShadow: {
    borderRadius: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginLeft: 10,
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  loginLink: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
});

export default SignUpStepOne;