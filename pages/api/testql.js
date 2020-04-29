
import fetch from 'node-fetch'

export default async (req, res) => {
  // Proxy request to a known GraphQL endpoint
  const countryRes = await fetch('https://countries.trevorblades.com/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  });
  const json = await countryRes.json();
  res.send(json)
}