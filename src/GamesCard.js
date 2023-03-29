import Button from 'react-bootstrap/Button';

function GamesCard({ games, notify }) {
    function handleDelete() {
      fetch(`https://game-store-service.herokuapp.com/games/${games.id}`, {
        method: "DELETE",
      })
        .then(() => notify({ action: "delete", games: games }))
        .catch((error) => notify({ action: "delete", error: error }));
    }
  
    return (
      <tr key={games.gamesId}>
        <td>{games.title}</td>
        <td>{games.esrbRating}</td>
        <td>{games.description}</td>
        <td>{games.price}</td>
        <td>{games.studio}</td>
        <td>{games.quantity}</td>
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
            onClick={() => notify({ action: "edit-form", games: games })}
          >
            Edit
          </Button>
        </td>
      </tr>
    );
  }
  
  export default GamesCard;
  