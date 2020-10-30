import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import MockAdapter from 'axios-mock-adapter';
import faker from 'faker';
import { Alert } from 'react-native';

import OrphanageData from '../../src/pages/CreateOrphanage/OrphanageData';
import api from '../../src/services/api';
import factory from '../utils/factory';
import FormData from '../utils/form-data';

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

const mockedParams = {
  position: {
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
  },
};

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    useRoute: () => {
      return {
        params: mockedParams,
      };
    },
    useNavigation: () => {
      return {
        navigate: mockedNavigate,
      };
    },
  };
});

let mockedStatus = 'granted';
let mockedCanceled = false;
jest.mock('expo-image-picker', () => {
  return {
    MediaTypeOptions: {
      Images: 'Images',
    },
    requestCameraRollPermissionsAsync: async () => {
      return { status: mockedStatus };
    },
    launchImageLibraryAsync: async () => {
      return {
        cancelled: mockedCanceled,
        uri: './screenshots/map.png',
      };
    },
  };
});

global.FormData = FormData;

describe('OrphanageData', () => {
  const apiMock = new MockAdapter(api);

  it('should be able to create a new orphanage', async () => {
    const orphanage = await factory.attrs<Orphanage>('Orphanage');

    apiMock.onPost('/orphanages').reply(200);

    const { getByTestId } = render(<OrphanageData />);

    fireEvent.changeText(getByTestId('name'), orphanage.name);
    fireEvent.changeText(getByTestId('about'), orphanage.about);
    fireEvent.changeText(getByTestId('instructions'), orphanage.instructions);
    fireEvent.changeText(getByTestId('opening_hours'), orphanage.opening_hours);
    fireEvent.changeText(getByTestId('whatsapp'), orphanage.whatsapp);

    await act(async () => {
      fireEvent.press(getByTestId('image'));
    });

    await act(async () => {
      fireEvent.press(getByTestId('submit'));
    });

    expect(mockedNavigate).toHaveBeenCalledWith('OrphanageMap');
  });

  it('should not be able to create a new orphanage with network error', async () => {
    const orphanage = await factory.attrs<Orphanage>('Orphanage');

    mockedStatus = 'canceled';
    mockedCanceled = true;
    mockedNavigate.mockClear();

    const alert = jest.spyOn(Alert, 'alert');

    apiMock.onPost('/orphanages').reply(404);

    const { getByTestId } = render(<OrphanageData />);

    fireEvent.changeText(getByTestId('name'), orphanage.name);
    fireEvent.changeText(getByTestId('about'), orphanage.about);
    fireEvent.changeText(getByTestId('instructions'), orphanage.instructions);
    fireEvent.changeText(getByTestId('opening_hours'), orphanage.opening_hours);
    fireEvent.changeText(getByTestId('whatsapp'), orphanage.whatsapp);

    await act(async () => {
      fireEvent.press(getByTestId('image'));
    });

    expect(alert).toHaveBeenCalledWith(
      'Ops! Precisamos de acesso a sua galeria!',
    );

    await act(async () => {
      fireEvent.press(getByTestId('submit'));
    });

    expect(mockedNavigate).not.toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith(
      'Ops! Alguma coisa deu errado, tente novamente!',
    );
  });
});
