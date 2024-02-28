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
        return Alert.alert('Oops!', 'You must enter a group name first.')
      }

      await groupCreate(group)
      navigation.navigate('players', { group })

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Oops!', error.message)
      } else {
        Alert.alert('Sorry...', 'We had a problem creating your group.')
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
          title='New Group'
          subtitle='create a new group to add your friends'
        />

        <Input
          placeholder='Group name'
          onChangeText={setGroup}
        />

        <Button
          style={{ marginTop: 20 }}
          title='Create'
          onPress={handleNewGroup}
        />
      </Content>
    </Container>
  )
}