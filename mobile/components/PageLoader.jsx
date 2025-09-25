import { ActivityIndicator, View } from 'react-native';
import { COLORS } from '@/constants/colors';
import { styles } from '@/assets/styles/home.styles.js';

const PageLoader = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.color} />
    </View>
  );
};

export default PageLoader;
