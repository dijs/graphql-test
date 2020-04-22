import { useState, useEffect } from 'react';
import Head from 'next/head';

function useDebounce(value, timeout = 500) {
  const [state, setState] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setState(value), timeout);
    return () => clearTimeout(handler);
  }, [value, timeout]);
  return state;
}

function useCountries() {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const debouncedFilter = useDebounce(filter);
  useEffect(() => {
    async function fetchCountries() {
      const query = `{
        countries(filter:{
          ${debouncedFilter ? `code: { in: "${debouncedFilter}" }` : ''}
        }) {
          code,
          name,
          emoji,
          languages {
            name
          }
        }
      }`;
      const res = await fetch('https://countries.trevorblades.com/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const json = await res.json();
      setCountries(json.data.countries);
    }
    fetchCountries();
  }, [debouncedFilter]);
  return { countries, filter, setFilter };
}

export default function Home() {
  const { countries, filter, setFilter } = useCountries();
  return (
    <div className="container">
      <Head>
        <title>countries and languages</title>
      </Head>
      <input
        type="text"
        value={filter}
        placeholder="Filter by country code"
        onChange={(e) => setFilter(e.target.value.toUpperCase())}
      />
      <div>
        {countries.map(({ name, emoji, languages }) => (
          <div className="country">
            {emoji} people speak{' '}
            {languages.map((e) => (
              <span className="lang">{e.name}</span>
            ))}{' '}
            in <b>{name}</b>
          </div>
        ))}
      </div>
      <style global jsx>{`
        .country {
          padding: 4px;
        }
        input {
          background: #eee;
          border: 0;
          border-radius: 4px;
          padding: 8px;
          margin: 2px;
        }
        .lang {
          color: #444;
          background: #eee;
          border-radius: 4px;
          padding: 4px;
          margin: 2px;
        }
      `}</style>
    </div>
  );
}
