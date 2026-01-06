import { ErrorBoundary, type FallbackProps } from "react-error-boundary"

import QueryClientProvider from './components/providers/QueryClientProvider'
import logger from './configs/logger'
import { SwapForm } from './features/swap/components'

function App() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender} onError={logger.error}>
      <QueryClientProvider>
        <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#5c94fc] relative overflow-hidden">
          <div className="absolute top-20 left-10 w-24 h-12 bg-white rounded-full opacity-80 blur-[1px] shadow-[20px_10px_0_0_#fff]" />
          <div className="absolute top-40 right-20 w-40 h-16 bg-white rounded-full opacity-80 blur-[1px] shadow-[-30px_15px_0_0_#fff]" />
          <SwapForm />
        </div>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

function fallbackRender({ resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <h1>{":("}</h1>
      <p>Sorry, something went wrong. Please try again later.</p>
      <button onClick={resetErrorBoundary} type="button" aria-label="Try again">Try again</button>
    </div>
  )
}

export default App
