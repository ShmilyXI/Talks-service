import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comment, commentId } from './comment';
import type { photo_favorite, photo_favoriteId } from './photo_favorite';
import type { user, userId } from './user';

export interface photoAttributes {
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

export type photoPk = "id";
export type photoId = photo[photoPk];
export type photoOptionalAttributes = "id" | "comment_id" | "url" | "gallery_ids" | "description" | "theme_color" | "place" | "place_id" | "location" | "provincial_name" | "city_name" | "area_name" | "tags" | "mood" | "show_comments" | "exif_brand" | "exif_model" | "exif_aperture" | "exif_focal_length" | "exif_shutter_speed" | "exif_iso" | "shooting_date" | "is_delete" | "create_time" | "update_time";
export type photoCreationAttributes = Optional<photoAttributes, photoOptionalAttributes>;

export class photo extends Model<photoAttributes, photoCreationAttributes> implements photoAttributes {
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

  // photo belongsTo comment via comment_id
  comment_comment!: comment;
  getComment_comment!: Sequelize.BelongsToGetAssociationMixin<comment>;
  setComment_comment!: Sequelize.BelongsToSetAssociationMixin<comment, commentId>;
  createComment_comment!: Sequelize.BelongsToCreateAssociationMixin<comment>;
  // photo hasMany comment via photo_id
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
  // photo hasMany photo_favorite via photo_id
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
  // photo belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof photo {
    return sequelize.define('photo', {
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
        model: 'user',
        key: 'id'
      }
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "评论列表id",
      references: {
        model: 'comment',
        key: 'photo_id'
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
    tableName: 'photo',
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
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "comment_id",
        using: "BTREE",
        fields: [
          { name: "comment_id" },
        ]
      },
    ]
  }) as typeof photo;
  }
}
