import { useState, useEffect } from "react";
import TshirtsCard from "./TshirtsCard.js";
import TshirtsForm from "./TshirtsForm.js";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function Tshirts() {
  const [tshirts, setTshirts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [scopedTshirts, setScopedTshirts] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    fetch("https://game-store-service.herokuapp.com/tshirts")
      .then((response) => response.json())
      .then((result) => setTshirts(result))
      .catch(console.log);
  }, []);

  function addClick() {
    // const now = new Date();
    setScopedTshirts({
      id: 0,
      size: "",
      color: "",
      description: "",
      price: "",
      quantity: "",
    });
    setShowForm(true);
  }

  function notify({ action, tshirts: tshirtsAdd, error }) {
    if (error) {
      setError(error);
      setShowForm(false);
      return;
    }

    switch (action) {
      case "add":
        setTshirts([...tshirtsAdd, tshirts]);
        break;
      case "edit":
        setTshirts(
          tshirts.map((e) => {
            if (e.id === tshirtsAdd.id) {
              return tshirts;
            }
            return e;
          })
        );
        break;
      case "edit-form":
        setScopedTshirts(tshirtsAdd);
        setShowForm(true);
        return;
      case "delete":
        setTshirts(tshirts.filter((e) => e.id !== tshirtsAdd.id));
        break;
      default:
        console.log("You have entered an invalid choice! Try again!");
        break;
    }

    setError("");
    setShowForm(false);
  }

  if (showForm) {
    return <TshirtsForm tshirts={scopedTshirts} notify={notify} />;
  }

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        <h1 id="tshirtsTitle">Tshirts</h1>
        <Button className="btn btn-primary" type="button" onClick={addClick}>
          Add a Tshirt
        </Button>
        <Container fluid>
            <div className="table-div">
        <table id="tshirts">
          <tr>
            <th>size</th>
            <th>color</th>
            <th>description</th>
            <th>price</th>
            <th>quantity</th>
            <th>actions</th>
          </tr>
          <tbody>
            {tshirts.map((r) => (
              <TshirtsCard key={r.id} tshirts={r} notify={notify} />
            ))}
          </tbody>
        </table>
        </div>
        </Container>
      </div>
    </>
  );
}

export default Tshirts;
