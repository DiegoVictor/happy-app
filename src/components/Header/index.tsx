import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showCancel = true }) => {
  const navigation = useNavigation();

  const handleNavigationToHomepage = useCallback(() => {
    navigation.navigate('OrphanageMap');
  }, []);

  return (
    <Container>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>
      <Title>{title}</Title>
      {showCancel ? (
        <BorderlessButton onPress={handleNavigationToHomepage}>
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </Container>
  );
};

export default Header;
