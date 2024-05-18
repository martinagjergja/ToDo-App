import React from "react";

const NotesList = ({notes, updateNotes, deleteNote}) => { 
    
    const handleChecked = (e) => {
        const note = notes.find((item) => item.id === e.target.id);
        updateNotes(note.id, note.isChecked);
    }
    const handleDelete = (e) => {
        const note = notes.find((item) => item.id === e.target.name);
        deleteNote(note.id)
    }
    let renderNotes = (arr) =>
        arr.map((item, i) => {  
            return (
                <li className="todo-note" key={i}>
                <input id={item.id} type='checkbox' checked={item.isChecked} onChange={handleChecked}></input>
                <p style={{textDecoration: item.isChecked ? 'line-through' : 'none'}}>{item.text}</p>
                <button className="btn3" name={item.id} onClick={handleDelete}>X</button>
                </li>
                )
            });
    return (        
        renderNotes(notes)         
    );
}
export default NotesList;