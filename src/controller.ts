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
      res.status(200).json({
        'message': 'Recipe creation failed!',
        'required': missingFields.join(', '),
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
      recipe: [newRecipe],
    })
  } catch (err) {
    res.status(200).json({ message: 'something went wrong on the server' });
  }
}

export const getRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await db.select('*').from('recipes');
    res.status(200).json({ recipes });
  } catch (err) {
    res.status(200).json({ message: 'something went wrong' });
  }
}

export const getRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await db.select('*').from('recipes').where({ id: req.params.id });
    res.status(200).json({
      message: 'Recipe details by id',
      recipe: recipe,
    })
  } catch (err) {
    res.status(200).json({ message: 'something went wrong' });
  }
}

export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const existing = await db.select('id').from('recipes').where('id', req.params.id);
    if (!existing) {
      res.status(200).json({
        message: 'Invalid recipe id'
      });
      return;
    }
    const [recipe] = await db('recipes').update(req.body).where('id', req.params.id).returning('*');
    res.status(200).json({
      message: 'Recipe successfully updated!',
      recipe,
    });
  } catch (err) {
    res.status(200).json({ message: 'something went wrong' });
  }
}

export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const existing = await db.select('id').from('recipes').where('id', req.params.id);
    if (!existing) {
      res.status(200).json({
        message: 'Invalid recipe id',
      });
      return;
    }
    await db.delete().from('recipes').where('id', req.params.id).returning('*');
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(200).json({ message: 'something went wrong' });
  }
}
