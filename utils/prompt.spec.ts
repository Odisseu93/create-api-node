import * as readline from 'readline';
import { ask, askTemplateChoice } from './prompt';

jest.mock('readline');

describe('prompt', () => {
  let questionCallback: (answer: string) => void;
  let mockClose: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockClose = jest.fn();
    (readline.createInterface as jest.Mock).mockReturnValue({
      question: jest.fn((prompt: string, cb: (answer: string) => void) => {
        questionCallback = cb;
      }),
      close: mockClose,
    });
  });

  describe('ask', () => {
    it('should resolve with trimmed answer when user types non-empty string', async () => {
      const promise = ask('Project name', 'my-api');
      questionCallback('  my-app  ');
      await expect(promise).resolves.toBe('my-app');
      expect(mockClose).toHaveBeenCalled();
    });

    it('should resolve with default when user types empty string', async () => {
      const promise = ask('Project name', 'my-api');
      questionCallback('');
      await expect(promise).resolves.toBe('my-api');
      expect(mockClose).toHaveBeenCalled();
    });

    it('should resolve with default when user types only whitespace', async () => {
      const promise = ask('Project name', 'my-api');
      questionCallback('   ');
      await expect(promise).resolves.toBe('my-api');
    });

    it('should resolve with empty string when no default and user types empty', async () => {
      const promise = ask('Name');
      questionCallback('');
      await expect(promise).resolves.toBe('');
    });
  });

  describe('askTemplateChoice', () => {
    const templates = [
      { id: 'base', name: 'base', description: 'Express', path: 'base' },
      { id: 'nest', name: 'nest', description: 'NestJS', path: 'nest' },
    ];

    it('should resolve with first template when user enters 1', async () => {
      const promise = askTemplateChoice(templates);
      questionCallback('1');
      await expect(promise).resolves.toEqual(templates[0]);
      expect(mockClose).toHaveBeenCalled();
    });

    it('should resolve with second template when user enters 2', async () => {
      const promise = askTemplateChoice(templates);
      questionCallback('2');
      await expect(promise).resolves.toEqual(templates[1]);
    });

    it('should resolve with first template when user enters invalid input', async () => {
      const promise = askTemplateChoice(templates);
      questionCallback('abc');
      await expect(promise).resolves.toEqual(templates[0]);
    });

    it('should clamp out-of-range index to last template', async () => {
      const promise = askTemplateChoice(templates);
      questionCallback('99');
      await expect(promise).resolves.toEqual(templates[1]);
    });

    it('should clamp negative index to first template', async () => {
      const promise = askTemplateChoice(templates);
      questionCallback('0');
      await expect(promise).resolves.toEqual(templates[0]);
    });
  });
});
