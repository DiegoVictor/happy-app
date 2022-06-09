import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';

import Header from '../../src/components/Header';

const mockedNavigate = jest.fn();
const mockedGoBack = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => {
      return {
        navigate: mockedNavigate,
        goBack: mockedGoBack,
      };
    },
  };
});

describe('Header', () => {
  it('should be able to go back to previous page', async () => {
    const title = faker.lorem.word();
    const { getByTestId, getByText } = render(
      <Header title={title} showCancel={false} />,
    );

    fireEvent.press(getByTestId('goback'));

    expect(mockedGoBack).toHaveBeenCalled();
    expect(getByText(title)).toBeTruthy();
  });

  it('should be able to go home page', async () => {
    const title = faker.lorem.word();
    const { getByTestId, getByText } = render(<Header title={title} />);

    fireEvent.press(getByTestId('close'));

    expect(mockedNavigate).toHaveBeenCalledWith('OrphanageMap');
    expect(getByText(title)).toBeTruthy();
  });
});
