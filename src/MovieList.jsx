import MovieCard from "./MovieCard"
import PropTypes from 'prop-types'
import './MovieList.css'

const MovieList = ({data, sortMetric, handlePosterClick, favorites, setFavorites, watched, setWatched, shownMovies}) => {
    if (!data){
        return (
            <h1>No available data</h1>
        )
    }
    let sortedData = [...data];
    if (sortMetric === 'title'){ //Sort by title alphabetically
        sortedData.sort((a,b)=>{
            return a.title.localeCompare(b.title);
        })
    }else if (sortMetric === 'release_date'){ //sort by release date
        sortedData.sort((a,b)=>{
            const aDate = new Date(a.release_date);
            const bDate = new Date(b.release_date);
            return bDate - aDate;
        })
    }
    else if (sortMetric === 'vote_average'){ //sort by vote average
        sortedData.sort((a,b)=>{
            return b.vote_average - a.vote_average;
        })
    }
    if (shownMovies === 'favorites'){
        sortedData = sortedData.filter((movie)=>favorites[movie.id])
    } else if (shownMovies === 'watched'){
        sortedData = sortedData.filter((movie)=>watched[movie.id])
    }
    return (
        <div className='movie-container'>
            {sortedData.map((movie)=>{
                return(
                    <MovieCard
                        title={movie.title}
                        poster={movie.poster_path}
                        voteAvg={movie.vote_average}
                        key={movie.id}
                        handlePosterClick={handlePosterClick}
                        id={movie.id}
                        favorites={favorites}
                        setFavorites={setFavorites}
                        watched={watched}
                        setWatched={setWatched}
                    />
                )
            })}
        </div>
    )
}


MovieList.propTypes = {
    //data: PropTypes.object.isRequired,
    //sortMetric: PropTypes.string.isRequired,
}

export default MovieList;