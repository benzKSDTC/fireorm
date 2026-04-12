import { ObjectType } from "../common"
import { getMetadataStorage, PropertyMetadataArgs } from "../metadata-storage"
import { Transform, TransformationType } from "class-transformer"

export function SubCollectionProp<T>(type: () => ObjectType<T>): Function {
    return function (object: Object, propertyName: string) {
        Transform(({ value, type: transformationType }) => {
            if (transformationType === TransformationType.CLASS_TO_PLAIN) {
                return undefined
            }
            return value
        })(object, propertyName)

        
        getMetadataStorage().properties.push({
            target: object.constructor,
            propertyName: propertyName,
            type: type,
        } as PropertyMetadataArgs)
    }
}