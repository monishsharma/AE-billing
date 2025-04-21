export const roundOff = (num) => {
    // const result = num - (num * 1.25 / 100);
    if (!num)return num;;
    return Math.round((parseFloat(num) + Number.EPSILON) * 100) / 100;
}

export const addPAckagingcharge = (total) => {
    const decimalPart = (total * 100) % 100;

    if (decimalPart === 0) {
      return 0.00;
    }

    return (100 - decimalPart) / 100;
  }