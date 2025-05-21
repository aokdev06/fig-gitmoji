const ANDROID_ICON = "https://www.android.com/static/images/fav/favicon.ico";

const APPLE_ICON =
  "https://developer.apple.com/library/archive/Resources/1282/Images/apple2.png";

const androidGetDevicesGenerator = (script: string = "") => {
  return {
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
          insertValue: `\u0015emulator -avd ${name.trim()} ${script}`,
        }));

      return devices;
    },
  };
};

const iosGetDevicesSimulatorGenerator = (
  customScript: (name: string, udid: string) => string
) => {
  return {
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
          insertValue: customScript(name, udid), //`\u0015print 'Booting device ${name}' && open -a Simulator && xcrun simctl boot ${udid}`,
        }));
    },
  };
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
          description: "Run IOS Simulator",
          args: {
            name: "device name",
            isOptional: false,
            generators: iosGetDevicesSimulatorGenerator(
              (name, udid) =>
                `\u0015print 'Booting device ${name}' && open -a Simulator && xcrun simctl boot ${udid}`
            ),
          },
        },
        {
          name: "android",
          description: "Run Android Emulator",
          icon: ANDROID_ICON,
          args: {
            name: "device name",
            isOptional: false,
            generators: androidGetDevicesGenerator(),
          },
        },
      ],
    },
    {
      name: "wipe-data",
      description: "Wipe Data and Reset the user data image",
      subcommands: [
        {
          name: "android",
          description: "Run Android Emulator",
          icon: ANDROID_ICON,
          args: {
            name: "device name",
            isOptional: false,
            generators: androidGetDevicesGenerator("-wipe-data"),
          },
        },
        {
          name: "ios",
          icon: APPLE_ICON,
          description: "Wipe Data and Reset the user data image",
          args: {
            name: "device name",
            isOptional: false,
            generators: iosGetDevicesSimulatorGenerator(
              (name, udid) =>
                `\u0015print 'Reset device ${name}' && xcrun simctl erase ${udid} && open -a Simulator && xcrun simctl boot ${udid}`
            ),
          },
        },
      ],
    },
  ],
};

export default completionSpec;
