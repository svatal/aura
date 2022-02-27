import * as b from "bobril";
import { init, IProp, useState } from "bobril";
import { Fullscreen } from "./fullscreen";

function App() {
  const auraLen = useState(150);
  const dist1 = useState(50);
  const dist2 = useState(60);
  const currentAge = useState(45);

  return (
    <Fullscreen>
      <div
        style={{
          display: "inline-grid",
          gridTemplateColumns: "max-content max-content max-content",
          gap: 10,
        }}
      >
        <label>Šířka aury</label>
        <NumberInput value={auraLen} />
        <div />

        <label>Věk</label>
        <NumberInput value={currentAge} />
        <div />

        <label>Od těla</label>
        <NumberInput value={dist1} />
        <NumberInput value={dist2} />

        <label>Před lety</label>
        <label>{beforeYears(dist1)}</label>
        <label>{beforeYears(dist2)}</label>

        <label>V kolika</label>
        <label>{eventAge(dist1)}</label>
        <label>{eventAge(dist2)}</label>
      </div>
    </Fullscreen>
  );

  function beforeYears(dist: IProp<number>) {
    return (dist() / auraLen()) * currentAge();
  }
  function eventAge(dist: IProp<number>) {
    return currentAge() - beforeYears(dist);
  }
}

function NumberInput(p: { value: IProp<number> }) {
  return <input type="number" value={p.value} style={{ width: 40 }} />;
}

init(() => <App />);
