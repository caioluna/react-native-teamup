import { useState } from 'react'
import { FlatList } from 'react-native'

import { Header } from '@components/Header'
import { Button } from '@components/Button'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'
import { EmptyList } from '@components/EmptyList'

import { Container } from './styles'

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  return (
    <Container>
      <Header />

      <Highlight
        title='Turmas'
        subtitle='jogue com a sua turma'
      />

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
          />
        )}
      />

      <Button title='Criar nova turma' />
    </Container>
  )
}