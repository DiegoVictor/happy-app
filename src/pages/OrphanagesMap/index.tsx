import React, { useCallback, useState } from 'react';
import { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import api from '../../services/api';
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

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const navigation = useNavigation();
  const handleNavigationToOrphanageDetails = useCallback(
    (id: number) => {
      navigation.navigate('OrphanageDetails', { id });
    },
    [navigation],
  );

  const handleNavigationToCreateOrphanage = useCallback(() => {
    navigation.navigate('SelectMapPosition');
  }, [navigation]);

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useFocusEffect(() => {
    (async () => {
      const { data } = await api.get<Orphanage[]>('/orphanages');
      setOrphanages(data);
    })();
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
        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id}
            icon={MapMarker}
            calloutAnchor={{
              x: 2.7,
              y: 0.8,
            }}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }}
          >
            <Callout
              tooltip
              onPress={() => handleNavigationToOrphanageDetails(orphanage.id)}
            >
              <CalloutContainer>
                <CalloutText>{orphanage.name}</CalloutText>
              </CalloutContainer>
            </Callout>
          </Marker>
        ))}
      </Map>

      <Footer>
        <FooterText>{orphanages.length} orfano(s) encontrado(s)</FooterText>
        <CreateOrphanageButton onPress={handleNavigationToCreateOrphanage}>
          <Feather name="plus" size={20} color="#FFF" />
        </CreateOrphanageButton>
      </Footer>
    </Container>
  );
};

export default OrphanagesMap;
