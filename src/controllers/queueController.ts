import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Menu from "../models/Menu";
import Queue, { IQueue } from "../models/Queue";

const readAll = (req: Request, res: Response, next: NextFunction) => {
  const toDay = new Date();
  const getDate = `${toDay.getFullYear()}-${
    toDay.getMonth() + 1 < 10
      ? `0${toDay.getMonth() + 1}`
      : toDay.getMonth() + 1
  }-${toDay.getDate()}`;
  return Queue.find({
    createdAt: {
      $gte: new Date(`${getDate}T00:00:00Z`),
      $lt: new Date(`${getDate}T23:00:00Z`),
    },
  }).then((data) => {
      if (data) {
        res.status(200).json({ message: "success", count: data.length, data });
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ message: "error", error }));
};

const readQueue = (req: Request, res: Response, next: NextFunction) => {
  const queueId = req.params.queueID;
  console.log(queueId);
  return Queue.findById(queueId)
    .then((data) =>
      data
        ? res.status(200).json({ message: "success", data })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const insertQueue = async (req: Request, res: Response, next: NextFunction) => {
  const toDay = new Date();
  const getDate = `${toDay.getFullYear()}-${
    toDay.getMonth() + 1 < 10
      ? `0${toDay.getMonth() + 1}`
      : toDay.getMonth() + 1
  }-${toDay.getDate()}`;
  const getTime = `${
    toDay.getHours() < 10 ? `0${toDay.getHours()}` : toDay.getHours()
  }:${toDay.getMinutes() < 10 ? `0${toDay.getMinutes()}` : toDay.getMinutes()}`;
  const menu: any = await Menu.findById(req.body.menu);
  console.log("room", menu.room);
  const query = await Queue.find({
    createdAt: {
      $gte: new Date(`${getDate}T00:00:00Z`),
      $lt: new Date(`${getDate}T23:00:00Z`),
    },
    menu_id: req.body.menu,
  });
  console.log(query);
  const queue = new Queue({
    _id: new mongoose.Types.ObjectId(),
    time: getTime,
    queue_no: queueSum(query.length, menu.room),
    menu_id: req.body.menu,
  });
  return queue
    .save()
    .then((data) => res.status(201).json({ data }))
    .catch((error) => res.status(500).json({ error }));
};

function queueSum(params: number, room: string) {
  let sum = params + 1;
  if (sum < 10) {
    return room + "00" + sum;
  } else if (sum >= 10) {
    return room + "0" + sum;
  } else {
    return room + sum;
  }
}

export default { readAll, readQueue, insertQueue };
