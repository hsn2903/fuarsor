// lib/search-utils.ts
export type SearchParams = {
  fuarIsmi?: string;
  fuarKategori?: string;
  fuarTur?: string;
  page?: string;
  limit?: string;
};

export function createSearchParams(params: SearchParams): URLSearchParams {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });

  return searchParams;
}

export function parseSearchParams(searchParams: URLSearchParams): SearchParams {
  return {
    fuarIsmi: searchParams.get("fuarIsmi") || undefined,
    fuarKategori: searchParams.get("fuarKategori") || undefined,
    fuarTur: searchParams.get("fuarTur") || undefined,
    page: searchParams.get("page") || undefined,
    limit: searchParams.get("limit") || undefined,
  };
}
