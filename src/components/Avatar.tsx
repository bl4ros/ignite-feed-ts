import { ImgHTMLAttributes } from "react";
import styles from "./Avatar.module.css";

interface AvatarType extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
}

export function Avatar({ hasBorder = false, ...props }: AvatarType) {
  return (
    <img
      className={`${hasBorder ? styles.avatarWithBorder : styles.avatar}`}
      {...props}
    />
  );
}
