// *** String helpers *** //
export const capitalize = (str) => str && str.charAt(0).toUpperCase() + str.slice(1)

// *** MongoDB helpers *** //
import { Schema } from 'mongoose'

// Builds schema with timestamps turned on and __v key hidden
export const createSchema = (schema) => {
  schema.__v = { type: Number, select: false }
  return new Schema(schema,
    // Available in MongoDB 4.0.0, adds createdAt and updatedAt fields
    { timestamps: true })
}