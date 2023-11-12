import NotesList from "./components/NotesList";
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'
import Search from "./components/Search";
import Header from "./components/Header";
import '@solana/wallet-adapter-react-ui/styles.css'
import { WalletConnectProvider } from "./components/WalletConnectProvider";

const App = ( { Component, pageProps } ) => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('react-notes-app-data');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes))
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()

    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes)
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note)=>note.id !== id)
    setNotes(newNotes);
  }

  return (
        <div className="container">
          <Header/>
          <WalletConnectProvider>
            <Component {...pageProps}/>
          </WalletConnectProvider>
            <Search handleSearchNote={setSearchText}/>
            <NotesList 
              notes={notes.filter((note)=> note.text.toLowerCase().includes(searchText))} 
              handleAddNote={addNote}
              handleDeleteNote={deleteNote}
          />
        </div>
  )
}

export default App;