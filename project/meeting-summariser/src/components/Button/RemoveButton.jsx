import './Button.css';
import axios from 'axios';

const RemoveButton = ({ savedSummaryId, setSavedSummaryId }) => 
{
  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/delete/${savedSummaryId}`)
      .then((res) => {
        console.log(res.data);
        setSavedSummaryId('');
		window.location.reload(); // Refresh the page
      })
      .catch((err) => {
        console.log(err);
      });
  };

	return (
		<div className="remove_button" onClick={handleDelete}>
		Delete Recording
		</div>
	);
}

export default RemoveButton;
