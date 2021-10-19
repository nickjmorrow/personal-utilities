import { ParsingFailureReason } from '../constants/parsing-failure-reason.enum';

export type ParsablePathNameResult =
    | {
          canParse: true;
      }
    | {
          canParse: false;
          reason: ParsingFailureReason;
      };
