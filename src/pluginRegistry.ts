import { adminPlugin } from './plugins/admin';
import { GenericPlugin } from './plugins/generic';
import { helpPlugin } from './plugins/help';
import { Plugin } from './plugins/plugin.interface';

export const availablePlugins: Plugin[] = [];

availablePlugins.push(helpPlugin);
availablePlugins.push(adminPlugin);

export const genericPlugin = new GenericPlugin();
