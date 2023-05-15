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
      <p>Don't have a user account? Click here to <a href="sign-up.html">sign up</a>!</p>

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
}

async function firstPage(user) {
  let container = document.querySelector("#root");

  container.innerHTML = `
  <header>
  <div class="wrap header--flex">
      <h1 class="header--logo">Courses</h1>
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
      
      <a class="course--module course--add--module">
          <span class="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13"
                  class="add">
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              New Course
          </span>
      </a>
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

  let unsubscribe = document.querySelector(".unsubBtn");

  if (unsubscribe) {
    unsubscribe.addEventListener("click", async () => {
      console.log("enrolemnt", unsubscribe.id);

      await deleteEnrolmentById(unsubscribe.id);
      unsubscribe.classList.remove("unsubBtn");
      unsubscribe.classList.add("subBtn");
      unsubscribe.textContent = "Subscribe";
    });
  }
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
    <button class="subBtn button">Subscribe</button>
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
