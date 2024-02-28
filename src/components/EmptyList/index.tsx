import React from 'react'
import { Container, Message } from './styles'

type EmptyListProps = {
  message: string;
  extra?: string;
}

export function EmptyList({ message, extra }: EmptyListProps) {
  return (
    <Container>
      <Message>{message}</Message>
      <Message>{extra}</Message>
    </Container>
  )
}