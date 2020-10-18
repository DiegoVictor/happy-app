import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Marker } from 'react-native-maps';

import mapMarkerImg from '../../../images/map-marker.png';
import { Container, Map, NextButton, NextButtonText } from './styles';

export default function SelectMapPosition() {
  const navigation = useNavigation();

  function handleNextStep() {
    navigation.navigate('OrphanageData');
  }

  return (
    <Container>
      <Map
        initialRegion={{
          latitude: -27.2092052,
          longitude: -49.6401092,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          icon={mapMarkerImg}
          coordinate={{ latitude: -27.2092052, longitude: -49.6401092 }}
        />
      </Map>

      <NextButton onPress={handleNextStep}>
        <NextButtonText>Próximo</NextButtonText>
      </NextButton>
    </Container>
  );
}
