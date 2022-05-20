import * as b from "bobril";
import { IBobrilNode, IProp, useState } from "bobril";
import { Fullscreen } from "./fullscreen";
import { Button } from "./button";
import { Switch, SwitchButton } from "./switch";

enum Tab {
  Dists,
  Ages,
}

const defaultDist = 50;
const defaultAge = 15;

export function App() {
  const auraLen = useState(150);
  const dists = useState([defaultDist]);
  const currentAge = useState(45);
  const ages = useState([defaultAge]);
  const tab = useState(Tab.Dists);
  const items = tab() === Tab.Dists ? dists : ages;
  const newItemValue = tab() === Tab.Dists ? defaultDist : defaultAge;

  return (
    <Fullscreen>
      <div
        style={{
          display: "inline-grid",
          gridTemplateColumns: `repeat(${items().length + 2}, max-content)`,
          gap: 10,
        }}
      >
        <label>Šířka aury</label>
        <NumberInput value={auraLen} />
        {items().map(() => (
          <div />
        ))}

        <label>Věk</label>
        <NumberInput value={currentAge} />
        {items().map(() => (
          <div />
        ))}

        <Switch style={{ gridColumn: "1 / -1" }}>
          <SwitchButton
            text="cm"
            onClick={() => tab(Tab.Dists)}
            isSelected={tab() === Tab.Dists}
          />
          <SwitchButton
            text="roky"
            onClick={() => tab(Tab.Ages)}
            isSelected={tab() === Tab.Ages}
          />
        </Switch>

        {[
          addRow(
            tab() === Tab.Dists ? "Od těla" : "Ve věku",
            (value, idx) => (
              <NumberInput
                value={b.prop(value, (newVal) =>
                  items(
                    items().map((origVal, i) => (idx === i ? newVal : origVal))
                  )
                )}
              />
            ),
            <Button
              color="green"
              text="+"
              onClick={() => items([...items(), newItemValue])}
            />
          ),
          addRow("Před lety", (value, idx) =>
            tab() === Tab.Dists ? (
              <label>{beforeYears(value).toFixed(1)}</label>
            ) : (
              <NumberInput
                value={b.prop(currentAge() - value, (newVal) =>
                  items(
                    items().map((origVal, i) =>
                      idx === i ? currentAge() - newVal : origVal
                    )
                  )
                )}
              />
            )
          ),
          tab() === Tab.Dists
            ? addRow("V kolika", (value) => (
                <label>{eventAge(value).toFixed(1)}</label>
              ))
            : addRow("Od těla", (value) => (
                <label>{getDistance(value).toFixed(0)}</label>
              )),
          addRow("Smazat", (_, idx) => (
            <div>
              <Button
                color="red"
                text="X"
                onClick={() => items(items().filter((_, i) => i !== idx))}
              />
            </div>
          )),
        ]}
        <div />
      </div>
    </Fullscreen>
  );

  function addRow(
    label: string,
    onVal: (v: number, idx: number) => IBobrilNode,
    lastColumnContent?: IBobrilNode
  ) {
    return (
      <>
        <label>{label}</label>
        {items().map(onVal)}
        <div>{lastColumnContent}</div>
      </>
    );
  }

  function beforeYears(dist: number) {
    return (dist / auraLen()) * currentAge();
  }
  function eventAge(dist: number) {
    return currentAge() - beforeYears(dist);
  }
  function getDistance(age: number) {
    return (1 - age / currentAge()) * auraLen();
  }
}

function NumberInput(p: { value: IProp<number> }) {
  return <input type="number" value={p.value} style={{ width: 40 }} />;
}
