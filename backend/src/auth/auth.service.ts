import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
    ){}

    async validateUser(matricula:number, pass: string){
        const user = await this.usuarioService.findOne(matricula);
        if(user && await bcrypt.compare(pass, user.senha)){
            const {senha, ...result} = user;
            return result;
        }
        return null;
    }

    async login(usuario:any){
        const payload = {matricula:usuario.matricula, adm: usuario.administrador}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
