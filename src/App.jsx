import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './MovieList'
import ControlBar from './ControlBar'
import MovieModal from './MovieModal'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMetric, setSortMetric] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState('');
  const [modalMovie, setModalMovie] = useState('');
  const [modalData, setModalData] = useState('');
  const [modalVideos, setModalVideos] = useState('');
  const [isLoaded, setIsLoaded] = useState(true);

  //This function fetches the data for the movie cards
  const fetchData = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      let response;
      setIsLoaded(false);
      if (searchTerm) {
        response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&page=${page}&api_key=${apiKey}`)
      } else { //Now Playing
        response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?&page=${page}&api_key=${apiKey}`)
      }
      if (!response) {
        throw new Error('Failed to get movie data');
      }
      const dataJSON = await response.json();
      if (page === 1) {
        setData(dataJSON.results);
      } else {
        setData((data) => [...data, ...dataJSON.results])
        console.log(data);
      }
      setIsLoaded(true);
    }
    catch (error) {
      console.error(error);
    }
  }

  //This function fetches the detailed data for a movie modal
  const fetchDetailedData = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(`https://api.themoviedb.org/3/movie/${modalMovie}?language=en-US&api_key=${apiKey}`)
      if (!response) {
        throw new Error('Failed to get detailed data');
      }
      const responseJSON = await response.json();
      setModalData(responseJSON);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchVideoData = async () => {
    try{
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(`https://api.themoviedb.org/3/movie/${modalMovie}/videos?language=en-US&api_key=${apiKey}`)
      if (!response){
        throw new Error('Failed to get trailer');
      }
      const responseJSON = await response.json();
      setModalVideos(responseJSON);
    } catch (error) {
      console.error(error);
    }
  }

  //Whenever you search or want a new page fetch more data to show on the cards
  useEffect(() => {
    fetchData();
  }, [searchTerm, page])


  const handleSearchSubmit = (searchTerm) => {
    console.log('search submit');
    setSearchTerm(searchTerm);
    setPage(1);
  }

  useEffect(() => {
    if (modalMovie) { //only request data if there is a movie to request data for
      fetchDetailedData();
      fetchVideoData();
    }
  }, [modalMovie])

  return (
    <div className="App">
      <header>
        <h1>🎥 Flixter 🍿</h1>
      </header>
      <section className='banner'>
        <h3>Movie Searching Tool</h3>
      </section>
      <main>
        <ControlBar onSearchSubmit={handleSearchSubmit} onSortChange={setSortMetric} />
        <MovieList data={data} sortMetric={sortMetric} handlePosterClick={setModalMovie} />
        {isLoaded && <button className='load-btn' onClick={() => setPage((page) => page + 1)}>Load More</button>}
        {modalMovie && <MovieModal data={modalData} setModalMovie={setModalMovie} videos={modalVideos}/>}
      </main>
      <footer></footer>
    </div>
  )
}

export default App
