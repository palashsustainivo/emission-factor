import sequelize from '../../../config/database'; // Import the Sequelize instance
import Sequelize from 'sequelize';
;

const groupMaster = sequelize.define('group_master', {
    group_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue:Sequelize.UUIDV4, // UUID generated by Sequelize
    },
    group_name: {
        type: Sequelize.STRING,
        allowNull: false // The name of the group
    },
    file_path:{
        type: Sequelize.STRING,
        allowNull: true // The path to the file
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
    tableName: 'group_master',
    timestamps: true
});

module.exports = groupMaster;