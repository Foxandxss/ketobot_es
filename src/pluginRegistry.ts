import { AyudaPlugin } from './plugins/ayuda';
import { Plugin } from './plugins/plugin.interface';

export const availablePlugins: Plugin[] = [];

availablePlugins.push(new AyudaPlugin('!ayuda'));
