import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const buttonStyle: ViewStyle = {
    ...styles.button,
    ...getVariantStyle(variant),
    ...getSizeStyle(size),
    ...(disabled && styles.disabledButton),
    ...style,
  };

  const textStyle: TextStyle = {
    ...styles.buttonText,
    ...getTextColorStyle(variant),
    ...getTextSizeStyle(size),
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={buttonStyle}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#3b82f6' : '#ffffff'} />
      ) : (
        <Text style={textStyle}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

function getVariantStyle(variant: string): ViewStyle {
  switch (variant) {
    case 'primary':
      return { backgroundColor: '#3b82f6' };
    case 'secondary':
      return { backgroundColor: '#64748b' };
    case 'outline':
      return { 
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#3b82f6'
      };
    case 'ghost':
      return { backgroundColor: 'transparent' };
    default:
      return { backgroundColor: '#3b82f6' };
  }
}

function getSizeStyle(size: string): ViewStyle {
  switch (size) {
    case 'sm':
      return { paddingHorizontal: 12, paddingVertical: 8 };
    case 'md':
      return { paddingHorizontal: 16, paddingVertical: 12 };
    case 'lg':
      return { paddingHorizontal: 24, paddingVertical: 16 };
    default:
      return { paddingHorizontal: 16, paddingVertical: 12 };
  }
}

function getTextColorStyle(variant: string): TextStyle {
  switch (variant) {
    case 'outline':
    case 'ghost':
      return { color: '#3b82f6' };
    default:
      return { color: '#ffffff' };
  }
}

function getTextSizeStyle(size: string): TextStyle {
  switch (size) {
    case 'sm':
      return { fontSize: 14 };
    case 'md':
      return { fontSize: 16 };
    case 'lg':
      return { fontSize: 18 };
    default:
      return { fontSize: 16 };
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
});