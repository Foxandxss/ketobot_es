import { adminPlugin } from './plugins/admin';
import { ayudaPlugin } from './plugins/ayuda';
import { helpPlugin } from './plugins/help';
import { Plugin } from './plugins/plugin.interface';

export const availablePlugins: Plugin[] = [];

availablePlugins.push(ayudaPlugin);
availablePlugins.push(helpPlugin);
availablePlugins.push(adminPlugin);
