interface Config {
  api: {
    url: string;
  };
}

const config: Config = {
  api: {
    url: process.env.REACT_APP_API_URL ?? ""
  }
};

export default config;
