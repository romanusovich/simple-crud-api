export type reqUser = {
    username: string,
    age: number,
    hobbies: string[],
};

export function isRequiredUser(user: reqUser): boolean {
    const keys = Object.keys(user);
    const isRequire = ['username', 'age', 'hobbies'].every((key) => keys.indexOf(key) !== -1);
    return isRequire && keys.length === 4; // ID too
}

export type User = {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
};

export type reject = {
    status: number,
    message: string,
};

export type resolve = {
    status: number,
    data: string | User | User[],
};