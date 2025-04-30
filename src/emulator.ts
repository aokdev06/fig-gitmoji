const { execSync } = require("child_process");

const getAvds = () => {
  try {
    const output = execSync("emulator -list-avds", { encoding: "utf-8" });

    return output
      .split("\n")
      .filter((name) => name.trim() !== "")
      .map((name) => ({
        name: name.trim(),
        description: "Android Virtual Device",
      }));
  } catch (error) {
    console.error("Failed to fetch AVDs:", error);
    return [];
  }
};

const androidGetDevicesGenerator = {
  script: ["emulator", "-list-avds"],
  postProcess: (scriptOutput: string) => {
    const devices = scriptOutput
      .split("\n")
      .filter((item) => !item.match(/^=/))
      .filter(Boolean)
      .map((item) => item.split(/\([\w\d\-]+\)$/))
      .map(([name]) => ({ name: name.trim() }));

    return devices;
  },
};

const completionSpec: Fig.Spec = {
  name: "emulator",
  description: "Emulator",
  subcommands: [
    {
      name: "-list-avds",
      description: "List available Android Virtual Devices",
    },
    {
      name: "-avd",
      description: "Use a specific Android Virtual Device",
      args: {
        name: "device name",
        isOptional: false,
        generators: androidGetDevicesGenerator,
      },
    },
  ],
};

export default completionSpec;
