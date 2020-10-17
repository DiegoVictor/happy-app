import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';

import MapMarker from './src/images/map-marker.png';
import {
  Container,
  Map,
  CalloutContainer,
  CalloutText,
  Footer,
  FooterText,
  CreateOrphanageButton,
} from './styles';

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Container>
      <StatusBar style="auto" />
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
          <Callout tooltip onPress={() => {}}>
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
}
