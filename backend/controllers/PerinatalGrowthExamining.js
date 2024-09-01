function lastTrimesterPi(Mlt, Llt) {
    // This function calculates the last trimester Ponderal Index (PI).
    // Mlt: Mass at the last trimester
    // Llt: Length at the last trimester
    return (Mlt / Math.pow(Llt, 3)) * 100;
}

function firstTrimesterPi(Mft, Lft) {
    // This function calculates the first trimester Ponderal Index (PI).
    // Mft: Mass at the first trimester
    // Lft: Length at the first trimester
    return (Mft / Math.pow(Lft, 3)) * 100;
}

function fetalGrowthIndication(PIft, PIlt) {
    // This function evaluates fetal growth based on Ponderal Index (PI) values
    // for the first (PIft) and last (PIlt) trimesters.
    let ft = true, lt = true;
    let result = 'ok'; // Default assumption: no growth issues

    // Evaluate first trimester PI
    if (PIft < 2.32 || PIft > 2.85) {
        ft = false;
    }
    // Evaluate last trimester PI
    if (PIlt < 2.32 || PIlt > 2.85) {
        lt = false;
    }

    // Determine the reason for potential growth issues
    if (!ft) {
        result = 'mother dependent'; // Issues likely due to maternal factors
        if (!lt) {
            result = 'mother and child dependent'; // Issues likely due to both maternal and fetal factors
        }
    } else if (!lt) {
        result = 'child dependent'; // Issues likely due to fetal factors
    }

    return result; // Return the evaluation result
}

function fetalBirthWeightIndication(bw) {
    // This function evaluates the birth weight of the fetus.
    // bw: Birth weight
    if (bw < 2.500) {
        return 'low'; // Birth weight is considered low
    } else {
        return 'ok'; // Birth weight is within the normal range
    }
}

module.exports = {
    main: function (id, bw, week16Mass, week16Length, week32Mass, week32Length) {
        console.log("this is the fetus bw:" + bw);
        let perintalResult = [];
        let finalIndicationResults = "";

        // Calculate Ponderal Index for the first and last trimesters
        let PIfirt = firstTrimesterPi(week16Mass, week16Length);
        let PIlast = lastTrimesterPi(week32Mass, week32Length);

        // Evaluate fetal growth and birth weight indications
        perintalResult.push(fetalGrowthIndication(PIfirt, PIlast));
        perintalResult.push(fetalBirthWeightIndication(bw));

        // Construct the final results based on evaluations
        if (perintalResult[0] === 'ok') {
            finalIndicationResults = "Fetal Growth Indication results: There were no growth issues during the pregnancy.\n";
        } else if (perintalResult[0] === 'mother dependent') {
            finalIndicationResults = "Fetal Growth Indication Results: There were some problems and an indication of possible reasons is: mother-related reasons, such as bad nutrition and stress.\n";
        } else if (perintalResult[0] === 'mother and child dependent') {
            finalIndicationResults = "Fetal Growth Indication Results: There were some problems and an indication of possible reasons is: mother and child dependent.\n";
        } else if (perintalResult[0] === 'child dependent') {
            finalIndicationResults = "Fetal Growth Indication Results: There were some problems and an indication of possible reasons is: child dependent, child-related reasons, which can be genetic causes, malnutrition, or lack of proteins.\n";
        } else {
            finalIndicationResults = "Fetal Growth Indication Results: There were no growth issues during the pregnancy.\n";
        }

        finalIndicationResults = finalIndicationResults + " ";

        // Append birth weight indication to the final results
        if (perintalResult[1] === 'ok') {
            finalIndicationResults += "Fetal Birth Weight Indication Results: The weight of the fetus was normal.\n";
        } else {
            finalIndicationResults += "Fetal Birth Weight Indication Results: There were some problems, the birth weight indication is not normal\n";
        }

        return finalIndicationResults; // Return the final constructed result
    }
}
