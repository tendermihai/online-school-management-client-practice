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

async function addEnrolment(enrolment) {
  let data = await api(`/api/v1/enrolments/add`, "POST", enrolment);

  return data.json();
}

async function addStudent(student) {
  let data = await api("/api/v1/students/add", "POST", student);

  return data.json();
}

async function registerStudent(student) {
  let data = await api("/api/v1/students/register", "POST", student);

  return data.json();
}

async function getBooks() {
  let data = await api("/api/v1/books/all", "GET", null);

  return data.json();
}

async function deleteBooks(id) {
  let data = await api(`/api/v1/books/delete/id/${id}`, "DELETE");
  return data.json();
}

async function updateBooks(book) {
  let data = {
    book,
  };

  let bookResponse = await api("/api/v1/books/update", "PUT", data);

  return bookResponse.json();
}

async function getBookByStudentId(studentId) {
  let data = await api(`/api/v1/books/find/${studentId}`, "GET", null);

  return data.json();
}

async function addBook(book) {
  let data = await api("/api/v1/books/add", "POST", book);

  return data.json();
}
