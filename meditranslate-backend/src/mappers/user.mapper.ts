// src/mappers/user.mapper.ts

// Define a type for your database user object
export interface DbUser {
  id: number;
  email: string;
  full_name: string;
  role: string;
  created_at: Date;
}

// Define a type for API response user object
export interface ResponseUser {
  id: number;
  email: string;
  fullName: string;
  role: string;
  createdAt: Date;
}

// Map database user to API response user
export const mapUserToResponse = (user: DbUser): ResponseUser => {
  return {
    id: user.id,
    email: user.email,
    fullName: user.full_name,
    role: user.role,
    createdAt: user.created_at
  };
};
