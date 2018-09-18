import * as PIXI from 'pixi.js';
import tiledMapLoader from '../tiled/tiledMapLoader';

export const Application = PIXI.Application;
export const Loader = PIXI.loader;
export const Resources = PIXI.loader.resources;
export const Sprite = PIXI.Sprite;
export const AnimatedSprite = PIXI.AnimatedSprite;
export const Utils = PIXI.utils;
export const TexCache = PIXI.utils.TextureCache;
export const Texture = PIXI.Texture;
export const Container = PIXI.Container;
export const Text = PIXI.Text;

PIXI.loaders.Loader.addPixiMiddleware(tiledMapLoader);
PIXI.loader.use(tiledMapLoader());


