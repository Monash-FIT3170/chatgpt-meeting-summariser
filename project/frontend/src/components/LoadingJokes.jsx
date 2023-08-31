import React, { useState, useEffect } from 'react';
import styles from './LoadingJokes.module.css';

const LoadingJokes = () => {
  const [index, setIndex] = useState(0);
  const jokes = [
    "Why did ChatGPT get hired to summarize meetings? Because it's really good at 'meeting' expectations!",
    "ChatGPT walked into a meeting and said, 'I'm here to take notes and chew bubblegum... and I'm all out of bubblegum!'",
    "Why did ChatGPT become a meeting summarizer? Because it can handle 'byte'-sized information!",
    "Why did ChatGPT start attending meetings? To prove that it's not just a 'virtual' participant!",
    "Why was ChatGPT the best choice for meeting summaries? Because it never forgets, unlike some human attendees!",
    "ChatGPT's favorite part of summarizing meetings? Finding the 'punchline' of the conversation!",
    "How does ChatGPT like its coffee during meetings? With a little 'byte' of cream and a 'sum' of sugar!",
    "Why did ChatGPT go to the meeting? To 'interface' with important information!",
    "ChatGPT's advice for a successful meeting summary? Just 'input' the main points and 'output' the rest!",
    "Why did ChatGPT start summarizing board meetings? Because it wanted to be the 'board's' best friend!",
    "Why did ChatGPT always volunteer for meeting summaries? Because it was 'programmed' to excel at it!",
    "What do you call a meeting that ChatGPT summarizes? A 'bytes'-sized conference!",
    "Why did ChatGPT join the business meeting? To add a touch of 'AI' to the conversation!",
    "Why was ChatGPT a great choice for summarizing team huddles? Because it's 'text'-book perfect!",
    "Why did ChatGPT start summarizing brainstorming sessions? Because it wanted to be the 'bright' side of the meeting!",
    "Why was ChatGPT a hit at the sales meeting? Because it had the perfect 'pitch' for summaries!",
    "What's ChatGPT's favorite part of summarizing meetings? Finding the 'kernel' of the discussion!",
    "Why did ChatGPT get an award for meeting summaries? Because it's always 'ahead' of the curve!",
    "What does ChatGPT say when it finishes summarizing a long meeting? 'I've 'coded' the highlights for you!'",
    "Why did ChatGPT start attending project meetings? To help 'debug' the complexities!",
    "Why did ChatGPT start summarizing conference calls? Because it wanted to 'ring' in the important points!"
]

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % jokes.length);
    }, 10000); // Adjust the duration as needed

    return () => {
      clearInterval(interval);
    };
  }, jokes);

  return (
    <div className={styles.loading_object}>
      <div className={styles.text}>
        {jokes.map((str, i) => (
          <div
            key={i}
            className={i === index ? styles.text_item_visible : styles.text_item}
          >
            {str}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingJokes;