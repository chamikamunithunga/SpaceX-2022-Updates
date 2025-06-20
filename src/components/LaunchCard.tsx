import './LaunchCard.css';
import CountdownTimer from './CountdownTimer';
import { Link } from 'react-router-dom';

interface LaunchCardProps {
  id: string;
  name: string;
  date: string;
  patch: string;
  webcast?: string;
}

function LaunchCard({ id, name, date, patch, webcast }: LaunchCardProps) {
  return (
    <div className="launch-card">
      <Link to={`/launch/${id}`}>
        <img src={patch} alt={name} />
        <h2>{name}</h2>
      </Link>
      <p>{new Date(date).toLocaleString()}</p>
      <CountdownTimer targetDate={date} />
      {webcast && (
        <a href={webcast} target="_blank" rel="noreferrer">
          Watch Live
        </a>
      )}
    </div>
  );
}

export default LaunchCard;
