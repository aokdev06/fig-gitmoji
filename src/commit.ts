const completionSpec: Fig.Spec = {
  name: "git commit -m",
  description: "Fig shortcuts",
  subcommands: [
    {
      icon: "✨",
      name: "sparkles",
      insertValue: "\b\b\b\b\b\b\bgit commit -m ':sparkles: {cursor}'",
      description: "Yeni bir özellik ekleniyorsa",
    },
    {
      icon: "🎨",
      name: "art",
      insertValue: "\b\b\b\b\b\b\bgit commit -m ':art: {cursor}'",
      description:
        "Mevcutta olan kod bloğu güncelleniyor ya da geliştiriliyorsa",
    },
    {
      icon: "🐛",
      name: "bug",
      insertValue: "\b\b\b\b\b\b\bgit commit -m ':bug: {cursor}'",
      description: "Yapılan değişiklik bir Bug'ı içeriyorsa",
    },
    {
      icon: "✅",
      name: "test",
      insertValue: "\b\b\b\b\b\b\bgit commit -m ':white_check_mark: {cursor}'",
      description:
        "Yeni bir test yazınca, ya da mevcut testi güncelleyince kullanılır",
    },
    {
      icon: "🚑️",
      name: "ambulance",
      insertValue: "\b\b\b\b\b\b\bgit commit -m ':ambulance: {cursor}'",
      description:
        "Critical hotfix - Canlıya acilen çıkılması gereken bir bug varsa",
    },
    {
      icon: "🔀",
      name: "merge",
      insertValue: "\b\b\b\b\b\b\bgit commit -m ':twisted_rightwards_arrows: Merge development branch'",
      description: "Merge Development ",
    },
    {
      icon: "📸",
      name: "snapshot",
      insertValue: "\b\b\b\b\b\b\bgit commit -m ':camera_with_flash: Snapshot lar güncellendi'",
      description: "Snapshot Güncelleniyorsa ",
    },
  ],
};
export default completionSpec;
