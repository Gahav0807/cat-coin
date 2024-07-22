'use client';
import './player.css';

interface PlayerProps {
  number_of_player: number;
  player_name: string;
  player_clicks: number;
}

export default function Player({
  number_of_player,
  player_name,
  player_clicks,
}: PlayerProps) {
  return (
    <div className="player">
      <p className="number-of-player">{number_of_player}.</p>
      <div className="player-avatar">CR</div>
      <p className="player-name">{player_name}</p>
      <p className="clicks">{player_clicks}</p>
    </div>
  );
}
