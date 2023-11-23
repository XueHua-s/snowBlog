import CryptoJS from 'crypto-js';
// 定义加密函数
export function encryptData(data: string, key: string) {
  // 将数据转换为字节数组
  const dataBytes = CryptoJS.enc.Utf8.parse(data);
  // 使用密钥对数据进行加密
  const encrypted = CryptoJS.AES.encrypt(dataBytes, key);
  // 将加密后的数据转换为Base64字符串
  const encryptedData = encrypted.toString();
  // 返回加密后的数据
  return encryptedData;
}
// 定义解密函数
export function decryptData(encryptedData: string, key: string) {
  // 将加密数据转换为字节数组
  const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedData);
  // 使用密钥对数据进行解密
  const decrypted = CryptoJS.AES.decrypt(encryptedBytes, key);
  // 将解密后的数据转换为字符串
  const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
  // 返回解密后的数据
  return decryptedData;
}
