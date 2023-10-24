export interface AddProjectRequest {
  project_name: string;
  description: string;
  image: string;
  start_date: string;
  end_date: string;
  link: string;
  account_id: number;
}


export interface AddNiSitProjectRequest {
  certificate: string;
  description: string;
}
