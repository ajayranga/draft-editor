import { useCallback, useEffect } from 'react';

import { Editor, EditorState, RichUtils, convertFromRaw } from 'draft-js';

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

  const loadFromLocalStorage = useCallback(() => {
    const rawContentState = localStorage.getItem('editorState');
    if (rawContentState) {
      const contentState = convertFromRaw(JSON.parse(rawContentState));
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [setEditorState]);

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  return (
    <section className='border border-white rounded-lg my-2'>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyBoardShortCuts}
      />
      ;
    </section>
  );
};

export default DraftEditor;
