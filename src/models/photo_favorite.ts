import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { photo, photoId } from './photo';
import type { user, userId } from './user';

export interface photo_favoriteAttributes {
  id: number;
  user_id: number;
  photo_id: number;
  favorite_status: number;
  is_delete: number;
  create_time: Date;
  update_time: Date;
}

export type photo_favoritePk = "id";
export type photo_favoriteId = photo_favorite[photo_favoritePk];
export type photo_favoriteOptionalAttributes = "id" | "favorite_status" | "is_delete" | "create_time" | "update_time";
export type photo_favoriteCreationAttributes = Optional<photo_favoriteAttributes, photo_favoriteOptionalAttributes>;

export class photo_favorite extends Model<photo_favoriteAttributes, photo_favoriteCreationAttributes> implements photo_favoriteAttributes {
  id!: number;
  user_id!: number;
  photo_id!: number;
  favorite_status!: number;
  is_delete!: number;
  create_time!: Date;
  update_time!: Date;

  // photo_favorite belongsTo photo via photo_id
  photo!: photo;
  getPhoto!: Sequelize.BelongsToGetAssociationMixin<photo>;
  setPhoto!: Sequelize.BelongsToSetAssociationMixin<photo, photoId>;
  createPhoto!: Sequelize.BelongsToCreateAssociationMixin<photo>;
  // photo_favorite belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof photo_favorite {
    return sequelize.define('photo_favorite', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "用户id",
      references: {
        model: 'user',
        key: 'id'
      }
    },
    photo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "照片id",
      references: {
        model: 'photo',
        key: 'id'
      }
    },
    favorite_status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "收藏状态，0未收藏，1收藏"
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
      comment: "修改时间"
    }
  }, {
    tableName: 'photo_favorite',
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
        name: "favorite_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "favorite_photo_id",
        using: "BTREE",
        fields: [
          { name: "photo_id" },
        ]
      },
    ]
  }) as typeof photo_favorite;
  }
}
