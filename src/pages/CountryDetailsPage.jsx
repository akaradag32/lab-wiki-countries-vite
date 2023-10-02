import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CountryDetails() {
  const [country, setCountry] = useState([]);
  const param = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        'https://ih-countries-api.herokuapp.com/countries/' +
          param.countryId.toUpperCase()
      )
      .then((response) => {
        setCountry(response.data);
        setIsLoading(false);
      });
  }, []);

  console.log(country);

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

      <div className='container'>
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Country Details</p>

        <h1>{country.name.common}</h1>

        <table className='table'>
          <thead></thead>
          <tbody>
            <tr>
              <td style={{ width: '30%' }}>Capital</td>
              <td>{country.capital[0]}</td>
            </tr>
            <tr>
              <td>Area</td>
              <td>
                {country.area} km
                <sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Borders</td>
              <td>
                <ul>
                  {country.borders.map((neighbour) => {
                    return (
                      <li>
                        <a href='/AND'>{neighbour}</a>
                      </li>
                    );
                  })}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CountryDetails;
