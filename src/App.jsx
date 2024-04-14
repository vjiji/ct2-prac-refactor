import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Router from './shared/router';
import { UserProvider } from './customHooks/useUserContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router />
      </UserProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
