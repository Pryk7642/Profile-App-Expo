import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "./context/ThemeContext";
const About = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>About This Course</Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>📚 Course Info</Text>
        <Text style={[styles.bodyText, { color: colors.textSecondary }]}>
          Subject: Hybrid Mobile Application Programming {"\n"}
          Code: IN405109 {"\n"}
          Semester: 1/2567 {"\n"}
          Lecturer: Aj. Thanaphong Prathombutr {"\n"}
          Description: Study of developing mobile applications using hybrid technologies such as React Native
        </Text>
      </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
