import { StyleSheet, Text, View, Image } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.protit}>Profile App</Text>
      <Image source={require("../assets/ggez.jpg")} style={styles.profile} />
      <Text style={styles.title}>Phiriyakorn Phanphanich</Text>
      <Text style={styles.number}>Student No. 653450098-0</Text>
      <Text style={styles.subtitle}>Computer and Information Science</Text>
      <Text style={styles.text}>Khon Kaen University</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>📧 Contact Info</Text>
        <Text style={styles.sectionText}>Email: phiriyakorn.p@kkumail.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>💡 Skills</Text>
        <Text style={styles.sectionText}>📷 Camera | 🎮 Gaming | 📹 Live Streaming</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d3d3d3",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  protit: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#e53935",
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
    borderColor: "#ff9800",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  number: {
    fontSize: 16,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#4a90e2",
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
    color: "#333",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: "#555",
  },
});

export default Home;
