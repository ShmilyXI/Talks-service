import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface user_likeAttributes {
  id: number;
  user_id: number;
  liked_id: number;
  liked_status: number;
  liked_type: number;
  is_delete: number;
  create_time: Date;
  update_time: Date;
}

export type user_likePk = "id";
export type user_likeId = user_like[user_likePk];
export type user_likeOptionalAttributes = "id" | "liked_status" | "liked_type" | "is_delete" | "create_time" | "update_time";
export type user_likeCreationAttributes = Optional<user_likeAttributes, user_likeOptionalAttributes>;

export class user_like extends Model<user_likeAttributes, user_likeCreationAttributes> implements user_likeAttributes {
  id!: number;
  user_id!: number;
  liked_id!: number;
  liked_status!: number;
  liked_type!: number;
  is_delete!: number;
  create_time!: Date;
  update_time!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof user_like {
    return sequelize.define('user_like', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "id"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "用户id"
    },
    liked_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "被点赞的id"
    },
    liked_status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "点赞状态，0未点赞，1已点赞"
    },
    liked_type: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "点赞的类型 [0: 照片,1: 评论, 2:用户]"
    },
    is_delete: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "是否逻辑删除"
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间"
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "更新时间"
    }
  }, {
    tableName: 'user_like',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof user_like;
  }
}
