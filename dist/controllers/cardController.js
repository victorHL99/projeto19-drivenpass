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
import cardService from "../services/cardService.js";
import passwordUtils from '../utils/passwordUtils.js';
function createCard(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, number, label, name, expirationDate, securityCode, password, isVirtual, type, email, userId, hashPassword, card;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, number = _a.number, label = _a.label, name = _a.name, expirationDate = _a.expirationDate, securityCode = _a.securityCode, password = _a.password, isVirtual = _a.isVirtual, type = _a.type;
                    email = res.locals.userEmail;
                    return [4 /*yield*/, cardService.getUserIdByEmail(email)];
                case 1:
                    userId = _b.sent();
                    return [4 /*yield*/, passwordUtils.encryptPasswordByCryptr(password)];
                case 2:
                    hashPassword = _b.sent();
                    card = {
                        number: number,
                        label: label,
                        name: name,
                        expirationDate: expirationDate,
                        securityCode: securityCode,
                        password: hashPassword,
                        isVirtual: isVirtual,
                        type: type,
                        userId: userId
                    };
                    // TODO - add condition with userId
                    // verify if card number already exists
                    /* await cardService.verifyIfCardNumberAlreadyExists(card.number); */
                    // veirfy if card label already exists with userId
                    return [4 /*yield*/, cardService.verifyIfCardLabelAlreadyExistsWithUserId(card.label, userId)];
                case 3:
                    // TODO - add condition with userId
                    // verify if card number already exists
                    /* await cardService.verifyIfCardNumberAlreadyExists(card.number); */
                    // veirfy if card label already exists with userId
                    _b.sent();
                    // create card
                    return [4 /*yield*/, cardService.createCard(card)];
                case 4:
                    // create card
                    _b.sent();
                    res.status(201).json({
                        message: 'Card created successfully'
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function getAllCards(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, userId, allCards;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = res.locals.userEmail;
                    return [4 /*yield*/, cardService.getUserIdByEmail(email)];
                case 1:
                    userId = _a.sent();
                    return [4 /*yield*/, cardService.getAllCards(userId)];
                case 2:
                    allCards = _a.sent();
                    res.status(200).json(allCards);
                    return [2 /*return*/];
            }
        });
    });
}
function getCardById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, idCard, email, card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    idCard = parseInt(id, 10);
                    email = res.locals.userEmail;
                    return [4 /*yield*/, cardService.checkIfCardExists(idCard)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, cardService.checkIfCardIsFromUser(idCard, email)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, cardService.getCardById(idCard)];
                case 3:
                    card = _a.sent();
                    res.status(200).json(card);
                    return [2 /*return*/];
            }
        });
    });
}
function deleteCardById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, idCard, email;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    idCard = parseInt(id, 10);
                    email = res.locals.userEmail;
                    return [4 /*yield*/, cardService.checkIfCardExists(idCard)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, cardService.checkIfCardIsFromUser(idCard, email)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, cardService.deleteCardById(idCard)];
                case 3:
                    _a.sent();
                    res.status(200).json({
                        message: 'Card deleted successfully'
                    });
                    return [2 /*return*/];
            }
        });
    });
}
var cardController = {
    createCard: createCard,
    getAllCards: getAllCards,
    getCardById: getCardById,
    deleteCardById: deleteCardById
};
export default cardController;
