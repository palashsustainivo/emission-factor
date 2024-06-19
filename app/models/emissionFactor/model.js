import sequelize from '../../../config/database'; // Import the Sequelize instance
import Sequelize from 'sequelize'; // Import the Sequelize instance
import sourceMaster from '../sourceMaster/model'
import uomMaster from '../uomMaster/model'
import licenseTypeMaster from '../licenseTypeMaster/model'
import licenseMaster from '../licenseMaster/model'
import methodologyMaster from '../methodologyMaster/model'
import calculationMethodologyMaster from '../calculationMethodologyMaster/model'
import calculationOriginMaster from '../calculationOriginMaster/model'
import regionMaster from '../regionMaster/model'
import groupMaster from '../groupMaster/model'
import sectorMaster from '../sectorMaster/model';
import categoryMaster from '../categoryMaster/model'
import verificationTypeMaster from '../verificationTypeMaster/model'
import ghgProtocolCategoryMaster from '../ghgProtocolCategoryMaster/model'
import assuranceMaster from '../assuranceMaster/model'
;

const emissionFactor = sequelize.define('emission_factor', {
    emission_factor_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue:Sequelize.UUIDV4, // UUID generated by Sequelize
    },
    ef_name: {
        type: Sequelize.STRING,
        allowNull: false // The name of the emissiion factor
    },
    ef_identifier: {
        type: Sequelize.STRING,
        allowNull: false // The identifier of the emissiion factor
    },
    co2e_total: {
        type: Sequelize.STRING,
        allowNull: true // The total CO2e
    },
    unit: {
        type: Sequelize.STRING,
        allowNull: true // unit of the emission factor
    },
    hsn_code: {
        type: Sequelize.STRING,
        allowNull: true // The HSN code of the emission factor
    },
    source_id: {//Foreign key linked to the source master table.
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            // This is a reference to another model
            model: sourceMaster,
            // This is the column name of the referenced model
            key: 'source_id',
        }
    },
    uom_id: {//Foreign key linked to the uom master table.
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            // This is a reference to another model
            model: uomMaster,
            // This is the column name of the referenced model
            key: 'uom_id',
        }
    },
    license_type_id: {//Foreign key linked to the lisence type master table.
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            // This is a reference to another model
            model: licenseTypeMaster,
            // This is the column name of the referenced model
            key: 'license_type_id',
        }
    },
    license_id: {//Foreign key linked to the lisence master table.
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            // This is a reference to another model
            model: licenseMaster,
            // This is the column name of the referenced model
            key: 'license_id',
        }
    },
    methodology_id: {//Foreign key linked to the methodology master table.
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            // This is a reference to another model
            model: methodologyMaster,
            // This is the column name of the referenced model
            key: 'methodology_id',
        }
    },
    calculation_methodology_id: {//Foreign key linked to the calculation methodology master table.
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            // This is a reference to another model
            model: calculationMethodologyMaster,
            // This is the column name of the referenced model
            key: 'calculation_methodology_id',
        }
    },
    calculation_origin_id: {//Foreign key linked to the calculation origin master table.
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            // This is a reference to another model
            model: calculationOriginMaster,
            // This is the column name of the referenced model
            key: 'calculation_origin_id',
        }
    },
    region_id: {//Foreign key linked to the region master table.
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            // This is a reference to another model
            model: regionMaster,
            // This is the column name of the referenced model
            key: 'region_id',
        }
    },
    group_id: {//Foreign key linked to the group master table.
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            // This is a reference to another model
            model: groupMaster,
            // This is the column name of the referenced model
            key: 'group_id',
        }
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
    category_id: {//Foreign key linked to the category master table.
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            // This is a reference to another model
            model: categoryMaster,
            // This is the column name of the referenced model
            key: 'category_id',
        }
    },
    verification_type_id: {//Foreign key linked to the verification type master table.
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            // This is a reference to another model
            model: verificationTypeMaster,
            // This is the column name of the referenced model
            key: 'verification_type_id',
        }
    },
    ghg_protocol_category_id: {//Foreign key linked to the ghg protocol category master table.
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            // This is a reference to another model
            model: ghgProtocolCategoryMaster,
            // This is the column name of the referenced model
            key: 'ghg_protocol_category_id',
        }
    },
    assurance_id: {//Foreign key linked to the assurance master table.
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            // This is a reference to another model
            model: assuranceMaster,
            // This is the column name of the referenced model
            key: 'assurance_id',
        }
    },
    co2: {
        type: Sequelize.STRING,
        allowNull: true // The CO2
    },
    co2_unit: {
        type: Sequelize.STRING,
        allowNull: true // The unit of CO2
    },
    ch4: {
        type: Sequelize.STRING,
        allowNull: true // The CH4
    },
    ch4_unit: {
        type: Sequelize.STRING,
        allowNull: true // The unit of CH4
    },
    n2o: {
        type: Sequelize.STRING,
        allowNull: true // The N2O
    },
    n2o_unit: {
        type: Sequelize.STRING,
        allowNull: true // The unit of N2O
    },
    co2_other_unit: {
        type: Sequelize.STRING,
        allowNull: true // The unit of CO2 other
    },
    co2eofch4:{
        type: Sequelize.STRING,
        allowNull: true // The CO2e of CH4
    },
    co2ofch4_unit:{
        type: Sequelize.STRING,
        allowNull: true //  The unit of CO2 of CH4
    },
    co2eofn2o:{
        type: Sequelize.STRING,
        allowNull: true //  The CO2e of N2O
    },
    co2eofn2o_unit:{
        type: Sequelize.STRING,
        allowNull: true // The unit of CO2e of N2O
    },
    gwp_value:{
        type: Sequelize.STRING,
        allowNull: false // The GWP value
    },
    scope: {
        type: Sequelize.ENUM,
        values: ['Scope 1', 'Scope 2', 'Scope 3'],
        allowNull: false // The scope of the emission factor
    },
    quality_score:{
        type: Sequelize.STRING,
        allowNull: true // The quality score of the emission factor
    },
    quality_issue:{
        type: Sequelize.STRING,
        allowNull: true // The quality issue of the emission factor
    },
    verified_by:{
        type: Sequelize.STRING,
        allowNull: true // The verified by of the emission factor
    },
    casual_activity:{
        type: Sequelize.STRING,
        allowNull: true // The casual activity of the emission factor
    },
    version:{
        type: Sequelize.STRING,
        allowNull: true // The version of the emission factor
    },
    additional_info1:{
        type: Sequelize.STRING,
        allowNull: true // The additional info1 of the emission factor
    },
    additional_info2:{
        type: Sequelize.STRING,
        allowNull: true // The additional info2 of the emission factor
    },
    year:{
        type: Sequelize.STRING,
        allowNull: true // The year of the emission factor
    },
    year_released:{
        type: Sequelize.STRING,
        allowNull: true // The year released of the emission factor
    },
    source_link2:{
        type: Sequelize.STRING,
        allowNull: true // The source link2 of the emission factor
    },
    permission_level:{
        type: Sequelize.STRING,
        allowNull: true // The permission level of the emission factor
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
    tableName: 'emission_factor',
    timestamps: true
});

module.exports = emissionFactor;