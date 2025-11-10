import { Stack } from "expo-router";

export default function App() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
        {/* Grupo de telas de autenticação (login/cadastro) */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />

        {/* Grupo de telas internas com tab bar */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}