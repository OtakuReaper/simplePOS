import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import exp from "constants";

export type Session = {
    id: number,
    user_id: number,
    token: string,
    expires_at: Date,
    status_id: number,
}

export type SessionStatus = {
    id: number,
    status: string,
}

@Injectable()
export class AuthService{
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ){}

    async logIn(username: string, password: string): Promise<{access_token: string}>{
        const user = await this.usersService.getUserByUsername(username);
        
        if(user?.password !== password){
            throw new UnauthorizedException();
        }

        const payload = { userId: user.id, username: user.username, };

        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }

    async logOut(){

    }
}