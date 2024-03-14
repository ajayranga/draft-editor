import {
  DraftHandleValue,
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useEffect } from 'react';
import BeforeInput from './BeforeInput';
import { defaultState } from './PlaceHolderText';

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

  const handleChange = (
    newEditorState: EditorState,
    callback: ((_: EditorState) => void) | null = null
  ) => {
    setEditorState(newEditorState);
    if (callback) {
      callback(newEditorState);
    }
  };

  const handleBeforeInput = (
    chars: string,
    editorState: EditorState
  ): DraftHandleValue => {
    return BeforeInput(editorState, chars, handleChange);
  };

  useEffect(() => {
    const rawContentState = localStorage.getItem('editorState');
    if (rawContentState) {
      const contentState = convertFromRaw(JSON.parse(rawContentState));
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(defaultState))
      );
    }
  }, [setEditorState]);

  return (
    <section className='border-4 p-3 min-h-[80vh] border-white rounded-lg my-2 bgWithImg'>
      <Editor
        editorState={editorState}
        onChange={handleChange}
        handleKeyCommand={handleKeyBoardShortCuts}
        placeholder='Type some text'
        handleBeforeInput={handleBeforeInput}
      />
    </section>
  );
};

export default DraftEditor;
