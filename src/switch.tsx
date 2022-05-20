import * as b from "bobril";
import { IBobrilNode, IBobrilStyles, selectorStyleDef, styleDef } from "bobril";

export function Switch(p: { style: IBobrilStyles; children: IBobrilNode[] }) {
  return (
    <div
      style={[
        p.style,
        {
          display: "grid",
          gridTemplateColumns: `repeat(${p.children.length}, 1fr)`,
        },
      ]}
    >
      {p.children}
    </div>
  );
}

export function SwitchButton(p: {
  text: string;
  onClick: () => void;
  isSelected: boolean;
}) {
  return (
    <div
      onClick={p.onClick}
      style={[
        switchButtonStyle,
        {
          background: p.isSelected ? "lightgray" : undefined,
        },
      ]}
    >
      {p.text}
    </div>
  );
}

const switchButtonStyle = styleDef(
  {
    border: `1px solid gray`,
    cursor: "pointer",
    textAlign: "center",
  },
  {
    "first-child": {
      borderBottomLeftRadius: 5,
      borderTopLeftRadius: 5,
    },
    "last-child": {
      borderBottomRightRadius: 5,
      borderTopRightRadius: 5,
    },
  }
);

selectorStyleDef(`.${switchButtonStyle} + .${switchButtonStyle}`, {
  marginLeft: -1,
});
