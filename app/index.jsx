import { StyleSheet, Text, View, Image } from "react-native";
import { Link } from "expo-router";
import { useTheme } from "./context/ThemeContext";

const Home = () => {
  const { colors, isDarkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* <Text style={[styles.protit, { color: colors.text }]}>Profile App</Text> */}
      <Image
        source={
          isDarkMode
          ? require("../assets/ezgg.jpg")
          : require("../assets/ggez.jpg")
        }
        style={[styles.profile, { borderColor: colors.profileBorder }]}
      />
      <Text style={[styles.title, { color: colors.text }]}>Phiriyakorn Phanphanich</Text>
      <Text style={[styles.number, { color: colors.textSecondary }]}>Student No. 653450098-0</Text>
      <Text style={[styles.subtitle, { color: colors.primary }]}>Computer and Information Science</Text>
      <Text style={[styles.text, { color: colors.textSecondary }]}>Khon Kaen University Nong Khai Campus</Text>

      <Link
        href="/about"
        style={[styles.button, { backgroundColor: colors.primary }]}
      >
        <Text style={[styles.buttonText, { color: colors.buttext }]}>👉🏻Go to About Page👈🏻</Text>
      </Link>
      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: colors.text }]}>📧 Contact Info</Text>
        <Text style={[styles.sectionText, { color: colors.textSecondary }]}>Email: phiriyakorn.p@kkumail.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: colors.text }]}>💡 Skills</Text>
        <Text style={[styles.sectionText, { color: colors.textSecondary }]}>📷 Camera | 🎮 Gaming | 📹 Live Streaming</Text>
      </View>
    </View>
    
  );
};



export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  protit: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 80,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  profile: {
    height: 200,
    width: 200,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 3,
    // borderColor: "#ff9800",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
  },
  number: {
    fontSize: 16,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 2,
  },
  text: {
    fontSize: 16,
  },
  section: {
    marginTop: 30,
    alignItems: "center",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default Home;