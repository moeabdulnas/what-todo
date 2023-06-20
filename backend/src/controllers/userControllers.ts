import { RequestHandler } from "express";
import UserModel from "../models/user";
import mongoose from "mongoose";
import { CreateHttpError } from "http-errors";

interface registerBody {
    username: string,
    password: string
}

const registerUser: RequestHandler<unknown, unknown, registerBody, unknown> = (req, res, next) => {

}