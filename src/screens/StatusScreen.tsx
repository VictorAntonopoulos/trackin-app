import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { motoService } from "../services/motoService";
import { Moto } from "../models/Moto";
import { useTheme } from "../context/ThemeContext";
import { colors, gradients } from "../styles/colors";
import { typography } from "../styles/typography";
import { spacing } from "../styles/spacing";
import { Card } from "../components/ui/Card";

export default function StatusScreen() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const fetchMotos = useCallback(async () => {
    setLoading(true);
    try {
      const lista = await motoService.getAllMotos();
      setMotos(lista);
    } catch (error) {
      console.error("❌ Erro ao carregar motos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMotos();
    }, [fetchMotos])
  );

  
  const statusMap: Record<
    string,
    { display: string; color: string; emoji: string }
  > = {
    DISPONIVEL: { display: "Disponível", color: colors.success, emoji: "✅" },
    ALUGADA: { display: "Alugada", color: colors.error, emoji: "🚫" },
    EM_MANUTENCAO: {
      display: "Em manutenção",
      color: colors.warning,
      emoji: "🔧",
    },
  };

  
  const modeloReverseMap: Record<number, string> = {
    0: "Mottu Sport 110i",
    1: "Mottu E",
    2: "Mottu POP 110i",
  };

  
  const statusAgrupados = Object.keys(statusMap).map((status) => ({
    title: statusMap[status].display,
    data: motos.filter((m) => m.status === status),
    color: statusMap[status].color,
    emoji: statusMap[status].emoji,
  }));

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor:
        theme === "dark" ? colors.dark.background : colors.light.background,
    },
    statusTitle: {
      color: theme === "dark" ? colors.dark.text : colors.light.text,
    },
    motoTitle: {
      color: theme === "dark" ? colors.dark.text : colors.light.text,
    },
    motoSubtitle: {
      color:
        theme === "dark" ? colors.dark.textSecondary : colors.light.textSecondary,
    },
    emptyText: {
      color:
        theme === "dark" ? colors.dark.textSecondary : colors.light.textSecondary,
    },
  });

  const renderMotoItem = ({ item }: { item: Moto }) => (
    <Card style={styles.motoCard}>
      <View style={styles.motoHeader}>
        <Text style={[styles.motoModel, dynamicStyles.motoTitle]}>
          {modeloReverseMap[Number(item.modelo)] ?? `Modelo ${item.modelo}`}
        </Text>
        <View style={styles.motoInfo}>
          <Text style={[styles.motoPlate, dynamicStyles.motoSubtitle]}>
            {item.placa}
          </Text>
          {item.ano && (
            <Text style={[styles.motoYear, dynamicStyles.motoSubtitle]}>
              {item.ano}
            </Text>
          )}
        </View>
      </View>
    </Card>
  );

  const renderStatusSection = ({
    item,
  }: {
    item: typeof statusAgrupados[0];
  }) => (
    <View style={styles.statusSection}>
      <View style={styles.statusHeader}>
        <View style={styles.statusTitleContainer}>
          <Text style={styles.statusEmoji}>{item.emoji}</Text>
          <Text style={[styles.statusTitle, dynamicStyles.statusTitle]}>
            {item.title}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.color }]}>
          <Text style={styles.statusCount}>{item.data.length}</Text>
        </View>
      </View>

      {item.data.length === 0 ? (
        <Card style={styles.emptyCard}>
          <Text style={[styles.emptyText, dynamicStyles.emptyText]}>
            Nenhuma moto com este status
          </Text>
        </Card>
      ) : (
        <FlatList
          data={item.data}
          keyExtractor={(moto) => moto.id.toString()}
          renderItem={renderMotoItem}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );

  if (loading) {
    return (
      <View
        style={[styles.container, styles.loadingContainer, dynamicStyles.container]}
      >
        <LinearGradient
          colors={theme === "dark" ? gradients.dark : gradients.primary}
          style={styles.loadingGradient}
        >
          <Text style={styles.loadingText}>Carregando status...</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, dynamicStyles.container]}>
      <LinearGradient
        colors={theme === "dark" ? gradients.dark : gradients.primary}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Status das Motos</Text>
        <Text style={styles.headerSubtitle}>
          Acompanhe o status de todas as motos
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <FlatList
          data={statusAgrupados}
          keyExtractor={(item) => item.title}
          renderItem={renderStatusSection}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingGradient: {
    padding: spacing[8],
    borderRadius: 20,
    alignItems: "center",
  },
  loadingText: {
    color: colors.light.background,
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.medium,
  },
  header: {
    paddingTop: spacing[16],
    paddingBottom: spacing[8],
    paddingHorizontal: spacing[6],
    alignItems: "center",
  },
  headerTitle: {
    fontSize: typography.fontSize["2xl"],
    fontFamily: typography.fontFamily.bold,
    color: colors.light.background,
    marginBottom: spacing[2],
  },
  headerSubtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.light.background,
    opacity: 0.9,
  },
  content: {
    padding: spacing[6],
    marginTop: -spacing[4],
  },
  statusSection: {
    marginBottom: spacing[6],
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing[4],
  },
  statusTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusEmoji: {
    fontSize: 24,
    marginRight: spacing[3],
  },
  statusTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.semibold,
  },
  statusBadge: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: 12,
    minWidth: 32,
    alignItems: "center",
  },
  statusCount: {
    color: colors.light.background,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.semibold,
  },
  motoCard: {
    marginBottom: spacing[3],
    padding: spacing[4],
  },
  motoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  motoModel: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    flex: 1,
  },
  motoInfo: {
    alignItems: "flex-end",
  },
  motoPlate: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
  },
  motoYear: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    marginTop: spacing[1],
  },
  emptyCard: {
    alignItems: "center",
    padding: spacing[6],
  },
  emptyText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    fontStyle: "italic",
  },
});
