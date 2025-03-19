export const mfConfig = {
  name: "innoclinic_host_ui",
  exposes: {},
  remotes: {
    "remote": "remote@http://localhost:3003/remoteEntry.js",
    "visits": "visits@http://localhost:3005/remoteEntry.js",
    "appointments" : "mf_appos@http://localhost:3010/remoteEntry.js"
  },
  shared: ["react", "react-dom"],
};
