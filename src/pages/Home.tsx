import { useEffect, useState } from 'react';
import axios from 'axios';
import LaunchCard from '../components/LaunchCard';

interface Launch {
  id: string;
  name: string;
  date_utc: string;
  links: {
    webcast: string;
    patch: {
      small: string;
      large: string;
    };
  };
}

function Home() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [yearFilter, setYearFilter] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    axios.get('https://api.spacexdata.com/v4/launches/upcoming')
      .then(res => setLaunches(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredLaunches = yearFilter === 'All'
    ? launches
    : launches.filter(launch => new Date(launch.date_utc).getFullYear().toString() === yearFilter);

  const visibleLaunches = filteredLaunches.slice(0, visibleCount);

  const years = Array.from(new Set(launches.map(launch => new Date(launch.date_utc).getFullYear().toString()))).sort();

  return (
    <div style={{ maxWidth: 1100, margin: 'auto', padding: '0 1rem' }}>
      <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>🚀 Upcoming SpaceX Launches</h1>

      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <label htmlFor="year-select" style={{ marginRight: 10, fontWeight: 'bold' }}>Filter by Year:</label>
        <select
          id="year-select"
          value={yearFilter}
          onChange={e => {
            setYearFilter(e.target.value);
            setVisibleCount(6); // reset visible on filter change
          }}
          style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc' }}
        >
          <option value="All">All</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {visibleLaunches.map(launch => (
          <LaunchCard
            key={launch.id}
            id={launch.id}              // <-- added id prop here
            name={launch.name}
            date={launch.date_utc}
            patch={launch.links.patch.small}
            webcast={launch.links.webcast}
          />
        ))}
      </div>

      {visibleCount < filteredLaunches.length && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button
            onClick={() => setVisibleCount(prev => prev + 6)}
            style={{
              backgroundColor: '#ffc800',
              color: '#000',
              border: 'none',
              padding: '10px 20px',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(255, 200, 0, 0.5)'
            }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
