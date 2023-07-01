import { Users } from "./data";
import * as uuid from 'uuid';
import { User, isRequiredUser, reject, reqUser, resolve } from "./types";

export class Controller {
    // GET ALL USERS
    async getUsers() {
        return new Promise((resolve, _) => resolve({
            status: 200,
            data: Users
        }));
    }

    // GET USER BY ID
    async getUserById(id: string) {
        return new Promise((resolve, reject) => {
            if (!uuid.validate(id)) reject({
                status: 400,
                message: `id ${id} is not uuid`,
            });
            const user: User | undefined = Users.find((user) => user.id === id);
            if (!user) reject({
                status: 404,
                message: `User with id ${id} not found`,
            });
            else resolve({
                status: 200,
                data: user,
            });
        });
    }

    // CREATE USER
    async createUser(user: reqUser) {
        return new Promise((resolve, reject) => {
            const newUser: User = {
                id: uuid.v4(),
                ...user
            };
            if (isRequiredUser(newUser)) Users.push(newUser);
            else reject({
                status: 400,
                message: `${user} does not contain required fields`,
            });
            resolve({
                status: 201,
                data: newUser,
            });
        });
    }

    // UPDATE USER BY ID
    async updateUserById(id: string, newUser: reqUser) {
        return new Promise((resolve, reject) => {
            if (!uuid.validate(id)) reject({
                status: 400,
                message: `id ${id} is not uuid`,
            });
            let user: User | undefined = Users.find((user) => user.id === id);
            if (!user) reject({
                status: 404,
                message: `User with id ${id} not found`,
            });
            else {
                const actualUser = {
                    id,
                    ...newUser
                };
                if (isRequiredUser(user)) Users[Users.indexOf(user)] = actualUser;
                else reject({
                    status: 400,
                    message: `${user} does not contain required fields`,
                });
                resolve({
                    status: 200,
                    data: actualUser,
                });
            }
        });
    }

    // DELETE USER BY ID
    async deleteUserById(id: string) {
        return new Promise((resolve, reject) => {
            if (!uuid.validate(id)) reject({
                status: 400,
                message: `id ${id} is not uuid`,
            });
            const user: User | undefined = Users.find((user) => user.id === id);
            if (!user) reject({
                status: 404,
                message: `User with id ${id} not found`,
            });
            else {
                Users.splice(Users.indexOf(user), 1);
                resolve({
                    status: 204,
                    data: `User with id ${id} successfully deleted`,
                });
            }
        });
    }
}