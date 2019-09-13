import React from 'react'
import ApiContext from '../ApiContext'
import './AddNote.css'

export default class AddNote extends React.Component {
  static contextType = ApiContext
  addNewNote = (note) => {
    console.log(note)
    fetch('http://localhost:9090/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    .then(res => {
      console.log(JSON.stringify(note))
     return res.json()
    })
    .then(resJSON => this.context.handleAddNote(resJSON))
  }
  parseFolders = () => {
    return this.context.folders.map(folder => (
      <option key={folder.id} name={folder.id} value={folder.id}>
        {folder.name}
      </option>
    ))
  }

  handleFormSubmit = (e) => {
    e.preventDefault(e)
    const newNote = {
      name: e.target.name.value,
      content: e.target.desc.value,
      folderId: e.target.folders.value,
      modified: new Date()
    }
    this.addNewNote(newNote)
  }

  render() {
    return (
      <form className="add-note-form" onSubmit={(e) => this.handleFormSubmit(e)}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name"/>
        <label htmlFor="desc">Description</label>
        <input type="text" name="desc" />
        <label htmlFor="folders">Select a Folder</label>
        <select name="folders">{this.parseFolders()}</select>
        <button type="submit">Submit</button>
      </form>
    )
  }
}
