import { useState } from 'react';
import { useAppState } from './utils/useAppState';
import { Dashboard } from './components/Dashboard';
import { TripInput } from './components/TripInput';
import { Leaderboard } from './components/Leaderboard';
import { Leaf, LayoutDashboard, Map as MapIcon, Trophy } from 'lucide-react';
import './App.css';

type Page = 'dashboard' | 'track' | 'leaderboard';

function App() {
  const { stats, addTrip } = useAppState();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard stats={stats} />;
      case 'track':
        return <TripInput onAddTrip={(trip) => {
          addTrip(trip);
          // Optional: redirect to dashboard after adding to see the impact
          // setCurrentPage('dashboard');
        }} />;
      case 'leaderboard':
        return <Leaderboard userStats={stats} />;
      default:
        return <Dashboard stats={stats} />;
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar glass-panel">
        <div className="brand text-gradient">
          <Leaf size={32} />
          <h1>EcoTrack</h1>
        </div>
        
        <nav className="nav-links mt-md">
          <button 
            className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>
          <button 
            className={`nav-link ${currentPage === 'track' ? 'active' : ''}`}
            onClick={() => setCurrentPage('track')}
          >
            <MapIcon size={20} />
            Log Trip
          </button>
          <button 
            className={`nav-link ${currentPage === 'leaderboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('leaderboard')}
          >
            <Trophy size={20} />
            Leaderboard
          </button>
        </nav>

        <div className="mt-auto">
          <div className="glass-panel" style={{ padding: '1rem', marginTop: 'auto', border: 'none', background: 'rgba(16, 185, 129, 0.05)' }}>
            <p className="text-sm text-secondary" style={{ fontSize: '0.875rem' }}>
              "Every journey matters. Small choices lead to big impacts."
            </p>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
