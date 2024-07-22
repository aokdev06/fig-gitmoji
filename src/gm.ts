const completionSpec: Fig.Spec = {
  name: "git commit -m",
  description: "Fig shortcuts",
  subcommands: [
    {
      icon: "✨",
      name: "sparkles",
      insertValue: "\b\b\b:sparkles: ",
      description: "Yeni bir özellik ekleniyorsa",
    },
    {
      icon: "🎨",
      name: "art",
      insertValue: "\b\b\b:art: ",
      description:
        "Mevcutta olan kod bloğu güncelleniyor ya da geliştiriliyorsa",
    },
    {
      icon: "🐛",
      name: "bug",
      insertValue: "\b\b\b:bug: ",
      description: "Yapılan değişiklik bir Bug'ı içeriyorsa",
    },
    {
      icon: "✅",
      name: "test",
      insertValue: "\b\b\b:white_check_mark: ",
      description:
        "Yeni bir test yazınca, ya da mevcut testi güncelleyince kullanılır",
    },
    {
      icon: "🚑️",
      name: "ambulance",
      insertValue: "\b\b\b:ambulance: ",
      description:
        "Critical hotfix - Canlıya acilen çıkılması gereken bir bug varsa",
    },
    {
      icon: "🔀",
      name: "merge",
      insertValue: "\b\b\b:twisted_rightwards_arrows: ",
      description: "Merge Development ",
    },
    {
      icon: "📸",
      name: "snapshot",
      insertValue: "\b\b\b:camera_with_flash: ",
      description: "Snapshot Güncelleniyorsa ",
    },
  ],
};
export default completionSpec;
