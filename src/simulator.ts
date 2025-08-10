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

interface IOSDeviceData {
  name: string;
  udid: string;
  iosVersion: string;
}

const iosGetDevicesSimulatorGenerator = (
  customScript: (name: string, udid: string, iosVersion: string) => string
) => {
  return {
    script: [
      "bash",
      "-c",
      `xcrun simctl list --json devices available | jq -c '[.devices | to_entries[] | select(.key | test("iOS")) | .key as $runtime | .value[] | select(.isAvailable) | {name, udid, iosVersion: ($runtime | sub(".*iOS-"; "") | gsub("-"; "."))}]'`,
    ],
    postProcess: (scriptOutput: string) => {
      const devices = JSON.parse(scriptOutput) as IOSDeviceData[];

      return devices.map(({ name, udid, iosVersion }: any) => ({
        name: `${name} (${iosVersion})`,
        icon: APPLE_ICON,
        description: `Boot ${name} (${udid})`,
        insertValue: customScript(name, udid, iosVersion), //`\u0015print 'Booting device ${name}' && open -a Simulator && xcrun simctl boot ${udid}`,
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
              (name, udid, iosVersion) =>
                `\u0015print 'Booting device ${name} (${iosVersion})' && open -a Simulator && xcrun simctl boot ${udid}`
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
