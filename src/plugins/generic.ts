import { Context } from 'telegraf';
import { Update } from 'typegram';
import { GenericRepository } from '../database/repositories/generic.repository';
import { Plugin } from './plugin.interface';

export class GenericPlugin implements Plugin {
  description = 'Foo';
  genericRepository: GenericRepository;

  constructor() {
    this.genericRepository = new GenericRepository();
  }

  async canExec(): Promise<boolean> {
    return Promise.resolve(true);
  }

  exec(ctx: Context, content: string, nick: string) {
    this.genericRepository.getByTrigger(content).then(async (r) => {
      if (r) {
        if (nick) {
          ctx.reply(`${nick}\n${r.answer}`, { parse_mode: 'Markdown' });
        } else {
          ctx.reply(r.answer, { parse_mode: 'HTML' });
        }
      } else {
        let message =
          'Ese comando no existe\n\nPrueba con alguno de los siguientes comandos:\n\n';
        message += await this.listOfCommands();
        ctx.reply(message, { parse_mode: 'Markdown' });
      }
    });
  }

  parseAdminCommand(ctx: Context<Update>, content: string): void {
    const pattern = /(\w+)\s*(\w+)\s*(.*)/s;

    const [, operation, trigger, answer] = pattern.exec(content) || [];

    if (!operation || !trigger) {
      return;
    }
    switch (operation) {
      case 'add':
      case 'update':
        if (!answer) {
          break;
        }
        this.genericRepository
          .findAndUpdate({ trigger, answer })
          .then(() => {
            ctx.reply('Comando agregado o actualizado con éxito');
          })
          .catch(() =>
            ctx.reply('Ha ocurrido un error, consulta con @foxandxss')
          );

        break;
      case 'delete':
        this.genericRepository.findAndDelete(trigger).then(() => {
          ctx.reply('Comando eliminado con éxito');
        });
    }
  }

  async detailedHelp(): Promise<string> {
    let message = `\nAdemás listado de comandos genéricos:\n\n`;
    message += await this.listOfCommands();

    return message;
  }

  private async listOfCommands(): Promise<string> {
    const items = await this.genericRepository.getAll();
    let message = '';
    items.sort((a, b) => a.trigger.localeCompare(b.trigger));

    items.map((i, index) => {
      message += `_${i.trigger}_`;
      if (index !== items.length - 1) {
        message += ', ';
      }
    });

    return message;
  }
}
