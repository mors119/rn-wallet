import { Slot } from 'expo-router';
import SafeScreen from '@/components/SafeScreen';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeScreen>
        <Slot />
      </SafeScreen>
      {/* 상단 시간 베터리 등 색상 지정 */}
      <StatusBar style="dark" />
    </ClerkProvider>
  );
}
