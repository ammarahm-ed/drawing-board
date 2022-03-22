import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import useDrawingStore from '../store';
import history from '../drawing/history';
import utils from '../drawing/utils';

const Header = () => {
  /**
   * Reset the canvas & draw state
   */
  const reset = () => {
    useDrawingStore.getState().setCompletedPaths([]);
    useDrawingStore.getState().setStroke(utils.getPaint(2, 'black'));
    useDrawingStore.getState().setColor('black');
    useDrawingStore.getState().setStrokeWidth(2);
    history.clear();
  };

  const save = () => {
    let canvasInfo = useDrawingStore.getState().canvasInfo;
    let paths = useDrawingStore.getState().completedPaths;
    if (paths.length === 0) return;
    console.log('saving');
    if (canvasInfo?.width && canvasInfo?.height) {
      console.log(
        utils.makeSvgFromPaths(paths, {
          width: canvasInfo.width,
          height: canvasInfo.height,
        }),
      );
    }
  };

  const undo = () => {
    history.undo();
  };

  const redo = () => {
    history.redo();
  };
  return (
    <View
      style={{
        height: 50,
        width: '100%',
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={undo}
          style={[styles.button, {marginRight: 10}]}>
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={redo}
          activeOpacity={0.6}
          style={styles.button}>
          <Text style={styles.buttonText}>Redo</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={reset}
          activeOpacity={0.6}
          style={styles.button}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={save}
          style={[styles.button, {marginLeft: 10}]}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    backgroundColor: 'white',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    ...utils.getElevation(1),
  },
  buttonText: {
    color: 'black',
  },
});

export default Header;
