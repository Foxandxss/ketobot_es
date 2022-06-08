import { Context } from 'telegraf';
import { Plugin } from './plugin.interface';

export class AyudaPlugin implements Plugin {
  description = 'Muestra un mensaje de ayuda para preguntas generales';
  constructor(public command: string) {}

  exec(ctx: Context, text: string): void {
    console.log('here?');
    ctx.reply(`Hola?  ${text}`);
  }
}
