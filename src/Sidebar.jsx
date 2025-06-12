import './Sidebar.css'

const Sidebar = ({shownMovies, setShownMovies}) => {

    return (
        <div className='sidebar'>
            <ul>
                <li className={shownMovies==='home' ? 'active' : 'inactive'} 
                    id='home'
                    onClick={()=>setShownMovies('home')}>Home</li>
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
