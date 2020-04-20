export interface Administrator {
  email: string;
  role: AdminType;
}

export interface AdminType {
  value: string;
  viewValue: string;
}
