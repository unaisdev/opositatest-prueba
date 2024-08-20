import React from 'react';

import {Sorting} from '.';

import {render, fireEvent, screen, act} from '@testing-library/react-native';
import {useSortingTypeStore} from '@storage/sorting/sorting';
import {SortingEnum} from '@type/sorting';

// Mock del hook useSortingTypeStore
// jest.mock('@storage/sorting/sorting', () => ({
//   useSortingTypeStore: jest.fn(),
// }));

const defaultText = 'Ordenar Predeterminado';
const alphabeticallText = 'Ordenar Alfabeticamente';

describe('Sorting component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSortingTypeStore.getState().clear();
  });

  it('should render correctly with default sorting type', () => {
    render(<Sorting />);

    const button = screen.getByText(defaultText);

    expect(button).toBeTruthy();
  });

  it('toggle sorting type when button is pressed', () => {
    // Renderiza el componente
    render(<Sorting />);

    expect(screen.getByText(defaultText)).toBeTruthy();

    // Simula la pulsación del botón
    act(() => {
      fireEvent.press(screen.getByText(defaultText));
    });

    const buttonAlphabeticall = screen.queryByText(alphabeticallText);
    const defaultButton = screen.queryByText(defaultText);

    expect(buttonAlphabeticall).toBeTruthy();
    expect(defaultButton).toBeFalsy();
  });

  it('setSortingType is being called when default', () => {
    const store = useSortingTypeStore.getState();
    const spyFn = jest.spyOn(store, 'setSortingType');

    render(<Sorting />);

    const button = screen.getByText(defaultText);

    act(() => {
      fireEvent.press(button);
    });

    expect(spyFn).toHaveBeenCalledTimes(1);
    expect(spyFn).toHaveBeenCalledWith(SortingEnum.ALPHABETICAL);
  });

  it('setSortingType is being called when alphabetical', () => {
    const store = useSortingTypeStore.getState();
    const spyFn = jest.spyOn(store, 'setSortingType');

    render(<Sorting />);

    act(() => {
      fireEvent.press(screen.getByText(defaultText));
    });

    expect(screen.getByText(alphabeticallText)).toBeTruthy();

    act(() => {
      fireEvent.press(screen.getByText(alphabeticallText));
    });

    expect(spyFn).toHaveBeenCalledTimes(2);
    expect(spyFn).toHaveBeenCalledWith(SortingEnum.DEFAULT);
  });
});
