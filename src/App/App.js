import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import ApiContext from '../ApiContext'
import config from '../config'
import './App.css'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import NotefulErrors from '../NotefulErrors'

class App extends Component {
  state = {
    notes: [],
    folders: [],
    newFolder: {
      hasError: false,
      touched: false,
      name: '',
      id: null
    },
    newNote: {
      name: {
        touched: false,
        value: '',
      },
      folder_id: {
        touched: false,
        value: '',
      },
      description: {
        touched: false,
        value: '',
      },
      id: null
    },
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/note`),
      fetch(`${config.API_ENDPOINT}/api/folder`),
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([notesRes.json(), foldersRes.json()])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  updateNewFolderName = name => {
    this.setState({
      newFolder: {
        hasError: false,
        touched: true,
        name: name,
      },
    })
  }

  updateNewNoteData = (input, value) => {
    this.setState({
      newNote: {
          ...this.state.newNote,
        [input]: {
          touched: true,
          value: value,
        },
      },
    })
  }

  handleAddFolder = newFolder => {
    this.setState({
      folders: [...this.state.folders, newFolder],
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [...this.state.notes, note],
    })
  }
  handleDeleteNote = note_id => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== note_id),
    })
  }

  renderNavRoutes() {
    return (
      <>
        <Route path="/note/:note_id" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
        {['/', '/folder/:folder_id'].map(path => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        <Route path="/note/:note_id" component={NotePageMain} />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
        {['/', '/folder/:folder_id'].map(path => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
      </>
    )
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      newFolder: this.state.newFolder,
      updateNewFolderName: this.updateNewFolderName,
      newNote: this.state.newNote,
      handleAddNote: this.handleAddNote,
      updateNewNoteData: this.updateNewNoteData
    }
    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <NotefulErrors>
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{' '}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
          </NotefulErrors>
        </div>
      </ApiContext.Provider>
    )
  }
}

export default App
