enum Mode {
  Normal,
  Insert,
}

class Editor {
  public mode: Mode = Mode.Normal;

  public buffer: string;
  public cursor: number = 0;

  public constructor(buffer: string) {
    this.buffer = buffer;
  }

  public interpret(text: string): Editor {
    const mode = this.mode;

    if (mode === Mode.Normal) {
      this.interpretNormal(text);
    } else if (mode === Mode.Insert) {
      this.interpretInsert(text);
    }
    
    return this;
  }

  private interpretNormal(text: string) {
    text
      .split('')
      .forEach((char, index) => {
        if (char === 'i') {
          this.mode = Mode.Insert;

          const leftover = text
            .split('')
            .slice(index + 1)
            .join('');

          this.interpretInsert(leftover);
        }
      });
  }

  private interpretInsert(text: string) {
    console.log(text);
  }
}

const main = (): void => {
  console.log('Hello world!');
  const editor = new Editor('');

  editor
    .interpret('iabc')
    .interpret('abci123');
}

main();