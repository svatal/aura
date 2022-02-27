import * as b from "bobril";
import {
  IBobrilCacheNode,
  init,
  IProp,
  useLayoutEffect,
  useRef,
  useState,
} from "bobril";

// b.injectCss("html, body { height: 100% }");

const paddings = 20;

function App() {
  const auraLen = useState(150);
  const dist1 = useState(50);
  const dist2 = useState(60);
  const currentAge = useState(45);
  const contentRef = useRef<IBobrilCacheNode>();
  const scale = useState(1);
  useLayoutEffect(() => {
    const content = b.getDomNode(contentRef.current) as HTMLElement;
    const contentSize = content.getBoundingClientRect();
    const s = Math.min(
      (window.innerWidth - paddings) / contentSize.width,
      (window.innerHeight - paddings) / contentSize.height
    );
    scale(s);
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "baseline",
        // height: "100%",
      }}
    >
      <div
        style={{
          display: "inline-grid",
          gridTemplateColumns: "max-content max-content max-content",
          gap: 10,
          transform: `scale(${scale()})`,
          transformOrigin: "top",
        }}
        ref={contentRef}
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
    </div>
  );

  function beforeYears(dist: IProp<number>) {
    return (dist() / auraLen()) * currentAge();
  }
  function eventAge(dist: IProp<number>) {
    return currentAge() - beforeYears(dist);
  }
}

function NumberInput(p: { value: IProp<number> }) {
  return <input type="number" value={p.value} style={{ width: 30 }} />;
}

init(() => <App />);
