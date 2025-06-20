import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../Constants/Theme';

const windowHeight = Dimensions.get('window').height;

const ForgetPasswordPage = ({ navigation }) => {

   const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const otpInputs = useRef([]);
  const scrollViewRef = useRef();

  useEffect(() => {
    let timer;
    if (currentStep === 2 && otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    } else if (otpTimer === 0) {
      setCanResendOtp(true);
    }
    return () => clearTimeout(timer);
  }, [otpTimer, currentStep]);

  const handleSendOTP = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2);
      setOtpTimer(60);
      setCanResendOtp(false);
    }, 1500);
  };

  const handleVerifyOTP = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      Alert.alert('Error', 'Please enter the complete 6-digit OTP');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(3);
    }, 1000);
  };

  const handleResetPassword = () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Password reset successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('LoginPage') }
      ]);
    }, 2000);
  };

  const handleOTPChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleResendOTP = () => {
    if (!canResendOtp) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpTimer(60);
      setCanResendOtp(false);
      setOtp(['', '', '', '', '', '']);
      if (otpInputs.current[0]) {
        otpInputs.current[0].focus();
      }
    }, 1000);
  };

  return (
    <View style={styles.outerContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.innerContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Image
                source={require('../../../assets/chatLogo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.appName}>Reset Password</Text>
            </View>

            {/* Step 1: Email Input */}
            {currentStep === 1 && (
              <View style={styles.stepContent}>
                <Text style={styles.subtitle}>
                  Enter your email to receive a verification code
                </Text>
                
                <View style={styles.inputContainer}>
                  <Icon name="envelope" size={18} color={colors.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor={colors.placeholder}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoFocus
                  />
                </View>

                <TouchableOpacity
                  onPress={handleSendOTP}
                  disabled={isLoading}
                  activeOpacity={0.8}
                  style={styles.buttonWrapper}
                >
                  <LinearGradient
                    colors={[colors.primary, colors.secondary]}
                    style={[styles.button, { opacity: isLoading ? 0.7 : 1 }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    {isLoading ? (
                      <ActivityIndicator color={colors.card} />
                    ) : (
                      <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>Send OTP</Text>
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
            )}

            {/* Step 2: OTP Verification */}
            {currentStep === 2 && (
              <View style={styles.stepContent}>
                <Text style={styles.subtitle}>
                  6-digit code sent to {'\n'}{email}
                </Text>

                <Text style={styles.timerText}>
                  {otpTimer > 0 ? `00:${otpTimer < 10 ? `0${otpTimer}` : otpTimer}` : '00:00'}
                </Text>
                
                <View style={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={ref => otpInputs.current[index] = ref}
                      style={styles.otpInput}
                      keyboardType="number-pad"
                      maxLength={1}
                      value={digit}
                      onChangeText={(text) => handleOTPChange(index, text)}
                      onSubmitEditing={() => index === 5 && handleVerifyOTP()}
                    />
                  ))}
                </View>

                <View style={styles.resendContainer}>
                  <Text style={styles.resendText}>Didn't receive code?</Text>
                  <TouchableOpacity onPress={handleResendOTP} disabled={!canResendOtp}>
                    <Text style={[styles.resendLink, { opacity: canResendOtp ? 1 : 0.5 }]}>
                      Resend
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={handleVerifyOTP}
                  disabled={isLoading}
                  activeOpacity={0.8}
                  style={styles.buttonWrapper}
                >
                  <LinearGradient
                    colors={[colors.primary, colors.secondary]}
                    style={[styles.button, { opacity: isLoading ? 0.7 : 1 }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    {isLoading ? (
                      <ActivityIndicator color={colors.card} />
                    ) : (
                      <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>Verify OTP</Text>
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
            )}

            {/* Step 3: New Password */}
            {currentStep === 3 && (
              <View style={styles.stepContent}>
                <Text style={styles.subtitle}>
                  Create your new password
                </Text>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>New Password</Text>
                  <View style={styles.inputContainer}>
                    <Icon name="lock" size={18} color={colors.textSecondary} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter new password"
                      placeholderTextColor={colors.placeholder}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <View style={styles.inputContainer}>
                    <Icon name="lock" size={18} color={colors.textSecondary} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Confirm new password"
                      placeholderTextColor={colors.placeholder}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry
                    />
                  </View>
                </View>

                <TouchableOpacity
                  onPress={handleResetPassword}
                  disabled={isLoading}
                  activeOpacity={0.8}
                  style={styles.buttonWrapper}
                >
                  <LinearGradient
                    colors={[colors.primary, colors.secondary]}
                    style={[styles.button, { opacity: isLoading ? 0.7 : 1 }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    {isLoading ? (
                      <ActivityIndicator color={colors.card} />
                    ) : (
                      <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>Reset Password</Text>
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
            )}

            {/* Back to Login */}
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.navigate('LoginPage')}
            >
              <Icon name="arrow-left" size={16} color={colors.primary} />
              <Text style={styles.backText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 30,
    minHeight: windowHeight,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
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
    marginBottom: 30,
  },
  stepContent: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    marginBottom: 6,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: colors.card,
    height: 50,
    borderColor: colors.border,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  buttonWrapper: {
    marginTop: 15,
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
  },
  buttonIcon: {
    marginLeft: 10,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 45,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    textAlign: 'center',
    fontSize: 18,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  timerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  resendText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginRight: 5,
  },
  resendLink: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  backText: {
    color: colors.primary,
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ForgetPasswordPage;