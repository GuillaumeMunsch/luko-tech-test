import { useState, useEffect } from 'react';
import {
  Alert,
  ImageBackground,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Linking,
} from 'react-native';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import Button from '../components/Button';
import { InventoryItem, RootTabScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';
import { addInventoryItemValidate } from '../utils/validates';

export default function AddItemScreen({
  navigation,
  route,
}: RootTabScreenProps<'AddItemScreen'>) {
  const addItem = (route.params as any)?.addItem as (
    item: InventoryItem
  ) => void; // Could not find how to define this properly.

  const pickImage = async (setImage: (value: string) => void) => {
    const permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions.status !== ImagePicker.PermissionStatus.GRANTED)
      return Alert.alert(
        'No access to library',
        'Please update your app settings',
        [
          {
            text: 'Settings',
            onPress: () => Linking.openSettings(),
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ]
      );
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.cancelled) setImage(result.uri);
  };

  const cameraImage = async (setImage: (value: string) => void) => {
    const permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions.status !== ImagePicker.PermissionStatus.GRANTED)
      return Alert.alert(
        'No access to camera',
        'Please update your app settings',
        [
          {
            text: 'Settings',
            onPress: () => Linking.openSettings(),
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ]
      );
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.cancelled) setImage(result.uri);
  };

  const selectSource = (setImage: (value: string) => void) =>
    Alert.alert('Image picker', 'Pick image from', [
      { text: 'Library', onPress: () => pickImage(setImage) },
      { text: 'Camera', onPress: () => cameraImage(setImage) },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: '',
          purchasePrice: '',
          photo: '',
          description: '',
        }}
        onSubmit={(values) => {
          console.log('Values', values);
          addItem({ ...values, purchasePrice: parseInt(values.purchasePrice) });
          navigation.goBack();
        }}
        validate={addInventoryItemValidate}
      >
        {({ handleChange, handleBlur, values, setFieldValue, submitForm }) => (
          <>
            <View style={styles.formContainer}>
              <View style={styles.buttonsContainer}>
                <Button title="Cancel" onPress={() => navigation.goBack()} />
                <Button
                  title="Add"
                  disabled={
                    !values.name || !values.purchasePrice || !values.photo
                  }
                  onPress={() => submitForm()}
                />
              </View>
              <View style={styles.imgBackgroundContainer}>
                {values.photo ? (
                  <ImageBackground
                    source={{ uri: values.photo }}
                    resizeMode="cover"
                    style={styles.pictureImageBackground}
                    imageStyle={styles.pictureImageBackgroundImg}
                  >
                    <Pressable
                      style={styles.imgDelIconContainer}
                      onPress={() => setFieldValue('photo', '')}
                    >
                      <Ionicons name="trash" size={18} color="white" />
                    </Pressable>
                  </ImageBackground>
                ) : (
                  <Pressable
                    style={styles.pictureImageBackgroundPlaceholder}
                    onPress={() =>
                      selectSource((value: string) =>
                        setFieldValue('photo', value)
                      )
                    }
                  >
                    <Ionicons name="camera" size={44} color={colors.mainBlue} />
                    <Text style={styles.addPhotoText}>Add Photo</Text>
                  </Pressable>
                )}
              </View>
              <View>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  style={styles.textInput}
                  placeholder="Bracelet"
                />
              </View>
              <View>
                <Text style={styles.inputLabel}>Value</Text>
                <TextInput
                  onChangeText={handleChange('purchasePrice')}
                  onBlur={handleBlur('purchasePrice')}
                  value={values.purchasePrice}
                  style={styles.textInput}
                  placeholder="700"
                />
              </View>
              <View>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  style={styles.textArea}
                  placeholder="Optional"
                />
              </View>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
    paddingTop: 10,
  },
  buttonsContainer: {
    width: '100%',
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  formContainer: {
    marginVertical: 26,
  },
  inputLabel: {
    color: colors.textBlack,
    fontSize: 13,
    lineHeight: 17,
    marginTop: 20,
    marginBottom: 5,
  },
  textInput: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: StyleSheet.hairlineWidth,
    height: 48,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  textArea: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: StyleSheet.hairlineWidth,
    height: 128,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'flex-start',
  },
  imgBackgroundContainer: {
    alignItems: 'center',
  },
  pictureImageBackgroundPlaceholder: {
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 75,
    borderStyle: 'dashed',
    borderColor: colors.mainGrey,
  },
  addPhotoText: {
    fontSize: 17,
    lineHeight: 24,
  },
  pictureImageBackground: {
    height: 150,
    width: 150,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  pictureImageBackgroundImg: {
    borderRadius: 75,
  },
  imgDelIconContainer: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: colors.mainRed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCamera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
});
