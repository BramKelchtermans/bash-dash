import { Model, DataTypes } from "sequelize";
import { default as SequelizePaginate } from 'sequelize-paginate'


class HardwareLog extends Model {
  static init(sequelize) {
    super.init({
      component_id: DataTypes.NUMBER,
      data: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
          const value = this.getDataValue('data');
          return JSON.parse(value);
        },
        set(value) {
          if ((typeof value).toLowerCase() != 'string') {
            value = JSON.stringify(value);
          }
          this.setDataValue('data', value);
        }
      }
    }, {
      sequelize,
      modelName: 'HardwareLog',
      tableName: 'HardwareLogs'
    })
  }

  static associate(models) {
    this.belongsTo(models.HardwareComponent, {
      foreignKey: 'component_id'
    });
  }
}

export default HardwareLog