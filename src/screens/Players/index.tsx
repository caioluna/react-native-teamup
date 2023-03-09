import { useState } from "react";
import { FlatList } from "react-native";

import { Input } from "@components/Input";
import { Header } from "@components/Header";
import { Filter } from "@components/Filter";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";

import { Container, Form, HeaderList, PlayerAmount } from "./styles";
import { PlayerCard } from "@components/PlayerCard";
import { EmptyList } from "@components/EmptyList";
import { Button } from "@components/Button";

export function Players() {
  const [selectedTeam, setSelectedTeam] = useState<string>('Time A')
  const [playerAmount, setPlayerAmount] = useState<string[]>([])

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title="Nome da turma"
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