export const formatDate=value=>value?new Date(value).toLocaleDateString('bn-BD'):'—';
export const formatCurrency=value=>new Intl.NumberFormat('bn-BD',{style:'currency',currency:'BDT',maximumFractionDigits:0}).format(Number(value||0));
