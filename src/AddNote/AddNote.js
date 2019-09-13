import React from 'react'
import ApiContext from '../ApiContext'
import './AddNote.css'

export default class AddNote extends React.Component {
  static contextType = ApiContext
  addNewNote = note => {
    console.log(note)
    fetch('http://localhost:9090/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
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

  handleFormSubmit = e => {
    e.preventDefault(e)
    const newNote = {
      name: e.target.name.value,
      content: e.target.desc.value,
      folderId: e.target.folders.value,
      modified: new Date(),
    }
    this.addNewNote(newNote)
  }

  validateName = () => {
    if (this.context.newNote.name.value.length === 0) {
      return 'Name is required'
    }
  }

  validateDescription = () => {
    if (this.context.newNote.content.value.length === 0) {
      return 'Description is required'
    }
  }

  render() {
    return (
      <form className="add-note-form" onSubmit={e => this.handleFormSubmit(e)}>
        <label htmlFor="name">
          Name
          {this.context.newNote.name.touched && <p>{this.validateName()}</p>}
        </label>
        <input
          type="text"
          name="name"
          onChange={e =>
            this.context.updateNewNoteData(e.target.name, e.target.value)
          }
        />
        <label htmlFor="content">
          Description
          {this.context.newNote.content.touched && <p>{this.validateDescription()}</p>}
        </label>
        <input
          type="text"
          name="content"
          onChange={e =>
            this.context.updateNewNoteData(e.target.name, e.target.value)
          }
        />
        <label htmlFor="folders">Select a Folder</label>
        <select name="folders">{this.parseFolders()}</select>
        <button type="submit">Submit</button>
      </form>
    )
  }
}
