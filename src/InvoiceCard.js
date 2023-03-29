import Button  from 'react-bootstrap/Button';

function InvoiceCard({ invoices, notify }) {
    function handleDelete() {
      fetch(`https://game-store-service.herokuapp.com/invoices/${invoices.id}`, {
        method: "DELETE",
      })
        .then(() => notify({ action: "delete", invoices: invoices }))
        .catch(error => notify({ action: "delete", error: error }));
    }
  
    return (
      <tr key={invoices.invoicesId}>
        <td>{invoices.name}</td>
        <td>{invoices.street}</td>
        <td>{invoices.city}</td>
        <td>{invoices.state}</td>
        <td>{invoices.zipCode}</td>
        <td>{invoices.itemType}</td>
        <td>{invoices.itemId}</td>
        {/* <td>{invoices.unitPrice}</td> */}
        <td>{invoices.subTotal}</td>
        <td>{invoices.taxTotal}</td>
        <td>{invoices.processing}</td>
        <td>{invoices.quantity}</td>
        <td>{invoices.total}</td>
        <td>
          <Button
            id="deleteButton"
            className="btn btn-danger mr-3"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </Button>

          <Button
            id="editButton"
            className="btn btn-secondary"
            type="button"
            onClick={() => notify({ action: "edit-form", invoices: invoices })}
          >Edit
</Button>
        </td>
      </tr>
    );
  }
  
  export default InvoiceCard;
  