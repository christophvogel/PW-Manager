import dotenv from "dotenv";
import { closeDB, connectDB, createPasswordDoc, getCollection } from "./db";
dotenv.config();

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    await connectDB(url, "PW-Manager-Christoph");
    await createPasswordDoc({ name: "Christoph", value: "1111" });
    await closeDB();
  } catch (error) {
    console.error(error);
  }
  /*  printWelcomeMessage();
  const credentials = await askForCredentials();
  if (!hasAccess(credentials.masterPassword)) {
    printNoAccess();
    run();
    return;
  }
  const action = await askForAction();
  switch (action.command) {
    case "set":
      handleSetPassword(action.passwordName);
      break;
    case "get":
      handleGetPassword(action.passwordName);
      break;
  } */
};

run();