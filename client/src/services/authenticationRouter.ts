import { createTextChangeRange } from "typescript";
import { UserService } from "../services/userServices";

const userService = new UserService();

export const ifLogged = async () => {
  try {
    let user = await userService.getUserById();

    if (user.role === "Teacher") {
      return "Teacher";
    } else if (user.role === "USER") {
      return "Student";
    } else {
      return "Not";
    }
  } catch (e) {
    console.error("Error checking if logged in:", e);
    return "Not";
  }
};
