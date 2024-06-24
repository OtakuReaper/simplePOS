import { Injectable } from "@nestjs/common";

export type User = {
    id?: number,
    username: string,
    password: string,
    role_id?: number,
};

export type UserRole = {
    id: number,
    role_name: string,
}

@Injectable()
export class UserService{
    private readonly users: User[] = [
        {
            id: 1,
            username: 'admin',
            password: 'password',
            role_id: 1,
        }
    ];

    private readonly roles: UserRole[] = [
        {
            id: 1,
            role_name: 'admin',
        }
    ];

    //CREATE
    async createUser(user: User): Promise<User>{
        this.users.push(user);
        return user.id ? user : this.users[this.users.length - 1];
    }

    //READ
    async getUsers(): Promise<User[]>{
        return this.users;
    }

    async getUserById(id: number): Promise<User | undefined>{
        return this.users.find(user => user.id === id);
    }

    async getUserByUsername(username: string): Promise<User | undefined>{
        return this.users.find(user => user.username === username);
    }

    //UPDATE
    async updateUser(id: number, user: User): Promise<User | undefined>{
        const index = this.users.findIndex(user => user.id === id);
        if(index !== -1){
            this.users[index] = user;
            return user;
        }
        return undefined;
    }

    //DELETE
    async deleteUser(id: number): Promise<User | undefined>{
        const index = this.users.findIndex(user => user.id === id);
        if(index !== -1){
            const user = this.users[index];
            this.users.splice(index, 1);
            return user;
        }
        return undefined;
    }
}