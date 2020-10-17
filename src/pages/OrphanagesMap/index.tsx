import React, { useCallback } from 'react';
import { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import MapMarker from '../../images/map-marker.png';
import {
  Container,
  Map,
  CalloutContainer,
  CalloutText,
  Footer,
  FooterText,
  CreateOrphanageButton,
} from './styles';
import { useNavigation } from '@react-navigation/native';

const OrphanagesMap: React.FC = () => {
  const navigation = useNavigation();
  const handleNavigationToOrphanageDetails = useCallback(() => {
    navigation.navigate('OrphanageDetails');
  });

  return (
    <Container>
      <Map
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -22.4302444,
          longitude: -46.9707956,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          icon={MapMarker}
          calloutAnchor={{
            x: 3.1,
            y: 0.95,
          }}
          coordinate={{
            latitude: -22.4302444,
            longitude: -46.9707956,
          }}
        >
          <Callout tooltip onPress={handleNavigationToOrphanageDetails}>
            <CalloutContainer>
              <CalloutText>Lar das meninas</CalloutText>
            </CalloutContainer>
          </Callout>
        </Marker>
      </Map>

      <Footer>
        <FooterText>2 orfanos encontrados</FooterText>
        <CreateOrphanageButton onPress={() => {}}>
          <Feather name="plus" size={20} color="#FFF" />
        </CreateOrphanageButton>
      </Footer>
    </Container>
  );
};

export default OrphanagesMap;
