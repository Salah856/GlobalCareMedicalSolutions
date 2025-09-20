import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { About } from './components/About'
import { Footer } from './components/Footer'
import { DarkModeToggle } from './components/DarkModeToggle'
function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <DarkModeToggle />
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
      </main>
      <Footer />
    </div>
  )
}
export default App