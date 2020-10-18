import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: { padding: 24 },
})`
  flex: 1;
`;

export const Title = styled.Text`
  border-bottom-color: #d3e2e6;
  border-bottom-width: 0.8px;
  color: #5c8599;
  font-family: Nunito_700Bold;
  font-size: 24px;
  margin-bottom: 32px;
  padding-bottom: 24px;
`;

export const Label = styled.Text`
  color: #8fa7b3;
  font-family: Nunito_600SemiBold;
  margin-bottom: 8px;
`;

export const NextButton = styled(RectButton)`
  align-items: center;
  background-color: #15c3d6;
  border-radius: 20px;
  height: 56px;
  justify-content: center;
  margin-top: 32px;
`;

export const NextButtonText = styled.Text`
  color: #fff;
  font-family: Nunito_800ExtraBold;
  font-size: 16px;
`;

export const SwitchContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`;

export const ImagesInput = styled.TouchableOpacity`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-color: #96d2f0;
  border-radius: 20px;
  border-style: dashed;
  border-width: 1.4px;
  height: 56px;
  justify-content: center;
  margin-bottom: 32px;
`;
