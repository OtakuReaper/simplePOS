import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/users/users.service";

@Injectable()
export class AuthService{
    constructor(
        private usersService: UserService
        private jwtService: JwtService
    ){}

    async signIn(username: string, password: string): Promise<{access_token: string}>{
        const user = await this.usersService.findOne(username);
        
        if(user?.password !== password){
            throw new UnauthorizedException();
        }

        const payload = { sub: user.userId, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }
}