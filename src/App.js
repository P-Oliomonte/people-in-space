import React from "react";
import "./App.css";

function App() {
  const [peopleInSpace, setPeopleInSpace] = React.useState(null);

  async function getPeopleInSpace() {
    const response = await fetch("http://api.open-notify.org/astros.json");
    const data = await response.json();

    return data;
  }

  React.useEffect(() => {
    async function fetchData() {
      const data = await getPeopleInSpace();
      setPeopleInSpace(data);
    }
    fetchData();
  }, []);

  console.log(peopleInSpace);

  return (
    <div>
      <main className="main-container">
        <div className="content-container">
          <h1 className="headline">PEOPLE IN SPACE</h1>
          <h2 className="subheadline">
            The current number of people in space is{" "}
          </h2>
          <h2 className="number">
            {peopleInSpace ? peopleInSpace.number : "...loading"}
          </h2>
          <ul className="list">
            {peopleInSpace
              ? peopleInSpace.people.map((person) => (
                  <li className="list-item" key={person.name}>
                    <strong>{person.name}</strong> is currently in space on{" "}
                    <strong>{person.craft}</strong>
                  </li>
                ))
              : "...loading"}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
