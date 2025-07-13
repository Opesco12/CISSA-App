export default ({ config }) => ({
  expo: {
    name: "CISSA",
    slug: "CISSA",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/cis.png",
    splash: {
      image: "./assets/images/cis.png",
      resizeMode: "contain",
      backgroundColor: "#671f00",
    },
    scheme: "cissaapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/cis.png",
        backgroundColor: "#ffffff",
      },
      permissions: [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
      ],
      config: {
        googleMaps: {
          apiKey: "AIzaSyACuKudhY0p5TPe9YUSWeYDaTEVnFBhou4",
        },
      },
      edgeToEdgeEnabled: true,
      package: "com.opesco.CISSA",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/cis.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#671f00",
        },
      ],
      "expo-web-browser",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      apiKey: process.env.API_KEY,
      router: {},
      eas: {
        projectId: "78caa94b-cbe4-4587-ae49-e9854764d342",
      },
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    updates: {
      checkOnLaunch: "ALWAYS",
      launchWaitMs: 0,
      url: "https://u.expo.dev/78caa94b-cbe4-4587-ae49-e9854764d342",
    },
    owner: "opesco",
  },
});
