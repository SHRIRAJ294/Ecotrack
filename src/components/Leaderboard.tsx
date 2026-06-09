import type { UserStats, LeaderboardUser } from '../types';
import { Trophy, Medal, Award } from 'lucide-react';
import './Leaderboard.css';

interface LeaderboardProps {
  userStats: UserStats;
}

const MOCK_FRIENDS: Omit<LeaderboardUser, 'rank'>[] = [
  { id: '1', name: 'Alex Johnson', co2Saved: 124.5 },
  { id: '2', name: 'Sarah Miller', co2Saved: 98.2 },
  { id: '3', name: 'David Chen', co2Saved: 156.8 },
  { id: '4', name: 'Emma Wilson', co2Saved: 45.3 },
];

export const Leaderboard = ({ userStats }: LeaderboardProps) => {
  // Combine user with friends and sort to determine rank
  const allUsers: Omit<LeaderboardUser, 'rank'>[] = [
    ...MOCK_FRIENDS,
    { id: 'me', name: 'You', co2Saved: userStats.totalCo2Saved }
  ];

  const rankedUsers = allUsers
    .sort((a, b) => b.co2Saved - a.co2Saved)
    .map((user, index) => ({
      ...user,
      rank: index + 1
    }));

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="text-gold" size={24} />;
      case 2: return <Medal className="text-silver" size={24} />;
      case 3: return <Award className="text-bronze" size={24} />;
      default: return <span className="rank-number">{rank}</span>;
    }
  };

  return (
    <div className="leaderboard-container animate-fade-in">
      <div className="glass-panel p-lg">
        <div className="leaderboard-header mb-lg">
          <h3 className="mb-sm">Eco Champions Leaderboard</h3>
          <p className="text-secondary">See how you stack up against your friends and coworkers in saving CO₂.</p>
        </div>

        <div className="leaderboard-list">
          {rankedUsers.map(user => (
            <div 
              key={user.id} 
              className={`leaderboard-item ${user.id === 'me' ? 'current-user highlight-border' : ''}`}
            >
              <div className="rank-badge">
                {getRankIcon(user.rank)}
              </div>
              <div className="user-info">
                <div className="avatar">
                  {user.name.charAt(0)}
                </div>
                <p className="user-name">{user.name}</p>
              </div>
              <div className="user-score">
                <span className="score-value">{user.co2Saved.toFixed(1)}</span>
                <span className="score-unit">kg saved</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
