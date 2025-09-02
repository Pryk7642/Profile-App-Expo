import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useBooks } from "../context/BooksContext";
import BookForm from "../components/BookForm";
import { useRouter } from "expo-router";

const NewBook = () => {
  const { colors } = useTheme();
  const { addBook } = useBooks();
  const router = useRouter();

  const handleCreate = (values) => {
    addBook(values);
    router.push("/books");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <BookForm submitLabel="Create" onSubmit={handleCreate} />
    </View>
  );
};

export default NewBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
