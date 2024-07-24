import { apiClient } from ".";
import { Group } from "../models/group";

export class GroupService {
  private cachedGroupIds: string[] | null = null;

  public async getGroupIdsByUserId(): Promise<string[]> {
    if (this.cachedGroupIds) {
      return this.cachedGroupIds;
    }
    const user_id = sessionStorage.getItem("user_id");
    try {
      const response = await apiClient.get<string[]>(
        `/teacher/groupId/userId/${user_id}`,
      );
      this.cachedGroupIds = response.data;
      return response.data;
    } catch (error) {
      throw new Error("Failed to get group ids");
    }
  }

  public async getGroupById(groupId: string): Promise<Group> {
    try {
      const response = await apiClient.get<Group>(`/group/${groupId}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get group");
    }
  }

  public async deletGroupById(groupId: string): Promise<void> {
    try {
      await apiClient.delete(`/group/${groupId}`);
    } catch (error) {
      throw new Error("Failed to delete group");
    }
  }
}
