import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { ResultsPage } from './pages/ResultsPage'
import { DetailPage } from './pages/DetailPage'
import { AddDiggingPage } from './pages/AddDiggingPage'

type Page = 'home' | 'results' | 'detail' | 'add';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');

  const showPage = (name: Page) => {
    setCurrentPage(name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      showPage('results');
    }
  }

  return (
    <div className="app-container">
      <Navbar onNavigate={showPage} />

      <HomePage 
        isVisible={currentPage === 'home'}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        onNavigate={showPage}
      />

      <ResultsPage 
        isVisible={currentPage === 'results'}
        onNavigate={showPage}
      />

      <DetailPage 
        isVisible={currentPage === 'detail'}
        onNavigate={showPage}
      />

      <AddDiggingPage 
        isVisible={currentPage === 'add'}
        onNavigate={showPage}
      />
    </div>
  )
}

export default App
