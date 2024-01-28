export function generateRandomTodoId() {
  const factor = Math.random() > 0.5 ? 1000 : 100000;

  return Math.trunc(Math.random() * factor).toString();
}
