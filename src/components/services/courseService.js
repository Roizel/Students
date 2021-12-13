import http from "../../http_common";
class courseService {

    all() {
        return http.get("api/course/allcourses");
    }
    delete(id) {
        return http.delete(`api/course/deletecourse/${id}`);
    }
    create(data) {
        return http.post("api/course/createcourse", data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    edit(id) {
        return http.get(`api/course/editcourse/${id}`);
    }
    save(data) {
        return http.put("api/course/savecourse", data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    signup(data) {
        return http.post("api/course/signupcourse", data);
    }
}

export default new courseService();