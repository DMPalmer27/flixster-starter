import PropTypes from 'prop-types'
import './MovieCard.css'


const MovieCard = ({title, poster, voteAvg}) => {
    const posterURL = `https://image.tmdb.org/t/p/w300${poster}`; //try w500 too
    return (
        <div className='movie-card'>
            <img className='movie-image' src={poster ? posterURL : '/public/movie.png'} alt={title + ' movie poster'}></img>
            <h3>{title}</h3>
            <p>{voteAvg}</p>
        </div>
    )
}

MovieCard.propTypes = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string,
    voteAvg: PropTypes.number.isRequired,
}

export default MovieCard