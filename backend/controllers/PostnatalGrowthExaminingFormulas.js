
function birthPercentileCalc(gender , bw){// this function return Birth Percentile that is input for the function firstPeriodPercentilesCrossCalc
    if(gender==='boy') {
        if(bw<2.6) return '0-0';
        if (bw>=2.6 && bw<2.8) 
         return '1-5';
        if (bw>=2.8 && bw<3) 
         return '2-10';
        if (bw>=3 && bw<3.3) 
         return '3-25';
        if (bw>=3.3 && bw<3.7) 
         return '4-50';
        if (bw>=3.7 && bw<4) 
         return '5-75';
        if (bw>=4 && bw<4.2) 
         return '6-90';
        if (bw>=4.2) return '7-95';
       } 
       if(gender==='girl') {
        if(bw<2.5) return '0-0';
        if (bw>=2.5 && bw<2.7) 
         return '1-5';
        if (bw>=2.7 && bw<2.9) 
         return '2-10';
        if (bw>=2.9 && bw<3.2) 
         return '3-25';
        if (bw>=3.2 && bw<3.6) 
         return '4-50';
        if (bw>=3.6 && bw<3.9) 
         return '5-75';
        if (bw>=3.9 && bw<4) 
         return '6-90';
        if (bw>=4) return '7-95';
       }
       return '9-99'; 
}
function month6PercentileCalc(gender , w6){// this function return 6-month Percentile that is input for the function firstPeriodPercentilesCrossCalc
  if(w6===0 || w6===null){
    return '9-99';
  }
  if(gender==='boy') {
        if(w6<6.6) return '0-0';
        if (w6>=6.6 && w6<6.9) 
         return '1-5';
        if (w6>=6.9 && w6<7.4) 
         return '2-10';
        if (w6>=7.4 && w6<7.9) 
         return '3-25';
        if (w6>=7.9 && w6<8.5) 
         return '4-50';
        if (w6>=8.5 && w6<9.1) 
         return '5-75';
        if (w6>=9.1 && w6<9.5) 
         return '6-90';
        if (w6>=9.5) return '7-95';
       }
       if(gender==='girl') {
        if(w6<6) return '0-0';
        if (w6>=6 && w6<6.2) 
         return '1-5';
        if (w6>=6.2 && w6<6.7) 
         return '2-10';
        if (w6>=6.7 && w6<7.3) 
         return '3-25';
        if (w6>=7.3 && w6<7.9) 
         return '4-50';
        if (w6>=7.9 && w6<8.5) 
         return '5-75';
        if (w6>=8.5 && w6<8.9) 
         return '6-90';
        if (w6>=8.9) return '7-95';
       }
       return '9-99';
}

