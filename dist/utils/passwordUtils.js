import Cryptr from 'cryptr';
function encryptPasswordByCryptr(password) {
    var CRYPT_KEY = process.env.SECRET_KEY_CRYPTR;
    var cryptr = new Cryptr(CRYPT_KEY);
    return cryptr.encrypt(password);
}
function decryptPasswordByCryptr(hashPassword) {
    var CRYPT_KEY = process.env.SECRET_KEY_CRYPTR;
    var cryptr = new Cryptr(CRYPT_KEY);
    return cryptr.decrypt(hashPassword);
}
var passwordUtils = {
    encryptPasswordByCryptr: encryptPasswordByCryptr,
    decryptPasswordByCryptr: decryptPasswordByCryptr
};
export default passwordUtils;
