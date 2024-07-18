import axios from "axios";
import { apiClient } from ".";

export class UserService {
  // public async login(username: string, password: string){
  //     try {
  //         const response = await axios.post('http://localhost:8080/api/auth/login',
  //             {
  //                 username,
  //                 password
  //             }
  //         );
  //         return response.data as string;
  //     } catch (error) {
  //         throw new Error('Failed to login user');
  //     }
  // }

  public async signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
  ) {
    try {
      const response = await apiClient.post("/user", {
        email,
        firstName,
        lastName,
        password,
        role,
      });
      console.log("Request successful");
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error(
            "Server responded with a status error:",
            error.response.status,
          );
          console.error("Response data:", error.response.data);
          throw new Error(
            `Failed to signup user: ${error.response.status} - ${error.response.data}`,
          );
        } else if (error.request) {
          // Request was made but no response received
          console.error("No response received from server");
          console.error("Request data:", error.request);
          throw new Error(
            "Failed to signup user: No response received from server",
          );
        } else {
          // Something happened in setting up the request
          console.error("Error setting up request:", error.message);
          throw new Error(
            `Failed to signup user: Error setting up request - ${error.message}`,
          );
        }
      } else {
        // Non-Axios error
        console.error("Unexpected error:", error);
        throw new Error(`Failed to signup user: ${error.message}`);
      }
    }
  }

  /*
   const response = await axios.post(
        "https://homework-server.azurewebsites.net/user",
        {
          email,
          firstName,
          lastName,
          password,
          role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  */
}
