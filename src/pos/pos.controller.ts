import { Controller, Get, UseGuards } from "@nestjs/common";
import { PosService } from "./pos.service";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('pos')
export class PosController{
    constructor (private posService: PosService){}

}