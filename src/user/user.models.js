import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("data.json");

const db = lowdb(adapter);

const TABLENAME = "users";

export async function getUsers(username) {
  try {
    const data = await db.get(TABLENAME).find({ username: username }).value();
    return data;
  } catch {
    return null;
  }
}

export async function createUser(user) {
  try {
    await db.get(TABLENAME).push(user).write();
    return true;
  } catch {
    return false;
  }
}
