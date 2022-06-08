import { Context } from 'telegraf';
import { AyudaRepository } from '../database/repositories/ayuda.repository';
import { Plugin } from './plugin.interface';

export class AyudaPlugin implements Plugin {
  description = 'Muestra un mensaje de ayuda para preguntas generales';
  ayudaRepository: AyudaRepository;
  constructor(public command: string) {
    this.ayudaRepository = new AyudaRepository();
  }

  exec(ctx: Context, text: string): void {
    this.ayudaRepository.getAll().then((ayudas) => console.log(ayudas));
    this.ayudaRepository.getByTrigger(text).then((r) => {
      if (r) {
        console.log(r);
        ctx.reply(r.answer);
      }
    });
  }
}
