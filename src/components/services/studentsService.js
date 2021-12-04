import http from "../../http_common";
class studentsService {

    all() {
        return http.get("api/account/allstudents");
    }
    delete(id) {
        return http.delete(`api/account/delete/${id}`);
    }
    // edit(id) {
    //     return http.get(`api/users/edit/${id}`);
    // }
    // save(data) {
    //     return http.put("api/users/save", data,
    //     {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     });
    // }
}

export default new studentsService();