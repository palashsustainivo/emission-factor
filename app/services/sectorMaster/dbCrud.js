import { Op } from 'sequelize';
import model from '../../models/sectorMaster/model';
import groupMaster  from '../../models/groupMaster/model'

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
        model.belongsTo(groupMaster,{foreignKey: 'group_id'});
        const result = await model.findAll({
          include: groupMaster,
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
        model.belongsTo(groupMaster,{foreignKey: 'group_id'});
        const result = await model.count({
          include: groupMaster,
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