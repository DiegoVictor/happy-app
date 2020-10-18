import React from 'react';
import { Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Form } from '@unform/mobile';
import * as ImagePicker from 'expo-image-picker';

import Input from '../../../components/Input';
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

  const route = useRoute();
  const { position } = route.params as RouteParams;

  const [openOnWeekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<string[]>([]);
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
      <Form onSubmit={() => {}}>
        <Title>Dados</Title>

        <Label>Nome</Label>
        <Input name="nome" />

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

        <NextButton onPress={() => {}}>
          <NextButtonText>Cadastrar</NextButtonText>
        </NextButton>
      </Form>
    </Container>
  );
}
