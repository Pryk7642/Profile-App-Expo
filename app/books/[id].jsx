import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter, Link } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import { useBooks } from "../context/BooksContext";

const BookDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useTheme();
  const { getBookById, deleteBook } = useBooks();
  const book = getBookById(String(id));

  useEffect(() => {
  }, [book]);

  if (!book) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Book not found.</Text>
        <Link href="/books" style={[styles.button, { backgroundColor: colors.primary }]}>
          <Text style={{ color: colors.buttext }}>Back to list</Text>
        </Link>
      </View>
    );
  }

  const onDelete = () => {
    Alert.alert("Delete Book", "Are you sure you want to delete this book?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
            console.log("Current books:", books);
            console.log("Deleting book id:", id);
          deleteBook(String(id));
          router.replace("/books");
        },
      },
    ]);
  };


  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.title, { color: colors.text }]}>{book.title}</Text>
        <Text style={{ color: colors.textSecondary, marginBottom: 6 }}>
          {book.author} • {book.year || "-"}
        </Text>
        <Text style={{ color: colors.text }}>
          {book.description || "No description."}
        </Text>
      </View>

      <View style={styles.actions}>
        <Link
          href={`/books/edit/${book.id}`}
          style={[styles.editBtn, { borderColor: colors.primary }]}
        >
          <Text style={{ color: colors.primary }}>Edit</Text>
        </Link>
        <TouchableOpacity
          onPress={onDelete}
          style={[styles.deleteBtn, { borderColor: "#e53935" }]}
        >
          <Text style={{ color: "#e53935" }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  editBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  deleteBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  button: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
});
