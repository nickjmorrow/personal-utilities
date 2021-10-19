import { exec } from "child_process";
import { getFileNameFromLabel } from "../core/getFileNameFromLabel";

export interface DatabaseRestoreRequest {
  databaseName: string | null;
  label: string | null;
}

const DEFAULT_DATABASE_NAME = "lims";
const DEFAULT_LABEL = "backup";

export class DatabaseRestorer {
  public restoreDatabase(request: DatabaseRestoreRequest) {
    let {
      databaseName = DEFAULT_DATABASE_NAME,
      label = DEFAULT_LABEL,
    } = request;

    const fileName = getFileNameFromLabel(label);

    const command = `psql ${databaseName} < ${fileName} --quiet --port=5433`;

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Database '${databaseName}' restored from '${fileName}'.`);
        if (stdout) {
          console.log(`stdout: ${stdout}`);
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
        }
      }
    });
  }
}
