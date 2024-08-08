import React from 'react';
import {render} from '@testing-library/react-native';
import App, {queryClient} from '../App';

queryClient.setDefaultOptions({
  queries: {
    gcTime: 0,
  },
});

describe('app snapshot render', () => {
  afterEach(() => {
    queryClient.clear();
  });

  test('renders correctly', () => {
    const tree = render(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
