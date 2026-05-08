export const readStorageValue = (key, fallback, validValues) => {
  if (typeof window === 'undefined') return fallback;

  const value = window.localStorage.getItem(key);
  if (!validValues) return value ?? fallback;

  return validValues.includes(value) ? value : fallback;
};

export const writeStorageValue = (key, value) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, value);
};
