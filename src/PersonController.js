import { useEffect, useState } from 'react';
import Person from './Person';

function PersonController() {
  const [person, setPerson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setError] = useState(false);

  useEffect(() => {
    const getPerson = async () => {
      try {
        const response = await fetch('https://www.randomuser.me/api?results=1');
        const data = await response.json();
        const personFromAPI = data.results[0];

        setPerson({
          first_name: personFromAPI.name.first,
          last_name: personFromAPI.name.last,
          email: personFromAPI.email,
        });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    getPerson();
  }, []);

  if (hasError) {
    return 'Oops, something went wrong. Come back later!';
  }

  if (isLoading) {
    return (
      <img src="loading.gif" data-testid={'loading-image'} alt="Loading" />
    );
  }

  return <Person person={person} />;
}

export default PersonController;
