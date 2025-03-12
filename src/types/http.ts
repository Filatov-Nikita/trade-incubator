export type Response<T> = {
  data: T,
}

export interface Links {
  first: string,
  last: string,
  next: string | null,
  prev: string | null,
}

export interface MetaLink {
  active: boolean,
  label: string,
  url: string | null,
}

export interface Meta {
  current_page: number,
  from: number,
  last_page: number,
  path: string,
  per_page: number,
  to: number,
  total: number,
  links: MetaLink[],
}

export type ResponsePag<T> = Response<T[]> & { links: Links, meta: Meta };
