/**
 * This is Contain for all api.
 * @author Palash Samanta
 * @since May 6 2024
 */
import activityLog from "../services/activityLog/route.js";

//Emission Factor
import sourceMaster from "../services/sourceMaster/route.js"
import uomMaster from "../services/uomMaster/route.js"
import licenseTypeMaster from "../services/licenseTypeMaster/route.js"
import licenseMaster from "../services/licenseMaster/route.js"
import methodologyMaster from "../services/methodologyMaster/route.js"
import calculationMethodologyMaster from "../services/calculationMethodologyMaster/route.js"
import calculationOriginMaster from "../services/calculationOriginMaster/route.js"
import verificationTypeMaster from "../services/verificationTypeMaster/route.js"
import groupMaster from "../services/groupMaster/route.js"
import regionMaster from "../services/regionMaster/route.js"
import sectorMaster from "../services/sectorMaster/route.js"
import categoryMaster from "../services/categoryMaster/route.js"

export default [
    activityLog,
    sourceMaster,
    uomMaster,
    licenseTypeMaster,
    licenseMaster,
    methodologyMaster,
    calculationMethodologyMaster,
    calculationOriginMaster,
    verificationTypeMaster,
    groupMaster,
    regionMaster,
    sectorMaster,
    categoryMaster
];
