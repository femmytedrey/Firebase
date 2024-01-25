import './App.css';
import { useState, useEffect } from 'react';
import { Auth } from './components/auth';
import { db } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

function App() {
  const [movieList, setMovieList] = useState([]);

  //New Movie State
  const [ newMovieTitle, setNewMovieTitle ] = useState("")
  const [ newReleaseDate, setNewReleaseDate] = useState(0)
  const [isNewMovieOscar, setIsNewMovieOscar ] = useState(false)

  const moviesCollectionRef = collection(db, "movies")

  const getMovieList = () => {
    // READ THE DATA
    // SET THE MOVIE LAST
    try{
      // const data = await getDocs(moviesCollectionRef)
      // const filterData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      // // console.log(filterData)
      // setMovieList(filterData)
      const unsubscribe = onSnapshot(moviesCollectionRef, (snapshot) => {
        const UpdateMovieList = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
        setMovieList(UpdateMovieList);
      });
      
      return () => unsubscribe();
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getMovieList()
  }, [])

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar
      })
      setNewMovieTitle('')
      setNewReleaseDate(0)
      setIsNewMovieOscar(false)
      getMovieList()
    } catch (err) {
      console.error(err)
    }
  }

  const onDeleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc)
    // getMovieList()
  }

  return (
    <div className="App">
      <Auth />
      <div>
        <input type='text' placeholder='movie name...' value={newMovieTitle} onChange={(e) => setNewMovieTitle(e.target.value)}/>
        <input type='number' placeholder='release date...' value={newReleaseDate} onChange={(e) => setNewReleaseDate(e.target.value)}/>
        <input type='checkbox' checked={isNewMovieOscar} onChange={(e) => setIsNewMovieOscar(e.target.checked)} />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie, index) => (
          <div key={index}>
            <h1 style={{ color: movie.receivedAnOscar ? 'green' : 'red' }}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => onDeleteMovie(movie.id)}>Delete Movie</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
