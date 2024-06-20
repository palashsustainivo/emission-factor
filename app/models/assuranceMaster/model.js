import sequelize from '../../../config/database'; // Import the Sequelize instance
import Sequelize from 'sequelize';
;

const assuranceMaster = sequelize.define('assurance_master', {
    assurance_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue:Sequelize.UUIDV4, // UUID generated by Sequelize
    },
    rating: {
        type: Sequelize.STRING,
        allowNull: false // The rating of the assurance
    },
    record: {
        type: Sequelize.STRING,
        allowNull: false
    },
    file: {
        type: Sequelize.STRING,
        allowNull: true // The file link of the assurance
    },
    assured_by: {
        type: Sequelize.STRING,
        allowNull: true // Identifier for the user who assured the record
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
    tableName: 'assurance_master',
    timestamps: true
});

module.exports = assuranceMaster;