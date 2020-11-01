import Vue from 'vue';

Vue.filter('currency', function(value) {
    if(!value) {
        value = 0;
      }
      return new Number(value).toLocaleString(navigator.language, {
        style: "currency",
        currency: "USD"
      });
});

Vue.filter('decimals', function(value, decimals) {
    if(!value) {
      value = 0;
    }
  
    if(!decimals) {
    // 2 decimals by default
      decimals = 2;
    }
    
    value = value.toFixed(decimals)

    return value;
});

Vue.filter('bilions', function(value) {
  const K = 1000;
  const MILION = 1000000;
  const BILION = 1000000000;
  const TRILION = 1000000000000; // damn

  if(!value) {
    value = 0;
  }
  if(value<K) {
    return '<$1K';
  } else if(value<MILION) {
    return '$'+(value/K).toFixed(0)+'K';
  } else if(value<BILION) {
    return '$'+(value/MILION).toFixed(0)+'M';
  } else if (value<TRILION) {
    return '$'+(value/BILION).toFixed(0)+'B';
  }
  return '$'+(value/TRILION).toFixed(0)+'T';
});

Vue.filter('percent', function(value, decimals) {
    if(!value) {
      value = 0;
    }

    value = value + '%';
    return value;
});

Vue.filter('sign', function(value) {
    if(!value) {
      value = 0;
    }
    let sign = value >= 0 ? '+' : '';
    value = sign.concat(value);
    return value;
});