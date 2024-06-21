import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cache, setCacheResults] = useState({});
  const [isResultVisible, setIsResultVisible] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchResults();
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchText]);

  const fetchResults = async () => {
    if (cache[searchText]) {
      setSearchResults(cache[searchText]);
    } else {
      const result = await fetch(
        "https://www.google.com/complete/search?client=firefox&q=" + searchText
      );
      const data = await result.json();
      cache[searchText] = data[1];
      setSearchResults(data[1]);
    }
  };

  const changeHandler = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="App">
      <input
        value={searchText}
        onChange={(e) => changeHandler(e)}
        onFocus={() => setIsResultVisible(true)}
        onBlur={() => setIsResultVisible(false)}
      />
      {searchResults.length > 0 && isResultVisible && (
        <div className="serachResultsContainer">
          {searchResults.map((result, index) => (
            <div key={index} className="result">
              {result}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
