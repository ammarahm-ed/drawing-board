import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import utils from '../drawing/utils';
import useDrawingStore from '../store';

const Color = ({
  onPress,
  color,
}: {
  onPress?: (event: GestureResponderEvent) => void;
  color: string;
}) => {
  const currentColor = useDrawingStore(state => state.color);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[
        {
          backgroundColor: color,
        },
        styles.color,
      ]}>
      {color === currentColor && (
        <View
          style={{
            width: 5,
            height: 5,
            borderRadius: 100,
            backgroundColor: 'white',
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default Color;

const styles = StyleSheet.create({
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
