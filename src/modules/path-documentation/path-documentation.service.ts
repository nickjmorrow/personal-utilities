import { injectable } from 'tsyringe';
import { NotImplementedException } from '../utilities/exceptions/not-implemented.exception';
import { pathNames } from './constants/path-name.constants';
import { PathNode } from './types/path-node.interface';

@injectable()
export class PathDocumentationService {
    generatePathDiagram() {
		const pathNodes = pathNames.filter(this.isParsablePathName);
		throw new NotImplementedException();
    }

    isParsablePathName(pathName: string) {
        throw new NotImplementedException();
    }

    convertToPathNode(pathName: string) {
		const numDoubleUnderscores = 
	}
}
