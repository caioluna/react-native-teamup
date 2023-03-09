import { useState } from "react";
import { FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Filter } from "@components/Filter";
import { EmptyList } from "@components/EmptyList";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from "@components/PlayerCard";

import { Container, Form, HeaderList, PlayerAmount } from "./styles";

type RouteParams = {
  group: string;
}

export function Players() {
  const [selectedTeam, setSelectedTeam] = useState<string>('Time A')
  const [playerAmount, setPlayerAmount] = useState<string[]>([])

  const route = useRoute()
  const { group } = route.params as RouteParams

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input
          placeholder="Nome do participante"
          autoCorrect={false}
        />

        <ButtonIcon icon="add" />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B', 'Time C', 'Time D', 'Time E', 'Time F']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              isActive={item === selectedTeam}
              title={item}
              onPress={() => setSelectedTeam(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <PlayerAmount>{playerAmount.length}</PlayerAmount>
      </HeaderList>

      <FlatList
        data={playerAmount}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard
            name={item}
            onRemove={() => { }}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyList message='Não há pessoas nesse time' />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 50 },
          playerAmount.length === 0 && { flex: 1 }
        ]}
      />

      <Button
        title="Remover Turma"
        type="secondary"
      />
    </Container>
  )
}