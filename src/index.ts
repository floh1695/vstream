interface IMode
{
  execute(message: string): void;
}

class NormalMode
  implements IMode
{
  private _editor: IEditor;

  constructor(editor: IEditor)
  {
    this._editor = editor;
  }

  public execute(message: string): void
  {
    if (message === 'i')
    {
      this._editor.setMode(new InsertMode(this._editor));
    }
  }
}

class InsertMode
  implements IMode
{
  private _editor: IEditor;

  constructor(editor: IEditor)
  {
    this._editor = editor;
  }

  public execute(message: string): void
  {
    if (message === '<esc>')
    {
      this._editor.setMode(new NormalMode(this._editor));
    }
    else
    {
      this._editor.write(message);
    }
  }
}

interface IEditor
{
  setMode(mode: IMode): IEditor;
  write(message: string): IEditor;
  execute(message: string): IEditor;
}

class Editor
  implements IEditor
{
  private _mode: IMode;
  private _buffer: string;

  public constructor()
  {
    this._mode = new NormalMode(this);
    this._buffer = '';
  }

  public setMode(mode: IMode): Editor
  {
    this._mode = mode;
    return this;
  }

  public write(message: string): Editor
  {
    this._buffer = this._buffer.concat(message);
    return this;
  }

  public execute(message: string): Editor
  {
    this._mode.execute(message);
    return this;
  }

  public dump(): Editor
  {
    console.log(this._buffer);
    return this;
  }
}

const main = (): void =>
{
  console.log('Hello world!');

  new Editor()
    .execute('i')
    .execute('hi there')
    .execute('<esc>')
    .execute('apple')
    .dump();
}

main();