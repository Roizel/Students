import http from "../../http_common";
class PaginationService {
    all() {
        return http.get("api/pagination/allstudents");
    }
    sorting(data) {
        return http.post("api/pagination/studentpagination", data);
    }
}
export default new PaginationService();  