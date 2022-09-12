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
import wifiRepository from "../repositories/wifiRepository.js";
import { wifiWithCleanPassword } from '../utils/dataFormat.js';
function getUserIdByEmail(email) {
    return __awaiter(this, void 0, void 0, function () {
        var userInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wifiRepository.getUserIdByEmail(email)];
                case 1:
                    userInfo = _a.sent();
                    return [2 /*return*/, userInfo.id];
            }
        });
    });
}
function createWifi(network) {
    return __awaiter(this, void 0, void 0, function () {
        var wifi;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wifiRepository.createWifi(network)];
                case 1:
                    wifi = _a.sent();
                    return [2 /*return*/, wifi];
            }
        });
    });
}
function getAllWifi(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var wifi, wifiWithoutPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wifiRepository.getAllWifi(userId)];
                case 1:
                    wifi = _a.sent();
                    wifiWithoutPassword = wifi.map(wifiWithCleanPassword);
                    return [2 /*return*/, wifiWithoutPassword];
            }
        });
    });
}
function checkIfWifiExists(id) {
    return __awaiter(this, void 0, void 0, function () {
        var wifi;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wifiRepository.getWifiById(id)];
                case 1:
                    wifi = _a.sent();
                    if (!wifi) {
                        throw {
                            type: "not_found",
                            message: "Wifi not found"
                        };
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function checkIfWifiBelongsToUser(id, email) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, wifi;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserIdByEmail(email)];
                case 1:
                    userId = _a.sent();
                    return [4 /*yield*/, wifiRepository.getWifiById(id)];
                case 2:
                    wifi = _a.sent();
                    if (wifi.userId !== userId) {
                        throw {
                            type: "not_found",
                            message: "Wifi does not belong to the user"
                        };
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getWifiById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var wifi;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wifiRepository.getWifiById(id)];
                case 1:
                    wifi = _a.sent();
                    return [2 /*return*/, wifiWithCleanPassword(wifi)];
            }
        });
    });
}
function deleteWifiById(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, wifiRepository.deleteWifiById(id)];
        });
    });
}
var wifiService = {
    getUserIdByEmail: getUserIdByEmail,
    createWifi: createWifi,
    getAllWifi: getAllWifi,
    checkIfWifiExists: checkIfWifiExists,
    checkIfWifiBelongsToUser: checkIfWifiBelongsToUser,
    getWifiById: getWifiById,
    deleteWifiById: deleteWifiById
};
export default wifiService;
