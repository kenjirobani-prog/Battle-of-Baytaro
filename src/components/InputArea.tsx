import React, { useRef, useEffect, useState, useCallback } from 'react';
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
  const isHomeposition = mode === 'homeposition';
  const pendingAutoSubmit = useRef(false);

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

  // Auto-submit for homeposition when input reaches answer length
  useEffect(() => {
    if (!isHomeposition || !word || disabled || !pendingAutoSubmit.current) return;
    if (input.length >= word.answer.length) {
      pendingAutoSubmit.current = false;
      const result = onSubmit();
      if (result === false) {
        setShake(true);
        setTimeout(() => setShake(false), 400);
      }
    }
  }, [input, word, disabled, isHomeposition, onSubmit]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onInputChange(val);
    if (isHomeposition) {
      pendingAutoSubmit.current = true;
    }
  }, [onInputChange, isHomeposition]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const result = onSubmit();
      if (result === false) {
        setShake(true);
        setTimeout(() => setShake(false), 400);
      }
    }
  };

  if (!word) return null;

  const placeholder = isHomeposition ? 'キーを押してね'
    : mode === 'hiragana' ? 'ひらがなを入力...'
    : 'Type the word...';

  return (
    <div className="input-area">
      <div className="word-display">
        <span className={`word-text ${isHomeposition ? 'word-text-large' : ''}`}>{word.display}</span>
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
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>
      <div className="input-hint">
        {isHomeposition ? 'キーを押すだけ！' : 'Enter で確定'}
      </div>
    </div>
  );
};
