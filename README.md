## 2d life (CLI project)
Stable version. Release 1.0.0

### Get started
#### Install packages
```Bash
npm install
```
#### Run app
```Bash
npm start
```
Look at your console

### Short description
#### Game map:
Default map has size of 10x10 cells.

#### Game characters:
- **Civilian** (*o* - symbol) - simple character, without radar, moves only one cell forward, can't looks around, random blind steps;
- **Warrior** (*x* - symbol) - has radar, can hunt for Civilian, moves to random cell if has no around Civilian character, moves only one cell forward;
