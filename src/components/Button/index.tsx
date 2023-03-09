import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { Container, Title, ButtonTypeStyleProps } from './styles'

type ButtonProps = TouchableOpacityProps & {
  title: string;
  type?: ButtonTypeStyleProps;
}

export function Button({ title, type = 'primary', ...rest }: ButtonProps) {
  return (
    <Container
      {...rest}
      type={type}
    >
      <Title>{title}</Title>
    </Container>
  )
}