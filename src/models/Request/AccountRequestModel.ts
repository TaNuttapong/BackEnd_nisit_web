import { RoleEnum } from "../../enums/role.enum";

export interface AccountRequest {
  email: string;
  password: string;
  role: RoleEnum;
  name: string;
  branch: string;
}

export interface AccountUpdateRequest {
  email: string;
  name: string;
  branch: string;
}
