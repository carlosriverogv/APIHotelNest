import { IsNotEmpty, IsString } from "class-validator";

export class UsuarioDto {
  @IsString({ message: 'El login debe ser un texto' })
  @IsNotEmpty({ message: 'El login es requerido' })
  readonly login: string;

  @IsString({ message: 'El password debe ser un texto' })
  @IsNotEmpty({ message: 'El password es requerido' })
  readonly password: string;
}
