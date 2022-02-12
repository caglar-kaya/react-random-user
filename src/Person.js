function Person(person) {
  if (person.person === null) {
    return null;
  }

  let { first_name, last_name, email } = person.person;

  if (!email) {
    email = '--';
  }

  if (!first_name) {
    first_name = '--';
  }

  if (!last_name) {
    last_name = '--';
  }

  return (
    <>
      <ul>
        <li>First Name: {first_name}</li>
        <li>Last Name: {last_name}</li>
        <li>Email: {email}</li>
      </ul>
    </>
  );
}

export default Person;
