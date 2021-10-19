import { injectable } from "tsyringe";
import { getFileNameFromLabel } from "../core/getFileNameFromLabel";

const { exec } = require("child_process");

export interface DatabaseSavingRequest {
  databaseName: string | null;
  label: string | null;
}

const DEFAULT_DATABASE_NAME = "lims";

@injectable()
export class DatabaseSaver {
  public saveDatabase = (databaseSavingRequest: DatabaseSavingRequest) => {
    let { label, databaseName } = databaseSavingRequest;

    if (databaseName === null) {
      databaseName = DEFAULT_DATABASE_NAME;
    }
    if (label === null) {
      label = "backup";
    }
    console.log(
      `Creating backup for database '${databaseName}' with label '${label}'.`
    );

    const fileName = getFileNameFromLabel(label);

    const command = `pg_dump ${databaseName} --clean --if-exists --file=${fileName} --no-owner --port=5433`;

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Database ${databaseName} saved to ${fileName}.`);
        if (stdout) {
          console.log(`stdout: ${stdout}`);
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
        }
      }
    });
  };
}
