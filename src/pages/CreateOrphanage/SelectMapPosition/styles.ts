import styled from 'styled-components/native';
import MapView from 'react-native-maps';
import { RectButton } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  flex: 1;
  position: relative;
`;

export const Map = styled(MapView)`
  flex: 1;
  position: relative;
  height: ${Dimensions.get('window').height};
  width: ${Dimensions.get('window').width};
`;

export const NextButton = styled(RectButton)`
  align-items: center;
  background-color: #15c3d6;
  border-radius: 20px;
  bottom: 40px;
  height: 56px;
  justify-content: center;
  left: 24px;
  position: absolute;
  right: 24px;
`;

export const NextButtonText = styled.Text`
  color: #fff;
  font-family: Nunito_800ExtraBold;
  font-size: 16px;
`;
