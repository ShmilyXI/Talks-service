import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comments, commentsId } from './comments';
import type { photo_favorites, photo_favoritesId } from './photo_favorites';
import type { photos, photosId } from './photos';
import type { user_likes, user_likesId } from './user_likes';

export interface usersAttributes {
  id: number;
  username: string;
  display_name: string;
  telephone: string;
  password: string;
  avatar_url?: string;
  email?: string;
  individual_resume?: string;
  place?: string;
  location?: string;
  place_id?: string;
  provincial_name?: string;
  city_name?: string;
  area_name?: string;
  is_delete: number;
  last_login_date?: Date;
  update_time: Date;
  create_time: Date;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersOptionalAttributes = "id" | "avatar_url" | "email" | "individual_resume" | "place" | "location" | "place_id" | "provincial_name" | "city_name" | "area_name" | "is_delete" | "last_login_date" | "update_time" | "create_time";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  id!: number;
  username!: string;
  display_name!: string;
  telephone!: string;
  password!: string;
  avatar_url?: string;
  email?: string;
  individual_resume?: string;
  place?: string;
  location?: string;
  place_id?: string;
  provincial_name?: string;
  city_name?: string;
  area_name?: string;
  is_delete!: number;
  last_login_date?: Date;
  update_time!: Date;
  create_time!: Date;

