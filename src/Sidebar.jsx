import './Sidebar.css'

const Sidebar = ({shownMovies, setShownMovies}) => {

    return (
        <div className='sidebar'>
            <ul>
                <li className={shownMovies==='now-playing' ? 'active' : 'inactive'} 
                    id='now-playing'
                    onClick={()=>setShownMovies('now-playing')}>Now-Playing</li>
                <li className={shownMovies==='favorites' ? 'active' : 'inactive'} 
                    id='favorites'
                    onClick={()=>setShownMovies('favorites')}>Favorites</li>
                <li className={shownMovies==='watched' ? 'active' : 'inactive'} 
                    id='watched'
                    onClick={()=>setShownMovies('watched')}>Watched</li>
            </ul>
        </div>
    );
}


export default Sidebar