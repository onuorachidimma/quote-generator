import { useState, useEffect } from "react";
import "../components/quotesGenerator.css";
const QuoteGenerator = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchQuote() {
    setLoading(true);
    try {
      const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": "lENk+PliEwBlzKDT8CQWXw==uWttSIjvlpIqkju2",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch quotes");
      }

      const data = await res.json();
      if (data && data.length > 0) {
        setQuote(data[0].quote);
        setAuthor(data[0].author);
        setQuote("No quote found");
        setAuthor("");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="quoteContainer">
      <div className="container">
        <p className="quote">{quote}</p>
        <i className="author">{author && `- ${author}`}</i>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="buttonContainer">
          <button onClick={fetchQuote}>Generate Quote</button>
          {loading && <div className="loader"></div>}
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;
