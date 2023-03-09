import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export type ButtonIconTypeProps = 'primary' | 'secondary';

type Props = {
  type: ButtonIconTypeProps;
}

export const Container = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;

  justify-content: center;
  align-items: center;
  margin-left: 12px;
`

export const Icon = styled(MaterialIcons).attrs<Props>(({ theme, type }) => ({
  size: 24,
  color: type === 'primary' ? theme.COLORS.GREEN_700 : theme.COLORS.RED,
}))``;