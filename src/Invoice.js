import { useState, useEffect } from "react";
import InvoiceCard from "./InvoiceCard.js";
import InvoicesForm from "./InvoicesForm.js";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [scopedInvoices, setScopedInvoices] = useState({});
  const [error, setError] = useState();


  useEffect(() => {
    fetchFromAPI();
  }, []);

function fetchFromAPI() {
    fetch("https://game-store-service.herokuapp.com/invoices")
    .then(response => response.json())
    .then(result => { console.log(JSON.stringify(result)); setInvoices(result); })
    .catch(console.log);
}

//   useEffect(() => {
//     fetch("https://game-store-service.herokuapp.com/invoices")
//       .then((response) => {
//         console.log(response);
//         return response.json();
//       })
//       .then((result) => setInvoices(result))
//       .catch(console.log);
//   }, []);

  function addClick() {
    // const now = new Date();
    setScopedInvoices({
      id: 0,
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      itemType: "",
      itemId: "",
      unitPrice: "",
      subTotal: "",
      taxTotal: "",
      processing: "",
      quantity: "",
      total: "",
    });
    setShowForm(true);
  }

  function notify({ action, invoices: invoicesAdd, error }) {
    if (error) {
      setError(error);
      setShowForm(false);
      return;
    }

    switch (action) {
      case "add":
        setInvoices([...invoices, invoicesAdd]);
        break;
      case "edit":
        setInvoices(
          invoices.map(e => {
            if (e.id === invoicesAdd.id) {
              return invoices;
            }
            return e;
          })
        );
        break;
      case "edit-form":
        setScopedInvoices(invoicesAdd);
        setShowForm(true);
        return;
      case "delete":
        setInvoices(invoices.filter(e => e.id !== invoicesAdd.id));
        break;
      default:
        console.log("You have entered an invalid choice! Try again!");
        break;
        
    }

    setError("");
    setShowForm(false);
  }

  if (showForm) {
    return <InvoicesForm invoices={scopedInvoices} notify={notify} />;
  }

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        <h1 id="invoicesTitle">Invoices</h1>
        <Button className="btn btn-primary" type="button" onClick={addClick}>
          Add an Invoice
        </Button>
        <Container fluid>
        <div className="table-div">   
        <table id="invoices" className="invoices-table">
          <tr>
            <th>Name</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>itemType</th>
            <th>itemId</th>
            {/* <th>unitPrice</th> */}
            <th>subTotal</th>
            <th>taxTotal</th>
            <th>processing</th>
            <th>quantity</th>
            <th>total</th>
            <th>actions</th>
          </tr>
          <tbody>
            {invoices.map(r => (
              <InvoiceCard key={r.id} invoices={r} notify={notify} />
            ))}
          </tbody>
        </table>
        </div> 
        </Container>
      </div>
    </>
  );
}

export default Invoices;