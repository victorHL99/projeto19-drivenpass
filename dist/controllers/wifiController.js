var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import wifiService from '../services/wifiService.js';
import passwordUtils from '../utils/passwordUtils.js';
function createWifi(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, label, password, email, userId, hashPassword, network, wifi;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, label = _a.label, password = _a.password;
                    email = res.locals.userEmail;
                    return [4 /*yield*/, wifiService.getUserIdByEmail(email)];
                case 1:
                    userId = _b.sent();
                    return [4 /*yield*/, passwordUtils.encryptPasswordByCryptr(password)];
                case 2:
                    hashPassword = _b.sent();
                    network = {
                        label: label,
                        password: hashPassword,
                        userId: userId
                    };
                    return [4 /*yield*/, wifiService.createWifi(network)];
                case 3:
                    wifi = _b.sent();
                    console.log(wifi);
                    res.status(201).send("Network created");
                    return [2 /*return*/];
            }
        });
    });
}
function getAllWifi(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, userId, wifi;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = res.locals.userEmail;
                    return [4 /*yield*/, wifiService.getUserIdByEmail(email)];
                case 1:
                    userId = _a.sent();
                    return [4 /*yield*/, wifiService.getAllWifi(userId)];
                case 2:
                    wifi = _a.sent();
                    res.status(200).send(wifi);
                    return [2 /*return*/];
            }
        });
    });
}
function getWifiById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, idWifi, email, wifi;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    idWifi = parseInt(id, 10);
                    email = res.locals.userEmail;
                    return [4 /*yield*/, wifiService.checkIfWifiExists(idWifi)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, wifiService.checkIfWifiBelongsToUser(idWifi, email)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, wifiService.getWifiById(idWifi)];
                case 3:
                    wifi = _a.sent();
                    res.status(200).send(wifi);
                    return [2 /*return*/];
            }
        });
    });
}
function deleteWifiById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, idWifi, email;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    idWifi = parseInt(id, 10);
                    email = res.locals.userEmail;
                    return [4 /*yield*/, wifiService.checkIfWifiExists(idWifi)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, wifiService.checkIfWifiBelongsToUser(idWifi, email)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, wifiService.deleteWifiById(idWifi)];
                case 3:
                    _a.sent();
                    res.status(200).send("Wifi deleted");
                    return [2 /*return*/];
            }
        });
    });
}
var wifiController = {
    createWifi: createWifi,
    getAllWifi: getAllWifi,
    getWifiById: getWifiById,
    deleteWifiById: deleteWifiById
};
export default wifiController;
