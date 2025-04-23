import React from 'react';
import Card from '../../components/filterSection/Card/Card';

interface Props {
  games: {
    _id: string;
    title: string;
    description: string;
    overlayImage: string;
    averageRating: number;
  }[];
}

const GameList: React.FC<Props> = ({ games }) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
    }}
  >
    {games.map((game) => (
      <Card
        _id={game._id}
        key={game.title}
        title={game.title}
        description={game.description}
        image={game.overlayImage}
        rating={game.averageRating}
      />
    ))}
  </div>
);

export default GameList;
