export interface FieldsType {
    [k: string]: any;
}
export type GeneratorData<T, Name extends string> = {
    [f in Name]: {
        head: string;
        data: T[];
    };
};
