import { SessionProvider } from './contexts/SessionProvider'
import { Toaster } from 'react-hot-toast'
import AppView from './pages/AppView'

function App() {

  return (
    <main className='min-h-screen'>
      <Toaster />
      <SessionProvider>
        <AppView />
      </SessionProvider>
    </main >
  )
}

export default App
