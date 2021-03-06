import { Inject } from '@nestjs/common'
import { EntitySchema } from '@ksdtc/fireorm'
import { getCollectionToken, getCollectionGroupToken } from './fireorm.utils'
import { FIRESTORE_INSTANCT } from './fireorm.constants'

export const InjectCollRepo = <T extends { id: string }>(entity: EntitySchema<T>) => Inject(getCollectionToken(entity.name))
export const InjectCollectionRepo = <T extends { id: string }>(entity: EntitySchema<T>) => Inject(getCollectionToken(entity.name))

export const InjectCollGroupRepo = <T extends { id: string }>(entity: EntitySchema<T>) =>
    Inject(getCollectionGroupToken(entity.name))
export const InjectCollectionGroupRepo = <T extends { id: string }>(entity: EntitySchema<T>) =>
    Inject(getCollectionGroupToken(entity.name))

export const InjectFirestore = () => Inject(FIRESTORE_INSTANCT)
