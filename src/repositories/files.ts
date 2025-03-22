import type { AxiosInstance } from 'axios';
import { jsonFormData } from 'src/utils/formdata';
import type { Response } from 'src/types/http';

export default function(http: AxiosInstance) {
  return {
    upload(body: UploadBody) {
      return http.post<FileRes>('upload-file', jsonFormData(body));
    },
    remove(id: string | number) {
      return http.delete<void>(`remove-file/${id}`);
    }
  }
}

export interface FileItem {
  id: number,
  size_in_bytes: number,
  mime_type: string,
  url: string,
  created_at: string,
}

export type FileRes = Response<FileItem>;

export interface UploadBody {
  file: File,
}
