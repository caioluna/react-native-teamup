import { useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'

import { AppError } from '@utils/AppError'
import { groupCreate } from '@storage/group/groupCreate'

import { Container, Content, Icon } from './styles'

export function NewGroup() {
  const [group, setGroup] = useState('')

  const navigation = useNavigation()

  const handleNewGroup = async () => {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo Grupo', 'O nome da turma não pode ser vazio.')
      }

      await groupCreate(group)
      navigation.navigate('players', { group })

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message)
      } else {
        Alert.alert('Novo Grupo', 'Não foi possível criar a turma.')
        console.log(error);
      }
    }
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