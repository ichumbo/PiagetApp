import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { Easing, FadeInDown, SlideInDown, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { WebView } from 'react-native-webview';

export default function HomeScreen() {
  const [fullScreen, setFullScreen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('home');
  const [fullScreenType, setFullScreenType] = React.useState('');
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0.5);
  
  React.useEffect(() => {
    rotate.value = withRepeat(
      withTiming(360, { duration: 20000, easing: Easing.linear }),
      -1,
      false
    );
    scale.value = withRepeat(
      withTiming(1.1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    translateY.value = withRepeat(
      withTiming(10, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    opacity.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);
  
  const animatedBubbleStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
  
  // Logo is now fixed without animation effects
  
  const getWebViewUrl = (type) => {
    switch(type) {
      case 'aluno': return 'https://piaget.acessoareadoaluno.com.br/aluno/';
      case 'pedagogico': return 'https://piaget.acessoareadoaluno.com.br/pedagogico/';
      case 'financeiro': return 'https://piaget.acessoareadoaluno.com.br/financeiro/';
      default: return 'https://piaget.acessoareadoaluno.com.br/aluno/';
    }
  };

  const handleButtonPress = (tabType) => {
    setActiveTab(tabType);
    setFullScreen(true);
    setFullScreenType(tabType);
  };

  const getTabTitle = (tab) => {
    switch(tab) {
      case 'aluno': return 'Área do Aluno';
      case 'pedagogico': return 'Área Pedagógica';
      case 'financeiro': return 'Área Financeira';
      default: return '';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {fullScreen ? (
        <View style={styles.fullScreenContainer}>
          <View style={styles.fullScreenHeader}>
            <TouchableOpacity style={styles.backButton} onPress={() => {
              setFullScreen(false);
              setActiveTab('home');
            }}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.fullScreenTitle}>
              {getTabTitle(fullScreenType)}
            </Text>
          </View>
          
          <WebView 
            source={{ uri: getWebViewUrl(fullScreenType) }}
            style={{flex: 1}}
            startInLoadingState={true}
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Carregando...</Text>
              </View>
            )}
          />
        </View>
      ) : (
        <>
          <StatusBar translucent backgroundColor="transparent" barStyle="light-content" hidden={true} />
          
          <View style={styles.backgroundContainer}>
            <LinearGradient
              colors={['#00ae47', '#00ae47', '#00ae47']}
              style={styles.background}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            
            <Animated.View style={[styles.bubble, styles.bubble1, animatedBubbleStyle]} />
            <Animated.View style={[styles.bubble, styles.bubble2]} />
            <Animated.View style={[styles.bubble, styles.bubble3]} />
            <Animated.View style={[styles.bubble, styles.bubble4]} />
            <Animated.View style={[styles.bubble, styles.bubble5]} />
            
            <View style={styles.overlay} />
          </View>
          
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image 
                source={require('../assets/images/logo.png')} 
                style={styles.logo} 
                resizeMode="contain" 
              />
            </View>
            
            <Animated.View 
              entering={FadeInDown.delay(600).duration(800)}
              style={styles.welcomeContainer}
            >
            </Animated.View>
          </View>
          
          <Animated.View 
            entering={SlideInDown.delay(500).duration(800)}
            style={styles.bottomCard}
          >
            <View style={styles.cardHandle} />
            <Text style={styles.cardTitle}>{getTabTitle(activeTab)}</Text>
            
            <View style={styles.cardDecoration}>
              <View style={styles.decorationCircle} />
              <View style={styles.decorationLine} />
            </View>
            
            {activeTab === 'home' && (
              <View style={styles.homeContent}>
                <View style={styles.welcomeCard}>
                  <Ionicons name="notifications" size={24} color="#00ae47" style={styles.notificationIcon} />
                  <Text style={styles.welcomeCardText}>Bem-vindo de volta! Escolha seu perfil de acesso abaixo.</Text>
                </View>
                
                <View style={styles.buttonContainer}>
                  <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                      style={[styles.buttonPrimary, styles.buttonContainerStyle]}
                      onPress={() => handleButtonPress('aluno')}
                      activeOpacity={0.8}
                    >
                      <View style={styles.buttonContent}>
                        <FontAwesome5 name="user-graduate" size={22} color="#00ae47" style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Aluno</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                      style={[styles.buttonSecondary, styles.buttonContainerStyle]}
                      onPress={() => handleButtonPress('financeiro')}
                      activeOpacity={0.8}
                    >
                      <View style={styles.buttonContent}>
                        <FontAwesome5 name="money-bill-wave" size={22} color="#00ae47" style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Responsável Financeiro</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                      style={[styles.buttonTertiary, styles.buttonContainerStyle]}
                      onPress={() => handleButtonPress('pedagogico')}
                      activeOpacity={0.8}
                    >
                      <View style={styles.buttonContent}>
                        <FontAwesome5 name="book-reader" size={22} color="#00ae47" style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Pedagógico</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            
            {activeTab !== 'home' && !fullScreen && (
              <View style={styles.webViewContainer}>
                <View style={styles.tabHeader}>
                  <TouchableOpacity style={styles.backButton} onPress={() => {
                    setActiveTab('home');
                    setFullScreen(false);
                  }}>
                    <Ionicons name="arrow-back" size={24} color="#00ae47" />
                  </TouchableOpacity>
                  <Text style={styles.tabTitle}>{getTabTitle(activeTab)}</Text>
                  <TouchableOpacity style={styles.fullScreenButton} onPress={() => {
                    setFullScreen(true);
                    setFullScreenType(activeTab);
                  }}>
                    <Ionicons name="expand-outline" size={24} color="#00ae47" />
                  </TouchableOpacity>
                </View>
                
                <WebView 
                  source={{ uri: getWebViewUrl(activeTab) }}
                  style={styles.webView}
                  startInLoadingState={true}
                  renderLoading={() => (
                    <View style={styles.loadingContainer}>
                      <Text style={styles.loadingText}>Carregando...</Text>
                    </View>
                  )}
                />
              </View>
            )}
            
            <View style={styles.footer}>
              <Text style={styles.footerText}>© 2025 piaget</Text>
              <Text style={styles.footerSubtext}>Versão 1.0.0</Text>
            </View>
          </Animated.View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  bubble1: {
    width: 200,
    height: 200,
    top: -50,
    right: -50,
  },
  bubble2: {
    width: 150,
    height: 150,
    bottom: 100,
    left: -50,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  bubble3: {
    width: 100,
    height: 100,
    bottom: 200,
    right: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  bubble4: {
    width: 80,
    height: 80,
    top: 150,
    left: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
  bubble5: {
    width: 60,
    height: 60,
    bottom: 80,
    right: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    paddingBottom: '60%',
  },
  logoContainer: {
    marginBottom: 0,
    position: 'absolute',
    top: 60,
    zIndex: 10,
  },
  logo: {
    width: 120,
    height: 120,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: -20,
  },
  welcomeText: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 5,
  },
  footer: {
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#f0f4ff',
  },
  footerText: {
    color: '#00ae47',
    fontSize: 12,
    fontWeight: '500',
  },
  footerSubtext: {
    color: '#00ae47',
    opacity: 0.6,
    fontSize: 10,
    marginTop: 2,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '75%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    alignItems: 'center',
  },
  cardDecoration: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  decorationCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00ae47',
    marginRight: 5,
  },
  decorationLine: {
    width: 20,
    height: 3,
    backgroundColor: '#00ae47',
    borderRadius: 2,
  },
  welcomeCard: {
    width: '100%',
    backgroundColor: '#f0f4ff',
    borderRadius: 16,
    padding: 15,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    marginRight: 10,
  },
  welcomeCardText: {
    flex: 1,
    fontSize: 14,
    color: '#00ae47',
    lineHeight: 20,
  },
  cardHandle: {
    width: 50,
    height: 5,
    backgroundColor: '#00ae47',
    borderRadius: 5,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ae47',
    marginBottom: 15,
  },
  homeContent: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
    gap: 18,
    marginTop: 10,
    marginBottom: 0,
  },
  buttonWrapper: {
    width: '100%',
  },
  buttonContainerStyle: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  buttonContent: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    paddingVertical: 18,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  buttonIcon: {
    marginRight: 14,
  },
  buttonPrimary: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    position: 'relative',
    overflow: 'visible',
  },
  buttonSecondary: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    position: 'relative',
    overflow: 'visible',
  },
  buttonTertiary: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    position: 'relative',
    overflow: 'visible',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00ae47',
    letterSpacing: 0.5,
  },
  activeButton: {
    borderColor: '#00ae47',
    borderWidth: 2,
    backgroundColor: '#f0f4ff',
  },
  webViewContainer: {
    width: '100%',
    flex: 1,
    height: '100%',
  },
  webView: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: 10,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    fontSize: 16,
    color: '#00ae47',
    marginTop: 10,
  },
  tabHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  backButton: {
    padding: 5,
  },
  tabTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ae47',
    marginLeft: 10,
  },
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: '#00ae47',
    flex: 1,
  },
  fullScreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: '#00ae47',
  },
  fullScreenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  fullScreenButton: {
    marginLeft: 'auto',
    padding: 5,
  }
});