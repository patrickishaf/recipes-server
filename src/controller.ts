import { Request, Response } from 'express';
import * as utils from './util';
import {db} from './db/db';
import { Recipe } from './models';

export const createRecipe = async (req: Request, res: Response) => {
  let missingFields: string[]
  try {
    missingFields = utils.validateRequestBody(req.body, [
      'title',
      'making_time',
      'serves',
      'ingredients',
      'cost',
    ]);
    if (missingFields.length > 0) {
      res.status(400).json({
        'message': 'Recipe creation failed!',
        'required': missingFields,
      });
      return;
    }
    const recipe: Omit<Recipe, 'id'> = {
      title: req.body.title,
      making_time: req.body.making_time,
      serves: req.body.serves,
      ingredients: req.body.ingredients,
      cost: String(req.body.cost),
    };
    const [id] = await db.insert(recipe).into('recipes');
    const newRecipe = await db.select('*').from('recipes').where({ id }).first();
    res.status(200).json({
      message: 'Recipe successfully created!',
      recipe: newRecipe,
    })
  } catch (err) {
    res.status(500).json()
  }
}

export const getRecipes = (req: Request, res: Response) => {}

export const getRecipe = (req: Request, res: Response) => {}

export const updateRecipe = (req: Request, res: Response) => {}

export const deleteRecipe = (re: Request, res: Response) => {}
