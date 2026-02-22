import React, { useRef, useEffect, useState } from 'react';
import type { WordEntry, GameMode } from '../types';

interface InputAreaProps {
  word: WordEntry | null;
  mode: GameMode;
  input: string;
  onInputChange: (val: string) => void;
  onSubmit: () => boolean | void;
  disabled: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({
  word,
  mode,
  input,
  onInputChange,
  onSubmit,
  disabled,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [shake, setShake] = useState(false);

  // Auto-focus
  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled, word]);

  // Click anywhere to refocus
  useEffect(() => {
    const handler = () => {
      if (!disabled && inputRef.current) {
        inputRef.current.focus();
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [disabled]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const result = onSubmit();
      if (result === false) {
        // Wrong answer - shake
        setShake(true);
        setTimeout(() => setShake(false), 400);
      }
    }
  };

  if (!word) return null;

  return (
    <div className="input-area">
      <div className="word-display">
        <span className="word-text">{word.display}</span>
        {word.meaning && (
          <span className="word-meaning">{word.meaning}</span>
        )}
      </div>
      <div className={`input-wrapper ${shake ? 'input-shake' : ''}`}>
        <input
          ref={inputRef}
          type="text"
          className={`typing-input ${mode === 'hiragana' ? 'typing-input-jp' : ''}`}
          value={input}
          onChange={e => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={mode === 'hiragana' ? 'ひらがなを入力...' : 'Type the word...'}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>
      <div className="input-hint">Enter で確定</div>
    </div>
  );
};
