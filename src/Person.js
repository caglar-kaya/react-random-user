function Person({ person, onClick }) {
  if (person == null) {
    return null;
  }

  return (
    <ul data-testid={'details'} onClick={onClick}>
      <li>First name: {person.first_name}</li>
      <li>Last name: {person.last_name}</li>
      <li>Email: {person.email}</li>
    </ul>
  );
}

export default Person;
