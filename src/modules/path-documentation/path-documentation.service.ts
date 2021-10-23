import { injectable } from 'tsyringe';
import { InvalidArgumentException } from '../utilities/exceptions/invalid-argument.exception';
import { NotImplementedException } from '../utilities/exceptions/not-implemented.exception';
import { ParsingFailureReason } from './constants/parsing-failure-reason.enum';
import { pathNames } from './constants/path-name.constants';
import { AssetType } from './types/asset-type.enum';
import { ParsablePathNameResult } from './types/parsable-path-name-result.interface';
import { PathNode } from './types/path-node.interface';
import { Step } from './types/step.enum';

@injectable()
export class PathDocumentationService {
    orderedSteps = ['SAMPLE_QUEUE', 'PATH_REVIEW_QUEUE'];

    generatePathDiagram() {
        const pathNodes = pathNames
            .filter(this.isParsablePathName)
            .map(this.convertToPathNode)
            .filter(this.isInOrderedSteps);
        const uniqueSteps = Array.from(
            new Set([...pathNodes.map((pn) => pn.previousStep), ...pathNodes.map((pn) => pn.nextStep)]),
        );
        const uniqueAssetTypes = Array.from(new Set([...pathNodes.map((pn) => pn.assetType)]));

        throw new NotImplementedException();
    }

    isInOrderedSteps(pathNode: PathNode): boolean {
        return (
            this.orderedSteps.includes(pathNode.nextStep) &&
            (pathNode.previousStep ? this.orderedSteps.includes(pathNode.previousStep) : true)
        );
    }

    isParsablePathName(pathName: string): boolean {
        const numDoubleUnderscores = (pathName.match(/__/g) || []).length;
        const validNumDoubleUnderscores = [1, 2];
        if (!validNumDoubleUnderscores.includes(numDoubleUnderscores)) {
            return false;
        }

        return true;
    }

    convertToPathNode(pathName: string): PathNode {
        const numDoubleUnderscores = (pathName.match(/__/g) || []).length;
        const numDoubleUnderScoresToMethodMapping = {
            1: this.convertToFullPath,
            2: this.convertToPartialPath,
        } as const;

        const method:
            | undefined
            | typeof numDoubleUnderScoresToMethodMapping[keyof typeof numDoubleUnderScoresToMethodMapping] =
            numDoubleUnderScoresToMethodMapping[numDoubleUnderscores];

        if (method === undefined) {
            throw new Error(`Unexpected number of double underscores: ${numDoubleUnderscores}`);
        }

        return method(pathName);
    }

    convertToFullPath(pathName: string): PathNode {
        const firstDoubleUnderscoreIndex = pathName.indexOf('__');
        const secondDoubleUnderscoreIndex = pathName.indexOf('__', firstDoubleUnderscoreIndex);
        const previousStep = pathName.substring(0, firstDoubleUnderscoreIndex);
        const assetType = pathName.substring(firstDoubleUnderscoreIndex, secondDoubleUnderscoreIndex);
        const nextStep = pathName.substring(secondDoubleUnderscoreIndex, pathName.length);

        return {
            previousStep,
            assetType,
            nextStep,
        };
    }

    convertToPartialPath(pathName: string): PathNode {
        const firstDoubleUnderscoreIndex = pathName.indexOf('__');
        const secondDoubleUnderscoreIndex = pathName.indexOf('__', firstDoubleUnderscoreIndex);
        const previousStep = pathName.substring(0, firstDoubleUnderscoreIndex);
        const assetType = pathName.substring(firstDoubleUnderscoreIndex, secondDoubleUnderscoreIndex);

        return {
            previousStep,
            assetType,
        };
    }
}
