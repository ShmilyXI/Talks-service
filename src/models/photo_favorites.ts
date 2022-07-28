import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { photos, photosId } from './photos';
import type { users, usersId } from './users';

export interface photo_favoritesAttributes {
  id: number;
  user_id: number;
  photo_id: number;
  favorite_status: number;
  is_delete: number;
  update_time: Date;
  create_time: Date;
}

export type photo_favoritesPk = "id";
export type photo_favoritesId = photo_favorites[photo_favoritesPk];
export type photo_favoritesOptionalAttributes = "id" | "favorite_status" | "is_delete" | "update_time" | "create_time";
export type photo_favoritesCreationAttributes = Optional<photo_favoritesAttributes, photo_favoritesOptionalAttributes>;

export class photo_favorites extends Model<photo_favoritesAttributes, photo_favoritesCreationAttributes> implements photo_favoritesAttributes {
  id!: number;
  user_id!: number;
  photo_id!: number;
  favorite_status!: number;
  is_delete!: number;
  update_time!: Date;
  create_time!: Date;

  // photo_favorites belongsTo photos via photo_id
  photo!: photos;
  getPhoto!: Sequelize.BelongsToGetAssociationMixin<photos>;
  setPhoto!: Sequelize.BelongsToSetAssociationMixin<photos, photosId>;
  createPhoto!: Sequelize.BelongsToCreateAssociationMixin<photos>;
  // photo_favorites belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof photo_favorites {
    return sequelize.define('photo_favorites', {
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
        model: 'users',
        key: 'id'
      }
    },
    photo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "照片id",
      references: {
        model: 'photos',
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
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "修改时间"
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间"
    }
  }, {
    tableName: 'photo_favorites',
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
  }) as typeof photo_favorites;
  }
}
