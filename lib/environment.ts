const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST_URL,
  APP_NAME,
  DB_RETRY_WRITES,
  DB_COLLECTION,
} = process.env;

const requiredEnvVars = {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST_URL,
};

for (const [key, val] of Object.entries(requiredEnvVars)) {
  if (!val) {
    // eslint-disable-next-line no-console
    console.warn(`Missing required ${key} env var`);
  }
}

const config = {
  DB_USERNAME: DB_USERNAME as string,
  DB_PASSWORD: DB_PASSWORD as string,
  DB_HOST_URL: DB_HOST_URL as string,
  DB_COLLECTION: (DB_COLLECTION as string) ?? "prod",
  APP_NAME: (APP_NAME as string) ?? "hack-mya-travel",
  DB_RETRY_WRITES: (DB_RETRY_WRITES as string) ?? "true",
};

const DB_URL = `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_HOST_URL}/${config.DB_COLLECTION}?retryWrites=${config.DB_RETRY_WRITES}&w=majority&appName=${config.APP_NAME}`;

const configWithUrl = { ...config, DB_URL };

export default configWithUrl;
