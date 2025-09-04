import express from 'express';
import * as controller from './controller';

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.post('/recipes', controller.createRecipe);
app.get('/recipes', controller.getRecipes);
app.get('/recipes/:id', controller.getRecipe);
app.patch('/recipes/:id', controller.updateRecipe);
app.delete('/recipes/:id', controller.deleteRecipe);

export default app;
