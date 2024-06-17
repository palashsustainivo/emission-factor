import { Op } from 'sequelize';
import sequelize from '../../config/database.js';
import { parse } from 'dotenv';

/**
 * Perform CRUD operations on a specified model.
 * @param {Model} model - The Sequelize model to perform operations on.
 */
const CrudService = (model) => {
  return {

    /**
      * Insert multiple records into the specified model.
      * @param {Array<Object>} data - The array of data to insert.
      * @returns {Promise<Array<Object>>} A Promise that resolves with the inserted records.
      */
        async bulkCreate(data) {
          try {
            const result = await model.bulkCreate(data);
            return result;
          } catch (error) {
            throw error;
          }
        },

    /**
     * Insert a new record into the specified model.
     * @param {Object} data - The data to insert.
     * @returns {Promise<Object>} A Promise that resolves with the inserted record.
     */
    async create(data) {
      try {
        const result = await model.create(data);
        return result;
      } catch (error) {
        throw error;
      }
    },

    /**
     * Get all records from the specified model.
     * @returns {Promise<Array<Object>>} A Promise that resolves with an array of records.
     */
    async getAll(serachParam,start=process.env.DEFAULT_STAERT,limit=process.env.DEFAULT_LIMIT) {
      try {
        const result = await model.findAll({
          where: serachParam,
          offset: start, // replace 'start' with the actual starting point
          limit: limit // replace 'limit' with the actual limit
        });
        return result;
      } catch (error) {
        throw error;
      }
    },

    /**
     * Get all records from the specified model.
     * @returns {Promise<Array<Object>>} A Promise that resolves with an array of records.
     */
    async getAllCount(serachParam) {
      try {
        const result = await model.count({
          where: serachParam,
        });
        return result;
      } catch (error) {
        throw error;
      }
    },


    /**
     * Find one reccord from the table.
     * @returns {Promise<Array<Object>>} A Promise that resolves with an array of records.
     */
    async findOneReccord(serachParam) {
      try {
        const result = await model.findOne({
          where: serachParam
        });
        return result
      } catch (error) {
        throw error;
      }
    },

    /**
     * Get all records from the specified model with out dependent table and filter.
     * @returns {Promise<Array<Object>>} A Promise that resolves with an array of records.
     */
    async commonFilterSearch(serachParam,start=process.env.DEFAULT_STAERT,limit=process.env.DEFAULT_LIMIT) {
      try {
        const result = await model.findAll({
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
     * Get count of all records from the specified model with out dependent table and filter.
     * @returns {Promise<Array<Object>>} A Promise that resolves with an array of records.
     */
    async commonFilterSearchCount(serachParam) {
      try {
        const result = await model.count({
          where: serachParam,
        });
        return result
      } catch (error) {
        throw error;
      }
    },

    /**
     * Get a record by ID from the specified model.
     * @param {number} id - The ID of the record to retrieve.
     * @returns {Promise<Object|null>} A Promise that resolves with the record if found, or null if not found.
     */
    async getById(searchParam) {
      try {
        //const result = await model.findByPk(id);
        const result = await model.findOne({
          where: searchParam
        });
        return result != null ? result : [];
      } catch (error) {
        throw error;
      }
    },

    /**
     * Update a record in the specified model.
     * @param {number} id - The ID of the record to update.
     * @param {Object} data - The updated data for the record.
     * @returns {Promise<number>} A Promise that resolves with the number of updated rows.
     */
    async update(key,id, data) {
      try {
        const result = await model.update(data, {
          where: {
            [key]: {
              [Op.eq]: id,
            },
            is_deleted: parseInt(process.env.IS_DELETED_NO),
          },
        });
        return result[0];
      } catch (error) {
        throw error;
      }
    },

    /**
     * Delete a record from the specified model.
     * @param {number} id - The ID of the record to delete.
     * @returns {Promise<number>} A Promise that resolves with the number of deleted rows.
     */
    async delete(key,id) {
      try {
        const result = await model.destroy({
          where: {
            [key]: {
              [Op.eq]: id,
            },
          },
        });
        return result;
      } catch (error) {
        if(error.name == process.env.FOREIGN_KEY_CONSTRAINT_ERROR){
          return process.env.FOREIGN_KEY_CONSTRAINT_ERROR;
        }
        throw error;
      }
    },

    /**
     * Truncate the table for the specified model.
     * @returns {Promise<number>} A Promise that resolves with the number of deleted rows.
     */
    async truncateTable() {
      try {
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        const result = await model.destroy({
          where: {},
          truncate: true,
        });
        return result;
      } catch (error) {
        throw error;
      }
    },

    /**
     * Delete multiple record from the specified model.
     * @param {number} id - The ID of the record to delete.
     * @returns {Promise<number>} A Promise that resolves with the number of deleted rows.
     */
    async multiDelete(key,id) {
      try {
        const result = await model.destroy({
          where: {
            [key]: {
              [Op.in]: id,
            },
          },
        });
        return result;
      } catch (error) {
        if(error.name == process.env.FOREIGN_KEY_CONSTRAINT_ERROR){
          return process.env.FOREIGN_KEY_CONSTRAINT_ERROR;
        }
        throw error;
      }
    },
    /**
     * Soft Delete multiple record from the specified model.
     * @param {number} id - The ID of the record to delete.
     * @returns {Promise<number>} A Promise that resolves with the number of deleted rows.
     */
    async multiSoftDelete(key,id,data) {
      try {
        const result = await model.update(data, {
          where: {
            [key]: {
              [Op.in]: id,
            },
          },
        });
        return result;
      } catch (error) {
        throw error;
      }
    },
  };
};

export default CrudService;