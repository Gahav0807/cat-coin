'use client';
import './friend.css';

interface FriendProps {
  number_of_friend: number;
  friend_name: string;
}

export default function Friend({ number_of_friend, friend_name }: FriendProps) {
  return (
    <div className="friend">
      <p className="number_of_friend">{number_of_friend}.</p>
      <p className="friend-name">{friend_name}</p>
      <p className="reward">+50000</p>
    </div>
  );
}
