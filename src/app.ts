import express from "express";
import dataDogs, { Doggo } from "./data/dogs";
import { Request } from "express";
import generateId from "./helpers/generateId";
import findById from "./helpers/findById";
import findItemIndex from "./helpers/findItemIndex";

type DogRequest = Request<any, any, Partial<Doggo>>;

const app = express();

// Otherwise the body is undefined
app.use(express.json());
app.use(express.urlencoded());

const port = 3000;

// create an array we can edit. Yes, we will mutate it in this lesson
let dogs = [...dataDogs];

/**
@get_all_doggos
*/
app.get("/dogs/", (req, res) => {
  res.send(dogs);
});
/**
@get_single_pupper
*/
app.get("/dogs/:id", (req, res) => {
  // add ts-node-dev
  // update tsconfig -> "ESNext"
  const doggo = findById(dogs, req.params.id);

  // Remind about the status codes! :) + teapot
  if (!doggo) return res.status(404).send("404: Dog not found");

  console.log(`Someone is interested in ${doggo.name}!`);
  return res.send(doggo);
});

/**
@add_another_doggo
*/
app.post(
  "/dogs",
  // quite a mouthful. Might be worth redesigning:
  (req: DogRequest, res) => {
    // add @types/express
    // introduce Postman if they haven't yet seen it
    // npm install body-parser --save
    if (!req.body.age || !req.body.name)
      return res.status(400).send("Name or age aren't present");

    if (typeof req.body.name !== "string")
      return res.status(400).send("Name must be a string");

    if (typeof req.body.age !== "number")
      return res.status(400).send("Wrong type for number");

    const newDog: Doggo = {
      // we have to explicitly tell this so TS doesn't shout
      age: req.body.age,
      name: req.body.name,
      id: generateId(dogs),
    };

    dogs = [...dogs, newDog];

    return res.send(dogs);
  }
);
/**
@update_doge
*/
app.patch("/dogs/:id", (req: DogRequest, res) => {
  const doggoIndex = findItemIndex(dogs, req.params.id);

  if (doggoIndex === -1) return res.status(404).send("404: Dog not found");

  const updatedDog = {
    ...dogs[doggoIndex],
    ...req.body,
  };

  dogs[doggoIndex] = updatedDog;

  res.send(dogs);
});

/**
@murder_animal
*/
app.delete("/dogs/:id", (req, res) => {
  const doggoIndex = findItemIndex(dogs, req.params.id);

  if (doggoIndex === -1) return res.status(404).send("404: Dog not found");

  delete dogs[doggoIndex];

  res.send(dogs);
});

app.listen(port, (): void => {
  // either the types mismatch or err doesnt exist?
  return console.log(`server is listening on the port ${port}`);
});
