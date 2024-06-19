import { Op } from 'sequelize';
import model from '../../models/emissionFactor/model';
import sourceMaster from '../../models/sourceMaster/model'
import uomMaster from '../../models/uomMaster/model'
import licenseTypeMaster from '../../models/licenseTypeMaster/model'
import licenseMaster from '../../models/licenseMaster/model'
import methodologyMaster from '../../models/methodologyMaster/model'
import calculationMethodologyMaster from '../../models/calculationMethodologyMaster/model'
import calculationOriginMaster from '../../models/calculationOriginMaster/model'
import regionMaster from '../../models/regionMaster/model'
import groupMaster from '../../models/groupMaster/model'
import sectorMaster from '../../models/sectorMaster/model';
import categoryMaster from '../../models/categoryMaster/model'
import verificationTypeMaster from '../../models/verificationTypeMaster/model'
import ghgProtocolCategoryMaster from '../../models/ghgProtocolCategoryMaster/model'
import assuranceMaster from '../../models/assuranceMaster/model'

/**
 * Perform CRUD operations on a specified model.
 * @param {Model} model - The Sequelize model to perform operations on.
 */
const CrudService = (model) => {
  return {

    /**
     * Get all records from the specified model with dependent table and filter.
     * @returns {Promise<Array<Object>>} A Promise that resolves with an array of records.
     */
    async filterSearch(serachParam,start=process.env.DEFAULT_STAERT,limit=process.env.DEFAULT_LIMIT) {
      try {
        model.belongsTo(sourceMaster,{foreignKey: 'source_id'});
        model.belongsTo(uomMaster,{foreignKey: 'uom_id'});
        model.belongsTo(licenseTypeMaster,{foreignKey: 'license_type_id'});
        model.belongsTo(licenseMaster,{foreignKey: 'license_id'});
        model.belongsTo(methodologyMaster,{foreignKey: 'methodology_id'});
        model.belongsTo(calculationMethodologyMaster,{foreignKey: 'calculation_methodology_id'});
        model.belongsTo(calculationOriginMaster,{foreignKey: 'calculation_origin_id'});
        model.belongsTo(regionMaster,{foreignKey: 'region_id'});
        model.belongsTo(groupMaster,{foreignKey: 'group_id'});
        model.belongsTo(sectorMaster,{foreignKey: 'sector_id'});
        model.belongsTo(categoryMaster,{foreignKey: 'category_id'});
        model.belongsTo(verificationTypeMaster,{foreignKey: 'verification_type_id'});
        model.belongsTo(ghgProtocolCategoryMaster,{foreignKey: 'ghg_protocol_category_id'});
        model.belongsTo(assuranceMaster,{foreignKey: 'assurance_id'});
        const result = await model.findAll({
          include: [sourceMaster,uomMaster,licenseTypeMaster,licenseMaster,methodologyMaster,calculationMethodologyMaster,calculationOriginMaster,regionMaster,groupMaster,sectorMaster,categoryMaster,verificationTypeMaster,ghgProtocolCategoryMaster,assuranceMaster],
          where: serachParam,
          offset: start, // replace 'start' with the actual starting point
          limit: limit // replace 'limit' with the actual limit
        });
        return result
      } catch (error) {
        throw error;
      }
    },
    /**
     * Get count of all records from the specified model with dependent table and filter.
     * @returns {Promise<Array<Object>>} A Promise that resolves with an array of records.
     */
    async filterSearchCount(serachParam) {
      try {
        model.belongsTo(sourceMaster,{foreignKey: 'source_id'});
        model.belongsTo(uomMaster,{foreignKey: 'uom_id'});
        model.belongsTo(licenseTypeMaster,{foreignKey: 'license_type_id'});
        model.belongsTo(licenseMaster,{foreignKey: 'license_id'});
        model.belongsTo(methodologyMaster,{foreignKey: 'methodology_id'});
        model.belongsTo(calculationMethodologyMaster,{foreignKey: 'calculation_methodology_id'});
        model.belongsTo(calculationOriginMaster,{foreignKey: 'calculation_origin_id'});
        model.belongsTo(regionMaster,{foreignKey: 'region_id'});
        model.belongsTo(groupMaster,{foreignKey: 'group_id'});
        model.belongsTo(sectorMaster,{foreignKey: 'sector_id'});
        model.belongsTo(categoryMaster,{foreignKey: 'category_id'});
        model.belongsTo(verificationTypeMaster,{foreignKey: 'verification_type_id'});
        model.belongsTo(ghgProtocolCategoryMaster,{foreignKey: 'ghg_protocol_category_id'});
        model.belongsTo(assuranceMaster,{foreignKey: 'assurance_id'});
        const result = await model.count({
          include: [sourceMaster,uomMaster,licenseTypeMaster,licenseMaster,methodologyMaster,calculationMethodologyMaster,calculationOriginMaster,regionMaster,groupMaster,sectorMaster,categoryMaster,verificationTypeMaster,ghgProtocolCategoryMaster,assuranceMaster],
          where: serachParam
        });
        return result
      } catch (error) {
        throw error;
      }
    },
  };
};
const modelDbCrud = CrudService(model);
export default modelDbCrud;