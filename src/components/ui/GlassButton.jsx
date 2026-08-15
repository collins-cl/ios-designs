import { Button, Host } from "@expo/ui/swift-ui";

import {
  buttonBorderShape,
  buttonStyle,
  controlSize,
  labelStyle,
} from "@expo/ui/swift-ui/modifiers";

export default function GlassButton({
  onPress,
  type = "xmark",
  label = "",
  role = "default",
  shape = "circle",
}) {
  return (
    <Host matchContents style={{ flexGrow: 0 }}>
      <Button
        label={label}
        systemImage={type}
        role={role}
        onPress={onPress}
        modifiers={[
          buttonStyle("glass"),
          buttonBorderShape(shape),
          labelStyle("iconOnly"),
          controlSize("large"),
        ]}
      />
    </Host>
  );
}
