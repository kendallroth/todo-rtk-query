interface Config {
  api: {
    url: string;
  };
}

const apiUrl = process.env.REACT_APP_API_URL;
if (!apiUrl) {
  throw new Error("API URL is required");
}

const config: Config = {
  api: {
    url: apiUrl,
  },
};

export default config;
