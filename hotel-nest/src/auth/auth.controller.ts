import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioDto } from 'src/usuario/dto/usuario-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Realiza el login de un usuario
   * @param usuarioDto Los datos del usuario a loguear
   * @returns Un JSON con un mensaje de ok a true y el token de autenticación
   */
  @Post('login')
  async login(@Body() usuarioDto: UsuarioDto) {
    const token = await this.authService.login(
      usuarioDto.login,
      usuarioDto.password,
    );

    return { ok: true, resultado: token };
  }
}
