import Button from 'react-bootstrap/Button';

function ConsolesCard({ consoles, notify }) {
    function handleDelete() {
      fetch(`https://game-store-service.herokuapp.com/consoles/${consoles.id}`, {
        method: "DELETE",
      })
        .then(() => notify({ action: "delete", consoles: consoles }))
        .catch((error) => notify({ action: "delete", error: error }));
    }
  
    return (
      <tr key={consoles.consolesId}>
        <td>{consoles.model}</td>
        <td>{consoles.manufacturer}</td>
        <td>{consoles.memoryAmount}</td>
        <td>{consoles.processor}</td>
        <td>{consoles.price}</td>
        <td>{consoles.quantity}</td>
  
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
            onClick={() => notify({ action: "edit-form", consoles: consoles })}
          >
            Edit
          </Button>
        </td>
      </tr>
    );
  }
  
  export default ConsolesCard;
  