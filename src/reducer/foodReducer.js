const foodReducer = (state, action) => {
  let updatedState;

  switch (action.type) {
    case "INCREMENT":
      updatedState = {
        ...state,
        [action.food.id]: {
          ...action.food,
          quantity: (state[action.food.id]?.quantity || 0) + 1, // Increase quantity
        },
      };
      break;

    case "DECREMENT":
      if (!state[action.foodId]) return state; // If item doesn't exist, return current state

      const newQuantity = state[action.foodId].quantity - 1;
      updatedState = { ...state };

      if (newQuantity <= 0) {
        delete updatedState[action.foodId]; // Remove item if quantity reaches 0
      } else {
        updatedState[action.foodId] = {
          ...state[action.foodId],
          quantity: newQuantity,
        };
      }
      break;

    case "RESET":
      updatedState = {}; // Clear all selections
      localStorage.setItem("foodQuantities", JSON.stringify(updatedState));
      break;

    default:
      return state;
  }

  // Store the updated state in localStorage
  localStorage.setItem("foodQuantities", JSON.stringify(updatedState));
  return updatedState;
};

export default foodReducer;
