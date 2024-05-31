import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";

export default defineConfig({
  preflight: true,
  presets: [
    "@pandacss/preset-base",
    // createPreset({
    //   accentColor: "blue",
    //   grayColor: "sand",
    //   borderRadius: "xl",
    // }),
    "@park-ui/panda-preset",
  ],
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  jsxFramework: "react",
  outdir: "styled-system",
});
