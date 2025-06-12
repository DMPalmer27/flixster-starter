import { useRef } from 'react'
import PropTypes from 'prop-types'
import './MovieCard.css'


const MovieCard = ({title, poster, voteAvg, handlePosterClick, id, favorites, setFavorites, watched, setWatched}) => {
    const favoritesRef = useRef(null);
    const watchedRef = useRef(null);
    const posterURL = `https://image.tmdb.org/t/p/w300${poster}`;

    const handleFavoriteClick = () => {
        if (!favorites[id]){
            setFavorites((favorites)=>{
                return {...favorites, [id]: true};
            });
        }
        else{
            setFavorites((favorites)=>{
                return {...favorites, [id]: false};
            });
        }

    }
    const handleWatchedClick = () => {
        if (!watched[id]){
            setWatched((watched)=>{
                return {...watched, [id]: true};
            });
        }
        else {
            setWatched((watched)=>{
                return {...watched, [id]: false};
            });
        }
    }

    const handleCardClick = (e) => {
        if (e.target !== favoritesRef.current && e.target !== watchedRef.current){
            handlePosterClick(id);
        }
    }

    return (
        <div className='movie-card' onClick={handleCardClick}>
            <img className='movie-image' src={poster ? posterURL : '/public/movie.png'} alt={title + ' movie poster'}></img>
            <h3>{title}</h3>
            <p>{voteAvg}</p>
            <div className='favorites-watched'>
                <button className='favorites-btn' onClick={handleFavoriteClick} ref={favoritesRef}>{favorites[id] ? '❤️' : '🩶'}</button>
                <button className='watched-btn' onClick={handleWatchedClick} ref={watchedRef}>{watched[id] ? '😃' : '😔'}</button>
            </div>
        </div>
    )
}

MovieCard.propTypes = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string,
    voteAvg: PropTypes.number.isRequired,
    handlePosterClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
}

export default MovieCard