import * as b from "bobril";
import { IProp, useState } from "bobril";
import { Fullscreen } from "./fullscreen";
import { Button } from "./button";

export function App() {
  const auraLen = useState(150);
  const dists = useState([50]);
  const currentAge = useState(45);

  return (
    <Fullscreen>
      <div
        style={{
          display: "inline-grid",
          gridTemplateColumns: `repeat(${dists().length + 2}, max-content)`,
          gap: 10,
        }}
      >
        <label>Šířka aury</label>
        <NumberInput value={auraLen} />
        {dists().map(() => (
          <div />
        ))}

        <label>Věk</label>
        <NumberInput value={currentAge} />
        {dists().map(() => (
          <div />
        ))}

        <label>Od těla</label>
        {dists().map((value, idx) => (
          <NumberInput
            value={b.prop(value, (newVal) =>
              dists(dists().map((origVal, i) => (idx === i ? newVal : origVal)))
            )}
          />
        ))}
        <div>
          <Button
            color="green"
            text="+"
            onClick={() => dists([...dists(), 50])}
          />
        </div>

        <label>Před lety</label>
        {dists().map((dist) => (
          <label>{beforeYears(dist).toFixed(1)}</label>
        ))}
        <div />

        <label>V kolika</label>
        {dists().map((dist) => (
          <label>{eventAge(dist).toFixed(1)}</label>
        ))}
        <div />

        <label>Smazat</label>
        {dists().map((_, idx) => (
          <div>
            <Button
              color="red"
              text="X"
              onClick={() => dists(dists().filter((_, i) => i !== idx))}
            />
          </div>
        ))}
        <div />
      </div>
    </Fullscreen>
  );

  function beforeYears(dist: number) {
    return (dist / auraLen()) * currentAge();
  }
  function eventAge(dist: number) {
    return currentAge() - beforeYears(dist);
  }
}

function NumberInput(p: { value: IProp<number> }) {
  return <input type="number" value={p.value} style={{ width: 40 }} />;
}
