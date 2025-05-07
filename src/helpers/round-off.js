export const roundOff = (num) => {
    // const result = num - (num * 1.25 / 100);
    if (!num)return num;;
    return Math.round((parseFloat(num) + Number.EPSILON) * 100) / 100;
}

export const addPAckagingcharge = (rawTotal) => {
  const rounded = Math.round(rawTotal);
  return +(rounded - rawTotal).toFixed(2);

};