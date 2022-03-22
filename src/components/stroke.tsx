import React from 'react';
import {GestureResponderEvent, TouchableOpacity, View} from 'react-native';
import useDrawingStore from '../store';

const Stroke = ({
  onPress,
  stroke,
}: {
  onPress?: (event: GestureResponderEvent) => void;
  stroke: number;
}) => {
  const currentColor = useDrawingStore(state => state.color);
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={{
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: 25,
          backgroundColor: currentColor,
          height: stroke,
          borderRadius: 10,
          transform: [
            {
              rotateZ: '-45deg',
            },
          ],
        }}></View>
    </TouchableOpacity>
  );
};

export default Stroke;
