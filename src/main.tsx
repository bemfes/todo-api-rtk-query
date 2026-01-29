import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { apiSlice } from './features/api/apiSlice.ts'
import { ErrorBoundary } from 'react-error-boundary'

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<p>Sorry, it looks like an unexpected error has occurred.</p>}>
    <StrictMode>
      <ApiProvider api={apiSlice}><App /></ApiProvider>
    </StrictMode>
  </ErrorBoundary>,
)
