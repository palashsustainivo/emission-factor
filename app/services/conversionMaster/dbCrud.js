import { Op } from 'sequelize';
import model from '../../models/conversionMaster/model';
import uomMaster  from '../../models/uomMaster/model'
import uomMaster2  from '../../models/uomMaster/model'

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
        model.belongsTo(uomMaster,{foreignKey: 'uom_id'});
        model.belongsTo(uomMaster2,{foreignKey: 'uom2_id'});
        const result = await model.findAll({
          include: [uomMaster,uomMaster2],
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
        model.belongsTo(uomMaster,{foreignKey: 'uom_id'});
        model.belongsTo(uomMaster2,{foreignKey: 'uom2_id'});
        const result = await model.count({
          include: [uomMaster,uomMaster2],
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