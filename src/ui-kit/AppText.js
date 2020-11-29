import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Dimension } from './dimension';

const AppText = (props) => {
  return (
    <Text
      style={[
        styles.text,
        props.style,
      ]}
      key={props.index}
      numberOfLines={props.numberOfLines}
      allowFontScaling={props.allowFontScaling}
      onPress={props.onPress}>
      {props.children}
    </Text>
  );
};

AppText.defaultProps = {
  allowFontScaling: false,
  index: '0'
};

const styles = StyleSheet.create({
  text: {
    fontSize: Dimension(12),
  },
});

export { AppText };
