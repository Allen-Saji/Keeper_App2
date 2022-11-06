import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

let noteStorage;

if(localStorage.getItem('notes')===null){
  noteStorage = []
}else{
  noteStorage = JSON.parse(localStorage.getItem('notes'));
}


function App() {
  const [notes, setNotes] = useState([noteStorage]);


  function addNote(newNote) {
    
    setNotes(prevNotes => {
      noteStorage.push(newNote);
      localStorage.setItem('notes' , JSON.stringify(noteStorage));
      return [...prevNotes, newNote];
    });
     
  }

  function deleteNote(id) {
    

      noteStorage.forEach((note,index)=>{
        if(index === id){
            noteStorage.splice(index,1);
        }

       
    });

    localStorage.setItem('notes' , JSON.stringify(noteStorage));
      
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
   
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {noteStorage.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
