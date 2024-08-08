import React from 'react';

import {AppNavigator} from './src/navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

export const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
};

export default App;
