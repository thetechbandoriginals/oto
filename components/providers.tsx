'use client'

import React, { ReactNode } from 'react'
import { SnackbarProvider } from 'notistack';
import { SessionProvider } from 'next-auth/react';
import AppContextProvider from '@/contexts/app-context';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }} maxSnack={3}>
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </SnackbarProvider>
    </SessionProvider>
  )
}

export default Providers
