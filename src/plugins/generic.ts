import { Context } from 'telegraf';
import { Update } from 'typegram';
import { GenericRepository } from '../database/repositories/generic.repository';
import { Plugin } from './plugin.interface';

export class GenericPlugin implements Plugin {
  description = 'Foo';
  genericRepository: GenericRepository;
  showHelp = true;

  constructor() {
    this.genericRepository = new GenericRepository();
  }

  canExec() {
    return true;
  }

  exec(ctx: Context, content: string, nick: string) {
    this.genericRepository.getByTrigger(content).then((r) => {
      if (r) {
        if (nick) {
          ctx.reply(`${nick}\n${r.answer}`, { parse_mode: 'Markdown' });
        } else {
          ctx.reply(r.answer);
        }
      } else {
        ctx.reply('Ese comando no existe');
      }
    });
  }

  parseAdminCommand(ctx: Context<Update>, content: string): void {
    // console.log('content', content);
    const pattern = /(\w+)\s*(\w+)\s+(.*)/s;
    const [_, operation, trigger, answer] = pattern.exec(content) || [];
    // console.log(`${operation} <-> ${trigger} <-> ${answer.join(' ')}`);
    console.log('Operation: ', operation);
    console.log('Trigger: ', trigger);
    console.log('Answer: ', answer);
    if (!operation || !trigger || !answer) {
      return;
    }
    switch (operation) {
      case 'add':
      case 'update':
        this.genericRepository
          .findAndUpdate({ trigger, answer })
          .then(() => {
            ctx.reply('Comando agregado o actualizado con éxito');
          })
          .catch(() =>
            ctx.reply('Ha ocurrido un error, consulta con @foxandxss')
          );

        break;
    }
  }

  async detailedHelp(): Promise<string> {
    const items = await this.genericRepository.getAll();
    let message = `\nAdemás listado de comandos genéricos:\n\n`;

    items.map((i, index) => {
      message += `_${i.trigger}_`;
      if (index !== items.length - 1) {
        message += ', ';
      }
    });

    return message;
  }
}
