/** @format */
import admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";
// import serviceAccount from "./firebase-admins.json";

const serviceAccount = {
  type: "service_account",
  project_id: "e-coms-3a11d",
  private_key_id: "9423d8cfd37e3ea9c52bb295034ce0f5f31b0cc5",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCzij0UojS4B8PL\n3ue/ABNC3HRqGjmw9fRAswKJXa0Ov6SoWPd0ZrjkwlvWSM+m1lyrkKEPRP8ddl98\nUF6qphwM2Jci3uWDHNBvLXXvQ/+dSnJBQN/y21+LmKiv/7W+T3vc+Frdifb7igJn\nNGIOPdWTO07KrmOO9lOfD1RaQOCzVAWlptI1D/efrly8A6/gxinhN6MT776zSKGr\nHKrLmRUj7R6kj+DZWbwxFkf/fWEKGCNyqBQyU8xC4bwNv1sIVv2sTvTX2ONuO7ck\nqnKHO444YqBMQjtd/jBkG08+zMAKf3Xt/m/qvtJ+HKL5/QSzV9VODtjxNCiQuSpE\nvEOzHm4DAgMBAAECggEAETRF9hw1AQ19baPGgT74mYeWgDRTIunupeSBcbhQRQGI\nPbmIvNa7EPCu7DG99DbGWopZZKUv7RrSu47YA3I3beOzV9wUEiRItN6eVncln2Tq\n3eXhj9wFo9LVF0hhmgLz05DY5DG8QQ5QfKNAYiz6skkUm8dqMuDX0n4djyh4X7ac\nXOluDQb0Gpkr7kSyIUmE9EYRbJegNGutDOl/cLj4JaXEaAVIzflImQP77VuQ97Dy\nNwEUhsya5fgKVgwWPbu9kdiGAQghaWyZ2sV+YbfaVEg6ngBGF3w31rbIkWy9wlyp\n0ENyGO3vS5vUecdwQdRIuf42ugtcCaemnuv3IM6VgQKBgQDYrVawNf2dLzj/IKel\nb9tV1mshoQ9iGZ9vth7qV82ABTtINF+8xHHpLPBnVrWck0Dw3MQR+3WFh3s9DfqX\ne7TeKjuFsMDYqYKNhJ60c6KNnTRj/0uuKIQhN/c4lz0WRPPCANHaCkbcNMkTeuoX\n1PFV54lJm/pcWvhcRWpQnqSZOQKBgQDUH4logAJT2o6JVD2yJW+g7qE569J4J7BP\nSIkmwwY/aHtK84sX4fJRdHiCW4MGiF9vkitIqPZW7s6DpIVSo7TnMEyCp/w5A2sW\naPWFCeLdixjBwPEqu2pu7jxAEAcN7OgmMR4j4myJ9BVE6eFF2KvbG+J5JYcqQLDQ\nVp0JD61tGwKBgQC5Kni4oYsYdrCYpoleAddI5bIrzP3ecdMknliRH3PIgbAFpmxi\nXuaRxAu15A3TvqtyqtcMHv5xnDQfGwEZz2fjq+et+jzzavjcg4c04tT5fGy3QAam\n0I0J7k/hFq3niAlfs1+im8GukZV8hj/jGeEb7oAOXbN4lW1FPTT7rHcxUQKBgDml\nQGBHuVo0YNvtKr8I8WcYsnPdJFtG3eEN40fHZCFDMY5S1Q/udT2xmzZBzD+wO89E\nN8MNN7S0PScFRL4KgxT4yTIQmLidtzJl36MB5scyD85HssJcIDZ5Q6JdOK2OHiCS\n5I/37msnC8iojnG+yiVHVKp7ilnvLp3Pi+l0ezrVAoGAJWDDJHc2z7RmgVZRxD2j\nkKVZd3Vf+KZRNKAGKkyyULKUVriHHPrIPEAvnerExc0h8Z7hKjeHUNa0RHlzzL2Q\nplOAPXQ9piUJJy9zYNXz6FgiYxko8fM5Ug9qIp/xuypei1fY2w/5Zu5djAhoL6qh\n59YacWTNfzJmZzn3DVK6LKc=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-ykdnz@e-coms-3a11d.iam.gserviceaccount.com",
  client_id: "101516585618956716877",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ykdnz%40e-coms-3a11d.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://e-coms-3a11d.appspot.com",
});

const uploadImage = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const folder = req.originalUrl.split("/")[3];

  const bucket = admin.storage().bucket();
  const file = bucket.file(`${folder}/${req.file.originalname}-${uuidv4()}`);

  const fileStream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
    resumable: false,
  });

  fileStream.on("error", (err) => {
    res.status(400).json({
      message: err.message,
      success: false,
    });
  });

  fileStream.on("finish", async () => {
    const downloadURL = await file.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });

    req.imageUrl = downloadURL[0];

    next();
  });

  fileStream.end(req.file.buffer);
};

export default uploadImage;
