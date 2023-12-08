'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, defineStyleConfig, extendTheme } from '@chakra-ui/react';
import { queryClient } from '@components/lib/QueryClient';

import { QueryClientProvider } from '@tanstack/react-query';

const Input = defineStyleConfig({
  variants: {
    solid: {
      bg: 'white.500',
      color: 'white',
    },
  },
  defaultProps: {
    variant: 'solid',
    size: 'sm',
  },
});

const breakpoints = {
  base: '0px',
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

export const theme = extendTheme({
  components: {
    Input,
  },
  breakpoints,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}
