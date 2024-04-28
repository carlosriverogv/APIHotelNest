import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel('usuario')
    private readonly usuarioModel: Model<Usuario>,
  ) {}

  /**
   * Busca un usuario por su login y password
   * @param login El login del usuario buscado
   * @param password La contraseña del usuario buscado
   * @returns El usuario en caso de encontrarlo, undefined en caso contrario
   */
  async findByLoginAndPassword(
    login: string,
    password: string,
  ): Promise<Usuario | undefined> {
    return this.usuarioModel
      .findOne({
        login: login,
        password: password,
      })
      .exec();
  }
}
