import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { photos, photosId } from './photos';
import type { users, usersId } from './users';

export interface commentsAttributes {
  id: number;
  user_id: number;
  username: string;
  user_avatar_url?: string;
  photo_id: number;
  parent_comment_id?: number;
  parent_comment_user_id?: number;
  reply_comment_id?: number;
  reply_comment_user_id?: number;
  content: string;
  comment_level: number;
  status: number;
  type: number;
  is_delete: number;
  top_status: number;
  update_time: Date;
  create_time: Date;
}

export type commentsPk = "id";
export type commentsId = comments[commentsPk];
export type commentsOptionalAttributes = "id" | "user_avatar_url" | "parent_comment_id" | "parent_comment_user_id" | "reply_comment_id" | "reply_comment_user_id" | "content" | "comment_level" | "status" | "is_delete" | "top_status" | "update_time" | "create_time";
export type commentsCreationAttributes = Optional<commentsAttributes, commentsOptionalAttributes>;

export class comments extends Model<commentsAttributes, commentsCreationAttributes> implements commentsAttributes {
  id!: number;
  user_id!: number;
  username!: string;
  user_avatar_url?: string;
  photo_id!: number;
  parent_comment_id?: number;
  parent_comment_user_id?: number;
  reply_comment_id?: number;
  reply_comment_user_id?: number;
  content!: string;
  comment_level!: number;
  status!: number;
  type!: number;
  is_delete!: number;
  top_status!: number;
  update_time!: Date;
  create_time!: Date;

  // comments hasMany photos via comment_id
  comment_photos!: photos[];
  getComment_photos!: Sequelize.HasManyGetAssociationsMixin<photos>;
  setComment_photos!: Sequelize.HasManySetAssociationsMixin<photos, photosId>;
  addComment_photo!: Sequelize.HasManyAddAssociationMixin<photos, photosId>;
  addComment_photos!: Sequelize.HasManyAddAssociationsMixin<photos, photosId>;
  createComment_photo!: Sequelize.HasManyCreateAssociationMixin<photos>;
  removeComment_photo!: Sequelize.HasManyRemoveAssociationMixin<photos, photosId>;
  removeComment_photos!: Sequelize.HasManyRemoveAssociationsMixin<photos, photosId>;
  hasComment_photo!: Sequelize.HasManyHasAssociationMixin<photos, photosId>;
  hasComment_photos!: Sequelize.HasManyHasAssociationsMixin<photos, photosId>;
  countComment_photos!: Sequelize.HasManyCountAssociationsMixin;
  // comments belongsTo photos via photo_id
  photo!: photos;
  getPhoto!: Sequelize.BelongsToGetAssociationMixin<photos>;
  setPhoto!: Sequelize.BelongsToSetAssociationMixin<photos, photosId>;
  createPhoto!: Sequelize.BelongsToCreateAssociationMixin<photos>;
  // comments belongsTo users via parent_comment_user_id
  parent_comment_user!: users;
  getParent_comment_user!: Sequelize.BelongsToGetAssociationMixin<users>;
  setParent_comment_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createParent_comment_user!: Sequelize.BelongsToCreateAssociationMixin<users>;
  // comments belongsTo users via reply_comment_user_id
  reply_comment_user!: users;
  getReply_comment_user!: Sequelize.BelongsToGetAssociationMixin<users>;
  setReply_comment_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createReply_comment_user!: Sequelize.BelongsToCreateAssociationMixin<users>;
  // comments belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof comments {
    return sequelize.define('comments', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "评论id"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "评论人userId",
      references: {
        model: 'users',
        key: 'id'
      }
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "评论人名称"
    },
    user_avatar_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "用户头像"
    },
    photo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "评论的照片id",
      references: {
        model: 'photos',
        key: 'id'
      }
    },
    parent_comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "父评论id"
    },
    parent_comment_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "父评论的用户id",
      references: {
        model: 'users',
        key: 'id'
      }
    },
    reply_comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "被回复的评论id"
    },
    reply_comment_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "被回复的用户id",
      references: {
        model: 'users',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      comment: "评论的内容"
    },
    comment_level: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: "评论等级[ 1 一级评论 默认 ，2 二级评论]"
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: "状态 (1 有效，0 逻辑删除)"
    },
    type: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "评论类型[1 照片, 2 社区文章]"
    },
    is_delete: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "是否逻辑删除 [0: 否 ,1: 是]"
    },
    top_status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "置顶状态[ 1 置顶，0 不置顶 默认 ]"
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
    tableName: 'comments',
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
        name: "idx_article_id",
        using: "BTREE",
        fields: [
          { name: "photo_id" },
        ]
      },
      {
        name: "idx_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "idx_create_time",
        using: "BTREE",
        fields: [
          { name: "update_time" },
        ]
      },
      {
        name: "idx_parent_comment_id",
        using: "BTREE",
        fields: [
          { name: "parent_comment_id" },
        ]
      },
      {
        name: "comment_parent_comment_user_id",
        using: "BTREE",
        fields: [
          { name: "parent_comment_user_id" },
        ]
      },
      {
        name: "comment_reply_comment_user_idt_comment_user_id",
        using: "BTREE",
        fields: [
          { name: "reply_comment_user_id" },
        ]
      },
    ]
  }) as typeof comments;
  }
}
