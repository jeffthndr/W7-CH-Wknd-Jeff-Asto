import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpError } from '../types/http.error.js';
import { TokenPayload } from '../types/token.js';

export class Auth {
  private static secret = process.env.TOKEN_SECRET!; // Token secret guardado en el env

  static hash(passwd: string): Promise<string> {
    // El hash encripta el psswd
    const saltRounds = 10; // El numero de cifras del encriptado
    return bcrypt.hash(passwd, saltRounds);
  }

  static compare(passwd: string, hash: string): Promise<boolean> {
    return bcrypt.compare(passwd, hash); // Compara el psswd y el hash y despues devuelve un booleano
  }

  static signJWT(payload: TokenPayload): string {
    const token = jwt.sign(payload, Auth.secret); // Se genera el token
    return token;
  }

  static verifyJWTGettingPayload(token: string): TokenPayload {
    // Comparamos el token
    try {
      const result = jwt.verify(token, Auth.secret);
      if (typeof result === 'string') {
        throw new HttpError(498, 'Invalid token', result);
      }

      return result as TokenPayload;
    } catch (error) {
      throw new HttpError(498, 'Invalid token', (error as Error).message);
    }
  }
}
