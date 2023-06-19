import { Model, DataTypes } from "sequelize";
import { default as SequelizePaginate } from 'sequelize-paginate'

class HardwareComponent extends Model {
    static init(sequelize) {
        super.init(
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                type: {
                    type: DataTypes.ENUM(['CPU', 'DISK', 'MEMORY', 'NIC']),
                    allowNull: false,
                },
                static_attributes: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                    get() {
                        const value = this.getDataValue('static_attributes');
                        return JSON.parse(value);
                    },
                    set(value) {
                        if ((typeof value).toLowerCase() != 'string') {
                            value = JSON.stringify(value);
                        }
                        this.setDataValue('static_attributes', value);
                    }
                }
            },
            {
                sequelize,
                timestamps: true,
            }
        )
    }
}

export default HardwareComponent;
