import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Edit app/index.tsx to edit this screen. 123</Text>
      <Link href={'/about'}>About</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d9fe82',
  },
});
