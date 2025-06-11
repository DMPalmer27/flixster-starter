import { useRef } from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'
import './MovieModal.css'

const MovieModal = ({data, setModalMovie, videos}) => {
    const modalRef = useRef(null);

    const handleModalClick = (e) => {
        if (e.target === modalRef.current){ //click outside the modal
            setModalMovie('');
        }
    }

    const getTrailer = () => {
        for (let video of videos.results){
            if (video.type === 'Trailer'){
                return video.key;
            }
        }
        return videos.results[0].key;
    }

    return (
        <div className='modal-overlay' ref={modalRef} onClick={handleModalClick}>
            <div className='modal'>
                <h1>Movie: {data.original_title}</h1>
                <div className='movie-mvp-info'>
                    <img className='movie-poster' src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`} alt={`Movie poster for ${data.original_title}`}/>
                    <div className='text-info'>
                        <h3>Release Date: {data.release_date}</h3>
                        <h3>Runtime: {data.runtime} minutes</h3>
                        <h3>Overview: <br/>{data.overview}</h3>
                        <div className='genres'>
                            <h3>Genres</h3>
                            {data.genres ? 
                                <ul>
                                {data.genres?.map((genre)=>{
                                    return (
                                        <li key={genre.id}>{genre.name}</li>
                                    )
                                })}
                            </ul> : 
                            <h3>Genres Loading...</h3>}
                        </div>
                    </div>
                </div>
                <div className='trailer'>
                    {videos.results ? 
                        <YouTube videoId={getTrailer()}
                            opts={{width: "300", height: "200"}}/>
                        : <h3>Video Loading...</h3>}
                </div>
            </div>
        </div>
    )
}

MovieModal.propTypes = {
    setModalMovie: PropTypes.func.isRequired,
}

export default MovieModal