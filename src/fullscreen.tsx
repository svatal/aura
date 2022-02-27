import * as b from "bobril";
import {
  IBobrilCacheNode,
  IBobrilChildren,
  useLayoutEffect,
  useRef,
  useState,
} from "bobril";

const paddings = 20;

export function Fullscreen(p: { children: IBobrilChildren }) {
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
      }}
    >
      <div
        style={{
          display: "inline-block",
          transform: `scale(${scale()})`,
          transformOrigin: "top",
        }}
        ref={contentRef}
      >
        {p.children}
      </div>
    </div>
  );
}
