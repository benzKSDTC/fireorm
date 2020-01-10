
import { getMetadataStorage, IdPropertyMetadataArgs } from "../metadata-storage"

export function IdProp(): Function {
    return function (object: Object, propertyName: string) {
        getMetadataStorage().ids.push({
            target: object.constructor,
            propertyName: propertyName,
            generated: false,
        } as IdPropertyMetadataArgs)
    }
}