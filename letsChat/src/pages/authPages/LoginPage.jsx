import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Keyboard,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../Constants/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { loginApi } from '../../reduxToolkit/slices/authSlice';

const windowHeight = Dimensions.get('window').height;

const LoginPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [loginFormError, setLoginFormError] = useState({});
  const [loginApierror, setLoginApiError] = useState('');
  const scrollViewRef = useRef();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setKeyboardStatus(true);
        scrollViewRef.current?.setNativeProps({ scrollEnabled: true });
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardStatus(false);
        scrollViewRef.current?.setNativeProps({ scrollEnabled: false });
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const { userLoading, userError } = useSelector(state => state.auth);

  // console.log("this is the user error", userError)

  const loginFormValidator = () => {
    const error = {};
    if (!email) error.email = 'Email is required';
    
    if(email){
      let ValidEmailREgex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!ValidEmailREgex.test(email)) error.email = 'Invalid email address';
    }
    
    if (!password) error.password = 'Password is required';
    if (password.length < 6) error.password = 'Password must be at least 6 characters';
    setLoginFormError(error);

    return Object.keys(error).length === 0;
  }

  const handleLogin = async() => {
    try {
      if(!loginFormValidator()){
      return;
    }
    const response = await dispatch(loginApi({ email, password })).unwrap();
    console.log("this is the response", response)
    } catch (error) {
      setLoginApiError(error.message);
      setTimeout(() => {
        setLoginApiError('');
      }, 3000);
    }
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      if (loginFormError){
        setLoginFormError({});
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [loginFormError]);

  return (
    <View style={styles.outerContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={false}
          showsVerticalScrollIndicator={keyboardStatus}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <Image
              source={require('../../../assets/chatLogo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={[styles.appName, { color: colors.primary }]}>Let's Chat</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Connect with friends and family
            </Text>

    
          </View>

         <View style={[styles.loginErroContainer, loginApierror && styles.loginerroStyling]}>
          {loginApierror && (
           <>
            <Icon name="exclamation-circle" size={15} color={colors.error} />
            <Text style={styles.loginErrorText}>{loginApierror}</Text>
           </>
          )}
        </View>



          {/* Login Form */} 
          <View style={styles.formContainer}>
            {/* Email Input */}
            <Text style={[styles.label, { color: colors.textPrimary }]}>Email Address</Text>
            <View style={[styles.inputContainer, { borderColor: (loginFormError.email || loginApierror) ? colors.error : colors.border }]}>
              <Icon 
                name="envelope" 
                size={18} 
                color={colors.textSecondary} 
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: colors.textPrimary }]}
                placeholder="Enter your email"
                placeholderTextColor={colors.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={{height: 25}}>
              {loginFormError.email && (
                <Text style={styles.errorText}>{loginFormError.email}</Text>
              )}
            </View>
          

            {/* Password Input */}
            <Text style={[styles.label, { color: colors.textPrimary }]}>Password</Text>
            <View style={[styles.inputContainer, { borderColor: (loginFormError.password || loginApierror) ? colors.error : colors.border }]}>
              <Icon 
                name="lock" 
                size={18} 
                color={colors.textSecondary} 
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: colors.textPrimary }]}
                placeholder="Enter your password"
                placeholderTextColor={colors.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Icon 
                  name={showPassword ? 'eye-slash' : 'eye'} 
                  size={18} 
                  color={colors.textSecondary} 
                />
              </TouchableOpacity>
            </View>
            <View style={{height: 25}}>
            {loginFormError.password && (
              <Text style={styles.errorText}>{loginFormError.password}</Text>
            )}
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgetPasswordPage')}
              style={styles.forgotPasswordContainer}
            >
              <Text style={[styles.forgotPassword, { color: colors.secondary }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Gradient Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                style={[styles.loginButton, { opacity: isLoading ? 0.7 : 1 }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {userLoading ? (
                  <ActivityIndicator color={colors.card} />
                ) : (
                  <View style={styles.buttonContent}>
                    <Text style={styles.loginButtonText}>Login</Text>
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

            {/* Create Account Section */}
            <View style={styles.createAccountContainer}>
              <Text style={[styles.createAccountText, { color: colors.textSecondary }]}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignupFlow')}>
                <Text style={[styles.createAccountLink, { color: colors.primary }]}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
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
    paddingTop: 50,
    paddingBottom: 40,
    minHeight: windowHeight,
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 5,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    marginBottom: 6,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.card,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 24,
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
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
  loginButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  createAccountText: {
    fontSize: 14,
  },
  createAccountLink: {
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    color: colors.error,
    fontSize: 10,
    marginTop: 4,
    marginLeft: 4,
    marginBottom: 8,
  },
  loginErroContainer:{
    marginBottom: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    height: 30
  },
  loginErrorText: {
    color: colors.error,
    fontSize: 14,
    fontWeight: '500',
  },
  loginerroStyling:{
    borderLeftWidth: 2,
    borderLeftColor: colors.error,
    backgroundColor: colors.error + '20',
    borderRadius: 10,
  }
});

export default LoginPage;