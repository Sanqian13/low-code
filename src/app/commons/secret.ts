import * as CryptoJS from "crypto-js";

export class CryptoLibrary {
  public static key = CryptoJS.enc.Utf8.parse("MdData2021123456"); //十六位十六进制数作为密钥
  // public static iv = CryptoJS.enc.Utf8.parse('NIfb&95GUY86Gfgh');   //十六位十六进制数作为密钥偏移量
  public static Encrypt(value) {
    const encryptWord = CryptoJS.MD5(value).toString();
    return encryptWord;
  }
  public static AESDecrypt(value) {
    // let decrypt = CryptoJS.AES.decrypt(value, this.key, { iv: this.iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    // let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    // return decryptedStr.toString();
    var decrypt = CryptoJS.AES.decrypt(value, this.key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }
}
