import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StatusBarRow from "../components/StatusBarRow";
import AppIcon from "../components/AppIcon";
import { colors, fonts, shadows } from "../theme";

const CATS = ["⭐ Бүгд", "🐺 Ардын үлгэр", "👑 Сонгодог", "🌙 Орой үдшийн"];

const STORIES = [
  {
    id: "aldar-huu",
    emoji: "🐴",
    bg: colors.sage.light,
    title: "Алдар хөө",
    level: "★★ Хялбар · Ардын үлгэр",
    category: "ардын",
  },
  {
    id: "suult-uneg",
    emoji: "🦊",
    bg: colors.peach.lightest,
    title: "Сүүлт үнэг",
    level: "★ Анхан шат · Ардын үлгэр",
    category: "ардын",
  },
  {
    id: "hilenset-chono",
    emoji: "🐺",
    bg: colors.slate.light,
    title: "Хилэнцэт чоно",
    level: "★★ Хялбар · Ардын үлгэр",
    category: "ардын",
  },
  {
    id: "erhii-mergen",
    emoji: "🏹",
    bg: colors.lavender.lightest,
    title: "Эрхий Мэргэн",
    level: "★★★ Дунд · Ардын үлгэр",
    category: "ардын",
  },
  {
    id: "hohoo-namjil",
    emoji: "🐎",
    bg: colors.sand.lightest,
    title: "Хөхөө намжил",
    level: "★★ Хялбар · Ардын үлгэр",
    category: "ардын",
  },

  {
    id: "chonony-olsgolun",
    emoji: "🐺",
    bg: colors.slate.light,
    title: "Чононы өлсгөлөн",
    level: "★★ Хялбар · Сонгодог",
    category: "сонгодог",
  },
  {
    id: "yast-melhii",
    emoji: "🐢",
    bg: colors.sage.light,
    title: "Яст мэлхий, туулай",
    level: "★ Анхан шат · Сонгодог",
    category: "сонгодог",
  },
  {
    id: "arslan-hulgana",
    emoji: "🦁",
    bg: colors.peach.lightest,
    title: "Арслан, хулгана",
    level: "★ Анхан шат · Сонгодог",
    category: "сонгодог",
  },
  {
    id: "shorgooljiin-uliral",
    emoji: "🐜",
    bg: colors.lavender.lightest,
    title: "Шоргоолж, царцаа",
    level: "★★ Хялбар · Сонгодог",
    category: "сонгодог",
  },

  {
    id: "sarny-gerel",
    emoji: "🌙",
    bg: colors.slate.light,
    title: "Сарны гэрэл",
    level: "★ Анхан шат · Орой үдшийн",
    category: "орой",
  },
  {
    id: "oddyn-nuher",
    emoji: "⭐",
    bg: colors.lavender.lightest,
    title: "Оддын нүхэр",
    level: "★★ Хялбар · Орой үдшийн",
    category: "орой",
  },
  {
    id: "shuvuu-shonyn-ger",
    emoji: "🦉",
    bg: colors.sage.light,
    title: "Шувуу шонын гэр",
    level: "★ Анхан шат · Орой үдшийн",
    category: "орой",
  },
  {
    id: "huuhduudiin-od",
    emoji: "🌟",
    bg: colors.sand.lightest,
    title: "Хүүхдүүдийн од",
    level: "★ Анхан шат · Орой үдшийн",
    category: "орой",
  },
];

