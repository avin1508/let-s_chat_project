import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Keyboard,
  BackHandler,
  StyleSheet,
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import colors from '../../Constants/Theme';

// Importing step components
import SignUpSeteOne from '../../Components/signUpFlow/SignUpSeteOne';
import SignUpStepTwo from '../../Components/signUpFlow/SignUpStepTwo';
import SignUpStepThree from '../../Components/signUpFlow/SignUpStepThree';

const SignupFlow = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const scrollViewRef = useRef(null);
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  console.log("this is the step-=-=-=-=-=-=-=-=-=-=>", step);


  // Initial signup data
  const getInitialSignupData = () => ({
    stepOneCompleted: false,
    email: '',
    stepTwoCompleted: false,
    token: '',
    profile: {
      fullName: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      avatar: null,
    },
  });

  const [signupData, setSignupData] = useState(getInitialSignupData());

  useEffect(() => {
  if (signupData.stepOneCompleted && !signupData.stepTwoCompleted) {
    setStep(2);
  } else if (signupData.stepTwoCompleted) {
    setStep(3);
  }
}, [signupData.stepOneCompleted, signupData.stepTwoCompleted]);


  const resetSignupData = () => {
    setSignupData(getInitialSignupData());
  };

  // Handle keyboard visibility
  useEffect(() => {
    const showListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setKeyboardStatus(true);
        scrollViewRef.current?.setNativeProps({ scrollEnabled: true });
      }
    );
    const hideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardStatus(false);
        scrollViewRef.current?.setNativeProps({ scrollEnabled: false });
      }
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  // Handle hardware back button
  useEffect(() => {
    const onBackPress = () => {
      if (step === 3) {
        setStep(2);
        return true;
      } else if (step === 2) {
        setStep(1);
        resetSignupData();
        return true;
      } else if (step === 1) {
        navigation.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

  return () => backHandler.remove();
  }, [step, navigation]);

  // Move to next step only if allowed
  const goToStep = (nextStep) => {
    if (nextStep === 2 && signupData.stepOneCompleted) {
      setStep(2);
    } else if (nextStep === 3 && signupData.stepTwoCompleted) {
      setStep(3);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        style={styles.container}
      >
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={false}
          showsVerticalScrollIndicator={keyboardStatus}
        >
          {step === 1 && (
            <SignUpSeteOne
              signupData={signupData}
              setSignupData={setSignupData}
              goToStep={goToStep}
              navigation={navigation}
            />
          )}
          {step === 2 && (
            <SignUpStepTwo
              signupData={signupData}
              setSignupData={setSignupData}
              goToStep={goToStep}
              navigation={navigation}
            />
          )}
          {step === 3 && (
            <SignUpStepThree
              signupData={signupData}
              setSignupData={setSignupData}
              goToStep={goToStep}
              navigation={navigation}
            />
          )}
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
  },
});

export default SignupFlow;
