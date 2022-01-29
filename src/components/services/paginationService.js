import http from "../../http_common";
class PaginationService {
    allStudents() {
        return http.get("api/pagination/allstudents");
    }
    sortingStudents(data) {
        return http.post("api/pagination/studentpagination", data);
    }

    allCourses() {
        return http.get("api/pagination/allcourses");
    }
    sortingCourses(data) {
        return http.post("api/pagination/coursepagination", data);
    }
}
export default new PaginationService();  