import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface user_likesAttributes {
  id: number;
  user_id: number;
  liked_id: number;
  liked_status: number;
  liked_type: number;
  is_delete: number;
  update_time: Date;
  create_time: Date;
}

export type user_likesPk = "id";
export type user_likesId = user_likes[user_likesPk];
export type user_likesOptionalAttributes = "id" | "liked_status" | "liked_type" | "is_delete" | "update_time" | "create_time";
export type user_likesCreationAttributes = Optional<user_likesAttributes, user_likesOptionalAttributes>;

export class user_likes extends Model<user_likesAttributes, user_likesCreationAttributes> implements user_likesAttributes {
  id!: number;
  user_id!: number;
  liked_id!: number;
  liked_status!: number;
  liked_type!: number;
  is_delete!: number;
  update_time!: Date;
  create_time!: Date;

  // user_likes belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_likes {
    return sequelize.define('user_likes', {
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
      comment: "用户id",
      references: {
        model: 'users',
        key: 'id'
      }
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
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "更新时间"
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间"
    }
  }, {
    tableName: 'user_likes',
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
      {
        name: "like_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  }) as typeof user_likes;
  }
}
