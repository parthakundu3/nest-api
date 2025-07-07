/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
// Update the import path if your user.model.ts is located elsewhere, for example:
import { User } from '../users/models/user.model';
// Or, if the file does not exist, create it at src/users/models/user.model.ts and export the User class.
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config'; // Make sure to run: npm install @nestjs/config

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private configService: ConfigService,
  ) { }

  async register(email: string, password: string, fullname: string, profileurl?: string) {
    const hashed = await bcrypt.hash(password, 10);
    return this.userModel.create({ email, password: hashed, fullname, profileurl } as any);
  }

  async login(email: string, password: string) {
    const user = (await this.userModel.findOne({ where: { email } })) as User;
    console.log(`User found: ${user ? user.email : 'No user found'}`); // Debugging line
    if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new InternalServerErrorException('JWT secret is not defined');
    }
    const token: string = sign({ sub: user.id, email: user.email }, jwtSecret, {
      expiresIn: '1h',
    });
    return { token, user: { id: user.id, email: user.email } as any };
  }
}
