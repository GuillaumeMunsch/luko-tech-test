import { useState } from 'react';
import {
  StyleSheet,
  TextInputProps,
  TextProps,
  View,
  Text,
  TextInput,
} from 'react-native';
import { colors } from '../theme/colors';

export default function CustomInput(props: {
  inputLabel: string;
  inputProps?: TextInputProps;
  labelProps?: TextProps;
  error?: string;
}) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <View>
      <Text
        {...props.labelProps}
        style={[styles.inputLabel, props.labelProps?.style]}
      >
        {props.inputLabel}
      </Text>
      {props.error ? <Text style={styles.errorText}>{props.error}</Text> : null}
      <TextInput
        {...props.inputProps}
        onBlur={(e) => {
          if (props.inputProps?.onBlur) props.inputProps?.onBlur(e);
          setIsFocused(false);
        }}
        onFocus={() => setIsFocused(true)}
        style={[
          styles.textInput,
          isFocused && styles.textInputFocused,
          props.inputProps?.style,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    color: colors.textBlack,
    fontSize: 13,
    lineHeight: 17,
    marginTop: 20,
    marginBottom: 5,
  },
  textInput: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: StyleSheet.hairlineWidth,
    height: 48,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  textInputFocused: {
    borderColor: colors.mainBlue,
    borderWidth: 1,
  },
  errorText: {
    marginVertical: 8,
    fontWeight: 'bold',
    color: colors.mainRed,
  },
});
