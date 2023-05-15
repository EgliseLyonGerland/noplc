import EmojiPickerComponent, { EmojiStyle, Theme } from "emoji-picker-react";
import { ComponentProps } from "react";

export default function EmojiPicker(
  props: ComponentProps<typeof EmojiPickerComponent>
) {
  return (
    <EmojiPickerComponent
      emojiStyle={EmojiStyle.NATIVE}
      theme={Theme.DARK}
      {...props}
    />
  );
}
