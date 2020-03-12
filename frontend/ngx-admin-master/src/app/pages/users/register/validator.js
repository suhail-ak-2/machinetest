function checkEmail(email) {
  let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!filter.test(email)) return false;
  return true;
}

function checkPassword(password) {
  let filter = /^(?=.{8,})/;
  if (!filter.test(password)) return false;
  return true;
}

function validate(user) {
  if (user.username == ``) {
    return { mgs: "Enter username", status: false };
  }
  if (!checkEmail(user.email)) {
    return { mgs: "Enter valid email address", status: false };
  }
  if (user.phone == ``) {
    return { mgs: "Enter phone number", status: false };
  }
  if (!checkPassword(user.password)) {
    return { mgs: "Password must be atleast 8 character long", status: false };
  }
  return {
    msg: "All fields are valid",
    status: true
  };
}

module.exports = { validate };
