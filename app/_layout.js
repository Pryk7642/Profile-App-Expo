import { Stack, useRouter, useSegments } from "expo-router";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { BooksProvider } from "./context/BooksContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ThemeToggle from "./components/ThemeToggle";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import { useEffect } from "react";

function StackLayout() {
  const { isDarkMode, colors } = useTheme();
  const { authenticated, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inBooksGroup = segments[0] === 'books';
    
    const inAuthGroup = segments[0] === 'signin' || segments[0] === 'signup';

    if (!authenticated && inBooksGroup) {
      router.replace('/signin');
    } 
    else if (authenticated && inAuthGroup) {
      router.replace('/books');
    }

  }, [authenticated, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { color: colors.text },
        }}
      >
        {/* Screens สาธารณะ: ไม่ต้องมีปุ่ม Logout */}
        <Stack.Screen
          name="index"
          options={{
            title: "Profile",
            headerRight: () => <ThemeToggle />, // เอาปุ่ม Logout ออก
          }}
        />
        <Stack.Screen
          name="about"
          options={{
            title: "About",
            headerRight: () => <ThemeToggle />, // เอาปุ่ม Logout ออก
          }}
        />

        {/* Screens ส่วนตัว (Books): ยังคงมีปุ่ม Logout เหมือนเดิม */}
        <Stack.Screen name="books/index" options={{ title: "Books", headerRight: () => <HeaderButtons /> }} />
        <Stack.Screen name="books/[id]" options={{ title: "Book Detail", headerRight: () => <HeaderButtons /> }} />
        <Stack.Screen name="books/new" options={{ title: "New Book", headerRight: () => <HeaderButtons /> }} />
        <Stack.Screen name="books/edit/[id]" options={{ title: "Edit Book", headerRight: () => <HeaderButtons /> }} />
        
        {/* Screens สำหรับ Auth */}
        <Stack.Screen name="signin" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

const HeaderButtons = () => {
    const { onLogout } = useAuth();
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ThemeToggle />
            <TouchableOpacity onPress={onLogout} style={{ marginRight: 15 }}>
                <Text style={{ color: '#e53935', fontSize: 16 }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BooksProvider>
          <StackLayout />
        </BooksProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}