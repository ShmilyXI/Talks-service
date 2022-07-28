import type { Sequelize } from "sequelize";
import { comments as _comments } from "./comments";
import type { commentsAttributes, commentsCreationAttributes } from "./comments";
import { photo_favorites as _photo_favorites } from "./photo_favorites";
import type { photo_favoritesAttributes, photo_favoritesCreationAttributes } from "./photo_favorites";
import { photos as _photos } from "./photos";
import type { photosAttributes, photosCreationAttributes } from "./photos";
import { user_likes as _user_likes } from "./user_likes";
import type { user_likesAttributes, user_likesCreationAttributes } from "./user_likes";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _comments as comments,
  _photo_favorites as photo_favorites,
  _photos as photos,
  _user_likes as user_likes,
  _users as users,
};

export type {
  commentsAttributes,
  commentsCreationAttributes,
  photo_favoritesAttributes,
  photo_favoritesCreationAttributes,
  photosAttributes,
  photosCreationAttributes,
  user_likesAttributes,
  user_likesCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const comments = _comments.initModel(sequelize);
  const photo_favorites = _photo_favorites.initModel(sequelize);
  const photos = _photos.initModel(sequelize);
  const user_likes = _user_likes.initModel(sequelize);
  const users = _users.initModel(sequelize);

  photos.belongsTo(comments, { as: "comment_comment", foreignKey: "comment_id"});
  comments.hasMany(photos, { as: "comment_photos", foreignKey: "comment_id"});
  comments.belongsTo(photos, { as: "photo", foreignKey: "photo_id"});
  photos.hasMany(comments, { as: "comments", foreignKey: "photo_id"});
  photo_favorites.belongsTo(photos, { as: "photo", foreignKey: "photo_id"});
  photos.hasMany(photo_favorites, { as: "photo_favorites", foreignKey: "photo_id"});
  comments.belongsTo(users, { as: "parent_comment_user", foreignKey: "parent_comment_user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "parent_comment_user_id"});
  comments.belongsTo(users, { as: "reply_comment_user", foreignKey: "reply_comment_user_id"});
  users.hasMany(comments, { as: "reply_comment_user_comments", foreignKey: "reply_comment_user_id"});
  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "user_comments", foreignKey: "user_id"});
  photo_favorites.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(photo_favorites, { as: "photo_favorites", foreignKey: "user_id"});
  photos.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(photos, { as: "photos", foreignKey: "user_id"});
  user_likes.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_likes, { as: "user_likes", foreignKey: "user_id"});

  return {
    comments: comments,
    photo_favorites: photo_favorites,
    photos: photos,
    user_likes: user_likes,
    users: users,
  };
}
