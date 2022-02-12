import { useEffect, useState } from 'react';
import Person from './Person';

function PersonController() {
  const [person, setPerson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getPerson() {
    try {
      const response = await fetch('https://www.randomuser.me/api?results=1');
      const person = await response.json();
      const personFiltered = {
        first_name: person.results[0].name.first,
        last_name: person.results[0].name.last,
        email: person.results[0].email,
      };
      setPerson(personFiltered);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPerson();
  }, []);

  return (
    <div>{isLoading ? <div>Loading...</div> : <Person person={person} />}</div>
  );
}

export default PersonController;
