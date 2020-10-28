// import Express from 'express';
const { json, response } = require('express');
const express = require('express');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express();

app.use(express.json());

app.set('port', process.env.PORT || 3001);
app.locals.title= 'todos'

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is now running on port ${app.get('port')}!`);
});

app.get('/api/v1/todos', async (request, response) => {
    try {
      const allTodos= await database('todo').select();
      response.status(200).json(allTodos);
    } catch(error) {
      response.status(500).json({ error });
    }
  });

  app.get('/api/v1/todos:id', async (request, response) => {

    try {
      const allTodos= await database('todo').select();
      response.status(200).json(allTodos);
    } catch(error) {
      response.status(500).json({ error });
    }
  });

  app.post('/api/v1/todos', async (request, response) => {
    const todoByUser = request.body;

    if (!todoByUser){
      return response
          .status(422)
          .send({ error: `response is ${todoByUser}` });
      }

    for (let requiredParameter of ['name', 'content']) {
      if (!todoByUser[requiredParameter]) {
        return response
          .status(422)
          .send({ error: `Expected format: { name: <String>, content: <String> }. You're missing a "${requiredParameter}" property.` });
      }
    }
      if(typeof todoByUser.name !== 'string' || typeof todoByUser.name !== 'string'){
        return response
        .status(422)
        .send({ error: `Expected typeof: { name: <String>, content: <String> }.` });
      }

    try {
        const id = await database('todo').insert(todoByUser, 'id');
        response.status(201).json( { id })
      } catch (error) {
        response.status(500).json({ error });
      }
  });

  
  app.get('/api/v1/todos/:id', async(request, response) => {
    console.log(request.params)
    try {
      const { id } = request.params
      const singleTodo = await database('todo').where('id', id).select();
      if (singleTodo.length) {
        response.status(200).json(singleTodo);
      } else {
        response.status(404).json({
          error: `Could not find todo with id ${id}`
        });
      }
    } catch (error) {
      response.status(500).json({ error });
    }
  })
  
  
  app.get('/api/v1/todos/by/:name', async(request, response) => {

    try {
      const { name } = request.params
      const singleTodo = await database('todo').where('name', name).select();
        if (singleTodo.length) {
          response.status(200).json(singleTodo);
        } else {
          response.status(404).json({
            error: `Could not find todo with name ${name}`
          });
        }
      } catch (error) {
        response.status(500).json({ error });
     }
  })

  app.delete('/api/v1/todos/:id', async(request, response) => {
    try {
      const { id } = request.params
      const singleTodo = await database('todo').where('id', id).delete();
     
        if (singleTodo.length) {
          response.status(200).json(`following todo has been deleted: ${singleTodo[0]}`);
        } else {
          response.status(404).json({
            error: `Could not find todo with name ${id}`
          });
        }
      } catch (error) {
        response.status(500).json({ error });
     }
  })
