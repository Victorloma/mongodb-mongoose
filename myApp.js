require('dotenv').config()

const dotenv = require('dotenv')
dotenv.config({ path: 'sample.env' })
let mongoose = require('mongoose')
const Schema = mongoose.Schema

const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: { type: Number },
  favoriteFoods: { type: [String] }
})

const Person = mongoose.model("Person", personSchema);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const createAndSavePerson = (done) => {
  let victor = new Person({
    name: 'Victor',
    age: 30,
    favoriteFoods: ['chicken', 'rice', 'brocoli']
  })

  victor.save((err, data) => {
    if (err) {
      return console.error(err)
    }
    done(null, data)
  })

};
const arrayOfPeople = [
  {
    name: 'Ron',
    age: 28,
    favoriteFoods: ['pizza', 'waffles', 'bread']
  },
  {
    name: 'Eddy',
    age: 35,
    favoriteFoods: ['pasta', 'butter', 'mango']
  },
  {
    name: 'Carla',
    age: 32,
    favoriteFoods: ['pita', 'burgers']
  }
]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.log(err);
    done(null, people)
  })
}

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) { return console.log(err) }
    done(null, personFound)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, personFound) => {
    if (err) { return console.log(err) }
    done(null, personFound)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) { return console.log(err) }
    done(null, person);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) { return console.log(err) }

    person.favoriteFoods.push(foodToAdd)

    person.save((err, updatedPerson) => {
      if (err) { console.log(err) }
      done(null, person)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet }, { new: true },
    (err, doc) => {
      if (err) { return console.log(err) }
      done(null, doc)
    }
  )
};

const removeById = (personId, done) => {
  /*
  Person.findByIdAndRemove({ _id: personId }, (err, data) => {
    if (err) { console.log(err) }
    done(null, data)
  })
  */
  Person.findOneAndRemove({ _id: personId }, (err, data) => {
    if (err) { console.log(err) }
    done(null, data)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) => {
    if (err) { console.log(err) }
    done(null, data)
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({name: 1})
    .limit(2)
    .select({age: 0})
    .exec(
      (err, data) => {
        if (err) { return console.log(err) }
        done(null, data)
      }
    )
};

/** **Well Done !!**
 * You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
