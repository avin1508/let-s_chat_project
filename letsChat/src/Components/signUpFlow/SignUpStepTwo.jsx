import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../Constants/Theme';
import { resendOtpForRegister, veriFyOtpForRegister } from '../../reduxToolkit/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';

const SignUpStepTwo = ({ signupData, setSignupData, goToStep }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [seconds, setSeconds] = useState(60);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiMessage, setApiMessage] = useState(null);
  const [otpError, setOtpError] = useState(false);
  const [sucess, showSucess] = useState(false);

  // Refs
  const inputRef = useRef([]);
  const successScale = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Redux state
  const { 
    reSendOtpLoading,
    veriFyOtpLoading
  } = useSelector(state => state.auth);

  // Animations
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, []);

  useEffect(() => {
    if (signupData.stepTwoCompleted || sucess) {
      Animated.timing(successScale, {
        toValue: 1,
        duration: 500,
        easing: Easing.elastic(1.5),
        useNativeDriver: true
      }).start();
    }
  }, [signupData.stepTwoCompleted, sucess]);

  // Timer
  useEffect(() => {
    let timer;
    if (!signupData.stepTwoCompleted && seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else if (seconds === 0) {
      setCanResendOtp(true);
    }
    return () => clearTimeout(timer);
  }, [seconds, signupData.stepTwoCompleted]);

  // Input handling
  const handleChangeText = (text, index) => {
    if (index > 0 && otp[index - 1] === '') return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setOtpError(false); // Reset error state when typing

    if (text && index < 5) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (!canResendOtp) return;
    
    try {
      setApiMessage(null);
      const response = await dispatch(resendOtpForRegister({ email: signupData.email })).unwrap();
      
      setApiMessage({
        text: response.message,
        type: 'success'
      });
      
      setOtp(['', '', '', '', '', '']);
      setSeconds(60);
      setCanResendOtp(false);
      if (inputRef.current[0]) inputRef.current[0].focus();
    } catch (error) {
      setApiMessage({
        text: error.message || 'Failed to resend OTP',
        type: 'error'
      });
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    const enteredOtp = otp.join('');
    
    // Basic validation
    if (enteredOtp.length !== 6) {
      setErrors({ otp: 'Please enter the complete 6-digit OTP' });
      return;
    }

    try {
      const response = await dispatch(
        veriFyOtpForRegister({ email: signupData.email, otp: enteredOtp })
      ).unwrap();

      // On success
      showSucess(true);
      setSignupData(prev => ({
        ...prev,
        // stepTwoCompleted: true,
        token: response.token
      }));
      
    } catch (error) {
      // On error
      setOtpError(true); // Highlight OTP inputs in red
      setApiMessage({
        text: error.message || 'Invalid OTP',
        type: 'error'
      });
    }
  };

  // Clear messages
  useEffect(() => {
    if (errors.otp || apiMessage) {
      const timer = setTimeout(() => {
        setErrors({});
        setApiMessage(null);
        setOtpError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors, apiMessage]);

  // Success screen
  if ( sucess ||signupData.stepTwoCompleted) {
    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Animated.View style={{
              transform: [{ scale: successScale }],
              marginBottom: 20
            }}>
              <Icon name="check-circle" size={80} color={colors.success} />
            </Animated.View>
            
            <Text style={styles.appName}>Email Verified!</Text>
            <Text style={styles.subtitle}>
              Your email has been successfully verified
            </Text>
          </View>
          
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => {
                goToStep(3);
                setSignupData(prev => ({
                  ...prev,
                  stepTwoCompleted: true,
                }))
              }}
              style={styles.continueButton}
            >
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>Continue to Profile Setup</Text>
                <Icon 
                  name="arrow-right" 
                  size={16} 
                  color={colors.card} 
                  style={styles.buttonIcon} 
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    );
  }

  // OTP verification screen
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
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
          <Text style={styles.appName}>Verify Your Email</Text>
          <Text style={styles.subtitle}>
            We've sent a 6-digit verification code to{' '}
            <Text style={styles.email}>{signupData.email || 'abc@gmail.com'}</Text>.{'\n'}
            Enter the code below to continue.
          </Text>

          <View style={styles.formContainer}>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRef.current[index] = ref)}
                  value={digit}
                  onChangeText={(text) => handleChangeText(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  autoFocus={index === 0}
                  style={[
                    styles.otpInput,
                    (errors.otp || otpError) && styles.errorOtp 
                  ]}
                  editable={!veriFyOtpLoading}
                />
              ))}
            </View>
          </View>
          
          <View style={styles.messageContainer}>
            {errors.otp && (
              <View style={styles.message}>
                <Icon name="exclamation-circle" size={14} color={colors.error} />
                <Text style={styles.errorText}>{errors.otp}</Text>
              </View>
            )}
            
            {apiMessage && (
              <View style={styles.message}>
                <Icon 
                  name={apiMessage.type === 'success' ? "check-circle" : "exclamation-circle"} 
                  size={14} 
                  color={apiMessage.type === 'success' ? colors.success : colors.error} 
                />
                <Text style={[
                  styles.apiMessageText,
                  apiMessage.type === 'success' ? styles.successText : styles.errorText
                ]}>
                  {apiMessage.text}
                </Text>
              </View>
            )}
          </View>
          
          <View style={styles.otpTimerAndResedText}>
            <View style={styles.timerContent}>
              <Icon name="clock" size={14} color={colors.textSecondary} />
              <Text style={styles.otpTimer}>
                {seconds > 0 
                  ? `Resend OTP in 00:${seconds < 10 ? `0${seconds}` : seconds}` 
                  : 'You can now resend OTP'}
              </Text>
            </View>
            
            <TouchableOpacity
              onPress={handleResendOTP}
              disabled={!canResendOtp || reSendOtpLoading}
            >
              {reSendOtpLoading ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <Text style={[
                  styles.resendText,
                  canResendOtp && { color: colors.primary }
                ]}>
                  Resend OTP
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleVerifyOTP}
          disabled={veriFyOtpLoading}
          activeOpacity={0.8}
          style={styles.buttonShadow}
        >
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            style={[styles.button, veriFyOtpLoading && { opacity: 0.7 }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {veriFyOtpLoading ? (
              <ActivityIndicator color={colors.card} size="small" />
            ) : (
              <Text style={styles.buttonText}>Verify & Continue</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

// Stylesheet
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
    marginTop: 100,
    flex: 1,
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
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  email: {
    color: colors.primary,
    fontWeight: '600',
  },
  formContainer: {
    width: '100%',
    marginTop: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginHorizontal: 1,
  },
  otpInput: {
    width: 48,
    height: 58,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    color: colors.primary,
    fontWeight: '600',
    backgroundColor: '#fff', 
  },
  errorOtp: {
    borderColor: colors.error,
    color: colors.error,
  },
  messageContainer: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  message: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  errorText: {
    color: colors.error,
    fontSize: 13,
    marginLeft: 6,
  },
  successText: {
    color: colors.success,
    fontSize: 13,
    marginLeft: 6,  
  },
  apiMessageText: {
    fontSize: 13,
    marginLeft: 6,
  },
  otpTimerAndResedText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 4,
    // padding: 12,
    borderRadius: 12,
  },
  timerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  otpTimer: {
    color: colors.textSecondary,
    fontSize: 14,
    marginLeft: 6,
  },
  resendText: {
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 14,
  },
  footer: {
    marginTop: 'auto',
    width: '100%',
    paddingBottom: 20,
  },
  buttonShadow: {
    borderRadius: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '700',
  },
  buttonIcon: {
    marginLeft: 12,
  },
  continueButton: {
    width: '100%',
  },
});

export default SignUpStepTwo;