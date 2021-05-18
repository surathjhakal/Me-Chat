function getRecipientEmail(users, userLoggedIn) {
  return users[0] === userLoggedIn ? users[1] : users[0];
}

export default getRecipientEmail;
