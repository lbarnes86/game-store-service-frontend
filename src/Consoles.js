import { useState, useEffect } from "react";
import ConsoleCard from "./ConsolesCard.js";
import ConsolesForm from "./ConsolesForm.js";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


function Consoles() {
  const [consoles, setConsoles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [scopedConsoles, setScopedConsoles] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    fetch("https://game-store-service.herokuapp.com/consoles")
      .then((response) => response.json())
      .then((result) => setConsoles(result))
      .catch(console.log);
  }, []);

  function addClick() {
    // const now = new Date();
    setScopedConsoles({
      id: 0,
      model: "",
      manufacturer: "",
      memoryAmount: "",
      processor: "",
      price: "",
      quantity: "",
    });
    setShowForm(true);
  }

  function notify({ action, consoles: consolesAdd, error }) {
    if (error) {
      setError(error);
      setShowForm(false);
      return;
    }

    switch (action) {
      case "add":
        setConsoles([...consolesAdd, consoles]);
        break;
      case "edit":
        setConsoles(
          consoles.map((e) => {
            if (e.id === consolesAdd.id) {
              return consoles;
            }
            return e;
          })
        );
        break;
      case "edit-form":
        setScopedConsoles(consolesAdd);
        setShowForm(true);
        return;
      case "delete":
        setConsoles(consoles.filter((e) => e.id !== consolesAdd.id));
        break;
      default:
        console.log("You have entered an invalid choice! Try again!");
        break;
        
    }

    setError("");
    setShowForm(false);
  }

  if (showForm) {
    return <ConsolesForm consoles={scopedConsoles} notify={notify} />;
  }
  console.log(consoles);
  console.log("we did something");
  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        <h1 id="consolesTitle">Consoles</h1>
        <Button className="btn btn-primary" type="button" onClick={addClick}>
          Add a Console
        </Button>
        <Container fluid>
        <div className="table-div">
        <table id="consoles" className="">
          <tr>
            <th>model</th>
            <th>manufacturer</th>
            <th>memoryAmount</th>
            <th>processor</th>
            <th>price</th>
            <th>quantity</th>
            <th>actions</th>

          </tr>
          <tbody>
            {consoles.map((r) => (
              <ConsoleCard key={r.id} consoles={r} notify={notify} />
            ))}
          </tbody>
        </table>
        </div>
        </Container>
      </div>
    </>
  );
}

export default Consoles;
