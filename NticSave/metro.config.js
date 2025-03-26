const { getDefaultConfig } = require("expo/metro-config")
const { withNativeWind } = require("nativewind/metro")

// First get the default config
const config = getDefaultConfig(__dirname)

// Update transformer and resolver
const { transformer, resolver } = config
config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
}
config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...resolver.sourceExts, "svg"],
}

module.exports = withNativeWind(config, { input: "./app/global.css" })
