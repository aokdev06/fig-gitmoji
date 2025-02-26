import { gitmoji } from "./gitmoji";

const completionSpec: Fig.Spec = {
  name: "git commit -m",
  description: "Fig shortcuts",
  subcommands: gitmoji.map((gitmoji) => {
    let autoEndText = false;
    switch (gitmoji.name) {
      case "merge":
      case "snapshot":
        autoEndText = true;
        break;
    }

    return {
      name: gitmoji.name,
      icon: gitmoji.icon,
      description: gitmoji.description,
      insertValue: `\b\b\b '${gitmoji.insertValue}${
        !autoEndText ? ` {cursor}'` : "'"
      }`,
    };
  }),
};
export default completionSpec;
