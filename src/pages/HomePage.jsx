import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries`)
      .then((response) => {
        setCountries(response.data);
        setIsLoading(false);
      });
  }, []);

  console.log(countries);

  return isLoading ? (
    <h1>LOADING...</h1>
  ) : (
    <div>
      <nav className='navbar navbar-dark bg-primary mb-3'>
        <div className='container'>
          <a className='navbar-brand' href='/'>
            WikiCountries
          </a>
        </div>
      </nav>

      <div
        className='container'
        style={{ maxHeight: '90vh', overflow: 'scroll' }}
      >
        <h1 style={{ fontSize: '24px' }}>
          WikiCountries: Your Guide to the World
        </h1>

        <div className='list-group'>
          {countries.map((country) => {
            return (
              <Link key={country._id} to={'/' + country.alpha3Code}>
                <img
                  src={
                    'https://flagpedia.net/data/flags/icon/72x54/' +
                    country.alpha2Code.toString().toLowerCase() +
                    '.png'
                  }
                />
                <a className='list-group-item list-group-item-action'>
                  {country.name.common}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
