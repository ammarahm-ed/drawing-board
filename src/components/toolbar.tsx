import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Color from '../components/color';
import Stroke from '../components/stroke';
import useDrawingStore from '../store';
import constants from '../drawing/constants';
import utils from '../drawing/utils';

const Toolbar = () => {
  const currentColor = useDrawingStore(state => state.color);
  const currentStrokeWidth = useDrawingStore(state => state.strokeWidth);
  const setStrokeWidth = useDrawingStore(state => state.setStrokeWidth);
  const setColor = useDrawingStore(state => state.setColor);
  const setStroke = useDrawingStore(state => state.setStroke);
  const [showStrokes, setShowStrokes] = useState(false);

  const onStrokeChange = (stroke: number) => {
    setStrokeWidth(stroke);
    setShowStrokes(false);
    setStroke(utils.getPaint(stroke, currentColor));
  };

  const onChangeColor = (color: string) => {
    setColor(color);
    setStroke(utils.getPaint(currentStrokeWidth, color));
  };

  return (
    <>
      {showStrokes && (
        <View
          style={[
            styles.toolbar,
            {
              bottom: 80,
              position: 'absolute',
            },
          ]}>
          {constants.strokes.map(stroke => (
            <Stroke
              key={stroke}
              stroke={stroke}
              onPress={() => onStrokeChange(stroke)}
            />
          ))}
        </View>
      )}

      <View
        style={[styles.toolbar, {position: 'relative', marginVertical: 12}]}>
        <View
          style={{
            backgroundColor: '#f7f7f7',
            borderRadius: 5,
          }}>
          {showStrokes && (
            <View
              style={{
                width: 5,
                height: 5,
                borderRadius: 100,
                backgroundColor: 'black',
                alignSelf: 'center',
                position: 'absolute',
              }}
            />
          )}

          <Stroke
            stroke={currentStrokeWidth}
            onPress={() => setShowStrokes(!showStrokes)}
          />
        </View>

        <View
          style={{
            height: 30,
            borderWidth: 1,
            borderColor: '#f0f0f0',
            marginHorizontal: 10,
          }}
        />

        {constants.colors.map(item => (
          <Color key={item} color={item} onPress={() => onChangeColor(item)} />
        ))}
      </View>
    </>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#ffffff',
    height: 50,
    width: 300,
    borderRadius: 100,
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...utils.getElevation(5),
  },
  color: {
    width: 35,
    height: 35,
    marginRight: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    ...utils.getElevation(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
