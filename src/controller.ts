import { Request, Response } from 'express';
import * as utils from './util';

export const createRecipe = (req: Request, res: Response) => {
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
  } catch (err) {
    res.status(500).json()
  }
}

export const getRecipes = (req: Request, res: Response) => {}

export const getRecipe = (req: Request, res: Response) => {}

export const updateRecipe = (req: Request, res: Response) => {}

export const deleteRecipe = (re: Request, res: Response) => {}
