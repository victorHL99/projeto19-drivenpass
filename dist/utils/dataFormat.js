var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import passwordUtils from "./passwordUtils.js";
export function credentialWithCleanPassword(credetial) {
    var newPassword = passwordUtils.decryptPasswordByCryptr(credetial.password);
    var newCredential = __assign(__assign({}, credetial), { password: newPassword });
    return newCredential;
}
export function cardWithCleanPassword(card) {
    var newPassword = passwordUtils.decryptPasswordByCryptr(card.password);
    var newCard = __assign(__assign({}, card), { password: newPassword });
    return newCard;
}
export function wifiWithCleanPassword(wifi) {
    var newPassword = passwordUtils.decryptPasswordByCryptr(wifi.password);
    var newWifi = __assign(__assign({}, wifi), { password: newPassword });
    return newWifi;
}
var dataFormat = {
    credentialWithCleanPassword: credentialWithCleanPassword,
    cardWithCleanPassword: cardWithCleanPassword,
    wifiWithCleanPassword: wifiWithCleanPassword
};
export default dataFormat;
