import './App.css';
import { useState, useEffect } from 'react';
import { Auth } from './components/auth';
import { db, auth, storage } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, list } from 'firebase/storage';
import { upload } from '@testing-library/user-event/dist/upload';

function App() {
  const [movieList, setMovieList] = useState([]);

  //New Movie State
  const [ newMovieTitle, setNewMovieTitle ] = useState("")
  const [ newReleaseDate, setNewReleaseDate] = useState(0)
  const [isNewMovieOscar, setIsNewMovieOscar ] = useState(false)

  //Updated Title State
  const [UpdatedTitle, setUpdatedTitle] = useState('')

  //Image Upload State
  const [ uploadImage, setUploadImage ] = useState(null)

  //Rendering Image
  const [imageUrls, setImageUrls] = useState([]);


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

  const fetchImageUrls = async () => {
    const filesFolderRef = ref(storage, 'projectFiles');
    const filesList = await list(filesFolderRef);
  
    const urls = await Promise.all(filesList.items.map(async (item) => {
      const downloadURL = await getDownloadURL(item);
      return downloadURL;
    }));
  
    setImageUrls(urls);
  };

  useEffect(() => {
    getMovieList()
    fetchImageUrls()
  }, [])

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid
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
    try {
      const movieDoc = doc(db, "movies", id)
      await deleteDoc(movieDoc)
      // getMovieList()
    } catch (err) {
      console.error(err)
    }
  }

  const updateHandler = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id)
      await updateDoc(movieDoc, {title: UpdatedTitle})
      setUpdatedTitle('')
    } catch (error) {
      console.error(error)
    }
  }

  const uploadFile = async () => {
    if(!uploadImage) return;
    const filesFolderRef = ref(storage, `projectFiles/${uploadImage.name}`)
    try {
      await uploadBytes(filesFolderRef, uploadImage)
    } catch (err) {
      console.error(err)
    }
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
            <input type='text' placeholder='new title...' onChange={(e) => setUpdatedTitle(e.target.value)} />
            <button onClick={() => updateHandler(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>

      <div>
        <input type='file' onChange={(e) => setUploadImage(e.target.files[0])} />
        <button onClick={uploadFile}>Upload File</button>
      </div>
      {/* <div>
        {imageUrl && (
          <div>
            <h2>Uploaded Image:</h2>
            <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
          </div>
        )}
      </div> */}

      <div>
      {imageUrls.length > 0 && (
        <div>
          <h2>All Images in projectFiles:</h2>
          {imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Image-${index}`} style={{ maxWidth: '100%', margin: '5px' }} />
          ))}
        </div>
      )}

      </div>
    </div>
  );
}

export default App;
