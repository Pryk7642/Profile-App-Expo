import React from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import { useBooks } from "../context/BooksContext";

const BooksList = () => {
  const { colors } = useTheme();
  const { books } = useBooks();

  const renderItem = ({ item }) => (
    <Link
      href={`/books/${item.id}`}
      style={[
        styles.card,
        { backgroundColor: colors.surface, shadowColor: colors.text },
      ]}
      asChild
    >
      
      <View style={{ overflow: 'hidden', borderRadius: 12 }}>
        <View style={[styles.cardContent, { borderLeftColor: colors.primary }]}>
          <Text style={[styles.cardIcon]}>📖</Text>
          <View style={styles.cardTextContainer}>
            <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={{ color: colors.textSecondary }}>
              {item.author} • {item.year || "-"}
            </Text>
          </View>
        </View>
      </View>
    </Link>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📚</Text>
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Your library is empty.
        </Text>
        <Text style={[styles.emptySubText, { color: colors.textSecondary }]}>
            Tap the '+' button to add your first book!
        </Text>
    </View>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Library</Text>
      </View>
      
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }} // เพิ่ม padding ด้านล่างเผื่อปุ่ม FAB
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={renderEmptyState}
      />

      
      <Link
        href="/books/new"
        style={[styles.fab, { backgroundColor: colors.primary, shadowColor: colors.primary }]}
      >
        <Text style={[styles.fabText, { color: colors.buttext }]}>+</Text>
      </Link>
    </SafeAreaView>
  );
};

export default BooksList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  card: {
    borderRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderLeftWidth: 4,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },

  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  fabText: {
    fontSize: 30,
    fontWeight: '300',
    lineHeight: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
  },
  emptySubText: {
    fontSize: 14,
    marginTop: 8,
  },
});