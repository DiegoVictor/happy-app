import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import MapView from 'react-native-maps';

export const Container = styled.View`
  flex: 1;
`;

export const Map = styled(MapView)`
  height: ${Dimensions.get('window').height}px;
  width: ${Dimensions.get('window').width}px;
`;

export const CalloutContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  height: 46px;
  justify-content: center;
  padding: 0px 16px;
  width: 160px;
`;

export const CalloutText = styled.Text`
  color: #0089a5;
  font-family: 'Nunito_700Bold';
  font-size: 14px;
`;

export const Footer = styled.View`
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  bottom: 32px;
  elevation: 3;
  flex-direction: row;
  height: 56px;
  justify-content: space-between;
  left: 24px;
  padding-left: 24px;
  position: absolute;
  right: 24px;
`;

export const FooterText = styled.Text`
  color: #8fa7b3;
  font-family: 'Nunito_700Bold';
`;

export const CreateOrphanageButton = styled.TouchableOpacity`
  align-items: center;
  background-color: #15c3d6;
  border-radius: 20px;
  justify-content: center;
  height: 56px;
  width: 56px;
`;
