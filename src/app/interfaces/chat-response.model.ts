export interface IChat {
  id: string;
  created_at: string;
  text: string;
  editable: boolean;
  sender: string;
  users: Users;
}

export interface Users {
  id: string;
  full_name: string;
  avatar_url: string;
}
