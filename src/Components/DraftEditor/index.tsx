import { Editor, EditorState, RichUtils, convertFromRaw } from 'draft-js';
import { useEffect } from 'react';

const DraftEditor = ({
  editorState,
  setEditorState,
}: {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}) => {
  const handleKeyBoardShortCuts = (
    command: string,
    editorState: EditorState
  ) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const handleChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  useEffect(() => {
    const rawContentState = localStorage.getItem('editorState');
    if (rawContentState) {
      const contentState = convertFromRaw(JSON.parse(rawContentState));
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [setEditorState]);

  return (
    <section className='border-4 p-3 min-h-[80vh] border-white rounded-lg my-2'>
      <Editor
        editorState={editorState}
        onChange={handleChange}
        handleKeyCommand={handleKeyBoardShortCuts}
        placeholder='Type some text'
      />
      ;
    </section>
  );
};

export default DraftEditor;
