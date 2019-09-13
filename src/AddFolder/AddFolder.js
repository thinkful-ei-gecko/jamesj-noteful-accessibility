import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import './AddFolder.css'

export default class AddFolder extends Component {
  static contextType = ApiContext;

  addFolder = (name) => {
    fetch(`http://localhost:9090/folders/`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({name})
      }
    )
    .then(resp => resp.json())
    .then(data => this.context.addFolder(data))
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
      <form className="add-folder-form" onSubmit={e => this.handleSubmit(e)}>
        <label htmlFor="newFolder">
          New Folder
        {this.context.newFolder.touched && (
          <p>{this.validateFolderName()}</p>
          )}  
        </label>
        <input
        type="text"
        name="newFolder"
        id="newFolder"
        onChange={(e) => this.updateFolderName(e)}/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}