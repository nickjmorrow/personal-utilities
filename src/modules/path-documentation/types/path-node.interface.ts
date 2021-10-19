import { AssetType } from './asset-type.enum';
import { Step } from './step.enum';

export interface PathNode {
    previousStep: Step;
    assetType: AssetType;
    nextStep: Step;
}
