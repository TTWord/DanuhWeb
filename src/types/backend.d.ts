declare interface BackendResponse {
  data?: any;
  message: string;
  status: string;
}

declare interface BookResponse {
  created_at: string;
  id: number;
  is_downloaded: boolean;
  name: string;
  updated_at: string;
  share_id: number;
  comment?: string;
  is_sharing?: boolean;
  word_count: number;
  word_memorized_count: number;
}
