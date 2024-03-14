import {
  ContentBlock,
  ContentState,
  DraftHandleValue,
  EditorState,
} from 'draft-js';

export const BlockType = {
  UNSTYLED: 'unstyled',
  H1: 'header-one',
  H2: 'header-two',
  H3: 'header-three',
  H4: 'header-four',
  CODE: 'code-block',
};

export const mapping: Record<string, string> = {
  '# ': BlockType.H1,
  '* ': BlockType.H2,
  '** ': BlockType.H3,
  '*** ': BlockType.H4,
  '``` ': BlockType.CODE,
};

export const updateBlockType = (
  editorState: EditorState,
  newType = BlockType.UNSTYLED,
  overrides = {}
) => {
  const currentContent = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const key = selectionState.getStartKey();
  const blockMap = currentContent.getBlockMap();
  const block = blockMap.get(key);
  const newBlock = block.mergeDeep(overrides, {
    type: newType,
    data: {},
  }) as ContentBlock;
  const newContentState = currentContent.merge({
    blockMap: blockMap.set(key, newBlock),
    selectionAfter: selectionState.merge({
      anchorOffset: 0,
      focusOffset: 0,
    }),
  }) as ContentState;
  return EditorState.push(editorState, newContentState, 'change-block-type');
};

const BeforeInput = (
  editorState: EditorState,
  inputString: string,
  onChange: (
    newEditorState: EditorState,
    callback?: (() => void) | null
  ) => void
): DraftHandleValue => {
  const currentContent = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
  const currentBlockType = currentBlock.getType();
  const currentBlockLength = currentBlock.getLength();
  if (selection.getAnchorOffset() > 3 || currentBlockLength > 3) {
    return 'not-handled';
  }
  if (inputString !== ' ') {
    return 'not-handled';
  }
  let prefix = currentBlock.getText()[0];
  if (currentBlock.getText().length > 1 && currentBlock.getText()[1] !== ' ') {
    prefix += currentBlock.getText()[1];
  }
  if (currentBlock.getText().length > 2 && currentBlock.getText()[2] !== ' ') {
    prefix += currentBlock.getText()[2];
  }
  const currentBlockNewType = mapping[prefix + inputString];
  if (!currentBlockNewType) {
    return 'not-handled';
  }
  if (currentBlockType === currentBlockNewType) {
    return 'not-handled';
  }
  onChange(
    updateBlockType(editorState, currentBlockNewType, {
      text: '',
    })
  );
  return 'handled';
};
export default BeforeInput;
