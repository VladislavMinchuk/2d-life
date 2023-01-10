import * as readline from 'readline';

export default new class ConsoleStepService {
  private readStdin() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.resume();
  }
  /**
   * @param fn - Function will call after each SPACE press
   */
  stepHandler(fn: Function) {
    this.readStdin();
    console.log('Press SPACE for the next step and ESC to exit');
    
    process.stdin.on('keypress', (str, key) => {
      if (key.name === 'space') {
        fn();
        
        console.log('Press SPACE for the next step and ESC to exit');
      }
      if (key.name === 'escape') {
        console.log('EXIT');
        process.stdin.resume();
        process.exit();
      }
    });
  }
}