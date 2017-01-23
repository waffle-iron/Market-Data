export const formatIntCommas = amount => amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
