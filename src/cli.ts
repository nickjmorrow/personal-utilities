#!/usr/bin/env node
import "reflect-metadata";
import program from "commander";
import { DatabaseSavingRequest } from "./modules/database-saving";
import { DatabaseSaver } from "./modules/database-saving/database-saver";
import { container } from "tsyringe";
import {
  DatabaseRestorer,
  DatabaseRestoreRequest,
} from "./modules/database-restoration";

program.command("save [label] [databaseName]").action((label, databaseName) => {
  const databaseSaveRequest: DatabaseSavingRequest = {
    label: label || null,
    databaseName: databaseName || null,
  };
  const databaseSaver = container.resolve(DatabaseSaver);
  databaseSaver.saveDatabase(databaseSaveRequest);
});

program
  .command("restore [label] [databaseName]")
  .action((label, databaseName) => {
    const databaseRestoreRequest: DatabaseRestoreRequest = {
      label: label,
      databaseName: databaseName,
    };
    const databaseRestorer = container.resolve(DatabaseRestorer);
    databaseRestorer.restoreDatabase(databaseRestoreRequest);
  });

program.parse(process.argv);
