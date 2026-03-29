import { getMetadataStorage, RelationMetadataArgs } from '../metadata-storage'
import { Transform, TransformationType, Type } from 'class-transformer'
import { ObjectType } from '../common'

export function ManyToOne<T>(
    typeFunc: () => ObjectType<T>,
    collectionType?: () => ObjectType<T>,
    inverseSide?: string,
): Function {
    return function(object: Object, propertyName: string) {
        Transform(({ value, type: transformationType }) => {
            const collectionPath = getMetadataStorage().getCollectionPath(collectionType ? collectionType() : typeFunc())
            const idPropertyName = getMetadataStorage().getIdProp(collectionType ? collectionType() : typeFunc()).propertyName

            if (transformationType === TransformationType.PLAIN_TO_CLASS) {
                return value
            } else if (transformationType === TransformationType.CLASS_TO_PLAIN) {
                if (typeof value === 'string') {
                    return { $ref: { id: value, path: collectionPath } }
                }
                if (value instanceof Array && inverseSide) {
                    const parts = inverseSide.split('.')
                    const segments: any[] = []
                    for (let i = 0; i < parts.length; i++) {
                        segments.push(value[i], parts[i])
                    }
                    const path = collectionPath + '/' + segments.join('/')
                    return { $ref: { id: value[value.length - 1], path } }
                }
                return { $ref: { id: value[idPropertyName], path: collectionPath } }
            }
            return value
        })(object, propertyName)

        Type(typeFunc)(object, propertyName)

        getMetadataStorage().relations.push({
            target: object.constructor,
            propertyName: propertyName,
            relationType: 'many-to-one',
            inverseSide,
            type: typeFunc,
        } as RelationMetadataArgs)
    }
}
