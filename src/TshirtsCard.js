import Button from 'react-bootstrap/Button';

function TshirtsCard({ tshirts, notify }) {
    function handleDelete() {
      fetch(`https://game-store-service.herokuapp.com/tshirts/${tshirts.id}`, {
        method: "DELETE",
      })
        .then(() => notify({ action: "delete", tshirts: tshirts }))
        .catch((error) => notify({ action: "delete", error: error }));
    }
  
    return (
      <tr key={tshirts.tshirtsId}>
        <td>{tshirts.size}</td>
        <td>{tshirts.color}</td>
        <td>{tshirts.description}</td>
        <td>{tshirts.price}</td>
        <td>{tshirts.quantity}</td>
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
            onClick={() => notify({ action: "edit-form", tshirts: tshirts })}
          >
            Edit
          </Button>
        </td>
      </tr>
    );
  }
  
  export default TshirtsCard;
  