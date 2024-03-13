import { EditorState, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useState } from 'react';
import DraftEditor from './Components/DraftEditor';
import Header from './Components/Header';

function App() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const saveToLocalStorage = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    localStorage.setItem('editorState', JSON.stringify(rawContentState));
  };
  return (
    <main>
      <Header saveData={saveToLocalStorage} />
      <DraftEditor editorState={editorState} setEditorState={setEditorState} />
    </main>
  );
}

export default App;
