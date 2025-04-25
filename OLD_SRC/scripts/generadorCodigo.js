// Function to generate a random alphanumeric code of a specified length
function makeCode(length) {
  let result = ''; // Initialize an empty string to store the generated code
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
  // A string containing all possible characters for the code (uppercase, lowercase, and digits)
  const charactersLength = characters.length; 
  // The total number of characters available for selection
  let counter = 0; // Counter to keep track of the number of characters added to the result

  // Loop until the desired length of the code is reached
  while (counter < length) {
    // Append a random character from the `characters` string to the result
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1; // Increment the counter
  }

  return result; // Return the generated code
}

// Export the `makeCode` function for use in other modules
export { makeCode };