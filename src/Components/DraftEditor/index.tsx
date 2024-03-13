import { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const DraftEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  console.log({ editorState });
  return (
    <section className='border border-white rounded-lg my-2'>
      <Editor editorState={editorState} onChange={setEditorState} />;
    </section>
  );
};

export default DraftEditor;
