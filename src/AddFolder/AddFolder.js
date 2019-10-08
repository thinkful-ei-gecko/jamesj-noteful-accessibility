import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import './AddFolder.css';
import PropTypes from 'prop-types';
import config from '../config';

export default class AddFolder extends Component {
  static contextType = ApiContext;

  addFolder = (name) => {
    let folderID;
    fetch(`${config.API_ENDPOINT}/api/folder`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({name})
      }
    )
    .then(resp => {
      folderID = parseInt(resp.headers.get('Location').replace(/[^0-9]/g,''))
      return resp
    })
    .then(resp => resp.json())
    .then(data => this.context.addFolder({id: folderID, ...data}))
  }

  handleSubmit(event) {
    event.preventDefault();
    const newFolder = event.target.newFolder.value;
    this.addFolder(newFolder);
    this.props.history.goBack();
  }

  updateFolderName(e) {
    const newName = e.target.value;
      this.context.updateNewFolderName(newName);
  }

  validateFolderName() {
    if (this.context.newFolder.name.trim() === 0) {
      return 'Must be more than 0 characters.'
    } else if ( this.context.newFolder.name.trim().length <= 3 ) {
      return 'Must be more than 3 characters.'
    }
  }

  render() {
    return(
      <>
        <header>
          <h2 className='add-folder-header'>Add A New Folder</h2>
        </header>
        <form className="add-folder-form" onSubmit={e => this.handleSubmit(e)}>
        <label htmlFor="newFolder">
          Name:
        {this.context.newFolder.touched && (
          <p>{this.validateFolderName()}</p>
          )}  
        </label>
        <input
        type="text"
        name="newFolder"
        id="newFolder"
        aria-required="true"
        aria-label="Name"
        onChange={(e) => this.updateFolderName(e)}/>
        <button type="submit">Submit</button>
      </form>
      </>
    )
  }
}

AddFolder.propTypes = {
  history: PropTypes.object
}