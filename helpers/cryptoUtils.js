const {
  NODE_APP_ENCRYPT_DECRYPT_SECRET_KEY,
  REQ_URLS,
} = require("../constants/env.constant");

const CRYPTO_SECRET_KEY = NODE_APP_ENCRYPT_DECRYPT_SECRET_KEY;
const CryptoJS = require("crypto-js");

module.exports = {
  encryption: async (resBody, protocol, host) => {
    const reqUrl = `${protocol}://${host}`;
    return new Promise(async (resolve, reject) => {
      try {
        if (REQ_URLS.includes(reqUrl)) {
          return resolve(resBody);
        } else {
          const data = CryptoJS.AES.encrypt(
            JSON.stringify(resBody),
            CRYPTO_SECRET_KEY
          ).toString();
          console.log("data", data);
          return resolve(data);
        }
      } catch (error) {
        return resolve({
          success: false,
          message: "Encryption Failed : " + error.message,
        });
      }
    });
  },
  decryption: async (reqBody, protocol, host) => {
    const reqUrl = `${protocol}://${host}`;
    return new Promise(async (resolve) => {
      try {
        const withOutEncryptedReq = REQ_URLS.includes(reqUrl);
        console.log("withOutEncryptedReq", withOutEncryptedReq);
        if (withOutEncryptedReq) {
          return resolve({ success: true, data: reqBody.encryptedData });
        } else {
          if (!reqBody.encryptedData) {
            throw new Error("Missing encryptedData in request body");
          }
          const bytes = CryptoJS.AES.decrypt(
            reqBody.encryptedData,
            CRYPTO_SECRET_KEY
          );
          const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
          console.log("decryptedString", decryptedString);
          if (!decryptedString) {
            throw new Error("Decrypted data is empty");
          }
          const originalText = JSON.parse(decryptedString);
          return resolve({ success: true, data: originalText });
        }
      } catch (error) {
        return resolve({
          success: false,
          message: "Decryption Failed : " + error.message,
        });
      }
    });
  },
};
