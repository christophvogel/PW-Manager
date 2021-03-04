import dotenv from "dotenv";
import { hasAccess, handleSetPassword, handleGetPassword } from "./commands";
import {
  closeDB,
  connectDB,
  createPasswordDoc,
  deletePasswordDoc,
  getCollection,
  updatePasswordValue,
} from "./db";
import { printWelcomeMessage, printNoAccess } from "./messages";
import { askForCredentials, askForAction } from "./questions";
dotenv.config();

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    await connectDB(url, "PW-Manager-Christoph");

    printWelcomeMessage();
    const credentials = await askForCredentials();
    if (!hasAccess(credentials.masterPassword)) {
      printNoAccess();
      run();
      return;
    }
    const action = await askForAction();
    switch (action.command) {
      case "set":
        await handleSetPassword(action.passwordName);
        break;
      case "get":
        await handleGetPassword(action.passwordName);
        break;
      case "delete":
        await deletePasswordDoc(action.passwordName);
    }
    await closeDB();
  } catch (error) {
    console.error(error);
  }
};

run();
