import axios from 'axios';
import { useState, useEffect } from 'react';
import chalk from 'chalk';
import Seperator from '../seperator';
import Card from './Card/Card';
import DropDownSelector from './dropdown/indec';
import { genres } from '../../data/consts/genres';

interface Game {
  id: number;
  title: string;
  description: string;
  category: string;
  overlayImage: string;
  OriginCountry: string;
  link: string;
  averageRating: number;
}

export default function GamesGenre() {
  const [games, setGame] = useState<Game[]>([]);
  const [selectedGenre, setSelectedGenres] = useState('Genre');
  const [selectedCountry, setSelectedCountry] = useState('Country');

  const countries = [
    'All',
    'Africa',
    'Iran',
    'Philippines',
    'India',
    'Iraq',
    'Switzerland',
    'China',
    'Brazil',
    'Afghanistan',
    'Latin America',
    'Sri Lanka',
    'South Korea',
    'Morocco',
    'Kazakhstan',
    'Malaysia',
    'Greece',
    'United Kingdom',
    'Uganda',
    'Egypt',
    'Thailand',
    'New Zealand',
    'USA',
    'Sweden',
    'Russia',
    'France',
  ];

  useEffect(() => {
    const endpoint = 'http://localhost:5001/api/games';

    axios
      .get(endpoint)
      .then((response) => {
        setGame(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(chalk.red("Couldn't fetch data:", error));
      });
  }, []);

  // const filteredGames =
  //   selectedCountry === 'Country'
  //     ? games
  //     : games.filter((game) => game.OriginCountry === selectedCountry);

  // const FilteredGames =
  //   selectedGenre === 'All' ? games : games.filter((game) => selectedGenre === game.category);

  const filteredGames = games.filter((game) => {
    const matchesGenre =
      selectedGenre === 'All' || selectedGenre === 'Genre' || game.category === selectedGenre;

    const matchesCountry =
      selectedCountry === 'All' ||
      selectedCountry === 'Country' ||
      game.OriginCountry === selectedCountry;

    return matchesGenre && matchesCountry;
  });

  return (
    <>
      <Seperator text={'Filter'} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          margin: '20px 0',
        }}
      >
        <DropDownSelector
          selectedItem={selectedGenre}
          list={genres}
          setSelectedItem={(item) => setSelectedGenres(item)}
          title={'Genre'}
        />

        <DropDownSelector
          selectedItem={selectedCountry}
          list={countries}
          setSelectedItem={(item) => setSelectedCountry(item)}
          title={'Region'}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: "center",
          gap: '25px',
          padding: '16px',
          width: '100%',
        }}
      >
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <Card
              key={game.id}
              title={game.title}
              description={game.description}
              image={game.overlayImage}
              rating={game.averageRating}
            />
          ))
        ) : (
          <p style={{ fontSize: '18px', textAlign: 'center', width: '100%' }}>
            No games found with these specific Criteria
          </p>
        )}
      </div>
    </>
  );
}