function month12PercentileCalc(g, w12){// this function return 12-month Percentile that is input for the function secondPeriodPercentilesCrossCalcu
  if(w12===0 || w12===null){
    return '9-99';
  }
  if(g==='boy') {
        if(w12<8.1) return '0-0';
        if (w12>=8.1 && w12<8.4) 
         return '1-5';
        if (w12>=8.4 && w12<9) 
         return '2-10';
        if (w12>=9 && w12<9.6) 
         return '3-25';
        if (w12>=9.6 && w12<10.4) 
         return '4-50';
        if (w12>=10.4 && w12<11.1) 
         return '5-75';
        if (w12>=11.1 && w12<11.5) 
         return '6-90';
        if (w12>=11.5) return '7-95';
       }
  if(g==='girl') {
        if(w12<7.3) return '0-0';
        if (w12>=7.3 && w12<7.7) 
         return '1-5';
        if (w12>=7.7 && w12<8.2) 
         return '2-10';
        if (w12>=8.2 && w12<8.9) 
         return '3-25';
        if (w12>=8.9 && w12<9.7) 
         return '4-50';
        if (w12>=9.7 && w12<10.5) 
         return '5-75';
        if (w12>=10.5 && w12<11) 
         return '6-90';
        if (w12>=11) return '7-95';
       }
       return '9-99';
}
function month18PercentileCalc(g, w18){
  if(w18===0 || w18===null){
    return '9-99';
  }
  if(g==='boy') {
        if(w18<9.1) return '0-0';
        if (w18>=9.1 && w18<9.5) 
         return '1-5';
        if (w18>=9.5 && w18<10.1) 
         return '2-10';
        if (w18>=10.1 && w18<10.9) 
         return '3-25';
        if (w18>=10.9 && w18<11.8) 
         return '4-50';
        if (w18>=11.8 && w18<12.6) 
         return '5-75';
        if (w18>=12.6 && w18<13.1) 
         return '6-90';
        if (w18>=13.1) 
         return '7-95';
       }
  if(g==='girl') {
        if(w18<8.4) return '0-0';
        if (w18>=8.4 && w18<8.8) 
         return '1-5';
        if (w18>=8.8 && w18<9.4) 
         return '2-10';
        if (w18>=9.4 && w18<10.2) 
         return '3-25';
        if (w18>=10.2 && w18<11.1) 
         return '4-50';
        if (w18>=11.1 && w18<12) 
         return '5-75';
        if (w18>=12 && w18<12.6) 
         return '6-90';
        if (w18>=12.6) 
         return '7-95';
       }
       return '9-99';     
}
function month24PercentileCalc(gender , w24){
  if(w24===0 || w24===null){
    return '9-99';
  }
    if(gender==='boy') {
        if(w24<10.1) return '0-0';
        if (w24>=10.1 && w24<10.5) 
         return '1-5';
        if (w24>=10.5 && w24<11.3) 
         return '2-10';
        if (w24>=11.3 && w24<12.2) 
         return '3-25';
        if (w24>=12.2 && w24<13.1) 
         return '4-50';
        if (w24>=13.1 && w24<14.1) 
         return '5-75';
        if (w24>=14.1 && w24<14.7) 
         return '6-90';
        if (w24>=14.7) 
         return '7-95';
       }
    if(gender==='girl') {
        if(w24<9.4) return '0-0';
        if (w24>=9.4 && w24<9.8) 
         return '1-5';
        if (w24>=9.8 && w24<10.6) 
         return '2-10';
        if (w24>=10.6 && w24<11.5) 
         return '3-25';
        if (w24>=11.5 && w24<12.5) 
         return '4-50';
        if (w24>=12.5 && w24<13.5) 
         return '5-75';
        if (w24>=13.5 && w24<14.2) 
         return '6-90';
        if (w24>=14.2) 
         return '7-95';
       }
       return '9-99';      
}
function month36PercentileCalc(gender , w36){
  if(w36===0 || w36===null){
    return '9-99';
  }
  if(gender==='boy') {
        if(w36<11.8) return '0-0';
        if (w36>=11.8 && w36<12.3) 
         return '1-5';
        if (w36>=12.3 && w36<13.2) 
         return '2-10';
        if (w36>=13.2 && w36<14.3) 
         return '3-25';
        if (w36>=14.3 && w36<15.6) 
         return '4-50';
        if (w36>=15.6 && w36<16.8) 
         return '5-75';
        if (w36>=16.8 && w36<17.5) 
         return '6-90';
        if (w36>=17.5) 
         return '7-95';
       }
  if(gender==='girl') {
        if(w36<11.3) return '0-0';
        if (w36>=11.3 && w36<11.8) 
         return '1-5';
        if (w36>=11.8 && w36<12.7) 
         return '2-10';
        if (w36>=12.7 && w36<13.9) 
         return '3-25';
        if (w36>=13.9 && w36<15.1) 
         return '4-50';
        if (w36>=15.1 && w36<16.4) 
         return '5-75';
        if (w36>=16.4 && w36<17.3) 
         return '6-90';
        if (w36>=17.3) 
         return '7-95';
       }
       return '9-99';
}
function month48PercentileCalc(gender , w48){
  if(w48===0 || w48===null){
    return '9-99';
  }
  if(gender==='boy') {
        if(w48<13.3) return '0-0';
        if (w48>=13.3 && w48<13.9) 
         return '1-5';
        if (w48>=13.9 && w48<15) 
         return '2-10';
        if (w48>=15 && w48<16.3) 
         return '3-25';
        if (w48>=16.3 && w48<17.8) 
         return '4-50';
        if (w48>=17.8 && w48<19.3) 
         return '5-75';
        if (w48>=19.3 && w48<20.2) 
         return '6-90';
        if (w48>=20.2) 
         return '7-95';
       }
  if(gender==='girl') {
        if(w48<12.9) return '0-0';
        if (w48>=12.9 && w48<13.5) 
         return '1-5';
        if (w48>=13.5 && w48<14.7) 
         return '2-10';
        if (w48>=14.7 && w48<16.1) 
         return '3-25';
        if (w48>=16.1 && w48<17.7) 
         return '4-50';
        if (w48>=17.7 && w48<19.3) 
         return '5-75';
        if (w48>=19.3 && w48<20.4) 
         return '6-90';
        if (w48>=20.4) 
         return '7-95';
       }
       return '9-99';      
}
function month60PercentileCalc(gender , w60){
  if(w60===0 || w60===null){
    return '9-99';
  }
   if(gender==='boy') {
        if(w60<14.7) return '0-0';
        if (w60>=14.7 && w60<15.5) 
         return '1-5';
        if (w60>=15.5 && w60<16.7) 
         return '2-10';
        if (w60>=16.7 && w60<18.3) 
         return '3-25';
        if (w60>=18.3 && w60<20.1) 
         return '4-50';
        if (w60>=20.1 && w60<21.9) 
         return '5-75';
        if (w60>=21.9 && w60<23) 
         return '6-90';
        if (w60>=23) return '7-95';
       }
  if(gender==='girl') {
        if(w60<14.4) return '0-0';
        if (w60>=14.4 && w60<15.2) 
         return '1-5';
        if (w60>=15.2 && w60<16.5) 
         return '2-10';
        if (w60>=16.5 && w60<18.2) 
         return '3-25';
        if (w60>=18.2 && w60<20.2) 
         return '4-50';
        if (w60>=20.2 && w60<22.2) 
         return '5-75';
        if (w60>=22.2 && w60<23.5) 
         return '6-90';
        if (w60>=23.5) 
         return '7-95';
       }
       return '9-99';
}
function severity(pc1,pc2,pc3 ){
  let period1Weight = 1-0.39;
  let period2Weight = 1-0.105;
  let period3Weight = 1-0.03;
  pc1 = pc1>0 ? pc1 : 0;
  let weightedSum = period1Weight*pc1+ period2Weight*pc2+ period3Weight*pc3;
  return weightedSum;
}
function totalPercentilesCrossedCalcu(pc1, pc2, pc3){
  pc1 = pc1>0 ? pc1 : 0;
return (pc1+pc2+pc3);
}

