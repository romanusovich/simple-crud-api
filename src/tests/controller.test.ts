import { Controller } from '../controller';
import * as uuid from 'uuid';
import { User, reqUser, resolve } from '../types';
import { Users } from '../data';

describe('controller', () => {
    let CONTROLLER = new Controller();

    const id = uuid.v4();
    const user: User = {
        id,
        username: 'Name',
        age: 0,
        hobbies: ['hobbie'],
    };
    Users.push(user);

    describe('getUsers', () => {
        test('should return array of Users', async () => {
            jest.spyOn(CONTROLLER, 'getUsers').mockResolvedValue({
                status: 200,
                data: Users,
            });
            const result = await CONTROLLER.getUsers();
            expect(result).toStrictEqual({
                status: 200,
                data: Users,
            });
        });
    });
    
    describe('getUserById', () => {
        test('should return User with provided ID', async () => {
            const result = await CONTROLLER.getUserById(id);
            expect(result).toStrictEqual({
                status: 200,
                data: user
            });
        });
        test('should reject if id is not uuid', async () => {
            return CONTROLLER.getUserById('1').catch((reject) => {
                expect(reject.status).toBe(400);
            });
        });
        test('should reject if User with provided id not found', async () => {
            jest.spyOn(CONTROLLER, 'getUserById').mockRejectedValue({
                status: 404,
                message: 'Error',
            });
            return CONTROLLER.getUserById(uuid.v4()).catch((reject) => {
                expect(reject.status).toBe(404);
            });
        });
    })

    describe('createUser', () => {
        test('should create User, add it to Users and return it', async () => {
            const newUser = {
                username: 'Name',
                age: 0,
                hobbies: ['Hobbie'],
            };
            const result = await CONTROLLER.createUser(newUser) as resolve;
            expect(result.status).toBe(201);
        });
        test('should reject if User does not contain required fields', async () => {
            const wrongUser = {
                username: 'Name',
                age: 0,
            };
            return CONTROLLER.createUser(wrongUser as reqUser).catch((reject) => {
                expect(reject.status).toBe(400);
            });
        });
    })

    describe('updateUserById', () => {
        const newUser = {
            username: 'Name',
            age: 0,
            hobbies: ['Hobbie'],
        };
        const wrongUser = {
            username: 'Name',
            age: 0,
        };
        test('should update User with provided ID and return it', async () => {
            const result = await CONTROLLER.updateUserById(id, newUser);
            expect(result).toStrictEqual({
                status: 200,
                data: {
                    id,
                    ...newUser,
                },
            });
        });
        test('should reject if id is not uuid', async () => {
            return CONTROLLER.updateUserById('id', newUser).catch((reject) => {
                expect(reject.status).toBe(400);
            });
        });
        test('should reject if User does not contain required fields', async () => {
            return await CONTROLLER.updateUserById(id, wrongUser as reqUser).catch((reject) => {
                expect(reject.status).toBe(400);
            });
        });
        test('should reject if User with provided id not found', async () => {
            jest.spyOn(CONTROLLER, 'updateUserById').mockRejectedValue({
                status: 404,
                message: 'Error',
            });
            return CONTROLLER.updateUserById(uuid.v4(), newUser).catch((reject) => {
                expect(reject.status).toBe(404);
            });
        });
    })

    describe('deleteUserById', () => {
        test('should delete User with provided ID from Users', async () => {
            const result = await CONTROLLER.deleteUserById(id) as resolve;
            expect(result.status).toBe(204);
        });
        test('should reject if id is not uuid', async () => {
            return CONTROLLER.deleteUserById('1').catch((reject) => {
                expect(reject.status).toBe(400);
            });
        });
        test('should reject if User with provided id not found', async () => {
            jest.spyOn(CONTROLLER, 'deleteUserById').mockRejectedValue({
                status: 404,
                message: 'Error',
            });
            return CONTROLLER.deleteUserById(uuid.v4()).catch((reject) => {
                expect(reject.status).toBe(404);
            });
        });
    })
});