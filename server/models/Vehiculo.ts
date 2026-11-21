import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { conexionDB } from "../database/conexion";

export class VehiculoModelo extends Model<
  InferAttributes<VehiculoModelo>,
  InferCreationAttributes<VehiculoModelo>
> {
  declare id: CreationOptional<number>;
  declare marca: string;
  declare modelo: string;
  declare matricula: string;
  declare km: number | null;
  declare fechaProximaITV: string | null;
  declare bastidor: string | null;
  declare fechaPrimeraMatriculacion: string | null;
  declare observaciones: string | null;
  declare foto: string | null;
  declare tipo: string;
}

VehiculoModelo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    matricula: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    km: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fechaProximaITV: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    bastidor: {
      type: DataTypes.STRING(17),
      allowNull: true,
    },
    fechaPrimeraMatriculacion: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    foto: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tipo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: conexionDB,
    tableName: "vehiculos",
    timestamps: false,
  },
);
