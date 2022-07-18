import { Request, Response } from "express";

export default class ControllerUser {
    static async registration() {

    }

    static async login() {

    }

    static async auth(req: Request, res: Response) {
        res.json({message: "successfull"});
    }

    static async delete() {

    }
}