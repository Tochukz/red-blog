import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { validate, validateWithSync } from '@redwoodjs/api'

import { db } from 'src/lib/db'

export const contacts: QueryResolvers['contacts'] = () => {
  return db.contact.findMany()
}

export const contact: QueryResolvers['contact'] = ({ id }) => {
  return db.contact.findUnique({
    where: { id },
  })
}

export const createContact: MutationResolvers['createContact'] = ({
  input,
}) => {
  validate(input.email, 'email', { email: true })
  return db.contact.create({
    data: input,
  })
}

/**Example Validation */
/*
export const createCar = ({ input }: Car) => {
  validate(input.make, 'make', {
    inclusion: ['Audi', 'BMW', 'Ferrari', 'Lexus', 'Tesla'],
  })
  validate(input.color, 'color', {
    exclusion: { in: ['Beige', 'Mauve'], message: 'No one wants that color' },
  })
  validate(input.hasDamage, 'hasDamage', {
    absence: true,
  })
  validate(input.vin, 'vin', {
    format: /[A-Z0-9]+/,
    length: { equal: 17 },
  })
  validate(input.odometer, 'odometer', {
    numericality: { positive: true, lessThanOrEqual: 10000 },
  })

  return db.car.create({ data: input })
}
*/

/**Custom Validation */
/*
export const createCar = ({ input }: Car) => {
  validateWithSync(() => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    if (input.lastCarWashDate < oneWeekAgo) {
      throw new Error("We don't accept dirty cars")
    }
  })
  // Not that there is a validateWith functin for asynchronous validation.
}
*/
