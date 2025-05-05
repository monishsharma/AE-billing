export const roundOff = (num) => {
    // const result = num - (num * 1.25 / 100);
    if (!num)return num;;
    return Math.round((parseFloat(num) + Number.EPSILON) * 100) / 100;
}

export const addPAckagingcharge = (total) => {
  const decimal = total - Math.floor(total);

  if (decimal >= 0.5) {
    return Number((1 - decimal).toFixed(2));  // add to round up
  } else {
    return Number((-decimal).toFixed(2));     // subtract to round down
  }
};