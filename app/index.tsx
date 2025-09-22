import { Redirect } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function IndexPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/onboarding" />;
}