export default function StoriesScreen({ navigation }: { navigation: any }) {
  const [cat, setCat] = useState(0);

  const filteredStories =
    cat === 0
      ? STORIES
      : STORIES.filter((s) => {
          if (cat === 1) return s.category === "ардын";
          if (cat === 2) return s.category === "сонгодог";
          if (cat === 3) return s.category === "орой";
          return true;
        });

  return (
    <View style={styles.root}>
      <StatusBarRow />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleRow}>
          <Text style={styles.title}>Үлгэрийн ертөнц</Text>
          <AppIcon name="sparkles" size={20} color="#E8B04A" />
        </View>
        <Text style={styles.subtitle}>Уншихаар шидэт үлгэр сонго</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
        >
          {CATS.map((c, i) => (
            <Pressable
              key={c}
              onPress={() => setCat(i)}
              style={[
                styles.chip,
                cat === i ? styles.chipActive : styles.chipIdle,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  cat === i ? { color: "#fff" } : { color: colors.warm.gray },
                ]}
              >
                {c}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <LinearGradient colors={["#8B7AB8", "#6A98B0"]} style={styles.featured}>
          <View style={[styles.deco, { top: 12, right: 16 }]}>
            <AppIcon name="sparkles" size={18} color="#FFF0B8" />
          </View>
          <View style={styles.featuredRow}>
            <View style={styles.featuredCover}>
              <Text style={{ fontSize: 48 }}>🐴</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.badge}>
                <AppIcon name="star" size={11} color="#F5D27A" />
                <Text style={styles.badgeText}>Онцлох</Text>
              </View>
              <Text style={styles.featuredTitle}>Алдар хөө</Text>
              <View style={styles.metaRow}>
                <AppIcon
                  name="headset"
                  size={13}
                  color="rgba(255,255,255,0.8)"
                />
                <Text style={styles.featuredMeta}>
                  Монгол ардын үлгэр · 8 мин
                </Text>
              </View>
            </View>
          </View>
          <Pressable
            style={styles.featuredBtn}
            onPress={() => navigation.navigate("StoryDetail", { storyId: "aldar-huu" })}
          >
            <AppIcon name="play" size={16} color={colors.warm.text} />
            <Text style={styles.featuredBtnText}>Хамтдаа унших</Text>
          </Pressable>
        </LinearGradient>

        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Бусад үлгэр</Text>
          <Text style={styles.listMore}>Бүгдийг үзэх</Text>
        </View>
        <View style={{ gap: 10, marginTop: 12 }}>
          {filteredStories.map(({ id, emoji, bg, title, level }) => (
            <Pressable
              key={id}
              style={styles.listItem}
              onPress={() => navigation.navigate("StoryDetail", { storyId: id })}
            >
              <View style={[styles.listIcon, { backgroundColor: bg }]}>
                <Text style={{ fontSize: 28 }}>{emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.listItemTitle}>{title}</Text>
                <Text style={styles.listItemLevel}>{level}</Text>
              </View>
              <AppIcon name="headset" size={20} color={colors.lavender.dark} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.warm.beige },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: {
    fontFamily: fonts.fredoka.bold,
    fontSize: 24,
    color: colors.warm.text,
  },
  subtitle: {
    fontFamily: fonts.lexend.regular,
    fontSize: 14,
    color: colors.warm.gray,
  },
  chipsRow: { gap: 8, marginTop: 16, paddingBottom: 4 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16 },
  chipActive: { backgroundColor: colors.lavender.dark },
  chipIdle: { backgroundColor: colors.warm.card, ...shadows.cardSm },
  chipText: { fontFamily: fonts.fredoka.semibold, fontSize: 12 },
  featured: {
    marginTop: 16,
    borderRadius: 24,
    padding: 20,
    ...shadows.lavender,
  },
  deco: { position: "absolute", fontSize: 18, opacity: 0.7 },
  featuredRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  featuredCover: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: colors.warm.card,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.card,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: { fontFamily: fonts.lexend.semibold, fontSize: 10, color: "#fff" },
  featuredTitle: {
    fontFamily: fonts.fredoka.bold,
    fontSize: 20,
    color: "#fff",
    marginTop: 8,
  },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 4 },
  featuredMeta: {
    fontFamily: fonts.lexend.regular,
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
  featuredBtn: {
    marginTop: 16,
    backgroundColor: colors.sand.DEFAULT,
    paddingVertical: 12,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  featuredBtnText: {
    fontFamily: fonts.fredoka.semibold,
    fontSize: 16,
    color: colors.warm.text,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  listTitle: {
    fontFamily: fonts.fredoka.semibold,
    fontSize: 16,
    color: colors.warm.text,
  },
  listMore: {
    fontFamily: fonts.lexend.regular,
    fontSize: 12,
    color: colors.lavender.dark,
  },
  listItem: {
    backgroundColor: colors.warm.card,
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    ...shadows.card,
  },
  listIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  listItemTitle: {
    fontFamily: fonts.fredoka.semibold,
    fontSize: 16,
    color: colors.warm.text,
  },
  listItemLevel: {
    fontFamily: fonts.lexend.regular,
    fontSize: 11,
    color: colors.warm.gray,
  },
});
