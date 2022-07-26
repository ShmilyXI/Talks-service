import type { Sequelize } from "sequelize";
import { comment as _comment } from "./comment";
import type { commentAttributes, commentCreationAttributes } from "./comment";
import { photo as _photo } from "./photo";
import type { photoAttributes, photoCreationAttributes } from "./photo";
import { photo_favorite as _photo_favorite } from "./photo_favorite";
import type { photo_favoriteAttributes, photo_favoriteCreationAttributes } from "./photo_favorite";
import { user as _user } from "./user";
import type { userAttributes, userCreationAttributes } from "./user";
import { user_like as _user_like } from "./user_like";
import type { user_likeAttributes, user_likeCreationAttributes } from "./user_like";

export {
  _comment as comment,
  _photo as photo,
  _photo_favorite as photo_favorite,
  _user as user,
  _user_like as user_like,
};

export type {
  commentAttributes,
  commentCreationAttributes,
  photoAttributes,
  photoCreationAttributes,
  photo_favoriteAttributes,
  photo_favoriteCreationAttributes,
  userAttributes,
  userCreationAttributes,
  user_likeAttributes,
  user_likeCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const comment = _comment.initModel(sequelize);
  const photo = _photo.initModel(sequelize);
  const photo_favorite = _photo_favorite.initModel(sequelize);
  const user = _user.initModel(sequelize);
  const user_like = _user_like.initModel(sequelize);

  photo.belongsTo(comment, { as: "comment_comment", foreignKey: "comment_id"});
  comment.hasMany(photo, { as: "comment_photos", foreignKey: "comment_id"});
  comment.belongsTo(photo, { as: "photo", foreignKey: "photo_id"});
  photo.hasMany(comment, { as: "comments", foreignKey: "photo_id"});
  photo_favorite.belongsTo(photo, { as: "photo", foreignKey: "photo_id"});
  photo.hasMany(photo_favorite, { as: "photo_favorites", foreignKey: "photo_id"});
  comment.belongsTo(user, { as: "parent_comment_user", foreignKey: "parent_comment_user_id"});
  user.hasMany(comment, { as: "comments", foreignKey: "parent_comment_user_id"});
  comment.belongsTo(user, { as: "reply_comment_user", foreignKey: "reply_comment_user_id"});
  user.hasMany(comment, { as: "reply_comment_user_comments", foreignKey: "reply_comment_user_id"});
  comment.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(comment, { as: "user_comments", foreignKey: "user_id"});
  photo.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(photo, { as: "photos", foreignKey: "user_id"});
  photo_favorite.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(photo_favorite, { as: "photo_favorites", foreignKey: "user_id"});

  return {
    comment: comment,
    photo: photo,
    photo_favorite: photo_favorite,
    user: user,
    user_like: user_like,
  };
}
