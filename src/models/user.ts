import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comment, commentId } from './comment';
import type { photo, photoId } from './photo';
import type { photo_favorite, photo_favoriteId } from './photo_favorite';

export interface userAttributes {
  id: number;
  username: string;
  telephone: string;
  password: string;
  avatar_url?: string;
  last_login_date?: string;
  display_name?: string;
  email?: string;
  individual_resume?: string;
  place?: string;
  location?: string;
  place_id?: string;
  provincial_name?: string;
  city_name?: string;
  area_name?: string;
  is_delete: number;
  create_time: Date;
  update_time: Date;
}

export type userPk = "id";
export type userId = user[userPk];
export type userOptionalAttributes = "id" | "avatar_url" | "last_login_date" | "display_name" | "email" | "individual_resume" | "place" | "location" | "place_id" | "provincial_name" | "city_name" | "area_name" | "is_delete" | "create_time" | "update_time";
export type userCreationAttributes = Optional<userAttributes, userOptionalAttributes>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  id!: number;
  username!: string;
  telephone!: string;
  password!: string;
  avatar_url?: string;
  last_login_date?: string;
  display_name?: string;
  email?: string;
  individual_resume?: string;
  place?: string;
  location?: string;
  place_id?: string;
  provincial_name?: string;
  city_name?: string;
  area_name?: string;
  is_delete!: number;
  create_time!: Date;
  update_time!: Date;

  // user hasMany comment via parent_comment_user_id
  comments!: comment[];
  getComments!: Sequelize.HasManyGetAssociationsMixin<comment>;
  setComments!: Sequelize.HasManySetAssociationsMixin<comment, commentId>;
  addComment!: Sequelize.HasManyAddAssociationMixin<comment, commentId>;
  addComments!: Sequelize.HasManyAddAssociationsMixin<comment, commentId>;
  createComment!: Sequelize.HasManyCreateAssociationMixin<comment>;
  removeComment!: Sequelize.HasManyRemoveAssociationMixin<comment, commentId>;
  removeComments!: Sequelize.HasManyRemoveAssociationsMixin<comment, commentId>;
  hasComment!: Sequelize.HasManyHasAssociationMixin<comment, commentId>;
  hasComments!: Sequelize.HasManyHasAssociationsMixin<comment, commentId>;
  countComments!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany comment via reply_comment_user_id
  reply_comment_user_comments!: comment[];
  getReply_comment_user_comments!: Sequelize.HasManyGetAssociationsMixin<comment>;
  setReply_comment_user_comments!: Sequelize.HasManySetAssociationsMixin<comment, commentId>;
  addReply_comment_user_comment!: Sequelize.HasManyAddAssociationMixin<comment, commentId>;
  addReply_comment_user_comments!: Sequelize.HasManyAddAssociationsMixin<comment, commentId>;
  createReply_comment_user_comment!: Sequelize.HasManyCreateAssociationMixin<comment>;
  removeReply_comment_user_comment!: Sequelize.HasManyRemoveAssociationMixin<comment, commentId>;
  removeReply_comment_user_comments!: Sequelize.HasManyRemoveAssociationsMixin<comment, commentId>;
  hasReply_comment_user_comment!: Sequelize.HasManyHasAssociationMixin<comment, commentId>;
  hasReply_comment_user_comments!: Sequelize.HasManyHasAssociationsMixin<comment, commentId>;
  countReply_comment_user_comments!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany comment via user_id
  user_comments!: comment[];
  getUser_comments!: Sequelize.HasManyGetAssociationsMixin<comment>;
  setUser_comments!: Sequelize.HasManySetAssociationsMixin<comment, commentId>;
  addUser_comment!: Sequelize.HasManyAddAssociationMixin<comment, commentId>;
  addUser_comments!: Sequelize.HasManyAddAssociationsMixin<comment, commentId>;
  createUser_comment!: Sequelize.HasManyCreateAssociationMixin<comment>;
  removeUser_comment!: Sequelize.HasManyRemoveAssociationMixin<comment, commentId>;
  removeUser_comments!: Sequelize.HasManyRemoveAssociationsMixin<comment, commentId>;
  hasUser_comment!: Sequelize.HasManyHasAssociationMixin<comment, commentId>;
  hasUser_comments!: Sequelize.HasManyHasAssociationsMixin<comment, commentId>;
  countUser_comments!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany photo via user_id
  photos!: photo[];
  getPhotos!: Sequelize.HasManyGetAssociationsMixin<photo>;
  setPhotos!: Sequelize.HasManySetAssociationsMixin<photo, photoId>;
  addPhoto!: Sequelize.HasManyAddAssociationMixin<photo, photoId>;
  addPhotos!: Sequelize.HasManyAddAssociationsMixin<photo, photoId>;
  createPhoto!: Sequelize.HasManyCreateAssociationMixin<photo>;
  removePhoto!: Sequelize.HasManyRemoveAssociationMixin<photo, photoId>;
  removePhotos!: Sequelize.HasManyRemoveAssociationsMixin<photo, photoId>;
  hasPhoto!: Sequelize.HasManyHasAssociationMixin<photo, photoId>;
  hasPhotos!: Sequelize.HasManyHasAssociationsMixin<photo, photoId>;
  countPhotos!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany photo_favorite via user_id
  photo_favorites!: photo_favorite[];
  getPhoto_favorites!: Sequelize.HasManyGetAssociationsMixin<photo_favorite>;
  setPhoto_favorites!: Sequelize.HasManySetAssociationsMixin<photo_favorite, photo_favoriteId>;
  addPhoto_favorite!: Sequelize.HasManyAddAssociationMixin<photo_favorite, photo_favoriteId>;
  addPhoto_favorites!: Sequelize.HasManyAddAssociationsMixin<photo_favorite, photo_favoriteId>;
  createPhoto_favorite!: Sequelize.HasManyCreateAssociationMixin<photo_favorite>;
  removePhoto_favorite!: Sequelize.HasManyRemoveAssociationMixin<photo_favorite, photo_favoriteId>;
  removePhoto_favorites!: Sequelize.HasManyRemoveAssociationsMixin<photo_favorite, photo_favoriteId>;
  hasPhoto_favorite!: Sequelize.HasManyHasAssociationMixin<photo_favorite, photo_favoriteId>;
  hasPhoto_favorites!: Sequelize.HasManyHasAssociationsMixin<photo_favorite, photo_favoriteId>;
  countPhoto_favorites!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "id"
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "用户名"
    },
    telephone: {
      type: DataTypes.CHAR(11),
      allowNull: false,
      comment: "电话号码"
    },
    password: {
      type: DataTypes.CHAR(32),
      allowNull: false,
      comment: "密码"
    },
    avatar_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "头像url"
    },
    last_login_date: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "最后一次登录时间"
    },
    display_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "显示名称"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "电子邮件"
    },
    individual_resume: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "个人简介"
    },
    place: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "地点"
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "经纬度"
    },
    place_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "地点id"
    },
    provincial_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "地点省份名称"
    },
    city_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "地点城市名称"
    },
    area_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "地点区域名称"
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
    tableName: 'user',
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
  }) as typeof user;
  }
}
