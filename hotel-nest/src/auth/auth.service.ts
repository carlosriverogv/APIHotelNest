import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  /**
   * Realiza el login de un usuario y devuelve un token en caso de éxito
   * @param login El login del usuario
   * @param password La contraseña del usuario
   * @returns El token de autenticación
   */
  async login(login: string, password: string): Promise<any> {
    const usuario = await this.usuarioService.findByLoginAndPassword(
      login,
      password,
    );

    if (!usuario) {
      throw new UnauthorizedException();
    }

    return await this.jwtService.signAsync({ login: login });
  }
}
