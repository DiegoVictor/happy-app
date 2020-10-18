import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MapEvent, Marker } from 'react-native-maps';

import mapMarkerImg from '../../../images/map-marker.png';
import { Container, Map, NextButton, NextButtonText } from './styles';

const SelectMapPosition: React.FC = () => {
  const navigation = useNavigation();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const handleNextStep = useCallback(() => {
    navigation.navigate('OrphanageData', { position });
  }, [position]);

  const handleSelectMapPosition = useCallback((event: MapEvent) => {
    setPosition(event.nativeEvent.coordinate);
  }, []);

  return (
    <Container>
      <Map
        initialRegion={{
          latitude: -22.4302444,
          longitude: -46.9707956,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        onPress={handleSelectMapPosition}
      >
        {position.latitude !== 0 && (
          <Marker icon={mapMarkerImg} coordinate={position} />
        )}
      </Map>

      {position.latitude !== 0 && (
        <NextButton onPress={handleNextStep}>
          <NextButtonText>Próximo</NextButtonText>
        </NextButton>
      )}
    </Container>
  );
};

export default SelectMapPosition;
