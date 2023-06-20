import { RequestHandler } from "express";
import UserModel from "../models/user";
import mongoose from "mongoose";
import createHttpError, { CreateHttpError } from "http-errors";
import bcrypt from 'bcrypt';

interface userBody {
    username: string,
    password: string
}

export const getUsers: RequestHandler = async (req, res, next) => {
    try {
        const users = await UserModel.find().exec();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

export const registerUser: RequestHandler<unknown, unknown, userBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.username;

    try {
        if (!username || !password) createHttpError(400, 'Invalid user signup parameters');

        const exisistingUser = await UserModel.findOne({ username: username }).exec();
        if (exisistingUser) throw createHttpError(409, 'User with this username already exists. Please login.');

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {

                const newUser = await UserModel.create({
                    username: username,
                    password: hash
                });
                req.session.userId = newUser._id;
                res.status(201).json(newUser);
            });
        });
    } catch (error) {
        next(error);
    }
}

// export const login: RequestHandler<>