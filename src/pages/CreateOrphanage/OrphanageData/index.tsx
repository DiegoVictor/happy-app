import React from 'react';
import { Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Form } from '@unform/mobile';

import Input from '../../../components/Input';
import {
  Container,
  Title,
  Label,
  ImagesInput,
  SwitchContainer,
  NextButton,
  NextButtonText,
} from './styles';

export default function OrphanageData() {
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
        <ImagesInput onPress={() => {}}>
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
          />
        </SwitchContainer>

        <NextButton onPress={() => {}}>
          <NextButtonText>Cadastrar</NextButtonText>
        </NextButton>
      </Form>
    </Container>
  );
}
