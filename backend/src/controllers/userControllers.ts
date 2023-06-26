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
    const password = req.body.password;

    try {
        if (!username || !password) throw createHttpError(400, 'Invalid user signup parameters');

        const exisistingUser = await UserModel.findOne({ username: username }).exec();
        if (exisistingUser) throw createHttpError(409, 'User with this username already exists. Please login.');

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {

                const newUser = await UserModel.create({
                    username: username,
                    password: hash
                });
                req.session.userId = newUser._id;
                res.status(201).json({ userId: newUser._id });
            });
        });
    } catch (error) {
        next(error);
    }
}

export const login: RequestHandler<unknown, unknown, userBody, unknown> = async(req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) throw createHttpError(400, 'Invalid user login parameters');

        const user = await UserModel.findOne({ username: username }).exec();
        if (!user) throw createHttpError(409, 'Invalid credentials');

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) createHttpError(401, 'Invalid credentials');

        req.session.userId = user._id;
        res.status(201).json({ userId: user._id });
    } catch(error) {
        next(error);
    }
}

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(err => {
        err ? next(err): res.sendStatus(200);
    })
}