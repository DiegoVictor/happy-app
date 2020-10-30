import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import MockAdapter from 'axios-mock-adapter';

import OrphanageDetails from '../../src/pages/OrphanageDetails';
import api from '../../src/services/api';
import factory from '../utils/factory';
import { Linking } from 'react-native';
import wait from '../utils/wait';

interface Orphanage {
  latitude: number;
  longitude: number;
  whatsapp: string;
  images: Array<{
    id: number;
    path: string;
  }>;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  [key: string]: any;
}

jest.mock('@react-navigation/native', () => {
  return {
    useRoute: () => ({ params: { id: 1 } }),
  };
});

jest.mock('react-native-maps', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: (props: { [key: string]: any }) => {
      return <View {...props} testID="map-view" />;
    },
    Marker: (props: { [key: string]: any }) => {
      return <View {...props} testID="marker" />;
    },
  };
});

describe('OrphanageDetails', () => {
  const apiMock = new MockAdapter(api);

  it('should be able to see an orphanage data', async () => {
    const orphanage = await factory.attrs<Orphanage>('Orphanage', {
      open_on_weekends: true,
    });
    apiMock.onGet('/orphanages/1').reply(200, orphanage);

    const openUrl = jest.spyOn(Linking, 'openURL');

    const { getByText, getByTestId } = render(<OrphanageDetails />);

    await wait(() => expect(getByText(orphanage.name)).toBeTruthy());

    expect(getByText(orphanage.about)).toBeTruthy();
    expect(getByText(orphanage.instructions)).toBeTruthy();
    expect(getByText(orphanage.opening_hours)).toBeTruthy();
    expect(getByText(orphanage.opening_hours)).toBeTruthy();
    expect(getByText('Atendemos fim de semana')).toBeTruthy();

    ['latitude', 'longitude'].forEach((key: string) => {
      expect(getByTestId('map-view').props.initialRegion[key]).toBe(
        orphanage[key],
      );
    });

    fireEvent.press(getByTestId('gmap'));

    expect(openUrl).toHaveBeenCalledWith(
      `https://www.google.com.br/maps/place/${orphanage.latitude},${orphanage.longitude}`,
    );

    fireEvent.press(getByTestId('whatsapp'));

    expect(openUrl).toHaveBeenCalledWith(
      `whatsapp://send?text=Olá, gostaria de visitar a instituição&phone=${orphanage.whatsapp}`,
    );
  });

  it('should be able to see that the orphanage not open on weekends', async () => {
    const orphanage = await factory.attrs<Orphanage>('Orphanage', {
      open_on_weekends: false,
    });
    apiMock.onGet('/orphanages/1').reply(200, orphanage);

    const { getByText } = render(<OrphanageDetails />);

    await wait(() => expect(getByText(orphanage.name)).toBeTruthy());

    expect(getByText('Não atendemos fim de semana')).toBeTruthy();
  });
});
