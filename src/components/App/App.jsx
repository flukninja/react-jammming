//import App.css
import React, { useState, useEffect } from "react";
import "./App.css";

//import 3 components
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'

import Spotify from "../../utils/Spotify";

const App = () => {
  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlaylistName] = useState('playlistSample')
  const [playlistTracks, setPlaylistTracks] = useState([])

  useEffect(() => {
    Spotify.getAccessToken()
  })

  const addTrack = (track) => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } 
    setPlaylistTracks([...playlistTracks, track])
  }

  const removeTrack = (track) => {
    setPlaylistTracks(
      playlistTracks.filter(
        remainTrack => remainTrack.id !== track.id
      )
    )
  }

  const updatePlaylistName = (name) => { 
    setPlaylistName(name)
  }

  const savePlaylist = () => {
    let trackURIs = playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName('New playlist')
      setPlaylistTracks([])
    })
  }

  const search = (term) => {
    Spotify.search(term).then(searchResults => {
      setSearchResults(searchResults)
    })
  }

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onRemove={removeTrack} onNameChange={updatePlaylistName} onSave={savePlaylist} />
        </div>
      </div>
    </div>
  );
};

export default App;

