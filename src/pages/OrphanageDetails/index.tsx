import React, { useCallback, useEffect, useState } from 'react';
import { Linking, ScrollView } from 'react-native';
import { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

import api from '../../services/api';
import mapMarkerImg from '../../images/map-marker.png';
import {
  Container,
  ImagesContainer,
  Img,
  DetailsContainer,
  Title,
  Description,
  Separator,
  ScheduleContainer,
  ContactButton,
  ContactButtonText,
  MapContainer,
  Map,
  RoutesContainer,
  RoutesText,
  ScheduleItem,
  ScheduleText,
} from './styles';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  whatsapp: string;
  images: Array<{
    id: number;
    path: string;
  }>;
}

interface RouteParams {
  id: number;
}

const OrphanageDetails: React.FC = () => {
  const route = useRoute();
  const { id } = route.params as RouteParams;
  const [orphanage, setOrphanage] = useState<Orphanage>();

  const handleOpenGoogleMapRoutes = useCallback(() => {
    Linking.openURL(
      `https://www.google.com.br/maps/place/${orphanage?.latitude},${orphanage?.longitude}`,
    );
  }, [orphanage]);

  const handleOpenWhatsApp = useCallback(() => {
    Linking.openURL(
      `whatsapp://send?text=Olá, gostaria de visitar a instituição&phone=${orphanage?.whatsapp}`,
    );
  }, [orphanage]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/orphanages/${id}`);
      setOrphanage(data);
    })();
  }, [id]);

  if (!orphanage) {
    return (
      <Container>
        <Description>Carregando...</Description>
      </Container>
    );
  }

  return (
    <Container>
      <ImagesContainer>
        <ScrollView horizontal pagingEnabled>
          {orphanage.images.map(image => (
            <Img
              key={image.id}
              source={{
                uri: image.path,
              }}
            />
          ))}
        </ScrollView>
      </ImagesContainer>

      <DetailsContainer>
        <Title>{orphanage?.name}</Title>
        <Description>{orphanage.about}</Description>

        <MapContainer>
          <Map
            initialRegion={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
          >
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            />
          </Map>

          <RoutesContainer onPress={handleOpenGoogleMapRoutes}>
            <RoutesText>Ver rotas no Google Maps</RoutesText>
          </RoutesContainer>
        </MapContainer>

        <Separator />

        <Title>Instruções para visita</Title>
        <Description>{orphanage.instructions}</Description>

        <ScheduleContainer>
          <ScheduleItem color="blue">
            <Feather name="clock" size={40} color="#2AB5D1" />
            <ScheduleText color="blue">{orphanage?.opening_hours}</ScheduleText>
          </ScheduleItem>
          {orphanage.open_on_weekends ? (
            <ScheduleItem color="green">
              <Feather name="info" size={40} color="#39CC83" />
              <ScheduleText color="green">Atendemos fim de semana</ScheduleText>
            </ScheduleItem>
          ) : (
            <ScheduleItem color="red">
              <Feather name="info" size={40} color="#FF669D" />
              <ScheduleText color="red">
                Não atendemos fim de semana
              </ScheduleText>
            </ScheduleItem>
          )}
        </ScheduleContainer>

        <ContactButton onPress={handleOpenWhatsApp}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <ContactButtonText>Entrar em contato</ContactButtonText>
        </ContactButton>
      </DetailsContainer>
    </Container>
  );
};

export default OrphanageDetails;
