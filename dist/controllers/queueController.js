"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Menu_1 = __importDefault(require("../models/Menu"));
const Queue_1 = __importDefault(require("../models/Queue"));
const readAll = (req, res, next) => {
    const toDay = new Date();
    const getDate = `${toDay.getFullYear()}-${toDay.getMonth() + 1 < 10
        ? `0${toDay.getMonth() + 1}`
        : toDay.getMonth() + 1}-${toDay.getDate()}`;
    return Queue_1.default.find({
        createdAt: {
            $gte: new Date(`${getDate}T00:00:00Z`),
            $lt: new Date(`${getDate}T23:00:00Z`),
        },
    }).then((data) => {
        if (data) {
            res.status(200).json({ message: "success", count: data.length, data });
        }
        else {
            res.status(404).json({ message: "not found" });
        }
    })
        .catch((error) => res.status(500).json({ message: "error", error }));
};
const readQueue = (req, res, next) => {
    const queueId = req.params.queueID;
    console.log(queueId);
    return Queue_1.default.findById(queueId)
        .then((data) => data
        ? res.status(200).json({ message: "success", data })
        : res.status(404).json({ message: "not found" }))
        .catch((error) => res.status(500).json({ error }));
};
const insertQueue = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const toDay = new Date();
    const getDate = `${toDay.getFullYear()}-${toDay.getMonth() + 1 < 10
        ? `0${toDay.getMonth() + 1}`
        : toDay.getMonth() + 1}-${toDay.getDate()}`;
    const getTime = `${toDay.getHours() < 10 ? `0${toDay.getHours()}` : toDay.getHours()}:${toDay.getMinutes() < 10 ? `0${toDay.getMinutes()}` : toDay.getMinutes()}`;
    const menu = yield Menu_1.default.findById(req.body.menu);
    console.log("room", menu.room);
    const query = yield Queue_1.default.find({
        createdAt: {
            $gte: new Date(`${getDate}T00:00:00Z`),
            $lt: new Date(`${getDate}T23:00:00Z`),
        },
        menu_id: req.body.menu,
    });
    console.log(query);
    const queue = new Queue_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        time: getTime,
        queue_no: queueSum(query.length, menu.room),
        menu_id: req.body.menu,
    });
    return queue
        .save()
        .then((data) => res.status(201).json({ data }))
        .catch((error) => res.status(500).json({ error }));
});
function queueSum(params, room) {
    let sum = params + 1;
    if (sum < 10) {
        return room + "00" + sum;
    }
    else if (sum >= 10) {
        return room + "0" + sum;
    }
    else {
        return room + sum;
    }
}
exports.default = { readAll, readQueue, insertQueue };
