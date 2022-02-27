import * as b from "bobril";

export function Button(p: {
  text: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <div
      style={{
        display: "inline-block",
        borderRadius: 15,
        padding: "0px 5px",
        border: `1px solid ${p.color}`,
        color: p.color,
        cursor: "pointer",
      }}
      onClick={p.onClick}
    >
      {p.text}
    </div>
  );
}
