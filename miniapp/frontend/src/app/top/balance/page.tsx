'use client';
import "./top_balance_style.css";
import Link from "next/link";
import Player from "@/components/player/player"
import BackBtn from "@/components/back-btn/back-btn";
import React, { useState, useEffect } from 'react';

export default function TopBalance() {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // При заходе в приложение посылаем запрос для получения топа игроков по балансу
  useEffect(() => {
    const getPlayers = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:9000/getTopBalance`);
        const data = await response.json();
        setPlayers(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    getPlayers();
  }, []);

  return (
    <div className="main">
      <BackBtn />
      <div className="header-menu">
        <div className="data-menu">
          <a className="data-items" href='./day'>День</a>
          <a className="data-items" href='./month'>Месяц</a>
          <a className="data-items" href='./balance' id='top-balance'>Баланс</a>
        </div>
        <div className='cup-message'>
          <svg className="svg-icons" width="50.000000" height="50.000000" viewBox="0 0 36 36" fill="none">
            <defs>
              <clipPath id="clip15_171">
                <rect id="solar:cup-bold" rx="0.500000" width="50.000000" height="50.000000" transform="translate(0.500000 0.500000)" fill="white" fillOpacity="0" />
              </clipPath>
            </defs>
            <rect id="solar:cup-bold" rx="0.500000" width="50.000000" height="50.000000" transform="translate(0.500000 0.500000)" fill="#FFFFFF" fillOpacity="0" />
            <g clipPath="url(#clip15_171)">
              <path id="Vector" d="M33 12.24L33 12.35C33 13.64 33 14.28 32.68 14.81C32.37 15.34 31.81 15.65 30.68 16.28L29.49 16.94C30.31 14.17 30.58 11.19 30.68 8.64L30.7 8.31L30.7 8.23C31.68 8.57 32.23 8.83 32.57 9.3C33 9.89 33 10.67 33 12.24ZM3 12.24L3 12.35C3 13.64 3 14.28 3.31 14.81C3.62 15.34 4.18 15.65 5.31 16.28L6.5 16.94C5.68 14.17 5.41 11.19 5.31 8.64L5.29 8.31L5.29 8.23C4.31 8.57 3.76 8.83 3.42 9.3C3 9.89 3 10.68 3 12.24Z" fill="#466A87" fillOpacity="1.000000" fillRule="nonzero" />
              <path id="Vector" d="M24.56 3.52C22.39 3.16 20.19 2.99 18 3C15.32 3 13.12 3.23 11.43 3.52C9.72 3.8 8.87 3.95 8.15 4.83C7.44 5.71 7.48 6.65 7.55 8.55C7.81 15.08 9.22 23.22 16.87 23.94L16.87 29.25L14.73 29.25C14.38 29.25 14.04 29.37 13.77 29.59C13.51 29.81 13.32 30.11 13.25 30.45L12.97 31.87L9 31.87C8.7 31.87 8.41 31.99 8.2 32.2C7.99 32.41 7.87 32.7 7.87 33C7.87 33.29 7.99 33.58 8.2 33.79C8.41 34 8.7 34.12 9 34.12L27 34.12C27.29 34.12 27.58 34 27.79 33.79C28 33.58 28.12 33.29 28.12 33C28.12 32.7 28 32.41 27.79 32.2C27.58 31.99 27.29 31.87 27 31.87L23.02 31.87L22.74 30.45C22.67 30.11 22.48 29.81 22.22 29.59C21.95 29.37 21.61 29.25 21.26 29.25L19.12 29.25L19.12 23.94C26.77 23.22 28.18 15.08 28.44 8.55C28.51 6.65 28.55 5.7 27.84 4.83C27.12 3.95 26.27 3.8 24.56 3.52Z" fill="#466A87" fillOpacity="1.000000" fillRule="evenodd" />
            </g>
          </svg>
          <p className='best-growth'>Best growth</p>
        </div>
      </div>

      {/* С помощью цикла добавляем топ игроков  */}
      {isLoading ? (
        <p className="load-friends">Loading</p>
      ) : (
        <div className="players-container">
          {players.map((player, index) => (
            <Player
              key={player.user_id}
              number_of_player={index + 1}
              player_name={player.username}
              player_clicks={player.wallet}
            />
          ))}
        </div>
      )}
    </div>
  )
}

