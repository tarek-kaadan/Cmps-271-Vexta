import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/header/Header';
import Footer from '../../components/Footer/Footer';
import SearchBar from '../../components/seatchBar';
import GameList from '../../components/gamesList';
import PaginationControls from '../../components/PaginationControls';
import Seperator from '../../components/seperator';
import { API_BASE_URL } from "../../config";

type Game = {
  id: string;
  title: string;
  description: string;
  overlayImage: string;
  averageRating: number;
};

const AllGames: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchGames();
  }, [search, page]);

  const fetchGames = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/games/AllGames', {
        params: { search, page, limit: 10 },
      });
      setGames(res.data.games);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Error fetching games:', err);
    }
  };

  return (
    <div>
      <Seperator text={'search'} />
      <div style={{ padding: '20px' }}>
        <SearchBar search={search} onChange={setSearch} />
        <GameList games={games} />
        <PaginationControls page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
};

export default AllGames;
