function api(path, method = "GET", body = null) {
  const url = "http://localhost:2020" + path;

  const options = {
    method,

    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Requested-With": "XMLHttpRequest",
    },
  };

  if (body != null) {
    options.body = JSON.stringify(body);
  }

  return fetch(url, options);
}

async function login(user, pass) {
  let resp = await api("/api/v1/students/login", "POST", {
    email: user,
    password: pass,
  });

  if (resp.status == 200) {
    return resp.json();
  }

  throw new Error("Forbidden");
}

async function getCourses() {
  let data = await api("/api/v1/courses/all", "GET", null);

  return data.json();
}

async function getEnrolment() {
  let data = await api("/api/v1/enrolments/all", "GET", null);
  return data.json();
}

async function findEnrolmentByStudent(studentId) {
  console.log(studentId);
  let data = await api("/api/v1/courses/all/status/" + studentId, "GET", null);
  return data.json();
}

async function deleteEnrolmentById(id) {
  let data = await api(`/api/v1/enrolments/delete/id/${id}`, "DELETE");

  return data.json();
}
