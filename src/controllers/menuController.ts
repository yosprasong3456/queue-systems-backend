import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Menu from "../models/Menu";

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Menu.find()
    .then((data) => {
        if(data){
            res.status(200).json({ message: "success", count : data.length, data })
        }else{
            res.status(404).json({ message: "not found" })
        }
    })
    .catch((error) => res.status(500).json({ message: "error", error }));
};

const readMenu = (req: Request, res: Response, next: NextFunction) => {
  const menuId = req.params.menuID;
  console.log(menuId);
  return Menu.findById(menuId).populate('queues')
    .then((data) =>
      data
        ? res.status(200).json({ message: "success", data })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const updateMenu = (req: Request, res: Response, next: NextFunction) => {
  const menuId = req.params.menuID;
  console.log(menuId);
  return Menu.findById(menuId)
    .then((data) => {
      console.log(req.body);
      if (data) {
        data.set(req.body);
        return data
          .save()
          .then((data) => res.status(201).json({ message: "success", data }))
          .catch((error) => res.status(500).json({ message: "error", error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const updateMenuActive = (req: Request, res: Response, next: NextFunction) => {
  const menuId = req.params.menuID;
  console.log(menuId);
  return Menu.findById(menuId)
    .then((data) => {
      console.log(req.body);
      if (data) {
        data.set(req.body);
        return data
          .save()
          .then((data) => res.status(201).json({ message: "success", data }))
          .catch((error) => res.status(500).json({ message: "error", error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

export default { readAll, readMenu, updateMenu, updateMenuActive };
