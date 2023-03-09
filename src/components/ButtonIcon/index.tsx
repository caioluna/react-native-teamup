import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import { Container, Icon, ButtonIconTypeProps } from "./styles";

type ButtonIconProps = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap
  type?: ButtonIconTypeProps
}

export function ButtonIcon({ icon, type = 'primary', ...rest }: ButtonIconProps) {
  return (
    <Container {...rest}>
      <Icon name={icon} type={type} />
    </Container>
  )
}
