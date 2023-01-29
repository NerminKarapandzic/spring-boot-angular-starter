import {Record, RecordAuthResponse} from "pocketbase";

export interface User {
  id: string;
  collectionId: string;
  collectionName: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  verified: boolean;
  emailVisibility: boolean;
  email: string;
  name: string;
  avatar: string;
  roles: string[];
}

export interface TokenResponse {
  token: string;
  refreshToken: string;
  user: User;
}
