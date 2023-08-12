import { IDynamicShapeItem, IPosition, IShape, IStepDynamicService } from "../interface";
import { Civilian } from "../items/civilian";
import { Warrior } from "../items/warrior";

export default class StepDynamicHandler implements IStepDynamicService {
  public getNextMoveForShapeItem(element: IDynamicShapeItem, shape: IShape): IPosition {
    let nextMove: IPosition = element.nextMove;

    // Attack action if Warrior has target
    if (element instanceof Warrior && element.currentTarget) this.attackWarrior(element, nextMove);

    // Next move should be a free space only for Civilian
    if (element instanceof Civilian && !shape.isSpace(nextMove)) {
      // Is Previous step a free space ?
      if (shape.isSpace(element.prevStep)) nextMove = element.prevStep;
      // stay on the current position if place is taken
      else nextMove = element.position;
    }

    // Step back if nextMove is outside position
    if (!shape.isPositionInsideShape(nextMove)) nextMove = element.prevStep;

    return nextMove;
  }

  public getAliveItems(elements: IDynamicShapeItem[]): IDynamicShapeItem[] {
    return elements.filter((e) => !e.isDead);
  }

  private attackWarrior(element: Warrior, nextMove: IPosition) {
    const { x: targetX, y: targetY } = element.currentTarget.position;
    const { x: nextX, y: nextY } = nextMove;

    if (nextX === targetX && nextY === targetY) this.killItem(element.currentTarget);
  }

  private killItem(item: IDynamicShapeItem) {
    item.isDead = true;
  }
}