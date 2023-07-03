import { Controller } from '../controller';

describe('controller', () => {
    let CONTROLLER = new Controller();

    describe('getUsers', () => {
        test('should return array of Users', async () => {
            const result = await CONTROLLER.getUsers();
            expect(result).toStrictEqual({
                status: 200,
                data: []
            });
        });
    })

    describe('getUserById', () => {
        test('should return User with provided ID', async () => {
            // Write your test here
        });
        test('should reject if id is not uuid', async () => {
            // Write your test here
        });
        test('should reject if User with provided id not found', async () => {
            // Write your test here
        });
    })

    describe('createUser', () => {
        test('should create User, add it to Users and return it', async () => {
            // Write your test here
        });
        test('should reject if User does not contain required fields', async () => {
            // Write your test here
        });
    })

    describe('updateUserById', () => {
        test('should update User with provided ID and return it', async () => {
            // Write your test here
        });
        test('should reject if id is not uuid', async () => {
            // Write your test here
        });
        test('should reject if User with provided id not found', async () => {
            // Write your test here
        });
        test('should reject if User does not contain required fields', async () => {
            // Write your test here
        });
    })

    describe('deleteUserById', () => {
        test('should delete User with provided ID from Users', async () => {
            // Write your test here
        });
        test('should reject if id is not uuid', async () => {
            // Write your test here
        });
        test('should reject if User with provided id not found', async () => {
            // Write your test here
        });
    })
});