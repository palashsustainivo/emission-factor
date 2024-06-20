import sequelize from '../../../config/database'; // Import the Sequelize instance
import Sequelize from 'sequelize';
;

const activityLog = sequelize.define('activity_log', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    table_name: {
        type: Sequelize.STRING,
        allowNull: false // The name of the table
    },
    ref_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    parent_ref_id: {
        type: Sequelize.STRING,
        allowNull: true
    },
    action_type: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    action_for: {
        type: Sequelize.STRING,
        allowNull: true 
    },
    action_details: {
        type: Sequelize.JSON,
        allowNull: true 
    },
    created_by: {
        type: Sequelize.STRING,
        allowNull: true // Identifier for the user who created the record
    },
}, {
    tableName: 'activity_log',
    timestamps: true
});
module.exports = activityLog;