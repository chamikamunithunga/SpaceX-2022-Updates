import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Launch {
  name: string;
  details: string;
  date_utc: string;
  links: {
    webcast: string;
    patch: {
      small: string;
      large: string;
    };
    wikipedia: string;
  };
}

function LaunchDetails() {
  const { id } = useParams<{ id: string }>();
  const [launch, setLaunch] = useState<Launch | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`https://api.spacexdata.com/v4/launches/${id}`)
        .then(res => setLaunch(res.data))
        .catch(console.error);
    }
  }, [id]);

  if (!launch) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20, color: 'white', maxWidth: 600, margin: 'auto' }}>
      <Link to="/" style={{ color: '#ffc800', display: 'inline-block', marginBottom: 20 }}>← Back</Link>
      <h1>{launch.name}</h1>
      <img src={launch.links.patch.large} alt={launch.name} style={{ width: '200px', marginBottom: 20 }} />
      <p><strong>Date:</strong> {new Date(launch.date_utc).toLocaleString()}</p>
      <p>{launch.details || 'No details available.'}</p>
      {launch.links.webcast && (
        <p>
          <a href={launch.links.webcast} target="_blank" rel="noreferrer" style={{ color: '#ffc800' }}>
            Watch Webcast
          </a>
        </p>
      )}
      {launch.links.wikipedia && (
        <p>
          <a href={launch.links.wikipedia} target="_blank" rel="noreferrer" style={{ color: '#ffc800' }}>
            Wikipedia
          </a>
        </p>
      )}
    </div>
  );
}

export default LaunchDetails;
