import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { getNotesForFolder } from '../notes-helpers'
import './NoteListMain.css'
import PropTypes from 'prop-types'

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {
    const { folder_id } = this.props.match.params
    const id = parseInt(folder_id)
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, id)
    return (
      <section className='NoteListMain'>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                date_added={note.date_added}
              />
            </li>
          )}
        </ul>
      </section>
    )
  }
}

NoteListMain.propTypes = {
  match: PropTypes.object
}