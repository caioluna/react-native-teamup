import { useEffect, useState, useRef } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Filter } from "@components/Filter";
import { Loading } from "@components/Loading";
import { EmptyList } from "@components/EmptyList";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from "@components/PlayerCard";

import { AppError } from "@utils/AppError";

import { groupRemove } from "@storage/group/groupRemove";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";

import { Container, Form, HeaderList, PlayerAmount } from "./styles";

type RouteParams = {
  group: string;
}

export function Players() {
  const [newPlayer, setNewPlayer] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedTeam, setSelectedTeam] = useState<string>('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const newPlayerRef = useRef<TextInput>(null)

  const navigation = useNavigation()
  const route = useRoute()

  const { group } = route.params as RouteParams

  async function handleAddPlayer() {
    if (newPlayer.trim().length === 0) {
      return Alert.alert('Digite o nome do jogador.')
    }

    const player = {
      name: newPlayer,
      team: selectedTeam
    }

    try {
      await playerAddByGroup(player, group);

      newPlayerRef.current?.blur();

      fetchPlayersByTeam();
      setNewPlayer('');

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Ops!', error.message)
      } else {
        console.log(error);
        Alert.alert('Ops!', 'Não foi possível adicionar o jogador.')
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)
      const playersByTeam = await playerGetByGroupAndTeam(group, selectedTeam)
      setPlayers(playersByTeam)

    } catch (error) {
      Alert.alert('Jogadores', 'Erro ao buscar jogadores.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleRemovePlayer(player: string) {
    try {
      await playerRemoveByGroup(player, group)
      fetchPlayersByTeam()

    } catch (error) {
      Alert.alert('Remover', 'Erro ao remover jogador.')
    }
  }

  async function groupRemoveConfirmed() {
    try {
      await groupRemove(group)
      navigation.navigate('groups')

    } catch (error) {
      Alert.alert('Remover', 'Erro ao remover turma.')
    }
  }

  async function handleRemoveGroup() {
    Alert.alert('Remover', 'Deseja remover a turma?', [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: () => groupRemoveConfirmed()
      },
    ])

  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [selectedTeam])

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input
          inputRef={newPlayerRef}
          onChangeText={setNewPlayer}
          placeholder="Nome do participante"
          autoCorrect={false}
          value={newPlayer}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="send"
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
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

        <PlayerAmount>{players.length}</PlayerAmount>
      </HeaderList>

      {
        isLoading
          ? <Loading />
          : (
            <FlatList
              data={players}
              keyExtractor={item => item.name}
              renderItem={({ item }) => (
                <PlayerCard
                  name={item.name}
                  onRemove={() => handleRemovePlayer(item.name)}
                />
              )}
              ListEmptyComponent={() => (
                <EmptyList message='Não há pessoas nesse time' />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                { paddingBottom: 50 },
                players.length === 0 && { flex: 1 }
              ]}
            />
          )
      }

      <Button
        title="Remover Turma"
        type="secondary"
        onPress={handleRemoveGroup}
      />
    </Container>
  )
}