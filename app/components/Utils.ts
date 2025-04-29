export const shuffleArray = (array: string[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const generateDynamicScript = (targetSound: string) => {
  const correctMessage = `Great job! - You found the sound - ${targetSound}. - That's correct! - `;
  const encouragementMessages = [
    "You're doing great! - ",
    "Keep up the good work! - ",
    "You're a sound finding superstar! - ",
    "Awesome job! - ",
    "You've got a great ear! - ",
  ];
  const randomEncouragement =
    encouragementMessages[
      Math.floor(Math.random() * encouragementMessages.length)
    ];

  return `${correctMessage} ${randomEncouragement} Let's try another sound!`;
};
