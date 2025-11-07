import { Stack } from "expo-router";

export default function App() {
    return (

        <Stack>

            <Stack.Screen name="(auth)/signup/page" options={{ headerShown: false}} />
            <Stack.Screen name="(auth)/signin/page" options={{ headerShown: false}} />

        </Stack>

        /*<Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }}></Stack.Screen>
        </Stack>*/
    )
}