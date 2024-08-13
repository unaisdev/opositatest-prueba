import React from 'react';

import {Sorting} from '.';

import {render, fireEvent} from '@testing-library/react-native';

import {useSortingTypeStore} from '@storage/sorting/sorting';

import {SortingEnum} from '@type/sorting';

// Mock del hook useSortingTypeStore
jest.mock('@storage/sorting/sorting', () => ({
  useSortingTypeStore: jest.fn(),
}));

describe('Sorting component', () => {
  const mockSetSortingType = jest.fn();
  const mockUseSortingTypeStore = useSortingTypeStore as unknown as jest.Mock;

  beforeEach(() => {
    mockUseSortingTypeStore.mockImplementation(() => ({
      sortingType: SortingEnum.DEFAULT,
      setSortingType: mockSetSortingType,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with default sorting type', () => {
    const {getByText} = render(<Sorting />);
    expect(getByText('Ordenar Alfabeticamente')).toBeTruthy();
  });

  it('should toggle sorting type when button is pressed', () => {
    // Renderiza el componente
    const {getByText, rerender} = render(<Sorting />);

    const button = getByText('Ordenar Alfabeticamente');

    // Simula la pulsación del botón
    fireEvent.press(button);

    // Verifica que se ha llamado a setSortingType con el valor ALPHABETICAL
    expect(mockSetSortingType).toHaveBeenCalledWith(SortingEnum.ALPHABETICAL);

    // Cambia el mock para simular el estado cambiado
    mockUseSortingTypeStore.mockImplementationOnce(() => ({
      sortingType: SortingEnum.ALPHABETICAL,
      setSortingType: mockSetSortingType,
    }));

    // Re-renderiza el componente para reflejar el nuevo estado
    rerender(<Sorting />);

    // Simula la pulsación del botón otra vez
    fireEvent.press(button);

    // Verifica que se ha llamado a setSortingType con el valor DEFAULT
    expect(mockSetSortingType).toHaveBeenCalledWith(SortingEnum.DEFAULT);
  });
});
