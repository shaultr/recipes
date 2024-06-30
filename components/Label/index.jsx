import React from "react";
import { Icon } from "./patch";
import styles from "./style.module.scss";

export default function Label({ data, color, size }) {
  return (
    <p className={styles.label}>
      <span style={{ fontSize: `${size}px` }}>{data}</span>
      <Icon fill={color} />
    </p>
  );
}
