import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NoteItem = ({ note }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div
      className="note"
      style={{
        backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
        color: note.isStaff ? '#fff' : '#000',
      }}
    >
      <h4>
        Note from{' '}
        {note.isStaff ? (
          <span>Staff: {note.staffId}</span>
        ) : (
          <span>{user.name}</span>
        )}{' '}
      </h4>
      <div>{note.text}</div>
      <div className="note-date">
        {new Date(note.createdAt).toLocaleString('ko-KR')}
      </div>
    </div>
  );
};

export default NoteItem;
