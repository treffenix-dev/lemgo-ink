import dynamic from "next/dynamic";

export const WaveMeshWrapper = dynamic(
  () => import("./WaveMesh").then((m) => ({ default: m.WaveMesh })),
  { ssr: false }
);
