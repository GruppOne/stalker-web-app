export interface Administrator {
  email: string;
  role: AdminType;
}

export enum AdminType {
  manager = 'Manager',
  viewer = 'Viewer',
}
