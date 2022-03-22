import useDrawingStore, {CurrentPath} from '../store';

const history: {
  undo: CurrentPath[];
  redo: CurrentPath[];
} = {
  undo: [],
  redo: [],
};

function undo() {
  if (history.undo.length === 0) return;
  let lastPath = history.undo[history.undo.length - 1];
  history.redo.push(lastPath);
  history.undo.splice(history.undo.length - 1, 1);
  useDrawingStore.getState().setCompletedPaths([...history.undo]);
}

function redo() {
  if (history.redo.length === 0) return;
  let lastPath = history.redo[history.redo.length - 1];
  history.redo.splice(history.redo.length - 1, 1);
  history.undo.push(lastPath);
  useDrawingStore.getState().setCompletedPaths([...history.undo]);
}

function clear() {
  history.undo = [];
  history.redo = [];
}

function push(path: CurrentPath) {
  history.undo.push(path);
}

export default {
  history,
  undo,
  redo,
  push,
  clear,
};
