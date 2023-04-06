import React, {useContext} from 'react';
import noteContext from '../context/notes/noteContext';

export default function Noteitem(props) {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const {note, updateNote} = props;

  return (
    <div className='col-md-3'>
      <div className="card" >
        <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description} </p>
            <i className="bi bi-trash3 mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully", "success");}}></i>
            <i className="bi bi-pencil-square mx-2" onClick={()=>{updateNote(note)}}></i>
        </div>
       </div>
    </div>
  )
}
