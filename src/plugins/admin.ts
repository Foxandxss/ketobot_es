import { Context } from 'telegraf';
import { Update } from 'typegram';
import { UsersRepository } from '../database/repositories/users.repository';
import { genericPlugin } from '../pluginRegistry';
import { Plugin } from './plugin.interface';

export class AdminPlugin implements Plugin {
  command = '!admin';
  description = 'Opciones de administrador';

  usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async canExec(ctx: Context) {
    const user = await this.usersRepository.getByUsername(
      ctx.message?.from.username?.toLowerCase() || ''
    );
    return user ? true : false;
  }

  async exec(ctx: Context<Update>, content = '') {
    const canExec = await this.canExec(ctx);
    if (!canExec) {
      ctx.reply('No tienes permisos para hacer eso!');
      return;
    }

    if (!content) {
      ctx.reply(this.detailedHelp());
      return;
    }

    genericPlugin.parseAdminCommand(ctx, content);
  }

  detailedHelp(): string {
    return '!admin <add/update/delete> <palabra> <contenido>';
  }
}

export const adminPlugin = new AdminPlugin();
