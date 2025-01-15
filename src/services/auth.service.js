const users = [
  {
    _id: "u101",
    fullname: "Admin User",
    username: "admin",
    password: "admin13579",
    isAdmin: true,
  },
  {
    _id: "u102",
    fullname: "Regular User",
    username: "user",
    password: "user123",
    isAdmin: false,
  },
];

export const AuthService = {
  login: async (username, password) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) throw new Error("Invalid username or password");
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
  },

  getLoggedInUser: () => {
    return JSON.parse(localStorage.getItem("loggedInUser"));
  },

  signup: async (fullname, username, password) => {
    if (users.some((u) => u.username === username)) {
      throw new Error("Username already exists");
    }
    const newUser = {
      _id: `u${Date.now()}`,
      fullname,
      username,
      password,
      isAdmin: false,
    };
    users.push(newUser);
    return newUser;
  },
};
