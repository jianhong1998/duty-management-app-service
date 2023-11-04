export interface IPaginationResponse {
    totalRecords: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    nextPage: number | null;
    prevPage: number | null;
}
