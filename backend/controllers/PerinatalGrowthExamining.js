function lastTrimesterPi(Mlt,Llt ){// this function return last Trimester Pi that is the input for the function fetalGrowthIndication
    return (Mlt/Math.pow(Llt, 3))*100;
}

function firstTrimesterPi(Mft, Lft){// this function return first Trimester Pi that is the input for the function fetalGrowthIndication
    return (Mft/Math.pow(Lft, 3))*100;

}



function fetalGrowthIndication(PIft,PIlt ){
    let ft = true, lt = true;
    let result = 'ok';// There were no growth issues during the pregnancy
    if (PIft<2.32 || PIft>2.85) {
    ft = false;
    }
    if (PIlt<2.32 || PIlt>2.85) {
    lt = false;
    }
    if (!ft) {
    result = 'mother dependent';//There were some problems, and an indication of possible reasons is: mother dependent, mother-related reasons, such as bad nutrition and stress.
    if (!lt) {
    result = 'mother and child dependent';//There were some problems, and an indication of possible reasons is: mother and child dependent 
    }
    } else if (!lt) {
    result = 'child dependent';//There were some problems, and an indication of possible reasons is: child dependent, child-related reasons, which can be genetic causes, malnutrition, or lack of proteins
    }
    return result;
}



function fetalBirthWeightIndication(bw){
    if (bw < 2.500) {
        return 'low';//There were some problems, the birth weight indication is not normal 
        } else {
        return 'ok';//The weight of the fetus was normal.
        }
}

 module.exports  ={ main: function  (id,bw, week16Mass, week16Length, week32Mass, week32Length){
    console.log("this is the fetus bw:" + bw);
    let perintalResult = [];
    let finalIndicationResults="";
    let PIfirt =  firstTrimesterPi(week16Mass, week16Length);
    let PIlast = lastTrimesterPi(week32Mass, week32Length);
    perintalResult.push(fetalGrowthIndication(PIfirt,PIlast));
    perintalResult.push(fetalBirthWeightIndication(bw));
    if (perintalResult[0]==='ok'){
        finalIndicationResults="Fetal Growth Indication results: There were no growth issues during the pregnancy.\n"
    }
    else if (perintalResult[0]==='mother dependent'){
        finalIndicationResults="Fetal Growth Indication Results: There were some problems and an indication of possible reasons is: mother-related reasons, such as bad nutrition and stress.\n"
    }
    else if (perintalResult[0]==='mother and child dependent'){
        finalIndicationResults="Fetal Growth Indication Results: There were some problems and an indication of possible reasons is: mother and child dependent.\n"
    
    }
    else if (perintalResult[0]==='child dependent'){
        finalIndicationResults="Fetal Growth Indication Results: There were some problems and an indication of possible reasons is: child dependent, child-related reasons, which can be genetic causes, malnutrition, or lack of proteins.\n"

    }
    else{
        finalIndicationResults="Fetal Growth Indication Results:  There were no growth issues during the pregnancy.\n"
      
    }
    finalIndicationResults=finalIndicationResults + " ";
    if(perintalResult[1]==='ok'){
        finalIndicationResults+="Fetal Birth Weight Indication Results: The weight of the fetus was normal.\n"
    }
    else{
        finalIndicationResults+="Fetal Birth Weight Indication Results: There were some problems, the birth weight indication is not normal\n"

    }
    return finalIndicationResults;
}
 }


