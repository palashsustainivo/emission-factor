import sequelize from '../../../config/database'; // Import the Sequelize instance
import Sequelize from 'sequelize';
import sectorMaster from '../sectorMaster/model';
;

const categoryMaster = sequelize.define('category_master', {
    category_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue:Sequelize.UUIDV4, // UUID generated by Sequelize
    },
    category_name: {
        type: Sequelize.STRING,
        allowNull: false // The name of the category
    },
    sector_id: {//Foreign key linked to the sector master table.
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            // This is a reference to another model
            model: sectorMaster,
            // This is the column name of the referenced model
            key: 'sector_id',
        }
    },
    created_by: {
        type: Sequelize.STRING,
        allowNull: true // Identifier for the user who created the record
    },
    updated_by: {
        type: Sequelize.STRING,
        allowNull: true // Identifier for the user who last updated the record
    },
    is_deleted: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: process.env.IS_DELETED_NO // Flag 1 indicate if the record is deleted
    },
}, {
    tableName: 'category_master',
    timestamps: true
});

module.exports = categoryMaster;