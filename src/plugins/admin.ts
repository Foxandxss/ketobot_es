import { Context } from 'telegraf';
import { Update } from 'typegram';
import { UsersRepository } from '../database/repositories/users.repository';
import { availablePlugins } from '../pluginRegistry';
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

  async exec(ctx: Context<Update>, text = '') {
    const canExec = await this.canExec(ctx);
    if (!canExec) {
      ctx.reply('No tienes permisos para hacer eso!');
      return;
    }
    const plugin = this.extractPluginName(text);
    this.delegateToPlugin(ctx, plugin, text);
  }

  private extractPluginName(text: string) {
    const [plugin, ...args] = text.split(' ');
    return plugin.toLowerCase();
  }

  private delegateToPlugin(ctx: Context, plugin: string, text: string) {
    const cmd = availablePlugins.find((p) => p.command === `!${p.command}`);

    if (cmd && cmd.parseAdminCommand) {
      cmd.parseAdminCommand(ctx, text);
    }
  }
}

export const adminPlugin = new AdminPlugin();
