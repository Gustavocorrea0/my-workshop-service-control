import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="signin/page" />
            <Stack.Screen name="signup/page" />
        </Stack>
    );
}