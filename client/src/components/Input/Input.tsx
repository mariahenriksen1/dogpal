import React, {ChangeEvent, KeyboardEvent} from 'react';
import style from "./Input.module.css";

type CommentInputProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onEnterPress?: () => void; // New prop for handling Enter key press
  placeholder?: string;
  rows?: number;
};

const CommentInput: React.FC<CommentInputProps> = ({
                                                     label,
                                                     value,
                                                     onChange,
                                                     onEnterPress,
                                                     placeholder = 'Type here...',
                                                     rows = 4,
                                                   }) => {
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value); // Pass updated value to parent
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (onEnterPress) {
        onEnterPress();
      }
    }
  };

  return (
    <div className={style.input}>
      {label && (
        <label className="comment-input-label" htmlFor="comment-input">
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        rows={rows}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CommentInput;