import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useBooks } from "../../context/BooksContext";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

export default function EditBook() {
  const { id } = useLocalSearchParams();
  const { getBookById, updateBook, addBook } = useBooks();
  const router = useRouter();
  const { colors } = useTheme();

  const book = getBookById(id);

  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [year, setYear] = useState(book?.year || "");
  const [description, setDescription] = useState(book?.description || "");

  const onSave = () => {
    if (!title && !author && !year && !description) {
      if (book) updateBook(id, {});
      router.push("/books");
      return;
    }

    const updates = { title, author, year, description };

    if (book) {
      updateBook(id, updates);
    } else {
      addBook(updates);
    }

    router.push("/books");
  };

  const onCancel = () => router.push("/books");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>
        {book ? "Edit Book" : "Add Book"}
      </Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, { borderColor: colors.primary, color: colors.text }]}
      />
      <TextInput
        value={author}
        onChangeText={setAuthor}
        placeholder="Author"
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, { borderColor: colors.primary, color: colors.text }]}
      />
      <TextInput
        value={year}
        onChangeText={setYear}
        placeholder="Year"
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, { borderColor: colors.primary, color: colors.text }]}
        keyboardType="numeric"
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        placeholderTextColor={colors.textSecondary}
        style={[styles.textarea, { borderColor: colors.primary, color: colors.text }]}
        multiline
      />

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: colors.primary }]}
          onPress={onSave}
        >
          <Text style={[styles.btnText, { color: colors.buttext }]}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: colors.surface, borderColor: colors.primary, borderWidth: 1 }]}
          onPress={onCancel}
        >
          <Text style={[styles.btnText, { color: colors.text }]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  textarea: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    height: 100,
    textAlignVertical: "top",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  btnText: {
    fontWeight: "600",
    fontSize: 16,
  },
});
