import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { colors, gradients } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';
import { Card } from '../components/ui/Card';

export default function HomeScreen() {
  const { theme } = useTheme();

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: theme === 'dark' ? colors.dark.background : colors.light.background,
    },
    welcomeText: {
      color: theme === 'dark' ? colors.dark.text : colors.light.text,
    },
    subtitleText: {
      color: theme === 'dark' ? colors.dark.textSecondary : colors.light.textSecondary,
    },
  });

  return (
    <ScrollView style={[styles.container, dynamicStyles.container]}>
      
      <LinearGradient
        colors={theme === 'dark' ? gradients.dark : gradients.primary}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Image 
            source={require('../../assets/trackin-logo.png')} 
            style={styles.logo} 
          />
          <Text style={styles.headerTitle}>Track In</Text>
          <Text style={styles.headerSubtitle}>
            Controle inteligente de motos
          </Text>
        </View>
      </LinearGradient>

      
      <View style={styles.content}>
        <Text style={[styles.welcomeTitle, dynamicStyles.welcomeText]}>
          Bem-vindo ao futuro do gerenciamento
        </Text>
        
        <Text style={[styles.description, dynamicStyles.subtitleText]}>
          Gerencie suas motos com tecnologia de ponta utilizando RFID, 
          visão computacional e monitoramento inteligente em tempo real.
        </Text>

        
        <View style={styles.featuresGrid}>
          <Card style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureEmoji}>🏍️</Text>
            </View>
            <Text style={[styles.featureTitle, dynamicStyles.welcomeText]}>
              Controle Total
            </Text>
            <Text style={[styles.featureDescription, dynamicStyles.subtitleText]}>
              Monitore todas as suas motos em tempo real
            </Text>
          </Card>

          <Card style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureEmoji}>📡</Text>
            </View>
            <Text style={[styles.featureTitle, dynamicStyles.welcomeText]}>
              RFID Avançado
            </Text>
            <Text style={[styles.featureDescription, dynamicStyles.subtitleText]}>
              Rastreamento preciso com tecnologia RFID
            </Text>
          </Card>

          <Card style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureEmoji}>👁️</Text>
            </View>
            <Text style={[styles.featureTitle, dynamicStyles.welcomeText]}>
              Visão Computacional
            </Text>
            <Text style={[styles.featureDescription, dynamicStyles.subtitleText]}>
              Reconhecimento inteligente por imagem
            </Text>
          </Card>

          <Card style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureEmoji}>📊</Text>
            </View>
            <Text style={[styles.featureTitle, dynamicStyles.welcomeText]}>
              Analytics
            </Text>
            <Text style={[styles.featureDescription, dynamicStyles.subtitleText]}>
              Relatórios detalhados e insights
            </Text>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: spacing[16],
    paddingBottom: spacing[8],
    paddingHorizontal: spacing[6],
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: spacing[4],
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: typography.fontSize['3xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.light.background,
    marginBottom: spacing[2],
  },
  headerSubtitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.regular,
    color: colors.light.background,
    opacity: 0.9,
  },
  content: {
    padding: spacing[6],
    marginTop: -spacing[4], 
  },
  welcomeTitle: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.bold,
    textAlign: 'center',
    marginBottom: spacing[4],
    lineHeight: typography.lineHeight.tight * typography.fontSize['2xl'],
  },
  description: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    marginBottom: spacing[8],
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    marginBottom: spacing[4],
    alignItems: 'center',
    padding: spacing[5],
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[3],
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  featureDescription: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.sm,
  },
});

