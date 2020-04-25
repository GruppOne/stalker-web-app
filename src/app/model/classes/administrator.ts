export interface Administrator {
  id: number;
  email: string;
  role: AdminType;
}

export enum AdminType {
  manager = 'Manager',
  viewer = 'Viewer',
}
