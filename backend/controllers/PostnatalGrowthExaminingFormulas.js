function birthPercentileCalc(gender, bw) {
  // This function calculates the birth percentile based on gender and birth weight (bw)
  if (gender === 'boy') {
    if (bw < 2.6) return '0-0';
    if (bw >= 2.6 && bw < 2.8) return '1-5';
    if (bw >= 2.8 && bw < 3) return '2-10';
    if (bw >= 3 && bw < 3.3) return '3-25';
    if (bw >= 3.3 && bw < 3.7) return '4-50';
    if (bw >= 3.7 && bw < 4) return '5-75';
    if (bw >= 4 && bw < 4.2) return '6-90';
    if (bw >= 4.2) return '7-95';
  }
  if (gender === 'girl') {
    if (bw < 2.5) return '0-0';
    if (bw >= 2.5 && bw < 2.7) return '1-5';
    if (bw >= 2.7 && bw < 2.9) return '2-10';
    if (bw >= 2.9 && bw < 3.2) return '3-25';
    if (bw >= 3.2 && bw < 3.6) return '4-50';
    if (bw >= 3.6 && bw < 3.9) return '5-75';
    if (bw >= 3.9 && bw < 4) return '6-90';
    if (bw >= 4) return '7-95';
  }
  return '9-99'; // Return default if none of the conditions are met
}

function month6PercentileCalc(gender, w6) {
  // This function calculates the 6-month percentile based on gender and weight at 6 months (w6)
  if (w6 === 0 || w6 === null) {
    return '9-99';
  }
  if (gender === 'boy') {
    if (w6 < 6.6) return '0-0';
    if (w6 >= 6.6 && w6 < 6.9) return '1-5';
    if (w6 >= 6.9 && w6 < 7.4) return '2-10';
    if (w6 >= 7.4 && w6 < 7.9) return '3-25';
    if (w6 >= 7.9 && w6 < 8.5) return '4-50';
    if (w6 >= 8.5 && w6 < 9.1) return '5-75';
    if (w6 >= 9.1 && w6 < 9.5) return '6-90';
    if (w6 >= 9.5) return '7-95';
  }
  if (gender === 'girl') {
    if (w6 < 6) return '0-0';
    if (w6 >= 6 && w6 < 6.2) return '1-5';
    if (w6 >= 6.2 && w6 < 6.7) return '2-10';
    if (w6 >= 6.7 && w6 < 7.3) return '3-25';
    if (w6 >= 7.3 && w6 < 7.9) return '4-50';
    if (w6 >= 7.9 && w6 < 8.5) return '5-75';
    if (w6 >= 8.5 && w6 < 8.9) return '6-90';
    if (w6 >= 8.9) return '7-95';
  }
  return '9-99';
}

// Similarly, other functions like month12PercentileCalc, month18PercentileCalc, etc. calculate the percentiles for each respective age period.
function severity(pc1, pc2, pc3) {
  // This function calculates the severity of percentile crossing across different periods
  let period1Weight = 1 - 0.39;
  let period2Weight = 1 - 0.105;
  let period3Weight = 1 - 0.03;
  pc1 = pc1 > 0 ? pc1 : 0;
  let weightedSum = period1Weight * pc1 + period2Weight * pc2 + period3Weight * pc3;
  return weightedSum;
}

function totalPercentilesCrossedCalcu(pc1, pc2, pc3) {
  // This function calculates the total number of percentiles crossed
  pc1 = pc1 > 0 ? pc1 : 0;
  return pc1 + pc2 + pc3;
}

function firstPeriodPercentilesCrossCalc(p0, p6) {
  // This function calculates the percentile crossing in the first period (birth to 6 months)
  let level0 = +p0.substr(0, 1);
  let level6 = +p6.substr(0, 1);
  let crossPeriod1 = 0;
  if (level0 !== 9 && level6 !== 9) {
    crossPeriod1 = level0 - level6;
  }
  return crossPeriod1;
}

// Similarly, other functions like secondPeriodPercentilesCrossCalcuecond, thirdPeriodPercentilesCrossCalcu, etc.
// calculate the percentile crossings for subsequent periods.

function weightGainDecelerationAnalyzing(gender, bw, weight6M, weight12M, weight18M, weight24M, weight36M, weight48M, weight60M) {
  // This function analyzes the weight gain deceleration across different periods
  let result = [];
  let p0 = birthPercentileCalc(gender, bw);
  let p6 = month6PercentileCalc(gender, weight6M);
  let p12 = month12PercentileCalc(gender, weight12M);
  let p18 = month18PercentileCalc(gender, weight18M);
  let p24 = month24PercentileCalc(gender, weight24M);
  let p36 = month36PercentileCalc(gender, weight36M);
  let p48 = month48PercentileCalc(gender, weight48M);
  let p60 = month60PercentileCalc(gender, weight60M);
  
  let pc1 = firstPeriodPercentilesCrossCalc(p0, p6);
  let pc2 = secondPeriodPercentilesCrossCalcuecond(lastPercentiledatagetting1(p0, p6), p12, p18, p24);
  let pc3 = thirdPeriodPercentilesCrossCalcu(lastPercentiledatagetting2(lastPercentiledatagetting1(p0, p6), p12, p18, p24), p36, p48, p60);
  
  result.push(severity(pc1, pc2, pc3));
  result.push(totalPercentilesCrossedCalcu(pc1, pc2, pc3));
  result.push(lastPercentiledatagetting3(lastPercentiledatagetting2(lastPercentiledatagetting1(p0, p6), p12, p18, p24), p36, p48, p60));
  
  console.log("The severity is : " + result[0]);
  console.log("The total Percentiles Crossed Calculation is : " + result[1]);
  console.log("The last Percentile data getting is " + result[2]);
  
  return result;
}

function postnatalGrowthEvaluating(Id, lastAgePer, totalCross, evalSeverity) {
  // This function evaluates postnatal growth based on the last percentile and the total percentiles crossed
  let result = 'OK';
  let lastAge = +lastAgePer.substr(2);
  let lastPer = +lastAgePer.substr(0, 1);
  if (lastPer === 0) {
    result = 'Attention!!! The child under test is under third percentile at age ' + lastAge + ' months.';
  } else if (totalCross > 0) {
    result = ' The child under test has crossed ' + totalCross + ' percentiles up to age ' + lastAge + ' months, yielding severity ' + evalSeverity + '.';
  }
  return result;
}

function main(Id, gender, bw, weight6M, weight12M, weight18M, weight24M, weight36M, weight48M, weight60M) {
  console.log("this is the w6 we got in the main" + weight6M);
  console.log("this is the w12 we got in the main" + weight12M);
  console.log("this is the gender we got in the main" + gender);
  console.log("this is the weight18M we got in the main" + weight18M);
  console.log("this is the weight24M we got in the main" + weight24M);
  console.log("this is the weight36M we got in the main" + weight36M);
  console.log("this is the weight48M we got in the main" + weight48M);
  console.log("this is the weight60M we got in the main" + weight60M);
  
  let result = [];
  let finalFttResults = "";
  
  result = weightGainDecelerationAnalyzing(gender, bw, weight6M, weight12M, weight18M, weight24M, weight36M, weight48M, weight60M);
  finalFttResults = postnatalGrowthEvaluating(Id, result[2], result[1], result[0]);
  
  if (finalFttResults === 'OK') {
    finalFttResults = "Postnatal Growth Evaluating: The patient is healthy and does not suffer from FTT";
    return finalFttResults;
  } else {
    return finalFttResults;
  }
}

module.exports = {
  main
}; // This function receives the child data and returns the result
