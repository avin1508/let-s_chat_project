import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  StatusBar, 
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../Constants/Theme';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const dotAnim1 = useRef(new Animated.Value(0)).current;
  const dotAnim2 = useRef(new Animated.Value(0)).current;
  const dotAnim3 = useRef(new Animated.Value(0)).current;
  const textAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(1.5),
        useNativeDriver: true,
      }),
      Animated.timing(textAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Loading dots animation
    const animateDots = () => {
      Animated.sequence([
        Animated.timing(dotAnim1, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dotAnim2, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dotAnim3, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(300),
        Animated.timing(dotAnim1, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dotAnim2, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dotAnim3, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => animateDots());
    };

    animateDots();
  }, []);

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.container}
      end={{ x: 0, y: 0 }}
      start={{ x: 0, y: 1 }}
    >
      <StatusBar 
        backgroundColor={colors.secondary} 
        barStyle="light-content" 
      />
      
      <Animated.View 
        style={[
          styles.logoContainer,
          { 
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }] 
          }
        ]}
      >
        <Image
          source={require('../../../assets/chatLogo.png')}
          style={[styles.logo, { tintColor: colors.card }]}
          resizeMode="contain"
        />
      </Animated.View>
      
      <View style={styles.textContainer}>
        <Animated.Text style={[styles.appName, { opacity: textAnim }]}>
          Let's Chat
        </Animated.Text>
        <Animated.Text style={[styles.tagline, { opacity: textAnim }]}>
          Connecting people seamlessly
        </Animated.Text>
      </View>
      
      <View style={styles.loadingContainer}>
        <Animated.View 
          style={[
            styles.loadingDot, 
            { 
              backgroundColor: colors.card,
              opacity: dotAnim1,
              transform: [{
                scale: dotAnim1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1]
                })
              }]
            }
          ]} 
        />
        <Animated.View 
          style={[
            styles.loadingDot, 
            { 
              backgroundColor: colors.card,
              opacity: dotAnim2,
              transform: [{
                scale: dotAnim2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1]
                })
              }]
            }
          ]} 
        />
        <Animated.View 
          style={[
            styles.loadingDot, 
            { 
              backgroundColor: colors.card,
              opacity: dotAnim3,
              transform: [{
                scale: dotAnim3.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1]
                })
              }]
            }
          ]} 
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: width * 0.4,
    height: width * 0.38,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150
  },
  textContainer: {
    alignItems: 'center',
  },
  logo: {
    width: '60%',
    height: '60%',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.card,
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  tagline: {
    fontSize: 18,
    color: colors.card,
    marginTop: 5, // Reduced from 10 to 5
    fontWeight: '500',
    opacity: 0.8,
    textAlign: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: height * 0.15,
  },
  loadingDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginHorizontal: 8,
  },
});

export default SplashScreen;