export default function getUsers(usersNumber) {
  return fetch(`https://api.randomuser.me/?results=${usersNumber}`)
    .then((res) => res.json())
    .then((res) => res.results);
}
