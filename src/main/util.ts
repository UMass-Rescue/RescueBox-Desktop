/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import { Model } from 'sequelize';
import { InferAttributes } from 'sequelize/types/model';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export function getRaw<T extends Model>(
  model: T | null,
): InferAttributes<T> | null {
  if (!model) {
    return null;
  }
  return model.get({ plain: true, clone: true });
}
