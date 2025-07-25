import { useState, useRef } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  useWindowDimensions
} from 'react-native';
import { router } from 'expo-router';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/presentation/theme/components';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { useCameraStore } from '@/presentation/store/useCameraStore';

export default function CameraScreen() {
  const { addSelectedImage } = useCameraStore();

  const [ facing, setFacing ] = useState<CameraType>('back');
  const [ cameraPermission, requestCameraPermission ] = useCameraPermissions();
  const [ mediaPermission, requestMediaPermission ] = MediaLibrary.usePermissions();

  const [ selectedImage, setSelectedImage ] = useState<string>();

  const cameraRef = useRef<CameraView>( null );

  const onRequestPermissions = async () => {
    try {
      const { status: cameraPermissionStatus } = await requestCameraPermission();

      if ( cameraPermissionStatus !== 'granted' ) {
        Alert.alert( 'Lo siento', 'Necesitamos permiso a la cámara para tomar fotos' );
        return;
      }

      const { status: mediaPermissionStatus } = await requestMediaPermission();

      if ( mediaPermissionStatus !== 'granted' ) {
        Alert.alert( 'Lo siento', 'Necesitamos permiso a la galería para guardar las imágenes' );
        return;
      }

    } catch ( error ) {
      console.log( error );
      Alert.alert( 'Error', 'Algo salió mal con los permisos' );
    }
  }

  if (!cameraPermission) {
    return <View />;
  }

  if (!cameraPermission.granted) {
    return (
      <View style={{
        ...styles.container,
        marginHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={styles.message}>
          Necesitamos permiso para usar la cámara y la galería
        </Text>

        <TouchableOpacity onPress={ onRequestPermissions }>
          <ThemedText type='subtitle'>
            Solicitar permiso
          </ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  const onShutterButtonPress = async () => {
    if ( !cameraRef.current ) return;
    const picture = await cameraRef.current.takePictureAsync({
      quality: 0.7
    });

    if ( !picture.uri ) return;

    setSelectedImage( picture.uri );

    // TODO: Save image
  }

  const onReturnCancel = () => {
    // TODO: Clear state
    router.dismiss();
  }

  const onPictureAccepted = async () => {
    if ( !selectedImage ) return;
    await MediaLibrary.createAssetAsync( selectedImage );
    addSelectedImage( selectedImage );
    router.dismiss();
  }

  const onRetakeImage = () => {
    setSelectedImage( undefined );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  if ( selectedImage ) return (
    <View style={styles.container}>
      <View style={ styles.overlay } pointerEvents='box-none'>
        <Image
          source={{ uri: selectedImage }}
          style={ styles.camera }
        />

        <ConfirmImageButton onPress={ onPictureAccepted } />
        <RetakeImageButton onPress={ onRetakeImage } />
        <ReturnCancelButton onPress={ onReturnCancel }  />
      </View>
    </View>

  );

  return (
    <View style={styles.container}>
      <CameraView
        style={ StyleSheet.absoluteFillObject }
        facing={facing}
        ref={ cameraRef }
      />

      <View style={ styles.overlay } pointerEvents='box-none'>
        <ShutterButton
          onPress={ onShutterButtonPress }
        />

        <FlipCameraButton onPress={ toggleCameraFacing }  />
        { /*TODO: GalleryButton*/ }
        <GalleryButton />
        <ReturnCancelButton onPress={ onReturnCancel }  />
      </View>
    </View>
  );
}

// Custom Components
const ShutterButton = ({ onPress = () => {} }) => {
  const dimensions = useWindowDimensions();
  const primaryColor = useThemeColor( {}, 'primary' );

  return (
    <TouchableOpacity
      onPress={ onPress }
      style={[
        styles.shutterButton,
        {
          position: 'absolute',
          bottom: 30,
          left: dimensions.width / 2 - 32,
          borderColor: primaryColor
        }
      ]}
    >

    </TouchableOpacity>
  );
}

const FlipCameraButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity
      onPress={ onPress }
      style={ styles.flipCameraButton }
    >
      <Ionicons
        name='camera-reverse-outline'
        size={ 30 }
        color='white'
      />
    </TouchableOpacity>
  );
}

const GalleryButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity
      onPress={ onPress }
      style={ styles.galleryButton }
    >
      <Ionicons
        name='images-outline'
        size={ 30 }
        color='white'
      />
    </TouchableOpacity>
  );
}

const ReturnCancelButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity
      onPress={ onPress }
      style={ styles.returnCancelButton }
    >
      <Ionicons
        name='arrow-back-outline'
        size={ 30 }
        color='white'
      />
    </TouchableOpacity>
  );
}

const ConfirmImageButton = ({ onPress = () => {} }) => {
  const dimensions = useWindowDimensions();
  const primaryColor = useThemeColor( {}, 'primary' );

  return (
    <TouchableOpacity
      onPress={ onPress }
      style={[
        styles.shutterButton,
        {
          position: 'absolute',
          bottom: 30,
          left: dimensions.width / 2 - 32,
          borderColor: primaryColor
        }
      ]}
    >
      <Ionicons
        name='checkmark-outline'
        size={ 30 }
        color={ primaryColor }
      />
    </TouchableOpacity>
  );
}

const RetakeImageButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity
      onPress={ onPress }
      style={ styles.flipCameraButton }
    >
      <Ionicons
        name='close-outline'
        size={ 30 }
        color='white'
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  permissionContainer: {
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  shutterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flipCameraButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#17202A',
    position: 'absolute',
    bottom: 40,
    right: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#17202A',
    position: 'absolute',
    bottom: 40,
    left: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  returnCancelButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#17202A',
    position: 'absolute',
    top: 40,
    left: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