function firstPeriodPercentilesCrossCalc(p0, p6){ // this function return pc1
  let level0 =+p0.substr(0,1);
  let level6 =+p6.substr(0,1);
  let crossPeriod1 = 0;
  if ((level0!==9) && (level6!==9)) {
   crossPeriod1 = level0-level6;
  }
  return crossPeriod1;
}


function lastPercentiledatagetting1(p0, p6){// this function return Last Percentile-Age-Period1 that is input for the function secondPeriodPercentilesCrossCalcuecond as lastAgePerPc1
  let level0 =+p0.substr(0,1);
  let level6 =+p6.substr(0,1);
  if (level6!==9) return level6+'-6';
  if (level0!==9) return level0+'-0';
}



function secondPeriodPercentilesCrossCalcuecond(lastAgePerPc1,p12, p18, p24 ){// this function return pc2
let prevLevel = +lastAgePerPc1.substr(0,1);
let level12=+p12.substr(0,1);
let level18=+p18.substr(0,1);
let level24=+p24.substr(0,1);
let crossPeriod2 = 0;
if (prevLevel!==9) {
 if(level24!==9) {
  crossPeriod2 = prevLevel- 
  level24;
 } else if (level18!==9) {
  crossPeriod2 = prevLevel- 
  level18; 
 } else if (level12!==9) {
  crossPeriod2 = prevLevel- 
  level12;
 }
} else if (level12!==9) {
 if(level24!==9) {
  crossPeriod2 = level12- 
  level24;
 } else if (level18!==9) {
  crossPeriod2 = level12- 
  level18; 
 }
} else if (level18!==9) {
 if(level24!==9) {
  crossPeriod2 = level18- 
  level24;
 }
}
return crossPeriod2;


}




function lastPercentiledatagetting2(maxPc1, p12, p18, p24){// this function return Last Percentile-age-period2 that is input for the function thirdPeriodPercentilesCrossCalcu as lastAgePerPc2

  let level12 =+p12.substr(0,1);
  let level18 =+p18.substr(0,1);
  let level24 =+p24.substr(0,1);
  if (level24!==9) return level24+'-24';
  if (level18!==9) return level18+'-18';
  if (level12!==9) return level12+'-12';
  return maxPc1;
}

function thirdPeriodPercentilesCrossCalcu(lastAgePerPc2, p36, p48, p60){// this function return pc3
let prevLevel=+lastAgePerPc2.substr(0,1);
let level36=+p36.substr(0,1);
let level48=+p48.substr(0,1);
let level60=+p60.substr(0,1);
let crossPeriod3 = 0;
if (prevLevel!==9) {
 if(level60!==9) {
  crossPeriod3 = prevLevel- 
  level60;
 } else if (level48!==9) {
  crossPeriod3 = prevLevel- 
  level48; 
 } else if (level36!==9) {
  crossPeriod3 = prevLevel- 
  level36;
 }
} else if (level36!==9) {
 if (level60!==9) {
  crossPeriod3 = level36- 
  level60; 
 } else if (level48!==9) {
  crossPeriod3 = level36- 
  level48;
 }
} else if (level48!==9) {
 if (level60!==9) {
  crossPeriod3 = level48- 
  level60; 
 }
}
return crossPeriod3;


}

