export const mfConfig = {
  name: "innoclinic_host_ui",
  exposes: {},
  remotes: {
    "appointments" : "mf_appos@http://localhost:3010/remoteEntry.js"
  },
  shared: ["react", "react-dom"],
};
