import React, { useCallback, useRef, useState } from 'react';
import { Alert, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Form } from '@unform/mobile';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { FormHandles } from '@unform/core';

import Input from '../../../components/Input';
import api from '../../../services/api';
import {
  Container,
  Title,
  Label,
  ImagesInput,
  SwitchContainer,
  NextButton,
  NextButtonText,
  UploadedImagesContainer,
  UploadedImage,
} from './styles';

interface RouteParams {
  position: {
    latitude: number;
    longitude: number;
  };
}

const OrphanageData: React.FC = () => {
  const route = useRoute();
  const { position } = route.params as RouteParams;

  const [openOnWeekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async data => {
      try {
        const form = new FormData();

        Object.keys(data).forEach(key => {
          form.append(key, data[key]);
        });
        form.append('open_on_weekends', String(openOnWeekends));

        if (position.latitude && position.longitude) {
          form.append('latitude', String(position.latitude));
          form.append('longitude', String(position.longitude));
        }

        images.forEach((image, index) => {
          form.append('images', {
            name: `image_${index}.jpg`,
            uri: image,
            type: 'images/jpg',
          } as any);
        });

        await api.post('/orphanages', form);

        navigation.navigate('OrphanageMap');
      } catch (err) {
        Alert.alert('Ops! Alguma coisa deu errado, tente novamente!');
      }
    },
    [navigation, images, position, openOnWeekends],
  );

  const handleSelectImage = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Ops! Precisamos de acesso a sua galeria!');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri } = result;
    setImages([...images, uri]);
  }, [images]);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Title>Dados</Title>

        <Label>Nome</Label>
        <Input name="name" />

        <Label>Sobre</Label>
        <Input name="about" style={{ height: 110 }} multiline />

        <Label>Whatsapp</Label>
        <Input name="whatsapp" />

        <Label>Fotos</Label>
        <UploadedImagesContainer>
          {images.map(image => (
            <UploadedImage source={{ uri: image }} key={image} />
          ))}
        </UploadedImagesContainer>
        <ImagesInput onPress={handleSelectImage}>
          <Feather name="plus" size={24} color="#15B6D6" />
        </ImagesInput>

        <Title>Visitação</Title>

        <Label>Instruções</Label>
        <Input name="instructions" style={{ height: 110 }} multiline />

        <Label>Horario de visitas</Label>
        <Input name="opening_hours" />

        <SwitchContainer>
          <Label>Atende final de semana?</Label>
          <Switch
            thumbColor="#fff"
            trackColor={{ false: '#ccc', true: '#39CC83' }}
            value={openOnWeekends}
            onValueChange={setOpenOnWeekends}
          />
        </SwitchContainer>

        <NextButton onPress={() => formRef?.current?.submitForm()}>
          <NextButtonText>Cadastrar</NextButtonText>
        </NextButton>
      </Form>
    </Container>
  );
};

export default OrphanageData;
