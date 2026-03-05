/**
 * Registry of available project templates. Add new templates here and create
 * a folder under templates/<path>.
 */
export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  /** Path relative to the templates directory (e.g. 'base'). */
  path: string;
}

export const TEMPLATES: TemplateInfo[] = [
  {
    id: 'base',
    name: 'base',
    description: 'Node + Express + TypeScript API with ESLint, Prettier, and Jest',
    path: 'base',
  },
  {
    id: 'nest',
    name: 'nest',
    description: 'NestJS API with TypeScript (modules, decorators, CLI)',
    path: 'nest',
  },
  {
    id: 'vkrun',
    name: 'vkrun',
    description: 'VkrunJS API with TypeScript (opinion-free, scalable)',
    path: 'vkrun',
  },
];
