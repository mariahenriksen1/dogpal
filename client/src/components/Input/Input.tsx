import {ChangeEvent} from 'react';

type CommentInputProps = {
  label: string; // Label for the input field
  value: string; // Current value of the input field
  onChange: (value: string) => void; // Function to call on value change
};

const Input = ({label, value, onChange}: CommentInputProps) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(event.target.value); // Send the updated value to the parent
  };

  return (
    <div className="comment-input">
      <label className="comment-label">{label}</label>
      <textarea
        className="comment-textarea"
        value={value}
        onChange={handleInputChange}
        rows={4} // Adjust rows as needed
        placeholder="Write your comment here..."
      />
    </div>
  );
};

export default Input;