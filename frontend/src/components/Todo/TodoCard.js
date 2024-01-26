import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

const TodoCard = ({ items, id, delid, display, updateId, toBeUpdate }) => {
  const { task, status } = items;

  return (
    <div className="m-2 sub-card d-flex flex-column align-items-center">
      <h4>{task}</h4>
      <span>{status}</span>
      <div className="icons d-flex align-items-center">
        <div
          className="m-3"
          onClick={() => {
            display("block");
            toBeUpdate(updateId);
          }}
        >
          <MdModeEdit className="edit" />
          <span>Update</span>
        </div>
        <div
          onClick={() => {
            delid(id);
          }}
        >
          <MdDeleteForever className="delete" />
          <span>Delete</span>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
