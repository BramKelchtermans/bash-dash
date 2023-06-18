import { Model, DataTypes } from "sequelize";
import { default as SequelizePaginate } from 'sequelize-paginate'

class SystemInfo extends Model {
    static init(sequelize) {
        super.init(
            {
                cpu: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                    get() {
                        const value = this.getDataValue('cpu');
                        return JSON.parse(value);
                    },
                    set(value) {
                        if ((typeof value).toLowerCase() != 'string') {
                            value = JSON.stringify(value);
                        }
                        this.setDataValue('cpu', value);
                    }
                },
                memory: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                    get() {
                        const value = this.getDataValue('memory');
                        return JSON.parse(value);
                    },
                    set(value) {
                        if ((typeof value).toLowerCase() != 'string') {
                            value = JSON.stringify(value);
                        }
                        this.setDataValue('memory', value);
                    }
                },
                disks: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                    get() {
                        const value = this.getDataValue('disks');
                        return JSON.parse(value);
                    },
                    set(value) {
                        if ((typeof value).toLowerCase() != 'string') {
                            value = JSON.stringify(value);
                        }
                        this.setDataValue('disks', value);
                    }
                },
                network: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                    get() {
                        const value = this.getDataValue('network');
                        return JSON.parse(value);
                    },
                    set(value) {
                        if ((typeof value).toLowerCase() != 'string') {
                            value = JSON.stringify(value);
                        }
                        this.setDataValue('network', value);
                    }
                }
            },
            {
                sequelize,
                timestamps: true,
                tableName: 'SystemInfo'
            }
        );

        SequelizePaginate.paginate(this);
        return this;
    }
    get cpu() {
        console.log("Got here")
    }
    static associate(models) {

    }
}
export default SystemInfo;