export interface Administrator {
  userId: number;
  email: string;
  role: AdminType;
}

export enum AdminType {
  admin = 'Admin',
  owner = 'Owner',
  manager = 'Manager',
  viewer = 'Viewer',
}
