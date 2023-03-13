import { useState, useCallback } from 'react'
import { Alert, FlatList } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Button } from '@components/Button'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'
import { EmptyList } from '@components/EmptyList'
import { groupGetAll } from '@storage/group/groupGetAll'

import { Container } from './styles'
import { Loading } from '@components/Loading'

export function Groups() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  const handleNavigateNewGroup = () => {
    navigation.navigate('newgroup')
  }

  const handleOpenGroup = (group: string) => {
    navigation.navigate('players', { group })
  }

  const fetchGroups = async () => {
    try {
      setIsLoading(true)
      const data = await groupGetAll()
      setGroups(data)

    } catch (error) {
      Alert.alert('Turmas', 'Não foi possível carregar as turmas.')
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, [])
  );

  return (
    <Container>
      <Header />

      <Highlight
        title='Turmas'
        subtitle='jogue com a sua turma'
      />

      {
        isLoading
          ? <Loading />
          : (
            <FlatList
              style={{ width: '100%' }}
              data={groups}
              keyExtractor={item => item}
              contentContainerStyle={groups.length === 0 && { flex: 1 }}
              ListEmptyComponent={() => (
                <EmptyList message="Clique no botão 'Criar nova turma' para adicionar pessoas à sua turma." />
              )}
              renderItem={({ item }) => (
                <GroupCard
                  title={item}
                  onPress={() => handleOpenGroup(item)}
                />
              )}
            />
          )}

      <Button
        title='Criar nova turma'
        onPress={handleNavigateNewGroup}
      />
    </Container>
  )
}