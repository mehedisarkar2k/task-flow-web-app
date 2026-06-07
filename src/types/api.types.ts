export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: FieldError[];
  meta?: PaginationMeta;
}

export interface FieldError {
  field: string;
  message: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
