import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import faker from 'faker';

import SelectMapPosition from '../../src/pages/CreateOrphanage/SelectMapPosition';

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

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => {
      return {
        navigate: mockedNavigate,
      };
    },
  };
});

describe('SelectMapPosition', () => {
  it('should be able to select a position on the map', async () => {
    const coordinate: { [key: string]: number } = {
      latitude: Number(faker.address.latitude()),
      longitude: Number(faker.address.longitude()),
    };

    const { getByTestId } = render(<SelectMapPosition />);

    fireEvent(getByTestId('map-view'), 'press', {
      nativeEvent: {
        coordinate,
      },
    });

    await waitFor(async () => expect(getByTestId('marker')).toBeTruthy());

    ['latitude', 'longitude'].forEach((key: string) => {
      expect(getByTestId('marker').props.coordinate[key]).toBe(coordinate[key]);
    });

    fireEvent.press(getByTestId('next'));

    expect(mockedNavigate).toHaveBeenCalledWith('OrphanageData', {
      position: coordinate,
    });
  });
});
