export interface CommentUser {
  id: string;
  name: string;
  role?: string | null;
  image?: string | null;
}

export interface Comment {
  id: string;
  body: string;
  isEdited: boolean;
  user: CommentUser;
  createdAt: string;
  updatedAt: string;
}

export interface CommentVersion {
  id: string;
  body: string;
  editedAt: string;
}

export interface CommentVersionHistory {
  current: { body: string; updatedAt: string };
  versions: CommentVersion[];
}
