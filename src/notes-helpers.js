
export const findFolder = (folders=[], folder_id) =>
  folders.find(folder => folder.id === folder_id)

export const findNote = (notes=[], note_id) =>
  notes.find(note => note.id === note_id)

export const getNotesForFolder = (notes=[], folder_id) => (
  (!folder_id)
    ? notes
    : notes.filter(note => note.folder_id === folder_id)
)

export const countNotesForFolder = (notes=[], folder_id) =>
  notes.filter(note => note.folder_id === folder_id).length
