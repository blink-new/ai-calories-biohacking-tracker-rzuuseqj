import { View, StyleSheet } from 'react-native';
import { Card } from '@/components/Card';

export default function Home() {
  return (
    <View style={styles.container}>
      <Card />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    justifyContent: 'center',
  },
}); 