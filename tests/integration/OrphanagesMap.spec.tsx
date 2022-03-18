import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import MockAdapter from 'axios-mock-adapter';

import OrphanagesMap from '../../src/pages/OrphanagesMap';
import factory from '../utils/factory';
import api from '../../src/services/api';
import wait from '../utils/wait';

interface Orphanage {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
}

jest.mock('react-native-maps', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: (props: { [key: string]: any }) => {
      return <View {...props} testID="map-view" />;
    },
    Marker: (props: { [key: string]: any }) => {
      return <View {...props} />;
    },
    Callout: (props: { [key: string]: any }) => {
      return <View {...props} />;
    },
  };
});

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const React = require('react');
  return {
    useFocusEffect: (cb: () => void) => React.useEffect(cb, []),
    useNavigation: () => {
      return {
        navigate: mockedNavigate,
      };
    },
  };
});

describe('OrphanagesMap', () => {
  const apiMock = new MockAdapter(api);

  it('should be able to see orphanages on the map', async () => {
    const orphanages = await factory.attrsMany<Orphanage>('Orphanage', 3);
    apiMock.onGet('/orphanages').reply(200, orphanages);

    const { getByTestId, getByText } = render(<OrphanagesMap />);

    await wait(async () =>
      expect(getByTestId('marker_' + orphanages[0].id)).toBeTruthy(),
    );

    orphanages.forEach(orphanage => {
      const marker = getByTestId('marker_' + orphanage.id);
      expect(marker).toBeTruthy();
      expect(marker.props.coordinate).toStrictEqual({
        latitude: orphanage.latitude,
        longitude: orphanage.longitude,
      });

      fireEvent.press(getByTestId('callout_' + orphanage.id));

      expect(getByText(orphanage.name)).toBeTruthy();
    });

    expect(
      getByText(`${orphanages.length} orfano(s) encontrado(s)`),
    ).toBeTruthy();
  });

  it('should be able to see orphanages on the map', async () => {
    const orphanage = await factory.attrs<Orphanage>('Orphanage');
    apiMock.onGet('/orphanages').reply(200, [orphanage]);

    const { getByTestId } = render(<OrphanagesMap />);

    await wait(async () =>
      expect(getByTestId('marker_' + orphanage.id)).toBeTruthy(),
    );

    fireEvent.press(getByTestId('create'));

    expect(mockedNavigate).toHaveBeenCalledWith('SelectMapPosition');
  });
});
