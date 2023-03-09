import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'

import { Container, Content, Icon } from './styles'

export function NewGroup() {
  const [group, setGroup] = useState('')

  const navigation = useNavigation()

  const handleNewGroup = () => {
    if (group !== '') navigation.navigate('players', { group })
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title='Nova Turma'
          subtitle='crie uma turma para adicionar pessoas'
        />

        <Input
          placeholder='Nome da turma'
          onChangeText={setGroup}
        />

        <Button
          style={{ marginTop: 20 }}
          title='Criar'
          onPress={handleNewGroup}
        />
      </Content>
    </Container>
  )
}