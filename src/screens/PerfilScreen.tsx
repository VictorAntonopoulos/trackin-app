import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { colors, gradients } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useTranslation } from 'react-i18next'; // ✅ tradução

export default function PerfilScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      try {
        const dados = await AsyncStorage.getItem('@trackin:user');
        if (dados) {
          const usuario = JSON.parse(dados);
          setEmail(usuario.email || '');
          setNome(usuario.nome || '');
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      }
    };
    carregarDadosUsuario();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      t('common.logout', 'Sair'),
      t('common.logout_confirm', 'Deseja realmente sair do aplicativo?'),
      [
        { text: t('common.cancel', 'Cancelar'), style: 'cancel' },
        {
          text: t('common.logout', 'Sair'),
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('@trackin:user');
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  const verOnboardingNovamente = async () => {
    try {
      await AsyncStorage.removeItem('@trackin:onboarding');
      Alert.alert(
        t('common.success', 'Feito!'),
        t('common.onboarding_reset', 'O onboarding será exibido novamente.')
      );
      navigation.reset({ index: 0, routes: [{ name: 'Splash' }] });
    } catch (error) {
      console.error('Erro ao redefinir onboarding:', error);
    }
  };

  // 🔄 Mudar idioma
  const changeLang = async (lang: 'pt' | 'es') => {
    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem('language', lang);
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: theme === 'dark' ? colors.dark.background : colors.light.background,
    },
    userName: {
      color: theme === 'dark' ? colors.dark.text : colors.light.text,
    },
    userEmail: {
      color: theme === 'dark' ? colors.dark.textSecondary : colors.light.textSecondary,
    },
    settingLabel: {
      color: theme === 'dark' ? colors.dark.text : colors.light.text,
    },
    settingDescription: {
      color: theme === 'dark' ? colors.dark.textSecondary : colors.light.textSecondary,
    },
  });

  return (
    <ScrollView style={[styles.container, dynamicStyles.container]}>
      <LinearGradient
        colors={theme === 'dark' ? gradients.dark : gradients.primary}
        style={styles.header}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={[colors.light.background, colors.gray[100]]}
              style={styles.avatarGradient}
            >
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png' }}
                style={styles.avatar}
              />
            </LinearGradient>
          </View>

          <Text style={styles.headerName}>{nome || t('common.profile', 'Administrador')}</Text>
          <Text style={styles.headerEmail}>{email}</Text>
        </View>
      </LinearGradient>

      {/* Conteúdo */}
      <View style={styles.content}>
        {/* Configurações */}
        <Card style={styles.settingsCard}>
          <Text style={[styles.sectionTitle, dynamicStyles.userName]}>
            {t('profile.settings', 'Configurações')}
          </Text>

          {/* Tema claro/escuro */}
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, dynamicStyles.settingLabel]}>
                {t('profile.dark_mode', 'Modo Escuro')}
              </Text>
              <Text style={[styles.settingDescription, dynamicStyles.settingDescription]}>
                {t('profile.dark_mode_desc', 'Alterne entre tema claro e escuro')}
              </Text>
            </View>
            <Switch
              trackColor={{ false: colors.gray[300], true: colors.primary[200] }}
              thumbColor={theme === 'dark' ? colors.primary[500] : colors.gray[50]}
              ios_backgroundColor={colors.gray[300]}
              onValueChange={toggleTheme}
              value={theme === 'dark'}
            />
          </View>

          {/* Idioma */}
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, dynamicStyles.settingLabel]}>
                {t('common.language', 'Idioma')}
              </Text>
              <Text style={[styles.settingDescription, dynamicStyles.settingDescription]}>
                {t('common.language_desc', 'Escolha o idioma do aplicativo')}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Button
                title="PT"
                variant="outline"
                style={{ marginRight: spacing[2] }}
                onPress={() => changeLang('pt')}
              />
              <Button
                title="ES"
                variant="outline"
                onPress={() => changeLang('es')}
              />
            </View>
          </View>
        </Card>

        {/* Ações */}
        <Card style={styles.actionsCard}>
          <Text style={[styles.sectionTitle, dynamicStyles.userName]}>
            {t('profile.actions', 'Ações')}
          </Text>

          <Button
            title={`🔄 ${t('profile.onboarding_again', 'Ver Onboarding Novamente')}`}
            variant="outline"
            onPress={verOnboardingNovamente}
            style={styles.actionButton}
          />

          <Button
            title={t('common.logout', 'Sair do Aplicativo')}
            variant="secondary"
            onPress={handleLogout}
            style={styles.actionButton}
          />
        </Card>

        {/* Informações do App */}
        <Card style={styles.infoCard}>
          <Text style={[styles.sectionTitle, dynamicStyles.userName]}>
            {t('about_app.title', 'Sobre o App')}
          </Text>

          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, dynamicStyles.settingLabel]}>
              {t('about_app.version', 'Versão')}
            </Text>
            <Text style={[styles.infoValue, dynamicStyles.settingDescription]}>
              1.0.0
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, dynamicStyles.settingLabel]}>
              {t('profile.developed_by', 'Desenvolvido por')}
            </Text>
            <Text style={[styles.infoValue, dynamicStyles.settingDescription]}>
              {t('profile.team_name', 'Equipe Track In')}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, dynamicStyles.settingLabel]}>
              {t('profile.challenge', 'Challenge FIAP')}
            </Text>
            <Text style={[styles.infoValue, dynamicStyles.settingDescription]}>
              2025
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, dynamicStyles.settingLabel]}>
              {t('about_app.commit_hash', 'Hash do Commit')}
            </Text>
            <Text style={[styles.infoValue, dynamicStyles.settingDescription]}>
              fecfe46
            </Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: spacing[16],
    paddingBottom: spacing[8],
    paddingHorizontal: spacing[6],
    alignItems: 'center',
  },
  profileSection: { alignItems: 'center' },
  avatarContainer: { marginBottom: spacing[4] },
  avatarGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: { width: 92, height: 92, borderRadius: 46 },
  headerName: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.light.background,
    marginBottom: spacing[1],
  },
  headerEmail: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.light.background,
    opacity: 0.9,
  },
  content: { padding: spacing[6], marginTop: -spacing[4] },
  settingsCard: { marginBottom: spacing[6], padding: spacing[6] },
  actionsCard: { marginBottom: spacing[6], padding: spacing[6] },
  infoCard: { padding: spacing[6] },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    marginBottom: spacing[6],
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[3],
  },
  settingInfo: { flex: 1, marginRight: spacing[4] },
  settingLabel: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    marginBottom: spacing[1],
  },
  settingDescription: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
  },
  actionButton: { marginBottom: spacing[3] },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  infoLabel: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
  },
  infoValue: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
  },
});