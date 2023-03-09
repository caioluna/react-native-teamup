import React from 'react'
import { useTheme } from 'styled-components/native'
import { TextInputProps } from 'react-native'

import { Container } from './styles'

export function Input({ ...rest }: TextInputProps) {
  const { COLORS } = useTheme()

  return (
    <Container
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  )
}