function lastPercentiledatagetting3(maxPc1 , p36, p48, p60){// this function return Last Percentile-age that is one of the outputs in Weight Gain Deceleration Analyzing 
let level36 =+p36.substr(0,1);
let level48 =+p48.substr(0,1);
let level60 =+p60.substr(0,1);
if (level60!==9) return level60+'-60';
if (level48!==9) return level48+'-48';
if (level36!==9) return level36+'-36';
return maxPc1;
}
function weightGainDecelerationAnalyzing(gender, bw, weight6M, weight12M, weight18M, weight24M, weight36M, weight48M, weight60M ){
  let result = [];
  let p0  = birthPercentileCalc(gender , bw);
  let p6  = month6PercentileCalc(gender , weight6M);
  let p12 =  month12PercentileCalc(gender, weight12M);
  let p18 = month18PercentileCalc(gender, weight18M) ;
  let p24 = month24PercentileCalc(gender , weight24M);
  let p36 = month36PercentileCalc(gender , weight36M);
  let p48 = month48PercentileCalc(gender , weight48M);
  let p60 = month60PercentileCalc(gender , weight60M);
  let pc1= firstPeriodPercentilesCrossCalc(p0, p6);
  
  let pc2 = secondPeriodPercentilesCrossCalcuecond(lastPercentiledatagetting1(p0, p6),p12, p18, p24 );
  let pc3 = thirdPeriodPercentilesCrossCalcu(lastPercentiledatagetting2(lastPercentiledatagetting1(p0, p6),p12, p18, p24), p36, p48, p60);


  result.push(severity(pc1,pc2, pc3 ));
  result.push(totalPercentilesCrossedCalcu(pc1, pc2, pc3));
  result.push(lastPercentiledatagetting3(lastPercentiledatagetting2(lastPercentiledatagetting1(p0, p6),p12, p18, p24), p36, p48, p60));
  console.log("The severity is : " + result[0]);
  console.log("The total Percentiles Crossed Calculation is : " + result[1]);
  console.log("The last Percentile data getting is " + result[2]);
  

  return result;
}

function postnatalGrowthEvaluating(Id,lastAgePer,totalCross, evalSeverity ){
  let result = 'OK';
  let lastAge = +lastAgePer.substr(2);
  let lastPer = +lastAgePer.substr(0,1);
  if(lastPer === 0) {
  result = 'Attention!!! The child under test is under third percentile at age '+lastAge+ ' months.';
  } else if(totalCross > 0) {
  result = ' The child under test has crossed '+totalCross+ ' percentiles up to age '+lastAge+' months, yielding severity '+ evalSeverity+'.';
  }
  return result;
}
function main (Id, gender, bw, weight6M, weight12M, weight18M, weight24M, weight36M, weight48M, weight60M){
  console.log("this is the w6 we got in the main"+ weight6M);
  console.log("this is the w12 we got in the main"+ weight12M);
  console.log("this is the gender we got in the main"+ gender);
  console.log("this is the weight18M we got in the main"+ weight18M);
  console.log("this is the weight24M we got in the main"+ weight24M);
  console.log("this is the weight36M we got in the main"+ weight36M);
  console.log("this is the weight48M we got in the main"+ weight48M);
  console.log("this is the weight60M we got in the main"+ weight60M);
  let result = [];
  let finalFttResults="";
  result= weightGainDecelerationAnalyzing(gender, bw, weight6M, weight12M, weight18M, weight24M, weight36M, weight48M, weight60M , Id)
  finalFttResults=postnatalGrowthEvaluating( Id,result[2],result[1], result[0])
  //finalFttResults=postnatalGrowthEvaluating( Id,result[2],result[1], result[0])
  //console.log.apply(postnatalGrowthEvaluating( Id,result[2],result[1], result[0]));
  if(finalFttResults==='OK'){
    finalFttResults="Postnatal Growth Evaluating :The patient is healthy and does not suffer from FTT"
    return finalFttResults;
  }
  else{
    return finalFttResults;
  }

}

module.exports = {
  main
};// this function will recieve the child data and return the result 