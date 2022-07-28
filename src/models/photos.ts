import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comments, commentsId } from './comments';
import type { photo_favorites, photo_favoritesId } from './photo_favorites';
import type { users, usersId } from './users';

export interface photosAttributes {
  id: number;
  user_id: number;
  comment_id?: number;
  url: string;
  width: number;
  height: number;
  title: string;
  gallery_ids?: string;
  description?: string;
  theme_color?: string;
  place?: string;
  place_id?: string;
  location?: string;
  provincial_name?: string;
  city_name?: string;
  area_name?: string;
  tags?: string;
  mood?: string;
  show_comments: number;
  exif_brand?: string;
  exif_model?: string;
  exif_aperture?: string;
  exif_focal_length?: string;
  exif_shutter_speed?: string;
  exif_iso?: string;
  shooting_date: string;
  is_delete: number;
  create_time: Date;
  update_time: Date;
}

export type photosPk = "id";
export type photosId = photos[photosPk];
export type photosOptionalAttributes = "id" | "comment_id" | "url" | "gallery_ids" | "description" | "theme_color" | "place" | "place_id" | "location" | "provincial_name" | "city_name" | "area_name" | "tags" | "mood" | "show_comments" | "exif_brand" | "exif_model" | "exif_aperture" | "exif_focal_length" | "exif_shutter_speed" | "exif_iso" | "shooting_date" | "is_delete" | "create_time" | "update_time";
export type photosCreationAttributes = Optional<photosAttributes, photosOptionalAttributes>;

export class photos extends Model<photosAttributes, photosCreationAttributes> implements photosAttributes {
  id!: number;
  user_id!: number;
  comment_id?: number;
  url!: string;
  width!: number;
  height!: number;
  title!: string;
  gallery_ids?: string;
  description?: string;
  theme_color?: string;
  place?: string;
  place_id?: string;
  location?: string;
  provincial_name?: string;
  city_name?: string;
  area_name?: string;
  tags?: string;
  mood?: string;
  show_comments!: number;
  exif_brand?: string;
  exif_model?: string;
  exif_aperture?: string;
  exif_focal_length?: string;
  exif_shutter_speed?: string;
  exif_iso?: string;
  shooting_date!: string;
  is_delete!: number;
  create_time!: Date;
  update_time!: Date;

  // photos belongsTo comments via comment_id
  comment_comment!: comments;
  getComment_comment!: Sequelize.BelongsToGetAssociationMixin<comments>;
  setComment_comment!: Sequelize.BelongsToSetAssociationMixin<comments, commentsId>;
  createComment_comment!: Sequelize.BelongsToCreateAssociationMixin<comments>;
  // photos hasMany comments via photo_id
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
  // photos hasMany photo_favorites via photo_id
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
  // photos belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof photos {
    return sequelize.define('photos', {
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
      comment: "归属用户id",
      references: {
        model: 'users',
        key: 'id'
      }
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "评论列表id",
      references: {
        model: 'comments',
        key: 'id'
      }
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      comment: "照片地址"
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "图片宽度"
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "图片高度"
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "图片标题名称"
    },
    gallery_ids: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "归属画廊id"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "图片描述"
    },
    theme_color: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "图片主题色"
    },
    place: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "地点"
    },
    place_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "地点id"
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "经纬度"
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
    tags: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "标签列表"
    },
    mood: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "情绪"
    },
    show_comments: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "是否展示评论区[ 0: 否, 1: 是 ]"
    },
    exif_brand: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "相片信息_品牌"
    },
    exif_model: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "相片信息_型号"
    },
    exif_aperture: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "相片信息_光圈"
    },
    exif_focal_length: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "相片信息_焦距"
    },
    exif_shutter_speed: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "相片信息_快门速度"
    },
    exif_iso: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "相片信息_iso"
    },
    shooting_date: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      comment: "拍摄时间"
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
    tableName: 'photos',
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
        name: "photo_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "photo_comment_id",
        using: "BTREE",
        fields: [
          { name: "comment_id" },
        ]
      },
    ]
  }) as typeof photos;
  }
}
