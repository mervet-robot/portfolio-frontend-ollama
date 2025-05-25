export interface Responsable {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  active: boolean;
  createdAt?: string; // or Date if you prefer

  profile: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string | null;
    diploma: string | null;
    profilePicture: string | null;
    bio: string | null;
  };
}
