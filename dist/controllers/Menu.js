"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Menu_1 = __importDefault(require("../models/Menu"));
const readAll = (req, res, next) => {
    return Menu_1.default.find()
        .then((data) => {
        if (data) {
            console.log(data.length);
            res.status(200).json({ message: "success", count: data.length, data });
        }
        else {
            res.status(404).json({ message: "not found" });
        }
    })
        .catch((error) => res.status(500).json({ message: "error", error }));
};
const readMenu = (req, res, next) => {
    const menuId = req.params.menuID;
    console.log(menuId);
    return Menu_1.default.findById(menuId)
        .then((data) => data
        ? res.status(200).json({ message: "success", data })
        : res.status(404).json({ message: "not found" }))
        .catch((error) => res.status(500).json({ error }));
};
const updateMenu = (req, res, next) => {
    const menuId = req.params.menuID;
    console.log(menuId);
    return Menu_1.default.findById(menuId)
        .then((data) => {
        console.log(req.body);
        if (data) {
            data.set(req.body);
            return data
                .save()
                .then((data) => res.status(201).json({ message: "success", data }))
                .catch((error) => res.status(500).json({ message: "error", error }));
        }
        else {
            return res.status(404).json({ message: "not found" });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const updateMenuActive = (req, res, next) => {
    const menuId = req.params.menuID;
    console.log(menuId);
    return Menu_1.default.findById(menuId)
        .then((data) => {
        console.log(req.body);
        if (data) {
            data.set(req.body);
            return data
                .save()
                .then((data) => res.status(201).json({ message: "success", data }))
                .catch((error) => res.status(500).json({ message: "error", error }));
        }
        else {
            return res.status(404).json({ message: "not found" });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { readAll, readMenu, updateMenu, updateMenuActive };
