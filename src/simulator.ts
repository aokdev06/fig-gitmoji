const ANDROID_ICON = "https://www.android.com/static/images/fav/favicon.ico";

const APPLE_ICON =
  "https://developer.apple.com/library/archive/Resources/1282/Images/apple2.png";

const androidGetDevicesGenerator = {
  script: ["emulator", "-list-avds"],
  postProcess: (scriptOutput: string) => {
    const devices = scriptOutput
      .split("\n")
      .filter((item) => !item.match(/^=/))
      .filter(Boolean)
      .map((item) => item.split(/\([\w\d\-]+\)$/))
      .map(([name]) => ({
        name: name.trim(),
        icon: ANDROID_ICON,
        description: `Boot ${name}`,
        insertValue: `\u0015emulator -avd ${name.trim()}`,
      }));

    return devices;
  },
};

const iosGetDevicesSimulatorGenerator = {
  script: ["xcrun", "simctl", "list", "--json", "devices", "available"],
  postProcess: (scriptOutput: string) => {
    const devices = JSON.parse(scriptOutput).devices;

    return Object.entries(devices)
      .map(([_, data]) => data)
      .reduce<Array<any>>(
        (a: Array<any>, b: Array<any>): Array<any> => [...a, ...b],
        []
      )
      .map(({ name, udid }: any) => ({
        name,
        icon: APPLE_ICON,
        description: `Boot ${name} (${udid})`,
        insertValue: `\u0015print 'Booting device ${name}' && xcrun simctl boot ${udid}`,
      }));
  },
};

const completionSpec: Fig.Spec = {
  name: "simulator",
  description: "Simulator",
  subcommands: [
    {
      name: "run",
      description: "Run a simulator",
      subcommands: [
        {
          name: "ios",
          icon: APPLE_ICON,
          description: ".",
          args: {
            name: "device name",
            isOptional: false,
            generators: iosGetDevicesSimulatorGenerator,
          },
        },
        {
          name: "android",
          description: ".",
          icon: ANDROID_ICON,
          args: {
            name: "device name",
            isOptional: false,
            generators: androidGetDevicesGenerator,
          },
        },
      ],
    },
  ],
};

export default completionSpec;
