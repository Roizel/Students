import http from "../../http_common";
class PaginationService {
    sortingStudents(data) {
        return http.post("api/pagination/studentpagination", data);
    }

    sortingCourses(data) {
        return http.post("api/pagination/coursepagination", data);
    }

    sortingCourseWithSubs(data) {
        return http.post("api/pagination/sortcoursessubspagination", data);
    }
}
export default new PaginationService();  