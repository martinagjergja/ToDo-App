import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import NotesList from './NotesList'


function App() {

  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');
  const [track, setTrack] = useState(false)
 
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    setNotes(data);
  }, []);

  useEffect(() => {
    if (notes.length > 0 || track) localStorage.setItem("data", JSON.stringify(notes));
  }, [notes,track]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotes([...notes, {id: uuidv4(), text: note, isChecked: false}]);
    setNote('');
    document.getElementById('inputText').value = '';
  }
  const updateNotes = (id,isChecked) => {
    let updatedNote = notes.map((note) => note.id === id ? { ...note, isChecked: !isChecked } : note);
    setNotes(updatedNote)
  }
  const alldone = () => {
    let updatedNotes = [];
    notes.forEach((note) => {
       updatedNotes.push({...note, isChecked:true})
    })
    setNotes(updatedNotes)
  }
  const deleteNote = (id) => {
    let index = notes.findIndex((item) => item.id === id);
    notes.splice(index,1);
    if (notes.length === 0) setTrack(true);
    setNotes([...notes]);
  }
  return (
  <div className="App">    
    <header className='header'>
      <h1>To Do</h1>
    </header> 
    <form onSubmit={handleSubmit}> 
      <input id='inputText' className='input-field'  placeholder='add todo' onChange={(e) => {setNote(e.target.value)}}/>
      <button className='btn1'>Add ToDo</button>
    </form>
    <button className='btn2' onClick={alldone}>mark all done</button>
    <ul className='todo-list'>
            <NotesList notes={notes} updateNotes={updateNotes} deleteNote={deleteNote}/>
    </ul>
  </div>
  );
}

export default App;
