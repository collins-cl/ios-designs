import { Button, Host } from "@expo/ui/swift-ui";

import {
  buttonBorderShape,
  buttonStyle,
  controlSize,
  labelStyle,
  tint,
} from "@expo/ui/swift-ui/modifiers";

export default function GlassButton({
  onPress,
  type = "",
  label = "",
  role = "default",
  shape = "circle",
  size = "regular",
  width,
}) {
  const labelMode =
    label && type ? "titleAndIcon" : label ? "titleOnly" : "iconOnly";

  const modifiers = [];

  modifiers.push(
    buttonStyle("glass"),
    buttonBorderShape(shape),
    labelStyle(labelMode),
    controlSize(size),
  );

  return (
    <Host matchContents style={{ flexGrow: 0 }}>
      <Button
        label={label}
        systemImage={type}
        role={role}
        onPress={onPress}
        modifiers={modifiers}
      ></Button>
    </Host>
  );
}
