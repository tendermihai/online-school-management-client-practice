async function signIn() {
  let container = document.querySelector("#root");
  container.innerHTML = `
  <header>
  <div class="wrap header--flex">
      <h1 class="header--logo"><a href="index.html">Courses</a></h1>
      <nav>
          <ul class="header--signedout">
              <li><a href="sign-up.html">Sign Up</a></li>
              <li><a href="sign-in.html">Sign In</a></li>
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
      alert("este ok");
      firstPage();
    } catch (err) {
      alert("Credentiale incorecte");
    }
  });
}

async function firstPage() {
  let container = document.querySelector("#root");
  container.innerHTML = `
     <header>
     <div class="wrap header--flex">
         <h1 class="header--logo"><a href="index.html">Courses</a></h1>
        <nav>
            <ul class="header--signedout">
                <li><a href="sign-up.html">Sign Up</a></li>
                <li><a href="sign-in.html">Sign In</a></li>
            </ul>
       </nav>
     </div>
  </header>
   <main>
     <div class="wrap main--grid">
        <a class="course--module course--link" href="course-detail.html">
            <h2 class="course--label">Course</h2>
            <h3 class="course--title">asdasdas </h3>
        </a>
        <a class="course--module course--link" href="course-detail.html">
            <h2 class="course--label">Course</h2>
            <h3 class="course--title">Learn How to Program</h3>
        </a>
        <a class="course--module course--link" href="course-detail.html">
            <h2 class="course--label">Course</h2>
            <h3 class="course--title">Learn How to Test Programs</h3>
       </a>
        <a class="course--module course--add--module" href="create-course.html">
            <span class="course--add--title">
               <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
               viewBox="0 0 13 13" class="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                New Course
            </span>
        </a>
    </div>
   </main>
    `;

  // let data = await getCourses();
  // console.log(data, "acestea sunt cursurile");
  // attachCards(data);
}

// function createCard(course) {
//   let container = document.querySelector("#root");

//   container.innerHTML = `
//   <div class="wrap main--grid">
//                 <a class="course--module course--link" href="course-detail.html">
//                     <h2 class="course--label">Course ${course.id}</h2>
//                     <h3 class="course--title">${course.name}</h3>
//                     <h3 class="course--title">${course.department}</h3>
//                 </a>

//             </div>
//   `;

//   return container;
// }

// function attachCards(courses) {
//   let container = document.querySelector(".#root");
//   container.innerHTML = "";

//   courses.forEach((course) => {
//     container.appendChild(createCard(course));
//   });
// }
