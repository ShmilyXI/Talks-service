import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { photo, photoId } from './photo';
import type { user, userId } from './user';

export interface commentAttributes {
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
  like_count: number;
  is_delete: number;
  top_status: number;
  create_time: Date;
}

export type commentPk = "id";
export type commentId = comment[commentPk];
export type commentOptionalAttributes = "id" | "username" | "user_avatar_url" | "parent_comment_id" | "parent_comment_user_id" | "reply_comment_id" | "reply_comment_user_id" | "content" | "comment_level" | "status" | "like_count" | "is_delete" | "top_status" | "create_time";
export type commentCreationAttributes = Optional<commentAttributes, commentOptionalAttributes>;

export class comment extends Model<commentAttributes, commentCreationAttributes> implements commentAttributes {
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
  like_count!: number;
  is_delete!: number;
  top_status!: number;
  create_time!: Date;

  // comment hasMany photo via comment_id
  comment_photos!: photo[];
  getComment_photos!: Sequelize.HasManyGetAssociationsMixin<photo>;
  setComment_photos!: Sequelize.HasManySetAssociationsMixin<photo, photoId>;
  addComment_photo!: Sequelize.HasManyAddAssociationMixin<photo, photoId>;
  addComment_photos!: Sequelize.HasManyAddAssociationsMixin<photo, photoId>;
  createComment_photo!: Sequelize.HasManyCreateAssociationMixin<photo>;
  removeComment_photo!: Sequelize.HasManyRemoveAssociationMixin<photo, photoId>;
  removeComment_photos!: Sequelize.HasManyRemoveAssociationsMixin<photo, photoId>;
  hasComment_photo!: Sequelize.HasManyHasAssociationMixin<photo, photoId>;
  hasComment_photos!: Sequelize.HasManyHasAssociationsMixin<photo, photoId>;
  countComment_photos!: Sequelize.HasManyCountAssociationsMixin;
  // comment belongsTo photo via photo_id
  photo!: photo;
  getPhoto!: Sequelize.BelongsToGetAssociationMixin<photo>;
  setPhoto!: Sequelize.BelongsToSetAssociationMixin<photo, photoId>;
  createPhoto!: Sequelize.BelongsToCreateAssociationMixin<photo>;
  // comment belongsTo user via parent_comment_user_id
  parent_comment_user!: user;
  getParent_comment_user!: Sequelize.BelongsToGetAssociationMixin<user>;
  setParent_comment_user!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createParent_comment_user!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // comment belongsTo user via reply_comment_user_id
  reply_comment_user!: user;
  getReply_comment_user!: Sequelize.BelongsToGetAssociationMixin<user>;
  setReply_comment_user!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createReply_comment_user!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // comment belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof comment {
    return sequelize.define('comment', {
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
        model: 'user',
        key: 'id'
      }
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      comment: "评论人名称"
    },
    user_avatar_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "用户头像"
    },
    photo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "评论的照片id",
      references: {
        model: 'photo',
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
        model: 'user',
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
        model: 'user',
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
    like_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "点赞数"
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
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间"
    }
  }, {
    tableName: 'comment',
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
          { name: "create_time" },
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
  }) as typeof comment;
  }
}
