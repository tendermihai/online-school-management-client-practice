async function signIn() {
  let container = document.querySelector("#root");
  container.innerHTML = `
  <header>
  <div class="wrap header--flex">
      <h1 class="header--logo">Courses</h1>
      <nav>
          <ul class="header--signedout">
              
          </ul>
      </nav>
  </div>
</header>
<main>
  <div class="form--centered">
      <h2>Sign In</h2>

      <section>
          <label for="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" value="">
          <label for="password">Password</label>
          <input id="password" name="password" type="password" value="">
          <button class="button signinBtn" >Sign In</button>
          <button class="button button-secondary">Cancel</button>
      </section>
      <p>Don't have a user account? Click here to <a class="signUp">sign up</a>!</p>

  </div>
</main>
      `;

  let signinBtn = document.querySelector(".signinBtn");

  signinBtn.addEventListener("click", async () => {
    let inptEmail = document.querySelector("#emailAddress").value;
    let inptPass = document.querySelector("#password").value;
    console.log(inptEmail);
    console.log(inptPass);

    try {
      let response = await login(inptEmail, inptPass);
      console.log(response, "this is response");
      alert("este ok");
      firstPage(response);
    } catch (err) {
      alert("Credentiale incorecte");
    }
  });

  let register = document.querySelector(".signUp");

  register.addEventListener("click", () => {
    signUp();
  });
}

async function firstPage(user) {
  let container = document.querySelector("#root");

  container.innerHTML = `
  <header>
  <div class="wrap header--flex">
      <h1 class="header--logo">Courses</h1>
      <h1 class="header--logo books">Books</h1>
      <nav>
          <ul class="header--signedout">
              
              <li>Hello, ${user.firstName}</a></li>
          </ul
          
      </nav>
      <h1 class="header--logout">Log out</h1>
  </div>
</header>
<main>
  <div class="wrap main--grid">
      
      
  </div>
</main>
    `;

  let data = await findEnrolmentByStudent(user.id);
  attachCards(data);
  let logOut = document.querySelector(".header--logout");

  logOut.addEventListener("click", () => {
    signIn();
  });

  console.log(user);

  let unsubscribeButtons = document.querySelectorAll(".unsubBtn");

  unsubscribeButtons.forEach((unsubscribe) => {
    if (unsubscribe) {
      unsubscribe.addEventListener("click", async () => {
        await deleteEnrolmentById(unsubscribe.id).then((response) => {
          firstPage(user);
        });
      });
    }
  });

  let subscribeButtons = document.querySelectorAll(".subBtn");
  subscribeButtons.forEach((subscribe) => {
    subscribe.addEventListener("click", async () => {
      console.log(subscribe.id);
      console.log("am apasat subscribe");

      let enrolment = {
        courseId: subscribe.id,
        studentId: user.id,
        createdAt: getFormattedDate(Date.now()),
        id: guidGenerator(),
      };

      await addEnrolment(enrolment).then(() => {
        firstPage(user);
      });
    });
  });

  let bookBtn = document.querySelector(".books");

  bookBtn.addEventListener("click", async () => {
    booksPage();
  });
}

async function signUp() {
  let container = document.querySelector("#root");

  container.innerHTML = `
  <header>
  <div class="wrap header--flex">
      <h1 class="header--logo">Courses</h1>
      <nav>
          <ul class="header--signedout">
              
          </ul>
      </nav>
  </div>
</header>
<main>
  <div class="form--centered">
      <h2>Sign In</h2>

      <section>
          <label for="firstName">First Name:</label>
          <input id="firstName" name="firstName" type="text">
          <label for="lastName">Last Name:</label>
          <input id="lastName" name="lastName" type="text">
          <label for="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" value="">
          <label for="password">Password</label>
          <input id="password" name="password" type="password" value="">
          <label for="age">Age:</label>
          <input id="age" name="age" type="number" value="">

          <button class="button signupBtn" >Sign Up</button>
          <button class="button button-secondary cancelButton">Cancel</button>
      </section>
      

  </div>
</main>
  `;

  let signupBtn = document.querySelector(".signupBtn");

  signupBtn.addEventListener("click", async () => {
    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let email = document.querySelector("#emailAddress").value;
    let password = document.querySelector("#password").value;
    let age = document.querySelector("#age").value;
    console.log(firstName, lastName, email, password, age);

    await registerStudent({ firstName, lastName, email, password, age }).value;
    signIn();
  });

  let cancel = document.querySelector(".cancelButton");

  cancel.addEventListener("click", () => {
    signIn();
  });
}

function guidGenerator() {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
}

function getFormattedDate(date) {
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear();
  const month = ("0" + (parsedDate.getMonth() + 1)).slice(-2);
  const day = ("0" + parsedDate.getDate()).slice(-2);
  return `${day}-${month}-${year}`;
}

async function booksPage() {
  container = document.querySelector("#root");

  container.innerHTML = `
  <header>
  <div class="wrap header--flex">
      <h1 class="header--logo">Courses</h1>
      <h1 class="header--logo books">Books</h1>
      <nav>
          <ul class="header--signedout"></ul>
      </nav>
      <h1 class="header--logout">Log out</h1>
  </div>
</header>
<main>
  <div class="wrap main--grid"></div>
</main>
`;
  let data = await getBooks();
  attachBookCard(data);
}

function createBookCard(book) {
  let card = document.createElement("a");

  card.classList.add("course--module");
  card.classList.add("course--link");

  card.innerHTML = `
  
  <h2 class="course--label">Book ${book.id}</h2>
    <h3 class="course--title">${book.studentId}</h3>
    <h3 class="course--title">${book.bookName}</h3>
    <h3 class="course--title">${book.createdAt}</h3>
    <div class="btns">
    <button class="unsubBtn button">Book</button>
    </div>
  
  `;

  return card;
}

function attachBookCard(books) {
  let container = document.querySelector(".main--grid");

  books.forEach((book) => {
    container.prepend(createBookCard(book));
  });
}

function createCard(course) {
  let card = document.createElement("a");

  card.classList.add("course--module");
  card.classList.add("course--link");
  if (course.isEnroled) {
    card.innerHTML = `
 
               
    <h2 class="course--label">Course ${course.id}</h2>
    <h3 class="course--title">${course.name}</h3>
    <h3 class="course--title">${course.department}</h3>
    <div class="btns">
    <button class="unsubBtn button" id="${course.enrolmentId}">Unsubscribe</button>
    </div>
`;
  } else {
    card.innerHTML = `
    <h2 class="course--label">Course ${course.id}</h2>
    <h3 class="course--title">${course.name}</h3>
    <h3 class="course--title">${course.department}</h3>
    <div class="btns">
    <button class="subBtn button" id="${course.id}">Subscribe</button>
    </div>
`;
  }

  return card;
}

function attachCards(courses) {
  let container = document.querySelector(".main--grid");
  // container.innerHTML = "";

  courses.forEach((course) => {
    container.prepend(createCard(course));
  });
}
