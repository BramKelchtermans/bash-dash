const { Model, DataTypes } = require("sequelize");

class SystemInfo extends Model {
    static init(sequelize) {
        super.init(
            {
                cpu: {
                    type: DataTypes.TEXT,
                    allowNull: false
                },
                memory: {
                    type: DataTypes.TEXT,
                    allowNull: false
                },
                disks: {
                    type: DataTypes.TEXT,
                    allowNull: false
                },
                network: {
                    type: DataTypes.TEXT,
                    allowNull: false
                }
            },
            {
                sequelize,
                timestamps: true,
                tableName: 'SystemInfo'
            }
        )
    }
    static associate(models) {

    }
}
export default SystemInfo;