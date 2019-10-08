import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import './NotePageMain.css'
import PropTypes from 'prop-types'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeleteNote = note_id => {
    this.props.history.push(`/`)
  }

  render() {
    const { notes=[] } = this.context
    const { note_id } = this.props.match.params
    const id = parseInt(note_id);
    const note = findNote(notes, id) || { description: '' }
    
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          date_added={note.date_added}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {note.description.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}

NotePageMain.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}