// React Native
import { 
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useThemeColor } from '../../theme/hooks/useThemeColor';
import { useAuthStore } from '../store/useAuthStore';


export const LogoutIconButton = () => {
  const primaryColor = useThemeColor( {}, 'primary' );
  const { logout } = useAuthStore();

  return (
    <TouchableOpacity
      style={{ marginRight: 8 }}
      onPress={ logout }
    >
      <Ionicons
        name='log-out-outline'
        size={ 20 }
        color={ primaryColor }
      />
    </TouchableOpacity>
  );
}
