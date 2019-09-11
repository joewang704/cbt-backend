import mongoose from 'mongoose'

import { capitalize, createSchema } from './utils'

mongoose.connect('mongodb://localhost:27017/cbt', { useNewUrlParser: true })

const createExercise = (name, schema) => {
  return mongoose.model(name, createSchema(schema))
}

const ThoughtReframing = createExercise('ThoughtReframing', {
  distortedThought: String,
  selectedDistortions: [String],
  rationalizedThought: String,
})

const FacingFears = createExercise('FacingFears', {
  activity: String,
  anxietyLevel: Number,
})

const AntiProcrastination = createExercise('AntiProcrastination', {
  activity: String,
  predDifficulty: Number,
  predSatisfaction: Number,
  actualDifficulty: Number,
  actualSatisfaction: Number,
})

const PleasurePredicting = createExercise('PleasurePredicting', {
  activity: String,
  partners: [String],
  predSatisfaction: Number,
  actualSatisfaction: Number,
})

const ProsAndCons = createExercise('ProsAndCons', {
  activity: String,
  pros: String,
  cons: String,
})

const exercises = { ThoughtReframing, FacingFears, AntiProcrastination, PleasurePredicting, ProsAndCons }

const getExerciseModel = (type) => exercises[capitalize(type)]

export const getEntriesForExercise = (type) => getExerciseModel(type).find()

export const getExerciseEntry = (type, id) => getExerciseModel(type).findById(id)

export const addExerciseEntry = (type, body) => {
  const Model = getExerciseModel(type)
  const m = new Model(body)
  return m.save().then((result, err) => {
    if (err) {
      throw err
    }
    // Remove added __v flag from MongoDB
    result.__v = undefined
    return result
  })
}

export const removeExerciseEntry = (type, id) => getExerciseModel(type).remove({ _id: id })