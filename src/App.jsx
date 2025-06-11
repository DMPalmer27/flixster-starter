import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './MovieList'
import ControlBar from './ControlBar'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMetric, setSortMetric] = useState('');
  const [page, setPage] = useState(1); //TODO: add load more button
  const [data, setData] = useState('');
  const [modalMovie, setModalMovie] = useState('');

  const fetchData = async () => {
    try{
      const apiKey = import.meta.env.VITE_API_KEY;
      let response;
      if (searchTerm){
        response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&page=${page}&api_key=${apiKey}`)
      } else{ //Now Playing
        response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?&page=${page}&api_key=${apiKey}`)
      }
      if (!response){
        throw new Error('Failed to get movie data');
      }
      const dataJSON = await response.json();
      if (page === 1){
        setData(dataJSON.results);
      } else{
        setData((data)=>[...data, ...dataJSON.results])
        console.log(data);
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    fetchData();
  }, [searchTerm, page])


  const handleSearchSubmit = (searchTerm) => {
    setSearchTerm(searchTerm);
    setPage(1);
  }


  return (
    <div className="App">
      <header></header>
      <main>
        <ControlBar onSearchSubmit={handleSearchSubmit} onSortChange={setSortMetric}/>
        <MovieList data={data} sortMetric={sortMetric}/>
        <button onClick={()=>setPage((page)=>page+1)}>Load More</button>
      </main>
      
      <footer></footer>
    </div>
  )
}

export default App
