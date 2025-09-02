import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "../context/ThemeContext";

const BookForm = ({
  initialValues = { title: "", author: "", year: "", description: "" },
  onSubmit,
  submitLabel = "Save",
}) => {
  const { colors } = useTheme();
  const [title, setTitle] = useState(initialValues.title || "");
  const [author, setAuthor] = useState(initialValues.author || "");
  const [year, setYear] = useState(initialValues.year || "");
  const [description, setDescription] = useState(initialValues.description || "");

  const handleSubmit = () => {
    if (!title.trim() || !author.trim()) {
      Alert.alert("Invalid Data", "Title and Author are required.");
      return;
    }
    if (year && !/^\d{1,4}$/.test(year.trim())) {
      Alert.alert("Invalid Year", "Please enter a valid year (numbers only).");
      return;
    }
    onSubmit({
      title: title.trim(),
      author: author.trim(),
      year: year.trim(),
      description: description.trim(),
    });
  };

  return (
    <View style={styles.form}>
      <Text style={[styles.label, { color: colors.text }]}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Book title"
        placeholderTextColor={colors.textSecondary + "99"}
        style={[
          styles.input,
          { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border },
        ]}
      />

      <Text style={[styles.label, { color: colors.text }]}>Author</Text>
      <TextInput
        value={author}
        onChangeText={setAuthor}
        placeholder="Author name"
        placeholderTextColor={colors.textSecondary + "99"}
        style={[
          styles.input,
          { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border },
        ]}
      />

      <Text style={[styles.label, { color: colors.text }]}>Year</Text>
      <TextInput
        value={year}
        onChangeText={setYear}
        placeholder="e.g. 2020"
        placeholderTextColor={colors.textSecondary + "99"}
        keyboardType="number-pad"
        style={[
          styles.input,
          { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border },
        ]}
      />

      <Text style={[styles.label, { color: colors.text }]}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Short description"
        placeholderTextColor={colors.textSecondary + "99"}
        multiline
        numberOfLines={4}
        style={[
          styles.textarea,
          { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border },
        ]}
      />

      <TouchableOpacity onPress={handleSubmit} style={[styles.button, { backgroundColor: colors.primary }]}>
        <Text style={[styles.buttonText, { color: colors.buttext }]}>{submitLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  textarea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default BookForm;