import React from 'react'
import ApiContext from '../ApiContext'
import './AddNote.css'
import config from '../config'

export default class AddNote extends React.Component {
  static contextType = ApiContext
  addNewNote = note => {
    let noteID
    fetch(`${config.API_ENDPOINT}/api/note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
      .then(res => {
        noteID = parseInt(res.headers.get('Location').replace(/[^0-9]/g, ''))
        return res.json()
      })
      .then(resJSON => this.context.handleAddNote({ id: noteID, ...resJSON }))
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
      description: e.target.description.value,
      folder_id: e.target.folders.value,
      modified: new Date(),
    }
    this.addNewNote(newNote)
    this.props.history.push('/')
  }

  validateName = () => {
    if (this.context.newNote.name.value.length === 0) {
      return 'Name is required'
    }
  }

  validateDescription = () => {
    if (this.context.newNote.description.value.length === 0) {
      return 'Description is required'
    }
  }

  render() {
    return (
      <>
        <header>
          <h2 className="add-note-header">Add A New Note</h2>
        </header>
        <form
          className="add-note-form"
          onSubmit={e => this.handleFormSubmit(e)}
        >
          <label htmlFor="name">
            Name
            {this.context.newNote.name.touched && <p>{this.validateName()}</p>}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            aria-required="true"
            aria-label="Name"
            onChange={e =>
              this.context.updateNewNoteData(e.target.name, e.target.value)
            }
          />
          <label htmlFor="description">
            Description
            {this.context.newNote.description.touched && (
              <p>{this.validateDescription()}</p>
            )}
          </label>
          <input
            type="text"
            name="description"
            id="description"
            aria-required="true"
            aria-label="Description"
            onChange={e =>
              this.context.updateNewNoteData(e.target.name, e.target.value)
            }
          />
          <label htmlFor="folders">Select a Folder</label>
          <select
            name="folders"
            id="folders"
            aria-required="true"
            aria-label="Select a folder"
          >
            {this.parseFolders()}
          </select>
          <button
            type="submit"
            disabled={
              this.context.newNote.name.value.length === 0 ||
              this.context.newNote.description.value.length === 0
            }
          >
            Submit
          </button>
        </form>
      </>
    )
  }
}
