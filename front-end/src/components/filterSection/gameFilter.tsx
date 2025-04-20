import axios from 'axios';
import { useState, useEffect } from 'react';
import chalk from 'chalk';
import Seperator from '../seperator';
import Card from './Card/Card';
import DropDownSelector from './dropdown/indec';
import { genres } from '../../data/consts/genres';

interface Game {
  _id: string;
  id: number;
  title: string;
  description: string;
  category: string;
  overlayImage: string;
  OriginCountry: string;
  link: string;
  averageRating: number;
  ageGroup: string;
  numberOfPlayers: number;
  estimatedDuration: string;
}

export default function GamesGenre() {
  const [games, setGame] = useState<Game[]>([]);
  const [selectedGenre, setSelectedGenres] = useState('Genre');
  const [selectedCountry, setSelectedCountry] = useState('Country');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('Age Group');
  const [selectedPlayers, setSelectedPlayers] = useState('Players');
  const [selectedRating, setSelectedRating] = useState('Rating');
  const [selectedDuration, setSelectedDuration] = useState('Duration');


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


  const ageGroupOptions = [
    'All',
    'All Ages',
    '6+',
    '8+',
    '10+',
    '16+',
    'Teens',
  ];

  const playerOptions =[
    'All',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6+',
  ];

  const ratingOptions=[
    'All',
    '0-1',
    '1-2',
    '2-3',
    '3-4',
    '4-5',
  ];
  
  const durationOptions = [
    'All',
    '10+ mins',
    '20+ mins',
    '30+ mins',
    '45+ mins',
    '1+ hour',
    '2+ hours',
  ];

  const durationRanges: Record<string, [number, number]> = {
      '10+ mins': [10, 20],
      '20+ mins': [20, 30],
      '30+ mins': [30, 45],
      '45+ mins': [45, 60],
      '1+ hour' : [60, 120],
      '2+ hours': [120, Infinity],
    };
  


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


  function parseDuration(str: string): [number, number] {
    const s = str.toLowerCase().trim();
    if (s.includes('hour')) {
      const parts = s.split('-').map(p => p.replace(/hours?/, '').trim());
      if (parts.length === 2) {
        return [parseFloat(parts[0]) * 60, parseFloat(parts[1]) * 60];
      } else {
        const val = parseFloat(parts[0]);
        return [val * 60, val * 60];
      }
    } else {
      const parts = s.split('-').map(p => p.replace(/mins?/, '').trim());
      if (parts.length === 2) {
        return [parseFloat(parts[0]), parseFloat(parts[1])];
      } else {
        const val = parseFloat(parts[0]);
        return [val, val];
      }
    }
  }
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

    const matchesAgeGroup =
      selectedAgeGroup === 'All' || selectedAgeGroup === 'Age Group' || game.ageGroup === selectedAgeGroup;

    const matchesPlayers = (() => {
      if(selectedPlayers === 'All') return true;
      if (selectedPlayers === 'Players') return true;
      if (selectedPlayers === '6+') return game.numberOfPlayers >= 6;
      return game.numberOfPlayers === Number(selectedPlayers);
    })();


    const matchesRating = (() => {
      if(selectedRating === 'All') return true;
      if (selectedRating === 'Rating') return true;
      const [low, high] = selectedRating.split('-').map(Number);
      return game.averageRating >= low && game.averageRating <= high;
    })();

    const matchesDuration = (() => {
           if(selectedDuration === 'All') return true;
           if (selectedDuration === 'Duration') return true;
      
           
           const range = durationRanges[selectedDuration];
           if (!range) return true;  
           const [low, high] = range;
      
           
           const [gameLow] = parseDuration(game.estimatedDuration);
      
           
           return gameLow >= low && gameLow < high;
         })();

    return matchesGenre && matchesCountry && matchesAgeGroup && matchesPlayers && matchesRating && matchesDuration;
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
        
        <DropDownSelector
          selectedItem={selectedAgeGroup}
          list={ageGroupOptions}
          setSelectedItem={(item) => setSelectedAgeGroup(item)}
          title="Age Group"
        />
        
        <DropDownSelector
          selectedItem={selectedPlayers}
          list={playerOptions}
          setSelectedItem={(item) => setSelectedPlayers(item)}
          title="Players"
        />
        
        <DropDownSelector
          selectedItem={selectedRating}
          list={ratingOptions}
          setSelectedItem={(item) => setSelectedRating(item)}
          title="Rating"
        />

        <DropDownSelector
          selectedItem={selectedDuration}
          list={durationOptions}
          setSelectedItem={(item) => setSelectedDuration(item)}
          title="Duration"
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
              key={game._id}
              _id={game._id}
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
