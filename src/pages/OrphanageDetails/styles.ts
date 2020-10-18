import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import styled, { css } from 'styled-components/native';

interface ScheduleColors {
  color: 'blue' | 'green' | 'red';
}

export const Container = styled.ScrollView`
  flex: 1;
`;

export const ImagesContainer = styled.View`
  height: 240px;
`;

export const Img = styled.Image.attrs({
  resizeMode: 'cover',
})`
  height: 240px;
  width: ${Dimensions.get('window').width}px;
`;

export const DetailsContainer = styled.View`
  padding: 24px;
`;

export const Title = styled.Text`
  color: #4d6f80;
  font-family: Nunito_700Bold;
  font-size: 30px;
`;

export const Description = styled.Text`
  color: #5c8599;
  font-family: Nunito_600SemiBold;
  line-height: 24px;
  margin-top: 16px;
`;

export const ScheduleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;
`;

export const ContactButton = styled(RectButton)`
  align-items: center;
  background-color: #3cdc8c;
  border-radius: 20px;
  flex-direction: row;
  height: 56px;
  justify-content: center;
  margin-top: 40px;
`;

export const ContactButtonText = styled.Text`
  color: #fff;
  font-family: Nunito_800ExtraBold;
  font-size: 16px;
  margin-left: 16px;
`;

export const Separator = styled.View`
  background-color: #d3e2e6;
  height: 0.8px;
  margin: 40px 0px;
  width: 100%;
`;

export const RoutesContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const RoutesText = styled.Text`
  color: #0089a5;
  font-family: Nunito_700Bold;
`;

export const MapContainer = styled.View`
  background-color: #e6f7fb;
  border-color: #b3dae2;
  border-radius: 20px;
  border-width: 1.2px;
  overflow: hidden;
  margin-top: 40px;
`;

export const Map = styled(MapView)`
  height: 150px;
  width: 100%;
`;

export const ScheduleItem = styled.View<ScheduleColors>`
  padding: 20px;
  width: 48%;

  ${props => {
    switch (props.color) {
      case 'blue':
        return css`
          background-color: #e6f7fb;
          border-width: 1px;
          border-color: #b3dae2;
          border-radius: 20px;
        `;

      case 'green':
        return css`
          background-color: #edfff6;
          border-color: #a1e9c5;
          border-radius: 20px;
          border-width: 1px;
        `;

      case 'red':
        return css`
          background-color: #fef6f9;
          border-color: #ffbcd4;
          border-radius: 20px;
          border-width: 1px;
        `;
    }
  }}
`;

export const ScheduleText = styled.Text<ScheduleColors>`
  font-family: Nunito_600SemiBold;
  font-size: 16px;
  line-height: 24px;
  margin-top: 20px;

  ${props => {
    switch (props.color) {
      case 'blue':
        return css`
          color: #5c8599;
        `;

      case 'green':
        return css`
          color: #37c77f;
        `;

      case 'red':
        return css`
          color: #ff669d;
        `;
    }
  }}
`;
