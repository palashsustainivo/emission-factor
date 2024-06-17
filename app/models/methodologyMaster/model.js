import sequelize from '../../../config/database'; // Import the Sequelize instance
import Sequelize from 'sequelize';
;

const methodologyMaster = sequelize.define('methodology_master', {
    methodology_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue:Sequelize.UUIDV4, // UUID generated by Sequelize
    },
    methodology_name: {
        type: Sequelize.STRING,
        allowNull: false // The name of the methodology
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
    tableName: 'methodology_master',
    timestamps: true
});

module.exports = methodologyMaster;