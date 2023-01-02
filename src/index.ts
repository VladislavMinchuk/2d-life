import { Drawer } from "./drawer";
import { Shape } from "./shapes/shape";
import PredatorFactory from "./factories/predator-factory";
import OrganismFactory from "./factories/organism-factory";
import StepDynamicHandler from "./services/step-dynamic-items";


const field = new Shape({ width: 10, height: 10});
const predatorFactory = new PredatorFactory(field);
const orgFact = new OrganismFactory();

const pr = predatorFactory.create({ x: 1, y: 1 });
const pr2 = predatorFactory.create({ x: 3, y: 3 });
const myOrganism = orgFact.create({ x: 8, y: 1 });
const myOrganism2 = orgFact.create({ x: 2, y: 2 });
const myOrganism3 = orgFact.create({ x: 8, y: 8 });
const myOrganism4 = orgFact.create({ x: 5, y: 8 });

const drawer = new Drawer(
    {
      shape: field,
      dynamic: {
        items: [myOrganism2, myOrganism, myOrganism3, myOrganism4, pr, pr2],
        handler: new StepDynamicHandler()
      }
    }
  );

  
// drawer.show();
// drawer.step();

const start = (() => {
  let i = 0;
  drawer.show();
  
  drawer.step();
  // const t = setInterval(() => {
    
  //   if (i > 100) {
  //     drawer.show();
  //     clearInterval(t)
  //   } else {
  //     // setTimeout(() => {
  //     //   drawer.clearConsoleAndScrollbackBuffer();
  //     // }, 1000);
  //   }
  //   i++;
  // }, 1000);
})();
