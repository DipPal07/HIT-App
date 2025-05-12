const FormatDate = dateString => {
  const date = new Date(dateString); // Parse the ISO date string into a Date object
  const day = String(date.getDate()).padStart(2, '0'); // Get day (with leading 0 if needed)
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (add 1 since months are 0-indexed)
  const year = date.getFullYear(); // Get full year

  return `${day}-${month}-${year}`;
};

export {FormatDate};