  // users hasMany comments via parent_comment_user_id
  comments!: comments[];
  getComments!: Sequelize.HasManyGetAssociationsMixin<comments>;
  setComments!: Sequelize.HasManySetAssociationsMixin<comments, commentsId>;
  addComment!: Sequelize.HasManyAddAssociationMixin<comments, commentsId>;
  addComments!: Sequelize.HasManyAddAssociationsMixin<comments, commentsId>;
  createComment!: Sequelize.HasManyCreateAssociationMixin<comments>;
  removeComment!: Sequelize.HasManyRemoveAssociationMixin<comments, commentsId>;
  removeComments!: Sequelize.HasManyRemoveAssociationsMixin<comments, commentsId>;
  hasComment!: Sequelize.HasManyHasAssociationMixin<comments, commentsId>;
  hasComments!: Sequelize.HasManyHasAssociationsMixin<comments, commentsId>;
  countComments!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany comments via reply_comment_user_id
  reply_comment_user_comments!: comments[];
  getReply_comment_user_comments!: Sequelize.HasManyGetAssociationsMixin<comments>;
  setReply_comment_user_comments!: Sequelize.HasManySetAssociationsMixin<comments, commentsId>;
  addReply_comment_user_comment!: Sequelize.HasManyAddAssociationMixin<comments, commentsId>;
  addReply_comment_user_comments!: Sequelize.HasManyAddAssociationsMixin<comments, commentsId>;
  createReply_comment_user_comment!: Sequelize.HasManyCreateAssociationMixin<comments>;
  removeReply_comment_user_comment!: Sequelize.HasManyRemoveAssociationMixin<comments, commentsId>;
  removeReply_comment_user_comments!: Sequelize.HasManyRemoveAssociationsMixin<comments, commentsId>;
  hasReply_comment_user_comment!: Sequelize.HasManyHasAssociationMixin<comments, commentsId>;
  hasReply_comment_user_comments!: Sequelize.HasManyHasAssociationsMixin<comments, commentsId>;
  countReply_comment_user_comments!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany comments via user_id
  user_comments!: comments[];
  getUser_comments!: Sequelize.HasManyGetAssociationsMixin<comments>;
  setUser_comments!: Sequelize.HasManySetAssociationsMixin<comments, commentsId>;
  addUser_comment!: Sequelize.HasManyAddAssociationMixin<comments, commentsId>;
  addUser_comments!: Sequelize.HasManyAddAssociationsMixin<comments, commentsId>;
  createUser_comment!: Sequelize.HasManyCreateAssociationMixin<comments>;
  removeUser_comment!: Sequelize.HasManyRemoveAssociationMixin<comments, commentsId>;
  removeUser_comments!: Sequelize.HasManyRemoveAssociationsMixin<comments, commentsId>;
  hasUser_comment!: Sequelize.HasManyHasAssociationMixin<comments, commentsId>;
  hasUser_comments!: Sequelize.HasManyHasAssociationsMixin<comments, commentsId>;
  countUser_comments!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany photo_favorites via user_id
  photo_favorites!: photo_favorites[];
  getPhoto_favorites!: Sequelize.HasManyGetAssociationsMixin<photo_favorites>;
  setPhoto_favorites!: Sequelize.HasManySetAssociationsMixin<photo_favorites, photo_favoritesId>;
  addPhoto_favorite!: Sequelize.HasManyAddAssociationMixin<photo_favorites, photo_favoritesId>;
  addPhoto_favorites!: Sequelize.HasManyAddAssociationsMixin<photo_favorites, photo_favoritesId>;
  createPhoto_favorite!: Sequelize.HasManyCreateAssociationMixin<photo_favorites>;
  removePhoto_favorite!: Sequelize.HasManyRemoveAssociationMixin<photo_favorites, photo_favoritesId>;
  removePhoto_favorites!: Sequelize.HasManyRemoveAssociationsMixin<photo_favorites, photo_favoritesId>;
  hasPhoto_favorite!: Sequelize.HasManyHasAssociationMixin<photo_favorites, photo_favoritesId>;
  hasPhoto_favorites!: Sequelize.HasManyHasAssociationsMixin<photo_favorites, photo_favoritesId>;
  countPhoto_favorites!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany photos via user_id
  photos!: photos[];
  getPhotos!: Sequelize.HasManyGetAssociationsMixin<photos>;
  setPhotos!: Sequelize.HasManySetAssociationsMixin<photos, photosId>;
  addPhoto!: Sequelize.HasManyAddAssociationMixin<photos, photosId>;
  addPhotos!: Sequelize.HasManyAddAssociationsMixin<photos, photosId>;
  createPhoto!: Sequelize.HasManyCreateAssociationMixin<photos>;
  removePhoto!: Sequelize.HasManyRemoveAssociationMixin<photos, photosId>;
  removePhotos!: Sequelize.HasManyRemoveAssociationsMixin<photos, photosId>;
  hasPhoto!: Sequelize.HasManyHasAssociationMixin<photos, photosId>;
  hasPhotos!: Sequelize.HasManyHasAssociationsMixin<photos, photosId>;
  countPhotos!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany user_likes via user_id
  user_likes!: user_likes[];
  getUser_likes!: Sequelize.HasManyGetAssociationsMixin<user_likes>;
  setUser_likes!: Sequelize.HasManySetAssociationsMixin<user_likes, user_likesId>;
  addUser_like!: Sequelize.HasManyAddAssociationMixin<user_likes, user_likesId>;
  addUser_likes!: Sequelize.HasManyAddAssociationsMixin<user_likes, user_likesId>;
  createUser_like!: Sequelize.HasManyCreateAssociationMixin<user_likes>;
  removeUser_like!: Sequelize.HasManyRemoveAssociationMixin<user_likes, user_likesId>;
  removeUser_likes!: Sequelize.HasManyRemoveAssociationsMixin<user_likes, user_likesId>;
  hasUser_like!: Sequelize.HasManyHasAssociationMixin<user_likes, user_likesId>;
  hasUser_likes!: Sequelize.HasManyHasAssociationsMixin<user_likes, user_likesId>;
  countUser_likes!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return sequelize.define('users', {
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
    display_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "显示名称"
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
      defaultValue: "",
      comment: "头像url"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "电子邮件"
    },
    individual_resume: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "个人简介"
    },
    place: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "地点"
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "经纬度"
    },
    place_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "地点id"
    },
    provincial_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "地点省份名称"
    },
    city_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "地点城市名称"
    },
    area_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "地点区域名称"
    },
    is_delete: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "是否逻辑删除"
    },
    last_login_date: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "最后一次登录时间"
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
    tableName: 'users',
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
  }) as typeof users;
  }
}
