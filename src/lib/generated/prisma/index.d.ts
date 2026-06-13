
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Pole
 * 
 */
export type Pole = $Result.DefaultSelection<Prisma.$PolePayload>
/**
 * Model FaultReport
 * 
 */
export type FaultReport = $Result.DefaultSelection<Prisma.$FaultReportPayload>
/**
 * Model WorkOrder
 * 
 */
export type WorkOrder = $Result.DefaultSelection<Prisma.$WorkOrderPayload>
/**
 * Model StatusLog
 * 
 */
export type StatusLog = $Result.DefaultSelection<Prisma.$StatusLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  TECHNICIAN: 'TECHNICIAN',
  VIEWER: 'VIEWER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const PoleStatus: {
  ACTIVE: 'ACTIVE',
  FAULTY: 'FAULTY',
  UNDER_MAINTENANCE: 'UNDER_MAINTENANCE',
  DECOMMISSIONED: 'DECOMMISSIONED'
};

export type PoleStatus = (typeof PoleStatus)[keyof typeof PoleStatus]


export const FaultType: {
  NO_POWER: 'NO_POWER',
  FLICKERING: 'FLICKERING',
  DAMAGED_FIXTURE: 'DAMAGED_FIXTURE',
  VANDALISM: 'VANDALISM',
  OTHER: 'OTHER'
};

export type FaultType = (typeof FaultType)[keyof typeof FaultType]


export const ReportStatus: {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED'
};

export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus]


export const WorkOrderStatus: {
  PENDING: 'PENDING',
  ASSIGNED: 'ASSIGNED',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
  CANCELLED: 'CANCELLED'
};

export type WorkOrderStatus = (typeof WorkOrderStatus)[keyof typeof WorkOrderStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type PoleStatus = $Enums.PoleStatus

export const PoleStatus: typeof $Enums.PoleStatus

export type FaultType = $Enums.FaultType

export const FaultType: typeof $Enums.FaultType

export type ReportStatus = $Enums.ReportStatus

export const ReportStatus: typeof $Enums.ReportStatus

export type WorkOrderStatus = $Enums.WorkOrderStatus

export const WorkOrderStatus: typeof $Enums.WorkOrderStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pole`: Exposes CRUD operations for the **Pole** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Poles
    * const poles = await prisma.pole.findMany()
    * ```
    */
  get pole(): Prisma.PoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.faultReport`: Exposes CRUD operations for the **FaultReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FaultReports
    * const faultReports = await prisma.faultReport.findMany()
    * ```
    */
  get faultReport(): Prisma.FaultReportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workOrder`: Exposes CRUD operations for the **WorkOrder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkOrders
    * const workOrders = await prisma.workOrder.findMany()
    * ```
    */
  get workOrder(): Prisma.WorkOrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.statusLog`: Exposes CRUD operations for the **StatusLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StatusLogs
    * const statusLogs = await prisma.statusLog.findMany()
    * ```
    */
  get statusLog(): Prisma.StatusLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Pole: 'Pole',
    FaultReport: 'FaultReport',
    WorkOrder: 'WorkOrder',
    StatusLog: 'StatusLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "pole" | "faultReport" | "workOrder" | "statusLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Pole: {
        payload: Prisma.$PolePayload<ExtArgs>
        fields: Prisma.PoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolePayload>
          }
          findFirst: {
            args: Prisma.PoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolePayload>
          }
          findMany: {
            args: Prisma.PoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolePayload>[]
          }
          create: {
            args: Prisma.PoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolePayload>
          }
          createMany: {
            args: Prisma.PoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolePayload>[]
          }
          delete: {
            args: Prisma.PoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolePayload>
          }
          update: {
            args: Prisma.PoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolePayload>
          }
          deleteMany: {
            args: Prisma.PoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolePayload>[]
          }
          upsert: {
            args: Prisma.PoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolePayload>
          }
          aggregate: {
            args: Prisma.PoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePole>
          }
          groupBy: {
            args: Prisma.PoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<PoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.PoleCountArgs<ExtArgs>
            result: $Utils.Optional<PoleCountAggregateOutputType> | number
          }
        }
      }
      FaultReport: {
        payload: Prisma.$FaultReportPayload<ExtArgs>
        fields: Prisma.FaultReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FaultReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaultReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FaultReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaultReportPayload>
          }
          findFirst: {
            args: Prisma.FaultReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaultReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FaultReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaultReportPayload>
          }
          findMany: {
            args: Prisma.FaultReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaultReportPayload>[]
          }
          create: {
            args: Prisma.FaultReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaultReportPayload>
          }
          createMany: {
            args: Prisma.FaultReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FaultReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaultReportPayload>[]
          }
          delete: {
            args: Prisma.FaultReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaultReportPayload>
          }
          update: {
            args: Prisma.FaultReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaultReportPayload>
          }
          deleteMany: {
            args: Prisma.FaultReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FaultReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FaultReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaultReportPayload>[]
          }
          upsert: {
            args: Prisma.FaultReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaultReportPayload>
          }
          aggregate: {
            args: Prisma.FaultReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFaultReport>
          }
          groupBy: {
            args: Prisma.FaultReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<FaultReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.FaultReportCountArgs<ExtArgs>
            result: $Utils.Optional<FaultReportCountAggregateOutputType> | number
          }
        }
      }
      WorkOrder: {
        payload: Prisma.$WorkOrderPayload<ExtArgs>
        fields: Prisma.WorkOrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkOrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkOrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPayload>
          }
          findFirst: {
            args: Prisma.WorkOrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkOrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPayload>
          }
          findMany: {
            args: Prisma.WorkOrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPayload>[]
          }
          create: {
            args: Prisma.WorkOrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPayload>
          }
          createMany: {
            args: Prisma.WorkOrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkOrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPayload>[]
          }
          delete: {
            args: Prisma.WorkOrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPayload>
          }
          update: {
            args: Prisma.WorkOrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPayload>
          }
          deleteMany: {
            args: Prisma.WorkOrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkOrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkOrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPayload>[]
          }
          upsert: {
            args: Prisma.WorkOrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPayload>
          }
          aggregate: {
            args: Prisma.WorkOrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkOrder>
          }
          groupBy: {
            args: Prisma.WorkOrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkOrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkOrderCountArgs<ExtArgs>
            result: $Utils.Optional<WorkOrderCountAggregateOutputType> | number
          }
        }
      }
      StatusLog: {
        payload: Prisma.$StatusLogPayload<ExtArgs>
        fields: Prisma.StatusLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StatusLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StatusLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusLogPayload>
          }
          findFirst: {
            args: Prisma.StatusLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StatusLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusLogPayload>
          }
          findMany: {
            args: Prisma.StatusLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusLogPayload>[]
          }
          create: {
            args: Prisma.StatusLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusLogPayload>
          }
          createMany: {
            args: Prisma.StatusLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StatusLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusLogPayload>[]
          }
          delete: {
            args: Prisma.StatusLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusLogPayload>
          }
          update: {
            args: Prisma.StatusLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusLogPayload>
          }
          deleteMany: {
            args: Prisma.StatusLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StatusLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StatusLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusLogPayload>[]
          }
          upsert: {
            args: Prisma.StatusLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusLogPayload>
          }
          aggregate: {
            args: Prisma.StatusLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStatusLog>
          }
          groupBy: {
            args: Prisma.StatusLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<StatusLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.StatusLogCountArgs<ExtArgs>
            result: $Utils.Optional<StatusLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    pole?: PoleOmit
    faultReport?: FaultReportOmit
    workOrder?: WorkOrderOmit
    statusLog?: StatusLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    faultReports: number
    workOrdersAssigned: number
    workOrdersCreated: number
    statusLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    faultReports?: boolean | UserCountOutputTypeCountFaultReportsArgs
    workOrdersAssigned?: boolean | UserCountOutputTypeCountWorkOrdersAssignedArgs
    workOrdersCreated?: boolean | UserCountOutputTypeCountWorkOrdersCreatedArgs
    statusLogs?: boolean | UserCountOutputTypeCountStatusLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFaultReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FaultReportWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWorkOrdersAssignedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkOrderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWorkOrdersCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkOrderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStatusLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StatusLogWhereInput
  }


  /**
   * Count Type PoleCountOutputType
   */

  export type PoleCountOutputType = {
    faultReports: number
    statusLogs: number
  }

  export type PoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    faultReports?: boolean | PoleCountOutputTypeCountFaultReportsArgs
    statusLogs?: boolean | PoleCountOutputTypeCountStatusLogsArgs
  }

  // Custom InputTypes
  /**
   * PoleCountOutputType without action
   */
  export type PoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoleCountOutputType
     */
    select?: PoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PoleCountOutputType without action
   */
  export type PoleCountOutputTypeCountFaultReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FaultReportWhereInput
  }

  /**
   * PoleCountOutputType without action
   */
  export type PoleCountOutputTypeCountStatusLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StatusLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    dob: Date | null
    gender: string | null
    email: string | null
    phone: string | null
    passwordHash: string | null
    region: string | null
    province: string | null
    city: string | null
    barangay: string | null
    streetAddress: string | null
    role: $Enums.Role | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    dob: Date | null
    gender: string | null
    email: string | null
    phone: string | null
    passwordHash: string | null
    region: string | null
    province: string | null
    city: string | null
    barangay: string | null
    streetAddress: string | null
    role: $Enums.Role | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstName: number
    middleName: number
    lastName: number
    dob: number
    gender: number
    email: number
    phone: number
    passwordHash: number
    region: number
    province: number
    city: number
    barangay: number
    streetAddress: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dob?: true
    gender?: true
    email?: true
    phone?: true
    passwordHash?: true
    region?: true
    province?: true
    city?: true
    barangay?: true
    streetAddress?: true
    role?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dob?: true
    gender?: true
    email?: true
    phone?: true
    passwordHash?: true
    region?: true
    province?: true
    city?: true
    barangay?: true
    streetAddress?: true
    role?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dob?: true
    gender?: true
    email?: true
    phone?: true
    passwordHash?: true
    region?: true
    province?: true
    city?: true
    barangay?: true
    streetAddress?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    firstName: string
    middleName: string | null
    lastName: string
    dob: Date | null
    gender: string | null
    email: string
    phone: string
    passwordHash: string
    region: string
    province: string | null
    city: string
    barangay: string
    streetAddress: string | null
    role: $Enums.Role
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dob?: boolean
    gender?: boolean
    email?: boolean
    phone?: boolean
    passwordHash?: boolean
    region?: boolean
    province?: boolean
    city?: boolean
    barangay?: boolean
    streetAddress?: boolean
    role?: boolean
    createdAt?: boolean
    faultReports?: boolean | User$faultReportsArgs<ExtArgs>
    workOrdersAssigned?: boolean | User$workOrdersAssignedArgs<ExtArgs>
    workOrdersCreated?: boolean | User$workOrdersCreatedArgs<ExtArgs>
    statusLogs?: boolean | User$statusLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dob?: boolean
    gender?: boolean
    email?: boolean
    phone?: boolean
    passwordHash?: boolean
    region?: boolean
    province?: boolean
    city?: boolean
    barangay?: boolean
    streetAddress?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dob?: boolean
    gender?: boolean
    email?: boolean
    phone?: boolean
    passwordHash?: boolean
    region?: boolean
    province?: boolean
    city?: boolean
    barangay?: boolean
    streetAddress?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dob?: boolean
    gender?: boolean
    email?: boolean
    phone?: boolean
    passwordHash?: boolean
    region?: boolean
    province?: boolean
    city?: boolean
    barangay?: boolean
    streetAddress?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "middleName" | "lastName" | "dob" | "gender" | "email" | "phone" | "passwordHash" | "region" | "province" | "city" | "barangay" | "streetAddress" | "role" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    faultReports?: boolean | User$faultReportsArgs<ExtArgs>
    workOrdersAssigned?: boolean | User$workOrdersAssignedArgs<ExtArgs>
    workOrdersCreated?: boolean | User$workOrdersCreatedArgs<ExtArgs>
    statusLogs?: boolean | User$statusLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      faultReports: Prisma.$FaultReportPayload<ExtArgs>[]
      workOrdersAssigned: Prisma.$WorkOrderPayload<ExtArgs>[]
      workOrdersCreated: Prisma.$WorkOrderPayload<ExtArgs>[]
      statusLogs: Prisma.$StatusLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      middleName: string | null
      lastName: string
      dob: Date | null
      gender: string | null
      email: string
      phone: string
      passwordHash: string
      region: string
      province: string | null
      city: string
      barangay: string
      streetAddress: string | null
      role: $Enums.Role
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    faultReports<T extends User$faultReportsArgs<ExtArgs> = {}>(args?: Subset<T, User$faultReportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FaultReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    workOrdersAssigned<T extends User$workOrdersAssignedArgs<ExtArgs> = {}>(args?: Subset<T, User$workOrdersAssignedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    workOrdersCreated<T extends User$workOrdersCreatedArgs<ExtArgs> = {}>(args?: Subset<T, User$workOrdersCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    statusLogs<T extends User$statusLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$statusLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatusLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly middleName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly dob: FieldRef<"User", 'DateTime'>
    readonly gender: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly region: FieldRef<"User", 'String'>
    readonly province: FieldRef<"User", 'String'>
    readonly city: FieldRef<"User", 'String'>
    readonly barangay: FieldRef<"User", 'String'>
    readonly streetAddress: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.faultReports
   */
  export type User$faultReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaultReport
     */
    select?: FaultReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaultReport
     */
    omit?: FaultReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaultReportInclude<ExtArgs> | null
    where?: FaultReportWhereInput
    orderBy?: FaultReportOrderByWithRelationInput | FaultReportOrderByWithRelationInput[]
    cursor?: FaultReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FaultReportScalarFieldEnum | FaultReportScalarFieldEnum[]
  }

  /**
   * User.workOrdersAssigned
   */
  export type User$workOrdersAssignedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    where?: WorkOrderWhereInput
    orderBy?: WorkOrderOrderByWithRelationInput | WorkOrderOrderByWithRelationInput[]
    cursor?: WorkOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkOrderScalarFieldEnum | WorkOrderScalarFieldEnum[]
  }

  /**
   * User.workOrdersCreated
   */
  export type User$workOrdersCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    where?: WorkOrderWhereInput
    orderBy?: WorkOrderOrderByWithRelationInput | WorkOrderOrderByWithRelationInput[]
    cursor?: WorkOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkOrderScalarFieldEnum | WorkOrderScalarFieldEnum[]
  }

  /**
   * User.statusLogs
   */
  export type User$statusLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusLog
     */
    select?: StatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusLog
     */
    omit?: StatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusLogInclude<ExtArgs> | null
    where?: StatusLogWhereInput
    orderBy?: StatusLogOrderByWithRelationInput | StatusLogOrderByWithRelationInput[]
    cursor?: StatusLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StatusLogScalarFieldEnum | StatusLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Pole
   */

  export type AggregatePole = {
    _count: PoleCountAggregateOutputType | null
    _avg: PoleAvgAggregateOutputType | null
    _sum: PoleSumAggregateOutputType | null
    _min: PoleMinAggregateOutputType | null
    _max: PoleMaxAggregateOutputType | null
  }

  export type PoleAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type PoleSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type PoleMinAggregateOutputType = {
    id: string | null
    poleCode: string | null
    address: string | null
    barangay: string | null
    latitude: number | null
    longitude: number | null
    status: $Enums.PoleStatus | null
    installedAt: Date | null
    updatedAt: Date | null
  }

  export type PoleMaxAggregateOutputType = {
    id: string | null
    poleCode: string | null
    address: string | null
    barangay: string | null
    latitude: number | null
    longitude: number | null
    status: $Enums.PoleStatus | null
    installedAt: Date | null
    updatedAt: Date | null
  }

  export type PoleCountAggregateOutputType = {
    id: number
    poleCode: number
    address: number
    barangay: number
    latitude: number
    longitude: number
    status: number
    installedAt: number
    updatedAt: number
    _all: number
  }


  export type PoleAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type PoleSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type PoleMinAggregateInputType = {
    id?: true
    poleCode?: true
    address?: true
    barangay?: true
    latitude?: true
    longitude?: true
    status?: true
    installedAt?: true
    updatedAt?: true
  }

  export type PoleMaxAggregateInputType = {
    id?: true
    poleCode?: true
    address?: true
    barangay?: true
    latitude?: true
    longitude?: true
    status?: true
    installedAt?: true
    updatedAt?: true
  }

  export type PoleCountAggregateInputType = {
    id?: true
    poleCode?: true
    address?: true
    barangay?: true
    latitude?: true
    longitude?: true
    status?: true
    installedAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pole to aggregate.
     */
    where?: PoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Poles to fetch.
     */
    orderBy?: PoleOrderByWithRelationInput | PoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Poles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Poles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Poles
    **/
    _count?: true | PoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PoleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PoleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PoleMaxAggregateInputType
  }

  export type GetPoleAggregateType<T extends PoleAggregateArgs> = {
        [P in keyof T & keyof AggregatePole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePole[P]>
      : GetScalarType<T[P], AggregatePole[P]>
  }




  export type PoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PoleWhereInput
    orderBy?: PoleOrderByWithAggregationInput | PoleOrderByWithAggregationInput[]
    by: PoleScalarFieldEnum[] | PoleScalarFieldEnum
    having?: PoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PoleCountAggregateInputType | true
    _avg?: PoleAvgAggregateInputType
    _sum?: PoleSumAggregateInputType
    _min?: PoleMinAggregateInputType
    _max?: PoleMaxAggregateInputType
  }

  export type PoleGroupByOutputType = {
    id: string
    poleCode: string
    address: string
    barangay: string
    latitude: number
    longitude: number
    status: $Enums.PoleStatus
    installedAt: Date
    updatedAt: Date
    _count: PoleCountAggregateOutputType | null
    _avg: PoleAvgAggregateOutputType | null
    _sum: PoleSumAggregateOutputType | null
    _min: PoleMinAggregateOutputType | null
    _max: PoleMaxAggregateOutputType | null
  }

  type GetPoleGroupByPayload<T extends PoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PoleGroupByOutputType[P]>
            : GetScalarType<T[P], PoleGroupByOutputType[P]>
        }
      >
    >


  export type PoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    poleCode?: boolean
    address?: boolean
    barangay?: boolean
    latitude?: boolean
    longitude?: boolean
    status?: boolean
    installedAt?: boolean
    updatedAt?: boolean
    faultReports?: boolean | Pole$faultReportsArgs<ExtArgs>
    statusLogs?: boolean | Pole$statusLogsArgs<ExtArgs>
    _count?: boolean | PoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pole"]>

  export type PoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    poleCode?: boolean
    address?: boolean
    barangay?: boolean
    latitude?: boolean
    longitude?: boolean
    status?: boolean
    installedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pole"]>

  export type PoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    poleCode?: boolean
    address?: boolean
    barangay?: boolean
    latitude?: boolean
    longitude?: boolean
    status?: boolean
    installedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pole"]>

  export type PoleSelectScalar = {
    id?: boolean
    poleCode?: boolean
    address?: boolean
    barangay?: boolean
    latitude?: boolean
    longitude?: boolean
    status?: boolean
    installedAt?: boolean
    updatedAt?: boolean
  }

  export type PoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "poleCode" | "address" | "barangay" | "latitude" | "longitude" | "status" | "installedAt" | "updatedAt", ExtArgs["result"]["pole"]>
  export type PoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    faultReports?: boolean | Pole$faultReportsArgs<ExtArgs>
    statusLogs?: boolean | Pole$statusLogsArgs<ExtArgs>
    _count?: boolean | PoleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pole"
    objects: {
      faultReports: Prisma.$FaultReportPayload<ExtArgs>[]
      statusLogs: Prisma.$StatusLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      poleCode: string
      address: string
      barangay: string
      latitude: number
      longitude: number
      status: $Enums.PoleStatus
      installedAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pole"]>
    composites: {}
  }

  type PoleGetPayload<S extends boolean | null | undefined | PoleDefaultArgs> = $Result.GetResult<Prisma.$PolePayload, S>

  type PoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PoleCountAggregateInputType | true
    }

  export interface PoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pole'], meta: { name: 'Pole' } }
    /**
     * Find zero or one Pole that matches the filter.
     * @param {PoleFindUniqueArgs} args - Arguments to find a Pole
     * @example
     * // Get one Pole
     * const pole = await prisma.pole.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PoleFindUniqueArgs>(args: SelectSubset<T, PoleFindUniqueArgs<ExtArgs>>): Prisma__PoleClient<$Result.GetResult<Prisma.$PolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pole that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PoleFindUniqueOrThrowArgs} args - Arguments to find a Pole
     * @example
     * // Get one Pole
     * const pole = await prisma.pole.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PoleFindUniqueOrThrowArgs>(args: SelectSubset<T, PoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PoleClient<$Result.GetResult<Prisma.$PolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pole that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoleFindFirstArgs} args - Arguments to find a Pole
     * @example
     * // Get one Pole
     * const pole = await prisma.pole.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PoleFindFirstArgs>(args?: SelectSubset<T, PoleFindFirstArgs<ExtArgs>>): Prisma__PoleClient<$Result.GetResult<Prisma.$PolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pole that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoleFindFirstOrThrowArgs} args - Arguments to find a Pole
     * @example
     * // Get one Pole
     * const pole = await prisma.pole.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PoleFindFirstOrThrowArgs>(args?: SelectSubset<T, PoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__PoleClient<$Result.GetResult<Prisma.$PolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Poles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Poles
     * const poles = await prisma.pole.findMany()
     * 
     * // Get first 10 Poles
     * const poles = await prisma.pole.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const poleWithIdOnly = await prisma.pole.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PoleFindManyArgs>(args?: SelectSubset<T, PoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pole.
     * @param {PoleCreateArgs} args - Arguments to create a Pole.
     * @example
     * // Create one Pole
     * const Pole = await prisma.pole.create({
     *   data: {
     *     // ... data to create a Pole
     *   }
     * })
     * 
     */
    create<T extends PoleCreateArgs>(args: SelectSubset<T, PoleCreateArgs<ExtArgs>>): Prisma__PoleClient<$Result.GetResult<Prisma.$PolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Poles.
     * @param {PoleCreateManyArgs} args - Arguments to create many Poles.
     * @example
     * // Create many Poles
     * const pole = await prisma.pole.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PoleCreateManyArgs>(args?: SelectSubset<T, PoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Poles and returns the data saved in the database.
     * @param {PoleCreateManyAndReturnArgs} args - Arguments to create many Poles.
     * @example
     * // Create many Poles
     * const pole = await prisma.pole.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Poles and only return the `id`
     * const poleWithIdOnly = await prisma.pole.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PoleCreateManyAndReturnArgs>(args?: SelectSubset<T, PoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pole.
     * @param {PoleDeleteArgs} args - Arguments to delete one Pole.
     * @example
     * // Delete one Pole
     * const Pole = await prisma.pole.delete({
     *   where: {
     *     // ... filter to delete one Pole
     *   }
     * })
     * 
     */
    delete<T extends PoleDeleteArgs>(args: SelectSubset<T, PoleDeleteArgs<ExtArgs>>): Prisma__PoleClient<$Result.GetResult<Prisma.$PolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pole.
     * @param {PoleUpdateArgs} args - Arguments to update one Pole.
     * @example
     * // Update one Pole
     * const pole = await prisma.pole.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PoleUpdateArgs>(args: SelectSubset<T, PoleUpdateArgs<ExtArgs>>): Prisma__PoleClient<$Result.GetResult<Prisma.$PolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Poles.
     * @param {PoleDeleteManyArgs} args - Arguments to filter Poles to delete.
     * @example
     * // Delete a few Poles
     * const { count } = await prisma.pole.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PoleDeleteManyArgs>(args?: SelectSubset<T, PoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Poles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Poles
     * const pole = await prisma.pole.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PoleUpdateManyArgs>(args: SelectSubset<T, PoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Poles and returns the data updated in the database.
     * @param {PoleUpdateManyAndReturnArgs} args - Arguments to update many Poles.
     * @example
     * // Update many Poles
     * const pole = await prisma.pole.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Poles and only return the `id`
     * const poleWithIdOnly = await prisma.pole.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PoleUpdateManyAndReturnArgs>(args: SelectSubset<T, PoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pole.
     * @param {PoleUpsertArgs} args - Arguments to update or create a Pole.
     * @example
     * // Update or create a Pole
     * const pole = await prisma.pole.upsert({
     *   create: {
     *     // ... data to create a Pole
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pole we want to update
     *   }
     * })
     */
    upsert<T extends PoleUpsertArgs>(args: SelectSubset<T, PoleUpsertArgs<ExtArgs>>): Prisma__PoleClient<$Result.GetResult<Prisma.$PolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Poles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoleCountArgs} args - Arguments to filter Poles to count.
     * @example
     * // Count the number of Poles
     * const count = await prisma.pole.count({
     *   where: {
     *     // ... the filter for the Poles we want to count
     *   }
     * })
    **/
    count<T extends PoleCountArgs>(
      args?: Subset<T, PoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PoleAggregateArgs>(args: Subset<T, PoleAggregateArgs>): Prisma.PrismaPromise<GetPoleAggregateType<T>>

    /**
     * Group by Pole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PoleGroupByArgs['orderBy'] }
        : { orderBy?: PoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pole model
   */
  readonly fields: PoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pole.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    faultReports<T extends Pole$faultReportsArgs<ExtArgs> = {}>(args?: Subset<T, Pole$faultReportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FaultReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    statusLogs<T extends Pole$statusLogsArgs<ExtArgs> = {}>(args?: Subset<T, Pole$statusLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatusLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pole model
   */
  interface PoleFieldRefs {
    readonly id: FieldRef<"Pole", 'String'>
    readonly poleCode: FieldRef<"Pole", 'String'>
    readonly address: FieldRef<"Pole", 'String'>
    readonly barangay: FieldRef<"Pole", 'String'>
    readonly latitude: FieldRef<"Pole", 'Float'>
    readonly longitude: FieldRef<"Pole", 'Float'>
    readonly status: FieldRef<"Pole", 'PoleStatus'>
    readonly installedAt: FieldRef<"Pole", 'DateTime'>
    readonly updatedAt: FieldRef<"Pole", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pole findUnique
   */
  export type PoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pole
     */
    select?: PoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pole
     */
    omit?: PoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoleInclude<ExtArgs> | null
    /**
     * Filter, which Pole to fetch.
     */
    where: PoleWhereUniqueInput
  }

  /**
   * Pole findUniqueOrThrow
   */
  export type PoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pole
     */
    select?: PoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pole
     */
    omit?: PoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoleInclude<ExtArgs> | null
    /**
     * Filter, which Pole to fetch.
     */
    where: PoleWhereUniqueInput
  }

  /**
   * Pole findFirst
   */
  export type PoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pole
     */
    select?: PoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pole
     */
    omit?: PoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoleInclude<ExtArgs> | null
    /**
     * Filter, which Pole to fetch.
     */
    where?: PoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Poles to fetch.
     */
    orderBy?: PoleOrderByWithRelationInput | PoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Poles.
     */
    cursor?: PoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Poles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Poles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Poles.
     */
    distinct?: PoleScalarFieldEnum | PoleScalarFieldEnum[]
  }

  /**
   * Pole findFirstOrThrow
   */
  export type PoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pole
     */
    select?: PoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pole
     */
    omit?: PoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoleInclude<ExtArgs> | null
    /**
     * Filter, which Pole to fetch.
     */
    where?: PoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Poles to fetch.
     */
    orderBy?: PoleOrderByWithRelationInput | PoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Poles.
     */
    cursor?: PoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Poles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Poles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Poles.
     */
    distinct?: PoleScalarFieldEnum | PoleScalarFieldEnum[]
  }

  /**
   * Pole findMany
   */
  export type PoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pole
     */
    select?: PoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pole
     */
    omit?: PoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoleInclude<ExtArgs> | null
    /**
     * Filter, which Poles to fetch.
     */
    where?: PoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Poles to fetch.
     */
    orderBy?: PoleOrderByWithRelationInput | PoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Poles.
     */
    cursor?: PoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Poles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Poles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Poles.
     */
    distinct?: PoleScalarFieldEnum | PoleScalarFieldEnum[]
  }

  /**
   * Pole create
   */
  export type PoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pole
     */
    select?: PoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pole
     */
    omit?: PoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoleInclude<ExtArgs> | null
    /**
     * The data needed to create a Pole.
     */
    data: XOR<PoleCreateInput, PoleUncheckedCreateInput>
  }

  /**
   * Pole createMany
   */
  export type PoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Poles.
     */
    data: PoleCreateManyInput | PoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pole createManyAndReturn
   */
  export type PoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pole
     */
    select?: PoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pole
     */
    omit?: PoleOmit<ExtArgs> | null
    /**
     * The data used to create many Poles.
     */
    data: PoleCreateManyInput | PoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pole update
   */
  export type PoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pole
     */
    select?: PoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pole
     */
    omit?: PoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoleInclude<ExtArgs> | null
    /**
     * The data needed to update a Pole.
     */
    data: XOR<PoleUpdateInput, PoleUncheckedUpdateInput>
    /**
     * Choose, which Pole to update.
     */
    where: PoleWhereUniqueInput
  }

  /**
   * Pole updateMany
   */
  export type PoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Poles.
     */
    data: XOR<PoleUpdateManyMutationInput, PoleUncheckedUpdateManyInput>
    /**
     * Filter which Poles to update
     */
    where?: PoleWhereInput
    /**
     * Limit how many Poles to update.
     */
    limit?: number
  }

  /**
   * Pole updateManyAndReturn
   */
  export type PoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pole
     */
    select?: PoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pole
     */
    omit?: PoleOmit<ExtArgs> | null
    /**
     * The data used to update Poles.
     */
    data: XOR<PoleUpdateManyMutationInput, PoleUncheckedUpdateManyInput>
    /**
     * Filter which Poles to update
     */
    where?: PoleWhereInput
    /**
     * Limit how many Poles to update.
     */
    limit?: number
  }

  /**
   * Pole upsert
   */
  export type PoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pole
     */
    select?: PoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pole
     */
    omit?: PoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoleInclude<ExtArgs> | null
    /**
     * The filter to search for the Pole to update in case it exists.
     */
    where: PoleWhereUniqueInput
    /**
     * In case the Pole found by the `where` argument doesn't exist, create a new Pole with this data.
     */
    create: XOR<PoleCreateInput, PoleUncheckedCreateInput>
    /**
     * In case the Pole was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PoleUpdateInput, PoleUncheckedUpdateInput>
  }

  /**
   * Pole delete
   */
  export type PoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pole
     */
    select?: PoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pole
     */
    omit?: PoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoleInclude<ExtArgs> | null
    /**
     * Filter which Pole to delete.
     */
    where: PoleWhereUniqueInput
  }

  /**
   * Pole deleteMany
   */
  export type PoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Poles to delete
     */
    where?: PoleWhereInput
    /**
     * Limit how many Poles to delete.
     */
    limit?: number
  }

  /**
   * Pole.faultReports
   */
  export type Pole$faultReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaultReport
     */
    select?: FaultReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaultReport
     */
    omit?: FaultReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaultReportInclude<ExtArgs> | null
    where?: FaultReportWhereInput
    orderBy?: FaultReportOrderByWithRelationInput | FaultReportOrderByWithRelationInput[]
    cursor?: FaultReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FaultReportScalarFieldEnum | FaultReportScalarFieldEnum[]
  }

  /**
   * Pole.statusLogs
   */
  export type Pole$statusLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusLog
     */
    select?: StatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusLog
     */
    omit?: StatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusLogInclude<ExtArgs> | null
    where?: StatusLogWhereInput
    orderBy?: StatusLogOrderByWithRelationInput | StatusLogOrderByWithRelationInput[]
    cursor?: StatusLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StatusLogScalarFieldEnum | StatusLogScalarFieldEnum[]
  }

  /**
   * Pole without action
   */
  export type PoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pole
     */
    select?: PoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pole
     */
    omit?: PoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoleInclude<ExtArgs> | null
  }


  /**
   * Model FaultReport
   */

  export type AggregateFaultReport = {
    _count: FaultReportCountAggregateOutputType | null
    _min: FaultReportMinAggregateOutputType | null
    _max: FaultReportMaxAggregateOutputType | null
  }

  export type FaultReportMinAggregateOutputType = {
    id: string | null
    poleId: string | null
    reportedById: string | null
    description: string | null
    faultType: $Enums.FaultType | null
    status: $Enums.ReportStatus | null
    reportedAt: Date | null
  }

  export type FaultReportMaxAggregateOutputType = {
    id: string | null
    poleId: string | null
    reportedById: string | null
    description: string | null
    faultType: $Enums.FaultType | null
    status: $Enums.ReportStatus | null
    reportedAt: Date | null
  }

  export type FaultReportCountAggregateOutputType = {
    id: number
    poleId: number
    reportedById: number
    description: number
    faultType: number
    status: number
    reportedAt: number
    _all: number
  }


  export type FaultReportMinAggregateInputType = {
    id?: true
    poleId?: true
    reportedById?: true
    description?: true
    faultType?: true
    status?: true
    reportedAt?: true
  }

  export type FaultReportMaxAggregateInputType = {
    id?: true
    poleId?: true
    reportedById?: true
    description?: true
    faultType?: true
    status?: true
    reportedAt?: true
  }

  export type FaultReportCountAggregateInputType = {
    id?: true
    poleId?: true
    reportedById?: true
    description?: true
    faultType?: true
    status?: true
    reportedAt?: true
    _all?: true
  }

  export type FaultReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FaultReport to aggregate.
     */
    where?: FaultReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FaultReports to fetch.
     */
    orderBy?: FaultReportOrderByWithRelationInput | FaultReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FaultReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FaultReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FaultReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FaultReports
    **/
    _count?: true | FaultReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FaultReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FaultReportMaxAggregateInputType
  }

  export type GetFaultReportAggregateType<T extends FaultReportAggregateArgs> = {
        [P in keyof T & keyof AggregateFaultReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFaultReport[P]>
      : GetScalarType<T[P], AggregateFaultReport[P]>
  }




  export type FaultReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FaultReportWhereInput
    orderBy?: FaultReportOrderByWithAggregationInput | FaultReportOrderByWithAggregationInput[]
    by: FaultReportScalarFieldEnum[] | FaultReportScalarFieldEnum
    having?: FaultReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FaultReportCountAggregateInputType | true
    _min?: FaultReportMinAggregateInputType
    _max?: FaultReportMaxAggregateInputType
  }

  export type FaultReportGroupByOutputType = {
    id: string
    poleId: string
    reportedById: string
    description: string
    faultType: $Enums.FaultType
    status: $Enums.ReportStatus
    reportedAt: Date
    _count: FaultReportCountAggregateOutputType | null
    _min: FaultReportMinAggregateOutputType | null
    _max: FaultReportMaxAggregateOutputType | null
  }

  type GetFaultReportGroupByPayload<T extends FaultReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FaultReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FaultReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FaultReportGroupByOutputType[P]>
            : GetScalarType<T[P], FaultReportGroupByOutputType[P]>
        }
      >
    >


  export type FaultReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    poleId?: boolean
    reportedById?: boolean
    description?: boolean
    faultType?: boolean
    status?: boolean
    reportedAt?: boolean
    pole?: boolean | PoleDefaultArgs<ExtArgs>
    reportedBy?: boolean | UserDefaultArgs<ExtArgs>
    workOrder?: boolean | FaultReport$workOrderArgs<ExtArgs>
  }, ExtArgs["result"]["faultReport"]>

  export type FaultReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    poleId?: boolean
    reportedById?: boolean
    description?: boolean
    faultType?: boolean
    status?: boolean
    reportedAt?: boolean
    pole?: boolean | PoleDefaultArgs<ExtArgs>
    reportedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["faultReport"]>

  export type FaultReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    poleId?: boolean
    reportedById?: boolean
    description?: boolean
    faultType?: boolean
    status?: boolean
    reportedAt?: boolean
    pole?: boolean | PoleDefaultArgs<ExtArgs>
    reportedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["faultReport"]>

  export type FaultReportSelectScalar = {
    id?: boolean
    poleId?: boolean
    reportedById?: boolean
    description?: boolean
    faultType?: boolean
    status?: boolean
    reportedAt?: boolean
  }

  export type FaultReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "poleId" | "reportedById" | "description" | "faultType" | "status" | "reportedAt", ExtArgs["result"]["faultReport"]>
  export type FaultReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pole?: boolean | PoleDefaultArgs<ExtArgs>
    reportedBy?: boolean | UserDefaultArgs<ExtArgs>
    workOrder?: boolean | FaultReport$workOrderArgs<ExtArgs>
  }
  export type FaultReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pole?: boolean | PoleDefaultArgs<ExtArgs>
    reportedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FaultReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pole?: boolean | PoleDefaultArgs<ExtArgs>
    reportedBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FaultReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FaultReport"
    objects: {
      pole: Prisma.$PolePayload<ExtArgs>
      reportedBy: Prisma.$UserPayload<ExtArgs>
      workOrder: Prisma.$WorkOrderPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      poleId: string
      reportedById: string
      description: string
      faultType: $Enums.FaultType
      status: $Enums.ReportStatus
      reportedAt: Date
    }, ExtArgs["result"]["faultReport"]>
    composites: {}
  }

  type FaultReportGetPayload<S extends boolean | null | undefined | FaultReportDefaultArgs> = $Result.GetResult<Prisma.$FaultReportPayload, S>

  type FaultReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FaultReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FaultReportCountAggregateInputType | true
    }

  export interface FaultReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FaultReport'], meta: { name: 'FaultReport' } }
    /**
     * Find zero or one FaultReport that matches the filter.
     * @param {FaultReportFindUniqueArgs} args - Arguments to find a FaultReport
     * @example
     * // Get one FaultReport
     * const faultReport = await prisma.faultReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FaultReportFindUniqueArgs>(args: SelectSubset<T, FaultReportFindUniqueArgs<ExtArgs>>): Prisma__FaultReportClient<$Result.GetResult<Prisma.$FaultReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FaultReport that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FaultReportFindUniqueOrThrowArgs} args - Arguments to find a FaultReport
     * @example
     * // Get one FaultReport
     * const faultReport = await prisma.faultReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FaultReportFindUniqueOrThrowArgs>(args: SelectSubset<T, FaultReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FaultReportClient<$Result.GetResult<Prisma.$FaultReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FaultReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaultReportFindFirstArgs} args - Arguments to find a FaultReport
     * @example
     * // Get one FaultReport
     * const faultReport = await prisma.faultReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FaultReportFindFirstArgs>(args?: SelectSubset<T, FaultReportFindFirstArgs<ExtArgs>>): Prisma__FaultReportClient<$Result.GetResult<Prisma.$FaultReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FaultReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaultReportFindFirstOrThrowArgs} args - Arguments to find a FaultReport
     * @example
     * // Get one FaultReport
     * const faultReport = await prisma.faultReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FaultReportFindFirstOrThrowArgs>(args?: SelectSubset<T, FaultReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__FaultReportClient<$Result.GetResult<Prisma.$FaultReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FaultReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaultReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FaultReports
     * const faultReports = await prisma.faultReport.findMany()
     * 
     * // Get first 10 FaultReports
     * const faultReports = await prisma.faultReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const faultReportWithIdOnly = await prisma.faultReport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FaultReportFindManyArgs>(args?: SelectSubset<T, FaultReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FaultReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FaultReport.
     * @param {FaultReportCreateArgs} args - Arguments to create a FaultReport.
     * @example
     * // Create one FaultReport
     * const FaultReport = await prisma.faultReport.create({
     *   data: {
     *     // ... data to create a FaultReport
     *   }
     * })
     * 
     */
    create<T extends FaultReportCreateArgs>(args: SelectSubset<T, FaultReportCreateArgs<ExtArgs>>): Prisma__FaultReportClient<$Result.GetResult<Prisma.$FaultReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FaultReports.
     * @param {FaultReportCreateManyArgs} args - Arguments to create many FaultReports.
     * @example
     * // Create many FaultReports
     * const faultReport = await prisma.faultReport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FaultReportCreateManyArgs>(args?: SelectSubset<T, FaultReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FaultReports and returns the data saved in the database.
     * @param {FaultReportCreateManyAndReturnArgs} args - Arguments to create many FaultReports.
     * @example
     * // Create many FaultReports
     * const faultReport = await prisma.faultReport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FaultReports and only return the `id`
     * const faultReportWithIdOnly = await prisma.faultReport.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FaultReportCreateManyAndReturnArgs>(args?: SelectSubset<T, FaultReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FaultReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FaultReport.
     * @param {FaultReportDeleteArgs} args - Arguments to delete one FaultReport.
     * @example
     * // Delete one FaultReport
     * const FaultReport = await prisma.faultReport.delete({
     *   where: {
     *     // ... filter to delete one FaultReport
     *   }
     * })
     * 
     */
    delete<T extends FaultReportDeleteArgs>(args: SelectSubset<T, FaultReportDeleteArgs<ExtArgs>>): Prisma__FaultReportClient<$Result.GetResult<Prisma.$FaultReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FaultReport.
     * @param {FaultReportUpdateArgs} args - Arguments to update one FaultReport.
     * @example
     * // Update one FaultReport
     * const faultReport = await prisma.faultReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FaultReportUpdateArgs>(args: SelectSubset<T, FaultReportUpdateArgs<ExtArgs>>): Prisma__FaultReportClient<$Result.GetResult<Prisma.$FaultReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FaultReports.
     * @param {FaultReportDeleteManyArgs} args - Arguments to filter FaultReports to delete.
     * @example
     * // Delete a few FaultReports
     * const { count } = await prisma.faultReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FaultReportDeleteManyArgs>(args?: SelectSubset<T, FaultReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FaultReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaultReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FaultReports
     * const faultReport = await prisma.faultReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FaultReportUpdateManyArgs>(args: SelectSubset<T, FaultReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FaultReports and returns the data updated in the database.
     * @param {FaultReportUpdateManyAndReturnArgs} args - Arguments to update many FaultReports.
     * @example
     * // Update many FaultReports
     * const faultReport = await prisma.faultReport.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FaultReports and only return the `id`
     * const faultReportWithIdOnly = await prisma.faultReport.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FaultReportUpdateManyAndReturnArgs>(args: SelectSubset<T, FaultReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FaultReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FaultReport.
     * @param {FaultReportUpsertArgs} args - Arguments to update or create a FaultReport.
     * @example
     * // Update or create a FaultReport
     * const faultReport = await prisma.faultReport.upsert({
     *   create: {
     *     // ... data to create a FaultReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FaultReport we want to update
     *   }
     * })
     */
    upsert<T extends FaultReportUpsertArgs>(args: SelectSubset<T, FaultReportUpsertArgs<ExtArgs>>): Prisma__FaultReportClient<$Result.GetResult<Prisma.$FaultReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FaultReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaultReportCountArgs} args - Arguments to filter FaultReports to count.
     * @example
     * // Count the number of FaultReports
     * const count = await prisma.faultReport.count({
     *   where: {
     *     // ... the filter for the FaultReports we want to count
     *   }
     * })
    **/
    count<T extends FaultReportCountArgs>(
      args?: Subset<T, FaultReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FaultReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FaultReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaultReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FaultReportAggregateArgs>(args: Subset<T, FaultReportAggregateArgs>): Prisma.PrismaPromise<GetFaultReportAggregateType<T>>

    /**
     * Group by FaultReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaultReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FaultReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FaultReportGroupByArgs['orderBy'] }
        : { orderBy?: FaultReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FaultReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFaultReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FaultReport model
   */
  readonly fields: FaultReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FaultReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FaultReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pole<T extends PoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PoleDefaultArgs<ExtArgs>>): Prisma__PoleClient<$Result.GetResult<Prisma.$PolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reportedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    workOrder<T extends FaultReport$workOrderArgs<ExtArgs> = {}>(args?: Subset<T, FaultReport$workOrderArgs<ExtArgs>>): Prisma__WorkOrderClient<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FaultReport model
   */
  interface FaultReportFieldRefs {
    readonly id: FieldRef<"FaultReport", 'String'>
    readonly poleId: FieldRef<"FaultReport", 'String'>
    readonly reportedById: FieldRef<"FaultReport", 'String'>
    readonly description: FieldRef<"FaultReport", 'String'>
    readonly faultType: FieldRef<"FaultReport", 'FaultType'>
    readonly status: FieldRef<"FaultReport", 'ReportStatus'>
    readonly reportedAt: FieldRef<"FaultReport", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FaultReport findUnique
   */
  export type FaultReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaultReport
     */
    select?: FaultReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaultReport
     */
    omit?: FaultReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaultReportInclude<ExtArgs> | null
    /**
     * Filter, which FaultReport to fetch.
     */
    where: FaultReportWhereUniqueInput
  }

  /**
   * FaultReport findUniqueOrThrow
   */
  export type FaultReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaultReport
     */
    select?: FaultReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaultReport
     */
    omit?: FaultReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaultReportInclude<ExtArgs> | null
    /**
     * Filter, which FaultReport to fetch.
     */
    where: FaultReportWhereUniqueInput
  }

  /**
   * FaultReport findFirst
   */
  export type FaultReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaultReport
     */
    select?: FaultReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaultReport
     */
    omit?: FaultReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaultReportInclude<ExtArgs> | null
    /**
     * Filter, which FaultReport to fetch.
     */
    where?: FaultReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FaultReports to fetch.
     */
    orderBy?: FaultReportOrderByWithRelationInput | FaultReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FaultReports.
     */
    cursor?: FaultReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FaultReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FaultReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FaultReports.
     */
    distinct?: FaultReportScalarFieldEnum | FaultReportScalarFieldEnum[]
  }

  /**
   * FaultReport findFirstOrThrow
   */
  export type FaultReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaultReport
     */
    select?: FaultReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaultReport
     */
    omit?: FaultReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaultReportInclude<ExtArgs> | null
    /**
     * Filter, which FaultReport to fetch.
     */
    where?: FaultReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FaultReports to fetch.
     */
    orderBy?: FaultReportOrderByWithRelationInput | FaultReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FaultReports.
     */
    cursor?: FaultReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FaultReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FaultReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FaultReports.
     */
    distinct?: FaultReportScalarFieldEnum | FaultReportScalarFieldEnum[]
  }

  /**
   * FaultReport findMany
   */
  export type FaultReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaultReport
     */
    select?: FaultReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaultReport
     */
    omit?: FaultReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaultReportInclude<ExtArgs> | null
    /**
     * Filter, which FaultReports to fetch.
     */
    where?: FaultReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FaultReports to fetch.
     */
    orderBy?: FaultReportOrderByWithRelationInput | FaultReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FaultReports.
     */
    cursor?: FaultReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FaultReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FaultReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FaultReports.
     */
    distinct?: FaultReportScalarFieldEnum | FaultReportScalarFieldEnum[]
  }

  /**
   * FaultReport create
   */
  export type FaultReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaultReport
     */
    select?: FaultReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaultReport
     */
    omit?: FaultReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaultReportInclude<ExtArgs> | null
    /**
     * The data needed to create a FaultReport.
     */
    data: XOR<FaultReportCreateInput, FaultReportUncheckedCreateInput>
  }

  /**
   * FaultReport createMany
   */
  export type FaultReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FaultReports.
     */
    data: FaultReportCreateManyInput | FaultReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FaultReport createManyAndReturn
   */
  export type FaultReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaultReport
     */
    select?: FaultReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FaultReport
     */
    omit?: FaultReportOmit<ExtArgs> | null
    /**
     * The data used to create many FaultReports.
     */
    data: FaultReportCreateManyInput | FaultReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaultReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FaultReport update
   */
  export type FaultReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaultReport
     */
    select?: FaultReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaultReport
     */
    omit?: FaultReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaultReportInclude<ExtArgs> | null
    /**
     * The data needed to update a FaultReport.
     */
    data: XOR<FaultReportUpdateInput, FaultReportUncheckedUpdateInput>
    /**
     * Choose, which FaultReport to update.
     */
    where: FaultReportWhereUniqueInput
  }

  /**
   * FaultReport updateMany
   */
  export type FaultReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FaultReports.
     */
    data: XOR<FaultReportUpdateManyMutationInput, FaultReportUncheckedUpdateManyInput>
    /**
     * Filter which FaultReports to update
     */
    where?: FaultReportWhereInput
    /**
     * Limit how many FaultReports to update.
     */
    limit?: number
  }

  /**
   * FaultReport updateManyAndReturn
   */
  export type FaultReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaultReport
     */
    select?: FaultReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FaultReport
     */
    omit?: FaultReportOmit<ExtArgs> | null
    /**
     * The data used to update FaultReports.
     */
    data: XOR<FaultReportUpdateManyMutationInput, FaultReportUncheckedUpdateManyInput>
    /**
     * Filter which FaultReports to update
     */
    where?: FaultReportWhereInput
    /**
     * Limit how many FaultReports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaultReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FaultReport upsert
   */
  export type FaultReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaultReport
     */
    select?: FaultReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaultReport
     */
    omit?: FaultReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaultReportInclude<ExtArgs> | null
    /**
     * The filter to search for the FaultReport to update in case it exists.
     */
    where: FaultReportWhereUniqueInput
    /**
     * In case the FaultReport found by the `where` argument doesn't exist, create a new FaultReport with this data.
     */
    create: XOR<FaultReportCreateInput, FaultReportUncheckedCreateInput>
    /**
     * In case the FaultReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FaultReportUpdateInput, FaultReportUncheckedUpdateInput>
  }

  /**
   * FaultReport delete
   */
  export type FaultReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaultReport
     */
    select?: FaultReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaultReport
     */
    omit?: FaultReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaultReportInclude<ExtArgs> | null
    /**
     * Filter which FaultReport to delete.
     */
    where: FaultReportWhereUniqueInput
  }

  /**
   * FaultReport deleteMany
   */
  export type FaultReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FaultReports to delete
     */
    where?: FaultReportWhereInput
    /**
     * Limit how many FaultReports to delete.
     */
    limit?: number
  }

  /**
   * FaultReport.workOrder
   */
  export type FaultReport$workOrderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    where?: WorkOrderWhereInput
  }

  /**
   * FaultReport without action
   */
  export type FaultReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaultReport
     */
    select?: FaultReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaultReport
     */
    omit?: FaultReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaultReportInclude<ExtArgs> | null
  }


  /**
   * Model WorkOrder
   */

  export type AggregateWorkOrder = {
    _count: WorkOrderCountAggregateOutputType | null
    _min: WorkOrderMinAggregateOutputType | null
    _max: WorkOrderMaxAggregateOutputType | null
  }

  export type WorkOrderMinAggregateOutputType = {
    id: string | null
    faultReportId: string | null
    assignedToId: string | null
    assignedById: string | null
    status: $Enums.WorkOrderStatus | null
    assignedAt: Date | null
    resolvedAt: Date | null
    resolutionNotes: string | null
  }

  export type WorkOrderMaxAggregateOutputType = {
    id: string | null
    faultReportId: string | null
    assignedToId: string | null
    assignedById: string | null
    status: $Enums.WorkOrderStatus | null
    assignedAt: Date | null
    resolvedAt: Date | null
    resolutionNotes: string | null
  }

  export type WorkOrderCountAggregateOutputType = {
    id: number
    faultReportId: number
    assignedToId: number
    assignedById: number
    status: number
    assignedAt: number
    resolvedAt: number
    resolutionNotes: number
    _all: number
  }


  export type WorkOrderMinAggregateInputType = {
    id?: true
    faultReportId?: true
    assignedToId?: true
    assignedById?: true
    status?: true
    assignedAt?: true
    resolvedAt?: true
    resolutionNotes?: true
  }

  export type WorkOrderMaxAggregateInputType = {
    id?: true
    faultReportId?: true
    assignedToId?: true
    assignedById?: true
    status?: true
    assignedAt?: true
    resolvedAt?: true
    resolutionNotes?: true
  }

  export type WorkOrderCountAggregateInputType = {
    id?: true
    faultReportId?: true
    assignedToId?: true
    assignedById?: true
    status?: true
    assignedAt?: true
    resolvedAt?: true
    resolutionNotes?: true
    _all?: true
  }

  export type WorkOrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkOrder to aggregate.
     */
    where?: WorkOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkOrders to fetch.
     */
    orderBy?: WorkOrderOrderByWithRelationInput | WorkOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkOrders
    **/
    _count?: true | WorkOrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkOrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkOrderMaxAggregateInputType
  }

  export type GetWorkOrderAggregateType<T extends WorkOrderAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkOrder[P]>
      : GetScalarType<T[P], AggregateWorkOrder[P]>
  }




  export type WorkOrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkOrderWhereInput
    orderBy?: WorkOrderOrderByWithAggregationInput | WorkOrderOrderByWithAggregationInput[]
    by: WorkOrderScalarFieldEnum[] | WorkOrderScalarFieldEnum
    having?: WorkOrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkOrderCountAggregateInputType | true
    _min?: WorkOrderMinAggregateInputType
    _max?: WorkOrderMaxAggregateInputType
  }

  export type WorkOrderGroupByOutputType = {
    id: string
    faultReportId: string
    assignedToId: string | null
    assignedById: string
    status: $Enums.WorkOrderStatus
    assignedAt: Date
    resolvedAt: Date | null
    resolutionNotes: string | null
    _count: WorkOrderCountAggregateOutputType | null
    _min: WorkOrderMinAggregateOutputType | null
    _max: WorkOrderMaxAggregateOutputType | null
  }

  type GetWorkOrderGroupByPayload<T extends WorkOrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkOrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkOrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkOrderGroupByOutputType[P]>
            : GetScalarType<T[P], WorkOrderGroupByOutputType[P]>
        }
      >
    >


  export type WorkOrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    faultReportId?: boolean
    assignedToId?: boolean
    assignedById?: boolean
    status?: boolean
    assignedAt?: boolean
    resolvedAt?: boolean
    resolutionNotes?: boolean
    faultReport?: boolean | FaultReportDefaultArgs<ExtArgs>
    assignedTo?: boolean | WorkOrder$assignedToArgs<ExtArgs>
    assignedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workOrder"]>

  export type WorkOrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    faultReportId?: boolean
    assignedToId?: boolean
    assignedById?: boolean
    status?: boolean
    assignedAt?: boolean
    resolvedAt?: boolean
    resolutionNotes?: boolean
    faultReport?: boolean | FaultReportDefaultArgs<ExtArgs>
    assignedTo?: boolean | WorkOrder$assignedToArgs<ExtArgs>
    assignedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workOrder"]>

  export type WorkOrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    faultReportId?: boolean
    assignedToId?: boolean
    assignedById?: boolean
    status?: boolean
    assignedAt?: boolean
    resolvedAt?: boolean
    resolutionNotes?: boolean
    faultReport?: boolean | FaultReportDefaultArgs<ExtArgs>
    assignedTo?: boolean | WorkOrder$assignedToArgs<ExtArgs>
    assignedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workOrder"]>

  export type WorkOrderSelectScalar = {
    id?: boolean
    faultReportId?: boolean
    assignedToId?: boolean
    assignedById?: boolean
    status?: boolean
    assignedAt?: boolean
    resolvedAt?: boolean
    resolutionNotes?: boolean
  }

  export type WorkOrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "faultReportId" | "assignedToId" | "assignedById" | "status" | "assignedAt" | "resolvedAt" | "resolutionNotes", ExtArgs["result"]["workOrder"]>
  export type WorkOrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    faultReport?: boolean | FaultReportDefaultArgs<ExtArgs>
    assignedTo?: boolean | WorkOrder$assignedToArgs<ExtArgs>
    assignedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WorkOrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    faultReport?: boolean | FaultReportDefaultArgs<ExtArgs>
    assignedTo?: boolean | WorkOrder$assignedToArgs<ExtArgs>
    assignedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WorkOrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    faultReport?: boolean | FaultReportDefaultArgs<ExtArgs>
    assignedTo?: boolean | WorkOrder$assignedToArgs<ExtArgs>
    assignedBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WorkOrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkOrder"
    objects: {
      faultReport: Prisma.$FaultReportPayload<ExtArgs>
      assignedTo: Prisma.$UserPayload<ExtArgs> | null
      assignedBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      faultReportId: string
      assignedToId: string | null
      assignedById: string
      status: $Enums.WorkOrderStatus
      assignedAt: Date
      resolvedAt: Date | null
      resolutionNotes: string | null
    }, ExtArgs["result"]["workOrder"]>
    composites: {}
  }

  type WorkOrderGetPayload<S extends boolean | null | undefined | WorkOrderDefaultArgs> = $Result.GetResult<Prisma.$WorkOrderPayload, S>

  type WorkOrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkOrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkOrderCountAggregateInputType | true
    }

  export interface WorkOrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkOrder'], meta: { name: 'WorkOrder' } }
    /**
     * Find zero or one WorkOrder that matches the filter.
     * @param {WorkOrderFindUniqueArgs} args - Arguments to find a WorkOrder
     * @example
     * // Get one WorkOrder
     * const workOrder = await prisma.workOrder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkOrderFindUniqueArgs>(args: SelectSubset<T, WorkOrderFindUniqueArgs<ExtArgs>>): Prisma__WorkOrderClient<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkOrder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkOrderFindUniqueOrThrowArgs} args - Arguments to find a WorkOrder
     * @example
     * // Get one WorkOrder
     * const workOrder = await prisma.workOrder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkOrderFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkOrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkOrderClient<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkOrder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderFindFirstArgs} args - Arguments to find a WorkOrder
     * @example
     * // Get one WorkOrder
     * const workOrder = await prisma.workOrder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkOrderFindFirstArgs>(args?: SelectSubset<T, WorkOrderFindFirstArgs<ExtArgs>>): Prisma__WorkOrderClient<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkOrder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderFindFirstOrThrowArgs} args - Arguments to find a WorkOrder
     * @example
     * // Get one WorkOrder
     * const workOrder = await prisma.workOrder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkOrderFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkOrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkOrderClient<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkOrders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkOrders
     * const workOrders = await prisma.workOrder.findMany()
     * 
     * // Get first 10 WorkOrders
     * const workOrders = await prisma.workOrder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workOrderWithIdOnly = await prisma.workOrder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkOrderFindManyArgs>(args?: SelectSubset<T, WorkOrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkOrder.
     * @param {WorkOrderCreateArgs} args - Arguments to create a WorkOrder.
     * @example
     * // Create one WorkOrder
     * const WorkOrder = await prisma.workOrder.create({
     *   data: {
     *     // ... data to create a WorkOrder
     *   }
     * })
     * 
     */
    create<T extends WorkOrderCreateArgs>(args: SelectSubset<T, WorkOrderCreateArgs<ExtArgs>>): Prisma__WorkOrderClient<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkOrders.
     * @param {WorkOrderCreateManyArgs} args - Arguments to create many WorkOrders.
     * @example
     * // Create many WorkOrders
     * const workOrder = await prisma.workOrder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkOrderCreateManyArgs>(args?: SelectSubset<T, WorkOrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkOrders and returns the data saved in the database.
     * @param {WorkOrderCreateManyAndReturnArgs} args - Arguments to create many WorkOrders.
     * @example
     * // Create many WorkOrders
     * const workOrder = await prisma.workOrder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkOrders and only return the `id`
     * const workOrderWithIdOnly = await prisma.workOrder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkOrderCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkOrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkOrder.
     * @param {WorkOrderDeleteArgs} args - Arguments to delete one WorkOrder.
     * @example
     * // Delete one WorkOrder
     * const WorkOrder = await prisma.workOrder.delete({
     *   where: {
     *     // ... filter to delete one WorkOrder
     *   }
     * })
     * 
     */
    delete<T extends WorkOrderDeleteArgs>(args: SelectSubset<T, WorkOrderDeleteArgs<ExtArgs>>): Prisma__WorkOrderClient<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkOrder.
     * @param {WorkOrderUpdateArgs} args - Arguments to update one WorkOrder.
     * @example
     * // Update one WorkOrder
     * const workOrder = await prisma.workOrder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkOrderUpdateArgs>(args: SelectSubset<T, WorkOrderUpdateArgs<ExtArgs>>): Prisma__WorkOrderClient<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkOrders.
     * @param {WorkOrderDeleteManyArgs} args - Arguments to filter WorkOrders to delete.
     * @example
     * // Delete a few WorkOrders
     * const { count } = await prisma.workOrder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkOrderDeleteManyArgs>(args?: SelectSubset<T, WorkOrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkOrders
     * const workOrder = await prisma.workOrder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkOrderUpdateManyArgs>(args: SelectSubset<T, WorkOrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkOrders and returns the data updated in the database.
     * @param {WorkOrderUpdateManyAndReturnArgs} args - Arguments to update many WorkOrders.
     * @example
     * // Update many WorkOrders
     * const workOrder = await prisma.workOrder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkOrders and only return the `id`
     * const workOrderWithIdOnly = await prisma.workOrder.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkOrderUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkOrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkOrder.
     * @param {WorkOrderUpsertArgs} args - Arguments to update or create a WorkOrder.
     * @example
     * // Update or create a WorkOrder
     * const workOrder = await prisma.workOrder.upsert({
     *   create: {
     *     // ... data to create a WorkOrder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkOrder we want to update
     *   }
     * })
     */
    upsert<T extends WorkOrderUpsertArgs>(args: SelectSubset<T, WorkOrderUpsertArgs<ExtArgs>>): Prisma__WorkOrderClient<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderCountArgs} args - Arguments to filter WorkOrders to count.
     * @example
     * // Count the number of WorkOrders
     * const count = await prisma.workOrder.count({
     *   where: {
     *     // ... the filter for the WorkOrders we want to count
     *   }
     * })
    **/
    count<T extends WorkOrderCountArgs>(
      args?: Subset<T, WorkOrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkOrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkOrderAggregateArgs>(args: Subset<T, WorkOrderAggregateArgs>): Prisma.PrismaPromise<GetWorkOrderAggregateType<T>>

    /**
     * Group by WorkOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkOrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkOrderGroupByArgs['orderBy'] }
        : { orderBy?: WorkOrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkOrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkOrder model
   */
  readonly fields: WorkOrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkOrder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkOrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    faultReport<T extends FaultReportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FaultReportDefaultArgs<ExtArgs>>): Prisma__FaultReportClient<$Result.GetResult<Prisma.$FaultReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    assignedTo<T extends WorkOrder$assignedToArgs<ExtArgs> = {}>(args?: Subset<T, WorkOrder$assignedToArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    assignedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkOrder model
   */
  interface WorkOrderFieldRefs {
    readonly id: FieldRef<"WorkOrder", 'String'>
    readonly faultReportId: FieldRef<"WorkOrder", 'String'>
    readonly assignedToId: FieldRef<"WorkOrder", 'String'>
    readonly assignedById: FieldRef<"WorkOrder", 'String'>
    readonly status: FieldRef<"WorkOrder", 'WorkOrderStatus'>
    readonly assignedAt: FieldRef<"WorkOrder", 'DateTime'>
    readonly resolvedAt: FieldRef<"WorkOrder", 'DateTime'>
    readonly resolutionNotes: FieldRef<"WorkOrder", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WorkOrder findUnique
   */
  export type WorkOrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    /**
     * Filter, which WorkOrder to fetch.
     */
    where: WorkOrderWhereUniqueInput
  }

  /**
   * WorkOrder findUniqueOrThrow
   */
  export type WorkOrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    /**
     * Filter, which WorkOrder to fetch.
     */
    where: WorkOrderWhereUniqueInput
  }

  /**
   * WorkOrder findFirst
   */
  export type WorkOrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    /**
     * Filter, which WorkOrder to fetch.
     */
    where?: WorkOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkOrders to fetch.
     */
    orderBy?: WorkOrderOrderByWithRelationInput | WorkOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkOrders.
     */
    cursor?: WorkOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkOrders.
     */
    distinct?: WorkOrderScalarFieldEnum | WorkOrderScalarFieldEnum[]
  }

  /**
   * WorkOrder findFirstOrThrow
   */
  export type WorkOrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    /**
     * Filter, which WorkOrder to fetch.
     */
    where?: WorkOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkOrders to fetch.
     */
    orderBy?: WorkOrderOrderByWithRelationInput | WorkOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkOrders.
     */
    cursor?: WorkOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkOrders.
     */
    distinct?: WorkOrderScalarFieldEnum | WorkOrderScalarFieldEnum[]
  }

  /**
   * WorkOrder findMany
   */
  export type WorkOrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    /**
     * Filter, which WorkOrders to fetch.
     */
    where?: WorkOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkOrders to fetch.
     */
    orderBy?: WorkOrderOrderByWithRelationInput | WorkOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkOrders.
     */
    cursor?: WorkOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkOrders.
     */
    distinct?: WorkOrderScalarFieldEnum | WorkOrderScalarFieldEnum[]
  }

  /**
   * WorkOrder create
   */
  export type WorkOrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkOrder.
     */
    data: XOR<WorkOrderCreateInput, WorkOrderUncheckedCreateInput>
  }

  /**
   * WorkOrder createMany
   */
  export type WorkOrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkOrders.
     */
    data: WorkOrderCreateManyInput | WorkOrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkOrder createManyAndReturn
   */
  export type WorkOrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * The data used to create many WorkOrders.
     */
    data: WorkOrderCreateManyInput | WorkOrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkOrder update
   */
  export type WorkOrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkOrder.
     */
    data: XOR<WorkOrderUpdateInput, WorkOrderUncheckedUpdateInput>
    /**
     * Choose, which WorkOrder to update.
     */
    where: WorkOrderWhereUniqueInput
  }

  /**
   * WorkOrder updateMany
   */
  export type WorkOrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkOrders.
     */
    data: XOR<WorkOrderUpdateManyMutationInput, WorkOrderUncheckedUpdateManyInput>
    /**
     * Filter which WorkOrders to update
     */
    where?: WorkOrderWhereInput
    /**
     * Limit how many WorkOrders to update.
     */
    limit?: number
  }

  /**
   * WorkOrder updateManyAndReturn
   */
  export type WorkOrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * The data used to update WorkOrders.
     */
    data: XOR<WorkOrderUpdateManyMutationInput, WorkOrderUncheckedUpdateManyInput>
    /**
     * Filter which WorkOrders to update
     */
    where?: WorkOrderWhereInput
    /**
     * Limit how many WorkOrders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkOrder upsert
   */
  export type WorkOrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkOrder to update in case it exists.
     */
    where: WorkOrderWhereUniqueInput
    /**
     * In case the WorkOrder found by the `where` argument doesn't exist, create a new WorkOrder with this data.
     */
    create: XOR<WorkOrderCreateInput, WorkOrderUncheckedCreateInput>
    /**
     * In case the WorkOrder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkOrderUpdateInput, WorkOrderUncheckedUpdateInput>
  }

  /**
   * WorkOrder delete
   */
  export type WorkOrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    /**
     * Filter which WorkOrder to delete.
     */
    where: WorkOrderWhereUniqueInput
  }

  /**
   * WorkOrder deleteMany
   */
  export type WorkOrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkOrders to delete
     */
    where?: WorkOrderWhereInput
    /**
     * Limit how many WorkOrders to delete.
     */
    limit?: number
  }

  /**
   * WorkOrder.assignedTo
   */
  export type WorkOrder$assignedToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * WorkOrder without action
   */
  export type WorkOrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
  }


  /**
   * Model StatusLog
   */

  export type AggregateStatusLog = {
    _count: StatusLogCountAggregateOutputType | null
    _min: StatusLogMinAggregateOutputType | null
    _max: StatusLogMaxAggregateOutputType | null
  }

  export type StatusLogMinAggregateOutputType = {
    id: string | null
    poleId: string | null
    changedById: string | null
    fromStatus: $Enums.PoleStatus | null
    toStatus: $Enums.PoleStatus | null
    changedAt: Date | null
    reason: string | null
  }

  export type StatusLogMaxAggregateOutputType = {
    id: string | null
    poleId: string | null
    changedById: string | null
    fromStatus: $Enums.PoleStatus | null
    toStatus: $Enums.PoleStatus | null
    changedAt: Date | null
    reason: string | null
  }

  export type StatusLogCountAggregateOutputType = {
    id: number
    poleId: number
    changedById: number
    fromStatus: number
    toStatus: number
    changedAt: number
    reason: number
    _all: number
  }


  export type StatusLogMinAggregateInputType = {
    id?: true
    poleId?: true
    changedById?: true
    fromStatus?: true
    toStatus?: true
    changedAt?: true
    reason?: true
  }

  export type StatusLogMaxAggregateInputType = {
    id?: true
    poleId?: true
    changedById?: true
    fromStatus?: true
    toStatus?: true
    changedAt?: true
    reason?: true
  }

  export type StatusLogCountAggregateInputType = {
    id?: true
    poleId?: true
    changedById?: true
    fromStatus?: true
    toStatus?: true
    changedAt?: true
    reason?: true
    _all?: true
  }

  export type StatusLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StatusLog to aggregate.
     */
    where?: StatusLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatusLogs to fetch.
     */
    orderBy?: StatusLogOrderByWithRelationInput | StatusLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StatusLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatusLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatusLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StatusLogs
    **/
    _count?: true | StatusLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StatusLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StatusLogMaxAggregateInputType
  }

  export type GetStatusLogAggregateType<T extends StatusLogAggregateArgs> = {
        [P in keyof T & keyof AggregateStatusLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStatusLog[P]>
      : GetScalarType<T[P], AggregateStatusLog[P]>
  }




  export type StatusLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StatusLogWhereInput
    orderBy?: StatusLogOrderByWithAggregationInput | StatusLogOrderByWithAggregationInput[]
    by: StatusLogScalarFieldEnum[] | StatusLogScalarFieldEnum
    having?: StatusLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StatusLogCountAggregateInputType | true
    _min?: StatusLogMinAggregateInputType
    _max?: StatusLogMaxAggregateInputType
  }

  export type StatusLogGroupByOutputType = {
    id: string
    poleId: string
    changedById: string
    fromStatus: $Enums.PoleStatus
    toStatus: $Enums.PoleStatus
    changedAt: Date
    reason: string | null
    _count: StatusLogCountAggregateOutputType | null
    _min: StatusLogMinAggregateOutputType | null
    _max: StatusLogMaxAggregateOutputType | null
  }

  type GetStatusLogGroupByPayload<T extends StatusLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StatusLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StatusLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StatusLogGroupByOutputType[P]>
            : GetScalarType<T[P], StatusLogGroupByOutputType[P]>
        }
      >
    >


  export type StatusLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    poleId?: boolean
    changedById?: boolean
    fromStatus?: boolean
    toStatus?: boolean
    changedAt?: boolean
    reason?: boolean
    pole?: boolean | PoleDefaultArgs<ExtArgs>
    changedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["statusLog"]>

  export type StatusLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    poleId?: boolean
    changedById?: boolean
    fromStatus?: boolean
    toStatus?: boolean
    changedAt?: boolean
    reason?: boolean
    pole?: boolean | PoleDefaultArgs<ExtArgs>
    changedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["statusLog"]>

  export type StatusLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    poleId?: boolean
    changedById?: boolean
    fromStatus?: boolean
    toStatus?: boolean
    changedAt?: boolean
    reason?: boolean
    pole?: boolean | PoleDefaultArgs<ExtArgs>
    changedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["statusLog"]>

  export type StatusLogSelectScalar = {
    id?: boolean
    poleId?: boolean
    changedById?: boolean
    fromStatus?: boolean
    toStatus?: boolean
    changedAt?: boolean
    reason?: boolean
  }

  export type StatusLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "poleId" | "changedById" | "fromStatus" | "toStatus" | "changedAt" | "reason", ExtArgs["result"]["statusLog"]>
  export type StatusLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pole?: boolean | PoleDefaultArgs<ExtArgs>
    changedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type StatusLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pole?: boolean | PoleDefaultArgs<ExtArgs>
    changedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type StatusLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pole?: boolean | PoleDefaultArgs<ExtArgs>
    changedBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $StatusLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StatusLog"
    objects: {
      pole: Prisma.$PolePayload<ExtArgs>
      changedBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      poleId: string
      changedById: string
      fromStatus: $Enums.PoleStatus
      toStatus: $Enums.PoleStatus
      changedAt: Date
      reason: string | null
    }, ExtArgs["result"]["statusLog"]>
    composites: {}
  }

  type StatusLogGetPayload<S extends boolean | null | undefined | StatusLogDefaultArgs> = $Result.GetResult<Prisma.$StatusLogPayload, S>

  type StatusLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StatusLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StatusLogCountAggregateInputType | true
    }

  export interface StatusLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StatusLog'], meta: { name: 'StatusLog' } }
    /**
     * Find zero or one StatusLog that matches the filter.
     * @param {StatusLogFindUniqueArgs} args - Arguments to find a StatusLog
     * @example
     * // Get one StatusLog
     * const statusLog = await prisma.statusLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StatusLogFindUniqueArgs>(args: SelectSubset<T, StatusLogFindUniqueArgs<ExtArgs>>): Prisma__StatusLogClient<$Result.GetResult<Prisma.$StatusLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StatusLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StatusLogFindUniqueOrThrowArgs} args - Arguments to find a StatusLog
     * @example
     * // Get one StatusLog
     * const statusLog = await prisma.statusLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StatusLogFindUniqueOrThrowArgs>(args: SelectSubset<T, StatusLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StatusLogClient<$Result.GetResult<Prisma.$StatusLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StatusLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusLogFindFirstArgs} args - Arguments to find a StatusLog
     * @example
     * // Get one StatusLog
     * const statusLog = await prisma.statusLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StatusLogFindFirstArgs>(args?: SelectSubset<T, StatusLogFindFirstArgs<ExtArgs>>): Prisma__StatusLogClient<$Result.GetResult<Prisma.$StatusLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StatusLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusLogFindFirstOrThrowArgs} args - Arguments to find a StatusLog
     * @example
     * // Get one StatusLog
     * const statusLog = await prisma.statusLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StatusLogFindFirstOrThrowArgs>(args?: SelectSubset<T, StatusLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__StatusLogClient<$Result.GetResult<Prisma.$StatusLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StatusLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StatusLogs
     * const statusLogs = await prisma.statusLog.findMany()
     * 
     * // Get first 10 StatusLogs
     * const statusLogs = await prisma.statusLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const statusLogWithIdOnly = await prisma.statusLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StatusLogFindManyArgs>(args?: SelectSubset<T, StatusLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatusLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StatusLog.
     * @param {StatusLogCreateArgs} args - Arguments to create a StatusLog.
     * @example
     * // Create one StatusLog
     * const StatusLog = await prisma.statusLog.create({
     *   data: {
     *     // ... data to create a StatusLog
     *   }
     * })
     * 
     */
    create<T extends StatusLogCreateArgs>(args: SelectSubset<T, StatusLogCreateArgs<ExtArgs>>): Prisma__StatusLogClient<$Result.GetResult<Prisma.$StatusLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StatusLogs.
     * @param {StatusLogCreateManyArgs} args - Arguments to create many StatusLogs.
     * @example
     * // Create many StatusLogs
     * const statusLog = await prisma.statusLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StatusLogCreateManyArgs>(args?: SelectSubset<T, StatusLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StatusLogs and returns the data saved in the database.
     * @param {StatusLogCreateManyAndReturnArgs} args - Arguments to create many StatusLogs.
     * @example
     * // Create many StatusLogs
     * const statusLog = await prisma.statusLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StatusLogs and only return the `id`
     * const statusLogWithIdOnly = await prisma.statusLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StatusLogCreateManyAndReturnArgs>(args?: SelectSubset<T, StatusLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatusLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StatusLog.
     * @param {StatusLogDeleteArgs} args - Arguments to delete one StatusLog.
     * @example
     * // Delete one StatusLog
     * const StatusLog = await prisma.statusLog.delete({
     *   where: {
     *     // ... filter to delete one StatusLog
     *   }
     * })
     * 
     */
    delete<T extends StatusLogDeleteArgs>(args: SelectSubset<T, StatusLogDeleteArgs<ExtArgs>>): Prisma__StatusLogClient<$Result.GetResult<Prisma.$StatusLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StatusLog.
     * @param {StatusLogUpdateArgs} args - Arguments to update one StatusLog.
     * @example
     * // Update one StatusLog
     * const statusLog = await prisma.statusLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StatusLogUpdateArgs>(args: SelectSubset<T, StatusLogUpdateArgs<ExtArgs>>): Prisma__StatusLogClient<$Result.GetResult<Prisma.$StatusLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StatusLogs.
     * @param {StatusLogDeleteManyArgs} args - Arguments to filter StatusLogs to delete.
     * @example
     * // Delete a few StatusLogs
     * const { count } = await prisma.statusLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StatusLogDeleteManyArgs>(args?: SelectSubset<T, StatusLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StatusLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StatusLogs
     * const statusLog = await prisma.statusLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StatusLogUpdateManyArgs>(args: SelectSubset<T, StatusLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StatusLogs and returns the data updated in the database.
     * @param {StatusLogUpdateManyAndReturnArgs} args - Arguments to update many StatusLogs.
     * @example
     * // Update many StatusLogs
     * const statusLog = await prisma.statusLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StatusLogs and only return the `id`
     * const statusLogWithIdOnly = await prisma.statusLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StatusLogUpdateManyAndReturnArgs>(args: SelectSubset<T, StatusLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatusLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StatusLog.
     * @param {StatusLogUpsertArgs} args - Arguments to update or create a StatusLog.
     * @example
     * // Update or create a StatusLog
     * const statusLog = await prisma.statusLog.upsert({
     *   create: {
     *     // ... data to create a StatusLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StatusLog we want to update
     *   }
     * })
     */
    upsert<T extends StatusLogUpsertArgs>(args: SelectSubset<T, StatusLogUpsertArgs<ExtArgs>>): Prisma__StatusLogClient<$Result.GetResult<Prisma.$StatusLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StatusLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusLogCountArgs} args - Arguments to filter StatusLogs to count.
     * @example
     * // Count the number of StatusLogs
     * const count = await prisma.statusLog.count({
     *   where: {
     *     // ... the filter for the StatusLogs we want to count
     *   }
     * })
    **/
    count<T extends StatusLogCountArgs>(
      args?: Subset<T, StatusLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StatusLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StatusLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StatusLogAggregateArgs>(args: Subset<T, StatusLogAggregateArgs>): Prisma.PrismaPromise<GetStatusLogAggregateType<T>>

    /**
     * Group by StatusLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StatusLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StatusLogGroupByArgs['orderBy'] }
        : { orderBy?: StatusLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StatusLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStatusLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StatusLog model
   */
  readonly fields: StatusLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StatusLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StatusLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pole<T extends PoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PoleDefaultArgs<ExtArgs>>): Prisma__PoleClient<$Result.GetResult<Prisma.$PolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    changedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StatusLog model
   */
  interface StatusLogFieldRefs {
    readonly id: FieldRef<"StatusLog", 'String'>
    readonly poleId: FieldRef<"StatusLog", 'String'>
    readonly changedById: FieldRef<"StatusLog", 'String'>
    readonly fromStatus: FieldRef<"StatusLog", 'PoleStatus'>
    readonly toStatus: FieldRef<"StatusLog", 'PoleStatus'>
    readonly changedAt: FieldRef<"StatusLog", 'DateTime'>
    readonly reason: FieldRef<"StatusLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * StatusLog findUnique
   */
  export type StatusLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusLog
     */
    select?: StatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusLog
     */
    omit?: StatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusLogInclude<ExtArgs> | null
    /**
     * Filter, which StatusLog to fetch.
     */
    where: StatusLogWhereUniqueInput
  }

  /**
   * StatusLog findUniqueOrThrow
   */
  export type StatusLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusLog
     */
    select?: StatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusLog
     */
    omit?: StatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusLogInclude<ExtArgs> | null
    /**
     * Filter, which StatusLog to fetch.
     */
    where: StatusLogWhereUniqueInput
  }

  /**
   * StatusLog findFirst
   */
  export type StatusLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusLog
     */
    select?: StatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusLog
     */
    omit?: StatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusLogInclude<ExtArgs> | null
    /**
     * Filter, which StatusLog to fetch.
     */
    where?: StatusLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatusLogs to fetch.
     */
    orderBy?: StatusLogOrderByWithRelationInput | StatusLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StatusLogs.
     */
    cursor?: StatusLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatusLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatusLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StatusLogs.
     */
    distinct?: StatusLogScalarFieldEnum | StatusLogScalarFieldEnum[]
  }

  /**
   * StatusLog findFirstOrThrow
   */
  export type StatusLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusLog
     */
    select?: StatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusLog
     */
    omit?: StatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusLogInclude<ExtArgs> | null
    /**
     * Filter, which StatusLog to fetch.
     */
    where?: StatusLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatusLogs to fetch.
     */
    orderBy?: StatusLogOrderByWithRelationInput | StatusLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StatusLogs.
     */
    cursor?: StatusLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatusLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatusLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StatusLogs.
     */
    distinct?: StatusLogScalarFieldEnum | StatusLogScalarFieldEnum[]
  }

  /**
   * StatusLog findMany
   */
  export type StatusLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusLog
     */
    select?: StatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusLog
     */
    omit?: StatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusLogInclude<ExtArgs> | null
    /**
     * Filter, which StatusLogs to fetch.
     */
    where?: StatusLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatusLogs to fetch.
     */
    orderBy?: StatusLogOrderByWithRelationInput | StatusLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StatusLogs.
     */
    cursor?: StatusLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatusLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatusLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StatusLogs.
     */
    distinct?: StatusLogScalarFieldEnum | StatusLogScalarFieldEnum[]
  }

  /**
   * StatusLog create
   */
  export type StatusLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusLog
     */
    select?: StatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusLog
     */
    omit?: StatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusLogInclude<ExtArgs> | null
    /**
     * The data needed to create a StatusLog.
     */
    data: XOR<StatusLogCreateInput, StatusLogUncheckedCreateInput>
  }

  /**
   * StatusLog createMany
   */
  export type StatusLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StatusLogs.
     */
    data: StatusLogCreateManyInput | StatusLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StatusLog createManyAndReturn
   */
  export type StatusLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusLog
     */
    select?: StatusLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StatusLog
     */
    omit?: StatusLogOmit<ExtArgs> | null
    /**
     * The data used to create many StatusLogs.
     */
    data: StatusLogCreateManyInput | StatusLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StatusLog update
   */
  export type StatusLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusLog
     */
    select?: StatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusLog
     */
    omit?: StatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusLogInclude<ExtArgs> | null
    /**
     * The data needed to update a StatusLog.
     */
    data: XOR<StatusLogUpdateInput, StatusLogUncheckedUpdateInput>
    /**
     * Choose, which StatusLog to update.
     */
    where: StatusLogWhereUniqueInput
  }

  /**
   * StatusLog updateMany
   */
  export type StatusLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StatusLogs.
     */
    data: XOR<StatusLogUpdateManyMutationInput, StatusLogUncheckedUpdateManyInput>
    /**
     * Filter which StatusLogs to update
     */
    where?: StatusLogWhereInput
    /**
     * Limit how many StatusLogs to update.
     */
    limit?: number
  }

  /**
   * StatusLog updateManyAndReturn
   */
  export type StatusLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusLog
     */
    select?: StatusLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StatusLog
     */
    omit?: StatusLogOmit<ExtArgs> | null
    /**
     * The data used to update StatusLogs.
     */
    data: XOR<StatusLogUpdateManyMutationInput, StatusLogUncheckedUpdateManyInput>
    /**
     * Filter which StatusLogs to update
     */
    where?: StatusLogWhereInput
    /**
     * Limit how many StatusLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StatusLog upsert
   */
  export type StatusLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusLog
     */
    select?: StatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusLog
     */
    omit?: StatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusLogInclude<ExtArgs> | null
    /**
     * The filter to search for the StatusLog to update in case it exists.
     */
    where: StatusLogWhereUniqueInput
    /**
     * In case the StatusLog found by the `where` argument doesn't exist, create a new StatusLog with this data.
     */
    create: XOR<StatusLogCreateInput, StatusLogUncheckedCreateInput>
    /**
     * In case the StatusLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StatusLogUpdateInput, StatusLogUncheckedUpdateInput>
  }

  /**
   * StatusLog delete
   */
  export type StatusLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusLog
     */
    select?: StatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusLog
     */
    omit?: StatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusLogInclude<ExtArgs> | null
    /**
     * Filter which StatusLog to delete.
     */
    where: StatusLogWhereUniqueInput
  }

  /**
   * StatusLog deleteMany
   */
  export type StatusLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StatusLogs to delete
     */
    where?: StatusLogWhereInput
    /**
     * Limit how many StatusLogs to delete.
     */
    limit?: number
  }

  /**
   * StatusLog without action
   */
  export type StatusLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusLog
     */
    select?: StatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusLog
     */
    omit?: StatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    middleName: 'middleName',
    lastName: 'lastName',
    dob: 'dob',
    gender: 'gender',
    email: 'email',
    phone: 'phone',
    passwordHash: 'passwordHash',
    region: 'region',
    province: 'province',
    city: 'city',
    barangay: 'barangay',
    streetAddress: 'streetAddress',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PoleScalarFieldEnum: {
    id: 'id',
    poleCode: 'poleCode',
    address: 'address',
    barangay: 'barangay',
    latitude: 'latitude',
    longitude: 'longitude',
    status: 'status',
    installedAt: 'installedAt',
    updatedAt: 'updatedAt'
  };

  export type PoleScalarFieldEnum = (typeof PoleScalarFieldEnum)[keyof typeof PoleScalarFieldEnum]


  export const FaultReportScalarFieldEnum: {
    id: 'id',
    poleId: 'poleId',
    reportedById: 'reportedById',
    description: 'description',
    faultType: 'faultType',
    status: 'status',
    reportedAt: 'reportedAt'
  };

  export type FaultReportScalarFieldEnum = (typeof FaultReportScalarFieldEnum)[keyof typeof FaultReportScalarFieldEnum]


  export const WorkOrderScalarFieldEnum: {
    id: 'id',
    faultReportId: 'faultReportId',
    assignedToId: 'assignedToId',
    assignedById: 'assignedById',
    status: 'status',
    assignedAt: 'assignedAt',
    resolvedAt: 'resolvedAt',
    resolutionNotes: 'resolutionNotes'
  };

  export type WorkOrderScalarFieldEnum = (typeof WorkOrderScalarFieldEnum)[keyof typeof WorkOrderScalarFieldEnum]


  export const StatusLogScalarFieldEnum: {
    id: 'id',
    poleId: 'poleId',
    changedById: 'changedById',
    fromStatus: 'fromStatus',
    toStatus: 'toStatus',
    changedAt: 'changedAt',
    reason: 'reason'
  };

  export type StatusLogScalarFieldEnum = (typeof StatusLogScalarFieldEnum)[keyof typeof StatusLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'PoleStatus'
   */
  export type EnumPoleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PoleStatus'>
    


  /**
   * Reference to a field of type 'PoleStatus[]'
   */
  export type ListEnumPoleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PoleStatus[]'>
    


  /**
   * Reference to a field of type 'FaultType'
   */
  export type EnumFaultTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FaultType'>
    


  /**
   * Reference to a field of type 'FaultType[]'
   */
  export type ListEnumFaultTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FaultType[]'>
    


  /**
   * Reference to a field of type 'ReportStatus'
   */
  export type EnumReportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportStatus'>
    


  /**
   * Reference to a field of type 'ReportStatus[]'
   */
  export type ListEnumReportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportStatus[]'>
    


  /**
   * Reference to a field of type 'WorkOrderStatus'
   */
  export type EnumWorkOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkOrderStatus'>
    


  /**
   * Reference to a field of type 'WorkOrderStatus[]'
   */
  export type ListEnumWorkOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkOrderStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    middleName?: StringNullableFilter<"User"> | string | null
    lastName?: StringFilter<"User"> | string
    dob?: DateTimeNullableFilter<"User"> | Date | string | null
    gender?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    phone?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    region?: StringFilter<"User"> | string
    province?: StringNullableFilter<"User"> | string | null
    city?: StringFilter<"User"> | string
    barangay?: StringFilter<"User"> | string
    streetAddress?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    faultReports?: FaultReportListRelationFilter
    workOrdersAssigned?: WorkOrderListRelationFilter
    workOrdersCreated?: WorkOrderListRelationFilter
    statusLogs?: StatusLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrder
    dob?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    email?: SortOrder
    phone?: SortOrder
    passwordHash?: SortOrder
    region?: SortOrder
    province?: SortOrderInput | SortOrder
    city?: SortOrder
    barangay?: SortOrder
    streetAddress?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    faultReports?: FaultReportOrderByRelationAggregateInput
    workOrdersAssigned?: WorkOrderOrderByRelationAggregateInput
    workOrdersCreated?: WorkOrderOrderByRelationAggregateInput
    statusLogs?: StatusLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringFilter<"User"> | string
    middleName?: StringNullableFilter<"User"> | string | null
    lastName?: StringFilter<"User"> | string
    dob?: DateTimeNullableFilter<"User"> | Date | string | null
    gender?: StringNullableFilter<"User"> | string | null
    phone?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    region?: StringFilter<"User"> | string
    province?: StringNullableFilter<"User"> | string | null
    city?: StringFilter<"User"> | string
    barangay?: StringFilter<"User"> | string
    streetAddress?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    faultReports?: FaultReportListRelationFilter
    workOrdersAssigned?: WorkOrderListRelationFilter
    workOrdersCreated?: WorkOrderListRelationFilter
    statusLogs?: StatusLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrder
    dob?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    email?: SortOrder
    phone?: SortOrder
    passwordHash?: SortOrder
    region?: SortOrder
    province?: SortOrderInput | SortOrder
    city?: SortOrder
    barangay?: SortOrder
    streetAddress?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    middleName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringWithAggregatesFilter<"User"> | string
    dob?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    gender?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    phone?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    region?: StringWithAggregatesFilter<"User"> | string
    province?: StringNullableWithAggregatesFilter<"User"> | string | null
    city?: StringWithAggregatesFilter<"User"> | string
    barangay?: StringWithAggregatesFilter<"User"> | string
    streetAddress?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PoleWhereInput = {
    AND?: PoleWhereInput | PoleWhereInput[]
    OR?: PoleWhereInput[]
    NOT?: PoleWhereInput | PoleWhereInput[]
    id?: StringFilter<"Pole"> | string
    poleCode?: StringFilter<"Pole"> | string
    address?: StringFilter<"Pole"> | string
    barangay?: StringFilter<"Pole"> | string
    latitude?: FloatFilter<"Pole"> | number
    longitude?: FloatFilter<"Pole"> | number
    status?: EnumPoleStatusFilter<"Pole"> | $Enums.PoleStatus
    installedAt?: DateTimeFilter<"Pole"> | Date | string
    updatedAt?: DateTimeFilter<"Pole"> | Date | string
    faultReports?: FaultReportListRelationFilter
    statusLogs?: StatusLogListRelationFilter
  }

  export type PoleOrderByWithRelationInput = {
    id?: SortOrder
    poleCode?: SortOrder
    address?: SortOrder
    barangay?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    status?: SortOrder
    installedAt?: SortOrder
    updatedAt?: SortOrder
    faultReports?: FaultReportOrderByRelationAggregateInput
    statusLogs?: StatusLogOrderByRelationAggregateInput
  }

  export type PoleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    poleCode?: string
    AND?: PoleWhereInput | PoleWhereInput[]
    OR?: PoleWhereInput[]
    NOT?: PoleWhereInput | PoleWhereInput[]
    address?: StringFilter<"Pole"> | string
    barangay?: StringFilter<"Pole"> | string
    latitude?: FloatFilter<"Pole"> | number
    longitude?: FloatFilter<"Pole"> | number
    status?: EnumPoleStatusFilter<"Pole"> | $Enums.PoleStatus
    installedAt?: DateTimeFilter<"Pole"> | Date | string
    updatedAt?: DateTimeFilter<"Pole"> | Date | string
    faultReports?: FaultReportListRelationFilter
    statusLogs?: StatusLogListRelationFilter
  }, "id" | "poleCode">

  export type PoleOrderByWithAggregationInput = {
    id?: SortOrder
    poleCode?: SortOrder
    address?: SortOrder
    barangay?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    status?: SortOrder
    installedAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PoleCountOrderByAggregateInput
    _avg?: PoleAvgOrderByAggregateInput
    _max?: PoleMaxOrderByAggregateInput
    _min?: PoleMinOrderByAggregateInput
    _sum?: PoleSumOrderByAggregateInput
  }

  export type PoleScalarWhereWithAggregatesInput = {
    AND?: PoleScalarWhereWithAggregatesInput | PoleScalarWhereWithAggregatesInput[]
    OR?: PoleScalarWhereWithAggregatesInput[]
    NOT?: PoleScalarWhereWithAggregatesInput | PoleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pole"> | string
    poleCode?: StringWithAggregatesFilter<"Pole"> | string
    address?: StringWithAggregatesFilter<"Pole"> | string
    barangay?: StringWithAggregatesFilter<"Pole"> | string
    latitude?: FloatWithAggregatesFilter<"Pole"> | number
    longitude?: FloatWithAggregatesFilter<"Pole"> | number
    status?: EnumPoleStatusWithAggregatesFilter<"Pole"> | $Enums.PoleStatus
    installedAt?: DateTimeWithAggregatesFilter<"Pole"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Pole"> | Date | string
  }

  export type FaultReportWhereInput = {
    AND?: FaultReportWhereInput | FaultReportWhereInput[]
    OR?: FaultReportWhereInput[]
    NOT?: FaultReportWhereInput | FaultReportWhereInput[]
    id?: StringFilter<"FaultReport"> | string
    poleId?: StringFilter<"FaultReport"> | string
    reportedById?: StringFilter<"FaultReport"> | string
    description?: StringFilter<"FaultReport"> | string
    faultType?: EnumFaultTypeFilter<"FaultReport"> | $Enums.FaultType
    status?: EnumReportStatusFilter<"FaultReport"> | $Enums.ReportStatus
    reportedAt?: DateTimeFilter<"FaultReport"> | Date | string
    pole?: XOR<PoleScalarRelationFilter, PoleWhereInput>
    reportedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    workOrder?: XOR<WorkOrderNullableScalarRelationFilter, WorkOrderWhereInput> | null
  }

  export type FaultReportOrderByWithRelationInput = {
    id?: SortOrder
    poleId?: SortOrder
    reportedById?: SortOrder
    description?: SortOrder
    faultType?: SortOrder
    status?: SortOrder
    reportedAt?: SortOrder
    pole?: PoleOrderByWithRelationInput
    reportedBy?: UserOrderByWithRelationInput
    workOrder?: WorkOrderOrderByWithRelationInput
  }

  export type FaultReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FaultReportWhereInput | FaultReportWhereInput[]
    OR?: FaultReportWhereInput[]
    NOT?: FaultReportWhereInput | FaultReportWhereInput[]
    poleId?: StringFilter<"FaultReport"> | string
    reportedById?: StringFilter<"FaultReport"> | string
    description?: StringFilter<"FaultReport"> | string
    faultType?: EnumFaultTypeFilter<"FaultReport"> | $Enums.FaultType
    status?: EnumReportStatusFilter<"FaultReport"> | $Enums.ReportStatus
    reportedAt?: DateTimeFilter<"FaultReport"> | Date | string
    pole?: XOR<PoleScalarRelationFilter, PoleWhereInput>
    reportedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    workOrder?: XOR<WorkOrderNullableScalarRelationFilter, WorkOrderWhereInput> | null
  }, "id">

  export type FaultReportOrderByWithAggregationInput = {
    id?: SortOrder
    poleId?: SortOrder
    reportedById?: SortOrder
    description?: SortOrder
    faultType?: SortOrder
    status?: SortOrder
    reportedAt?: SortOrder
    _count?: FaultReportCountOrderByAggregateInput
    _max?: FaultReportMaxOrderByAggregateInput
    _min?: FaultReportMinOrderByAggregateInput
  }

  export type FaultReportScalarWhereWithAggregatesInput = {
    AND?: FaultReportScalarWhereWithAggregatesInput | FaultReportScalarWhereWithAggregatesInput[]
    OR?: FaultReportScalarWhereWithAggregatesInput[]
    NOT?: FaultReportScalarWhereWithAggregatesInput | FaultReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FaultReport"> | string
    poleId?: StringWithAggregatesFilter<"FaultReport"> | string
    reportedById?: StringWithAggregatesFilter<"FaultReport"> | string
    description?: StringWithAggregatesFilter<"FaultReport"> | string
    faultType?: EnumFaultTypeWithAggregatesFilter<"FaultReport"> | $Enums.FaultType
    status?: EnumReportStatusWithAggregatesFilter<"FaultReport"> | $Enums.ReportStatus
    reportedAt?: DateTimeWithAggregatesFilter<"FaultReport"> | Date | string
  }

  export type WorkOrderWhereInput = {
    AND?: WorkOrderWhereInput | WorkOrderWhereInput[]
    OR?: WorkOrderWhereInput[]
    NOT?: WorkOrderWhereInput | WorkOrderWhereInput[]
    id?: StringFilter<"WorkOrder"> | string
    faultReportId?: StringFilter<"WorkOrder"> | string
    assignedToId?: StringNullableFilter<"WorkOrder"> | string | null
    assignedById?: StringFilter<"WorkOrder"> | string
    status?: EnumWorkOrderStatusFilter<"WorkOrder"> | $Enums.WorkOrderStatus
    assignedAt?: DateTimeFilter<"WorkOrder"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"WorkOrder"> | Date | string | null
    resolutionNotes?: StringNullableFilter<"WorkOrder"> | string | null
    faultReport?: XOR<FaultReportScalarRelationFilter, FaultReportWhereInput>
    assignedTo?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    assignedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WorkOrderOrderByWithRelationInput = {
    id?: SortOrder
    faultReportId?: SortOrder
    assignedToId?: SortOrderInput | SortOrder
    assignedById?: SortOrder
    status?: SortOrder
    assignedAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    resolutionNotes?: SortOrderInput | SortOrder
    faultReport?: FaultReportOrderByWithRelationInput
    assignedTo?: UserOrderByWithRelationInput
    assignedBy?: UserOrderByWithRelationInput
  }

  export type WorkOrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    faultReportId?: string
    AND?: WorkOrderWhereInput | WorkOrderWhereInput[]
    OR?: WorkOrderWhereInput[]
    NOT?: WorkOrderWhereInput | WorkOrderWhereInput[]
    assignedToId?: StringNullableFilter<"WorkOrder"> | string | null
    assignedById?: StringFilter<"WorkOrder"> | string
    status?: EnumWorkOrderStatusFilter<"WorkOrder"> | $Enums.WorkOrderStatus
    assignedAt?: DateTimeFilter<"WorkOrder"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"WorkOrder"> | Date | string | null
    resolutionNotes?: StringNullableFilter<"WorkOrder"> | string | null
    faultReport?: XOR<FaultReportScalarRelationFilter, FaultReportWhereInput>
    assignedTo?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    assignedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "faultReportId">

  export type WorkOrderOrderByWithAggregationInput = {
    id?: SortOrder
    faultReportId?: SortOrder
    assignedToId?: SortOrderInput | SortOrder
    assignedById?: SortOrder
    status?: SortOrder
    assignedAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    resolutionNotes?: SortOrderInput | SortOrder
    _count?: WorkOrderCountOrderByAggregateInput
    _max?: WorkOrderMaxOrderByAggregateInput
    _min?: WorkOrderMinOrderByAggregateInput
  }

  export type WorkOrderScalarWhereWithAggregatesInput = {
    AND?: WorkOrderScalarWhereWithAggregatesInput | WorkOrderScalarWhereWithAggregatesInput[]
    OR?: WorkOrderScalarWhereWithAggregatesInput[]
    NOT?: WorkOrderScalarWhereWithAggregatesInput | WorkOrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkOrder"> | string
    faultReportId?: StringWithAggregatesFilter<"WorkOrder"> | string
    assignedToId?: StringNullableWithAggregatesFilter<"WorkOrder"> | string | null
    assignedById?: StringWithAggregatesFilter<"WorkOrder"> | string
    status?: EnumWorkOrderStatusWithAggregatesFilter<"WorkOrder"> | $Enums.WorkOrderStatus
    assignedAt?: DateTimeWithAggregatesFilter<"WorkOrder"> | Date | string
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"WorkOrder"> | Date | string | null
    resolutionNotes?: StringNullableWithAggregatesFilter<"WorkOrder"> | string | null
  }

  export type StatusLogWhereInput = {
    AND?: StatusLogWhereInput | StatusLogWhereInput[]
    OR?: StatusLogWhereInput[]
    NOT?: StatusLogWhereInput | StatusLogWhereInput[]
    id?: StringFilter<"StatusLog"> | string
    poleId?: StringFilter<"StatusLog"> | string
    changedById?: StringFilter<"StatusLog"> | string
    fromStatus?: EnumPoleStatusFilter<"StatusLog"> | $Enums.PoleStatus
    toStatus?: EnumPoleStatusFilter<"StatusLog"> | $Enums.PoleStatus
    changedAt?: DateTimeFilter<"StatusLog"> | Date | string
    reason?: StringNullableFilter<"StatusLog"> | string | null
    pole?: XOR<PoleScalarRelationFilter, PoleWhereInput>
    changedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type StatusLogOrderByWithRelationInput = {
    id?: SortOrder
    poleId?: SortOrder
    changedById?: SortOrder
    fromStatus?: SortOrder
    toStatus?: SortOrder
    changedAt?: SortOrder
    reason?: SortOrderInput | SortOrder
    pole?: PoleOrderByWithRelationInput
    changedBy?: UserOrderByWithRelationInput
  }

  export type StatusLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StatusLogWhereInput | StatusLogWhereInput[]
    OR?: StatusLogWhereInput[]
    NOT?: StatusLogWhereInput | StatusLogWhereInput[]
    poleId?: StringFilter<"StatusLog"> | string
    changedById?: StringFilter<"StatusLog"> | string
    fromStatus?: EnumPoleStatusFilter<"StatusLog"> | $Enums.PoleStatus
    toStatus?: EnumPoleStatusFilter<"StatusLog"> | $Enums.PoleStatus
    changedAt?: DateTimeFilter<"StatusLog"> | Date | string
    reason?: StringNullableFilter<"StatusLog"> | string | null
    pole?: XOR<PoleScalarRelationFilter, PoleWhereInput>
    changedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type StatusLogOrderByWithAggregationInput = {
    id?: SortOrder
    poleId?: SortOrder
    changedById?: SortOrder
    fromStatus?: SortOrder
    toStatus?: SortOrder
    changedAt?: SortOrder
    reason?: SortOrderInput | SortOrder
    _count?: StatusLogCountOrderByAggregateInput
    _max?: StatusLogMaxOrderByAggregateInput
    _min?: StatusLogMinOrderByAggregateInput
  }

  export type StatusLogScalarWhereWithAggregatesInput = {
    AND?: StatusLogScalarWhereWithAggregatesInput | StatusLogScalarWhereWithAggregatesInput[]
    OR?: StatusLogScalarWhereWithAggregatesInput[]
    NOT?: StatusLogScalarWhereWithAggregatesInput | StatusLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StatusLog"> | string
    poleId?: StringWithAggregatesFilter<"StatusLog"> | string
    changedById?: StringWithAggregatesFilter<"StatusLog"> | string
    fromStatus?: EnumPoleStatusWithAggregatesFilter<"StatusLog"> | $Enums.PoleStatus
    toStatus?: EnumPoleStatusWithAggregatesFilter<"StatusLog"> | $Enums.PoleStatus
    changedAt?: DateTimeWithAggregatesFilter<"StatusLog"> | Date | string
    reason?: StringNullableWithAggregatesFilter<"StatusLog"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob?: Date | string | null
    gender?: string | null
    email: string
    phone: string
    passwordHash: string
    region: string
    province?: string | null
    city: string
    barangay: string
    streetAddress?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    faultReports?: FaultReportCreateNestedManyWithoutReportedByInput
    workOrdersAssigned?: WorkOrderCreateNestedManyWithoutAssignedToInput
    workOrdersCreated?: WorkOrderCreateNestedManyWithoutAssignedByInput
    statusLogs?: StatusLogCreateNestedManyWithoutChangedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob?: Date | string | null
    gender?: string | null
    email: string
    phone: string
    passwordHash: string
    region: string
    province?: string | null
    city: string
    barangay: string
    streetAddress?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    faultReports?: FaultReportUncheckedCreateNestedManyWithoutReportedByInput
    workOrdersAssigned?: WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput
    workOrdersCreated?: WorkOrderUncheckedCreateNestedManyWithoutAssignedByInput
    statusLogs?: StatusLogUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    province?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    barangay?: StringFieldUpdateOperationsInput | string
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    faultReports?: FaultReportUpdateManyWithoutReportedByNestedInput
    workOrdersAssigned?: WorkOrderUpdateManyWithoutAssignedToNestedInput
    workOrdersCreated?: WorkOrderUpdateManyWithoutAssignedByNestedInput
    statusLogs?: StatusLogUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    province?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    barangay?: StringFieldUpdateOperationsInput | string
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    faultReports?: FaultReportUncheckedUpdateManyWithoutReportedByNestedInput
    workOrdersAssigned?: WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput
    workOrdersCreated?: WorkOrderUncheckedUpdateManyWithoutAssignedByNestedInput
    statusLogs?: StatusLogUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob?: Date | string | null
    gender?: string | null
    email: string
    phone: string
    passwordHash: string
    region: string
    province?: string | null
    city: string
    barangay: string
    streetAddress?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    province?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    barangay?: StringFieldUpdateOperationsInput | string
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    province?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    barangay?: StringFieldUpdateOperationsInput | string
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoleCreateInput = {
    id?: string
    poleCode: string
    address: string
    barangay: string
    latitude: number
    longitude: number
    status?: $Enums.PoleStatus
    installedAt?: Date | string
    updatedAt?: Date | string
    faultReports?: FaultReportCreateNestedManyWithoutPoleInput
    statusLogs?: StatusLogCreateNestedManyWithoutPoleInput
  }

  export type PoleUncheckedCreateInput = {
    id?: string
    poleCode: string
    address: string
    barangay: string
    latitude: number
    longitude: number
    status?: $Enums.PoleStatus
    installedAt?: Date | string
    updatedAt?: Date | string
    faultReports?: FaultReportUncheckedCreateNestedManyWithoutPoleInput
    statusLogs?: StatusLogUncheckedCreateNestedManyWithoutPoleInput
  }

  export type PoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    poleCode?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    barangay?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    status?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    faultReports?: FaultReportUpdateManyWithoutPoleNestedInput
    statusLogs?: StatusLogUpdateManyWithoutPoleNestedInput
  }

  export type PoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    poleCode?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    barangay?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    status?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    faultReports?: FaultReportUncheckedUpdateManyWithoutPoleNestedInput
    statusLogs?: StatusLogUncheckedUpdateManyWithoutPoleNestedInput
  }

  export type PoleCreateManyInput = {
    id?: string
    poleCode: string
    address: string
    barangay: string
    latitude: number
    longitude: number
    status?: $Enums.PoleStatus
    installedAt?: Date | string
    updatedAt?: Date | string
  }

  export type PoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    poleCode?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    barangay?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    status?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    poleCode?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    barangay?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    status?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FaultReportCreateInput = {
    id?: string
    description: string
    faultType: $Enums.FaultType
    status?: $Enums.ReportStatus
    reportedAt?: Date | string
    pole: PoleCreateNestedOneWithoutFaultReportsInput
    reportedBy: UserCreateNestedOneWithoutFaultReportsInput
    workOrder?: WorkOrderCreateNestedOneWithoutFaultReportInput
  }

  export type FaultReportUncheckedCreateInput = {
    id?: string
    poleId: string
    reportedById: string
    description: string
    faultType: $Enums.FaultType
    status?: $Enums.ReportStatus
    reportedAt?: Date | string
    workOrder?: WorkOrderUncheckedCreateNestedOneWithoutFaultReportInput
  }

  export type FaultReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    faultType?: EnumFaultTypeFieldUpdateOperationsInput | $Enums.FaultType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    reportedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pole?: PoleUpdateOneRequiredWithoutFaultReportsNestedInput
    reportedBy?: UserUpdateOneRequiredWithoutFaultReportsNestedInput
    workOrder?: WorkOrderUpdateOneWithoutFaultReportNestedInput
  }

  export type FaultReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    poleId?: StringFieldUpdateOperationsInput | string
    reportedById?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    faultType?: EnumFaultTypeFieldUpdateOperationsInput | $Enums.FaultType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    reportedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workOrder?: WorkOrderUncheckedUpdateOneWithoutFaultReportNestedInput
  }

  export type FaultReportCreateManyInput = {
    id?: string
    poleId: string
    reportedById: string
    description: string
    faultType: $Enums.FaultType
    status?: $Enums.ReportStatus
    reportedAt?: Date | string
  }

  export type FaultReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    faultType?: EnumFaultTypeFieldUpdateOperationsInput | $Enums.FaultType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    reportedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FaultReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    poleId?: StringFieldUpdateOperationsInput | string
    reportedById?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    faultType?: EnumFaultTypeFieldUpdateOperationsInput | $Enums.FaultType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    reportedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkOrderCreateInput = {
    id?: string
    status?: $Enums.WorkOrderStatus
    assignedAt?: Date | string
    resolvedAt?: Date | string | null
    resolutionNotes?: string | null
    faultReport: FaultReportCreateNestedOneWithoutWorkOrderInput
    assignedTo?: UserCreateNestedOneWithoutWorkOrdersAssignedInput
    assignedBy: UserCreateNestedOneWithoutWorkOrdersCreatedInput
  }

  export type WorkOrderUncheckedCreateInput = {
    id?: string
    faultReportId: string
    assignedToId?: string | null
    assignedById: string
    status?: $Enums.WorkOrderStatus
    assignedAt?: Date | string
    resolvedAt?: Date | string | null
    resolutionNotes?: string | null
  }

  export type WorkOrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    faultReport?: FaultReportUpdateOneRequiredWithoutWorkOrderNestedInput
    assignedTo?: UserUpdateOneWithoutWorkOrdersAssignedNestedInput
    assignedBy?: UserUpdateOneRequiredWithoutWorkOrdersCreatedNestedInput
  }

  export type WorkOrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    faultReportId?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedById?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkOrderCreateManyInput = {
    id?: string
    faultReportId: string
    assignedToId?: string | null
    assignedById: string
    status?: $Enums.WorkOrderStatus
    assignedAt?: Date | string
    resolvedAt?: Date | string | null
    resolutionNotes?: string | null
  }

  export type WorkOrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkOrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    faultReportId?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedById?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StatusLogCreateInput = {
    id?: string
    fromStatus: $Enums.PoleStatus
    toStatus: $Enums.PoleStatus
    changedAt?: Date | string
    reason?: string | null
    pole: PoleCreateNestedOneWithoutStatusLogsInput
    changedBy: UserCreateNestedOneWithoutStatusLogsInput
  }

  export type StatusLogUncheckedCreateInput = {
    id?: string
    poleId: string
    changedById: string
    fromStatus: $Enums.PoleStatus
    toStatus: $Enums.PoleStatus
    changedAt?: Date | string
    reason?: string | null
  }

  export type StatusLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    toStatus?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    pole?: PoleUpdateOneRequiredWithoutStatusLogsNestedInput
    changedBy?: UserUpdateOneRequiredWithoutStatusLogsNestedInput
  }

  export type StatusLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    poleId?: StringFieldUpdateOperationsInput | string
    changedById?: StringFieldUpdateOperationsInput | string
    fromStatus?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    toStatus?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StatusLogCreateManyInput = {
    id?: string
    poleId: string
    changedById: string
    fromStatus: $Enums.PoleStatus
    toStatus: $Enums.PoleStatus
    changedAt?: Date | string
    reason?: string | null
  }

  export type StatusLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    toStatus?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StatusLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    poleId?: StringFieldUpdateOperationsInput | string
    changedById?: StringFieldUpdateOperationsInput | string
    fromStatus?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    toStatus?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FaultReportListRelationFilter = {
    every?: FaultReportWhereInput
    some?: FaultReportWhereInput
    none?: FaultReportWhereInput
  }

  export type WorkOrderListRelationFilter = {
    every?: WorkOrderWhereInput
    some?: WorkOrderWhereInput
    none?: WorkOrderWhereInput
  }

  export type StatusLogListRelationFilter = {
    every?: StatusLogWhereInput
    some?: StatusLogWhereInput
    none?: StatusLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FaultReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkOrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StatusLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dob?: SortOrder
    gender?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    passwordHash?: SortOrder
    region?: SortOrder
    province?: SortOrder
    city?: SortOrder
    barangay?: SortOrder
    streetAddress?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dob?: SortOrder
    gender?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    passwordHash?: SortOrder
    region?: SortOrder
    province?: SortOrder
    city?: SortOrder
    barangay?: SortOrder
    streetAddress?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dob?: SortOrder
    gender?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    passwordHash?: SortOrder
    region?: SortOrder
    province?: SortOrder
    city?: SortOrder
    barangay?: SortOrder
    streetAddress?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumPoleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PoleStatus | EnumPoleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PoleStatus[] | ListEnumPoleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PoleStatus[] | ListEnumPoleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPoleStatusFilter<$PrismaModel> | $Enums.PoleStatus
  }

  export type PoleCountOrderByAggregateInput = {
    id?: SortOrder
    poleCode?: SortOrder
    address?: SortOrder
    barangay?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    status?: SortOrder
    installedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PoleAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type PoleMaxOrderByAggregateInput = {
    id?: SortOrder
    poleCode?: SortOrder
    address?: SortOrder
    barangay?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    status?: SortOrder
    installedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PoleMinOrderByAggregateInput = {
    id?: SortOrder
    poleCode?: SortOrder
    address?: SortOrder
    barangay?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    status?: SortOrder
    installedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PoleSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumPoleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PoleStatus | EnumPoleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PoleStatus[] | ListEnumPoleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PoleStatus[] | ListEnumPoleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPoleStatusWithAggregatesFilter<$PrismaModel> | $Enums.PoleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPoleStatusFilter<$PrismaModel>
    _max?: NestedEnumPoleStatusFilter<$PrismaModel>
  }

  export type EnumFaultTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FaultType | EnumFaultTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FaultType[] | ListEnumFaultTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FaultType[] | ListEnumFaultTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFaultTypeFilter<$PrismaModel> | $Enums.FaultType
  }

  export type EnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus
  }

  export type PoleScalarRelationFilter = {
    is?: PoleWhereInput
    isNot?: PoleWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type WorkOrderNullableScalarRelationFilter = {
    is?: WorkOrderWhereInput | null
    isNot?: WorkOrderWhereInput | null
  }

  export type FaultReportCountOrderByAggregateInput = {
    id?: SortOrder
    poleId?: SortOrder
    reportedById?: SortOrder
    description?: SortOrder
    faultType?: SortOrder
    status?: SortOrder
    reportedAt?: SortOrder
  }

  export type FaultReportMaxOrderByAggregateInput = {
    id?: SortOrder
    poleId?: SortOrder
    reportedById?: SortOrder
    description?: SortOrder
    faultType?: SortOrder
    status?: SortOrder
    reportedAt?: SortOrder
  }

  export type FaultReportMinOrderByAggregateInput = {
    id?: SortOrder
    poleId?: SortOrder
    reportedById?: SortOrder
    description?: SortOrder
    faultType?: SortOrder
    status?: SortOrder
    reportedAt?: SortOrder
  }

  export type EnumFaultTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FaultType | EnumFaultTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FaultType[] | ListEnumFaultTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FaultType[] | ListEnumFaultTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFaultTypeWithAggregatesFilter<$PrismaModel> | $Enums.FaultType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFaultTypeFilter<$PrismaModel>
    _max?: NestedEnumFaultTypeFilter<$PrismaModel>
  }

  export type EnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReportStatusFilter<$PrismaModel>
    _max?: NestedEnumReportStatusFilter<$PrismaModel>
  }

  export type EnumWorkOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkOrderStatus | EnumWorkOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WorkOrderStatus[] | ListEnumWorkOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkOrderStatus[] | ListEnumWorkOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkOrderStatusFilter<$PrismaModel> | $Enums.WorkOrderStatus
  }

  export type FaultReportScalarRelationFilter = {
    is?: FaultReportWhereInput
    isNot?: FaultReportWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type WorkOrderCountOrderByAggregateInput = {
    id?: SortOrder
    faultReportId?: SortOrder
    assignedToId?: SortOrder
    assignedById?: SortOrder
    status?: SortOrder
    assignedAt?: SortOrder
    resolvedAt?: SortOrder
    resolutionNotes?: SortOrder
  }

  export type WorkOrderMaxOrderByAggregateInput = {
    id?: SortOrder
    faultReportId?: SortOrder
    assignedToId?: SortOrder
    assignedById?: SortOrder
    status?: SortOrder
    assignedAt?: SortOrder
    resolvedAt?: SortOrder
    resolutionNotes?: SortOrder
  }

  export type WorkOrderMinOrderByAggregateInput = {
    id?: SortOrder
    faultReportId?: SortOrder
    assignedToId?: SortOrder
    assignedById?: SortOrder
    status?: SortOrder
    assignedAt?: SortOrder
    resolvedAt?: SortOrder
    resolutionNotes?: SortOrder
  }

  export type EnumWorkOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkOrderStatus | EnumWorkOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WorkOrderStatus[] | ListEnumWorkOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkOrderStatus[] | ListEnumWorkOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.WorkOrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWorkOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumWorkOrderStatusFilter<$PrismaModel>
  }

  export type StatusLogCountOrderByAggregateInput = {
    id?: SortOrder
    poleId?: SortOrder
    changedById?: SortOrder
    fromStatus?: SortOrder
    toStatus?: SortOrder
    changedAt?: SortOrder
    reason?: SortOrder
  }

  export type StatusLogMaxOrderByAggregateInput = {
    id?: SortOrder
    poleId?: SortOrder
    changedById?: SortOrder
    fromStatus?: SortOrder
    toStatus?: SortOrder
    changedAt?: SortOrder
    reason?: SortOrder
  }

  export type StatusLogMinOrderByAggregateInput = {
    id?: SortOrder
    poleId?: SortOrder
    changedById?: SortOrder
    fromStatus?: SortOrder
    toStatus?: SortOrder
    changedAt?: SortOrder
    reason?: SortOrder
  }

  export type FaultReportCreateNestedManyWithoutReportedByInput = {
    create?: XOR<FaultReportCreateWithoutReportedByInput, FaultReportUncheckedCreateWithoutReportedByInput> | FaultReportCreateWithoutReportedByInput[] | FaultReportUncheckedCreateWithoutReportedByInput[]
    connectOrCreate?: FaultReportCreateOrConnectWithoutReportedByInput | FaultReportCreateOrConnectWithoutReportedByInput[]
    createMany?: FaultReportCreateManyReportedByInputEnvelope
    connect?: FaultReportWhereUniqueInput | FaultReportWhereUniqueInput[]
  }

  export type WorkOrderCreateNestedManyWithoutAssignedToInput = {
    create?: XOR<WorkOrderCreateWithoutAssignedToInput, WorkOrderUncheckedCreateWithoutAssignedToInput> | WorkOrderCreateWithoutAssignedToInput[] | WorkOrderUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: WorkOrderCreateOrConnectWithoutAssignedToInput | WorkOrderCreateOrConnectWithoutAssignedToInput[]
    createMany?: WorkOrderCreateManyAssignedToInputEnvelope
    connect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
  }

  export type WorkOrderCreateNestedManyWithoutAssignedByInput = {
    create?: XOR<WorkOrderCreateWithoutAssignedByInput, WorkOrderUncheckedCreateWithoutAssignedByInput> | WorkOrderCreateWithoutAssignedByInput[] | WorkOrderUncheckedCreateWithoutAssignedByInput[]
    connectOrCreate?: WorkOrderCreateOrConnectWithoutAssignedByInput | WorkOrderCreateOrConnectWithoutAssignedByInput[]
    createMany?: WorkOrderCreateManyAssignedByInputEnvelope
    connect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
  }

  export type StatusLogCreateNestedManyWithoutChangedByInput = {
    create?: XOR<StatusLogCreateWithoutChangedByInput, StatusLogUncheckedCreateWithoutChangedByInput> | StatusLogCreateWithoutChangedByInput[] | StatusLogUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: StatusLogCreateOrConnectWithoutChangedByInput | StatusLogCreateOrConnectWithoutChangedByInput[]
    createMany?: StatusLogCreateManyChangedByInputEnvelope
    connect?: StatusLogWhereUniqueInput | StatusLogWhereUniqueInput[]
  }

  export type FaultReportUncheckedCreateNestedManyWithoutReportedByInput = {
    create?: XOR<FaultReportCreateWithoutReportedByInput, FaultReportUncheckedCreateWithoutReportedByInput> | FaultReportCreateWithoutReportedByInput[] | FaultReportUncheckedCreateWithoutReportedByInput[]
    connectOrCreate?: FaultReportCreateOrConnectWithoutReportedByInput | FaultReportCreateOrConnectWithoutReportedByInput[]
    createMany?: FaultReportCreateManyReportedByInputEnvelope
    connect?: FaultReportWhereUniqueInput | FaultReportWhereUniqueInput[]
  }

  export type WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput = {
    create?: XOR<WorkOrderCreateWithoutAssignedToInput, WorkOrderUncheckedCreateWithoutAssignedToInput> | WorkOrderCreateWithoutAssignedToInput[] | WorkOrderUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: WorkOrderCreateOrConnectWithoutAssignedToInput | WorkOrderCreateOrConnectWithoutAssignedToInput[]
    createMany?: WorkOrderCreateManyAssignedToInputEnvelope
    connect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
  }

  export type WorkOrderUncheckedCreateNestedManyWithoutAssignedByInput = {
    create?: XOR<WorkOrderCreateWithoutAssignedByInput, WorkOrderUncheckedCreateWithoutAssignedByInput> | WorkOrderCreateWithoutAssignedByInput[] | WorkOrderUncheckedCreateWithoutAssignedByInput[]
    connectOrCreate?: WorkOrderCreateOrConnectWithoutAssignedByInput | WorkOrderCreateOrConnectWithoutAssignedByInput[]
    createMany?: WorkOrderCreateManyAssignedByInputEnvelope
    connect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
  }

  export type StatusLogUncheckedCreateNestedManyWithoutChangedByInput = {
    create?: XOR<StatusLogCreateWithoutChangedByInput, StatusLogUncheckedCreateWithoutChangedByInput> | StatusLogCreateWithoutChangedByInput[] | StatusLogUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: StatusLogCreateOrConnectWithoutChangedByInput | StatusLogCreateOrConnectWithoutChangedByInput[]
    createMany?: StatusLogCreateManyChangedByInputEnvelope
    connect?: StatusLogWhereUniqueInput | StatusLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FaultReportUpdateManyWithoutReportedByNestedInput = {
    create?: XOR<FaultReportCreateWithoutReportedByInput, FaultReportUncheckedCreateWithoutReportedByInput> | FaultReportCreateWithoutReportedByInput[] | FaultReportUncheckedCreateWithoutReportedByInput[]
    connectOrCreate?: FaultReportCreateOrConnectWithoutReportedByInput | FaultReportCreateOrConnectWithoutReportedByInput[]
    upsert?: FaultReportUpsertWithWhereUniqueWithoutReportedByInput | FaultReportUpsertWithWhereUniqueWithoutReportedByInput[]
    createMany?: FaultReportCreateManyReportedByInputEnvelope
    set?: FaultReportWhereUniqueInput | FaultReportWhereUniqueInput[]
    disconnect?: FaultReportWhereUniqueInput | FaultReportWhereUniqueInput[]
    delete?: FaultReportWhereUniqueInput | FaultReportWhereUniqueInput[]
    connect?: FaultReportWhereUniqueInput | FaultReportWhereUniqueInput[]
    update?: FaultReportUpdateWithWhereUniqueWithoutReportedByInput | FaultReportUpdateWithWhereUniqueWithoutReportedByInput[]
    updateMany?: FaultReportUpdateManyWithWhereWithoutReportedByInput | FaultReportUpdateManyWithWhereWithoutReportedByInput[]
    deleteMany?: FaultReportScalarWhereInput | FaultReportScalarWhereInput[]
  }

  export type WorkOrderUpdateManyWithoutAssignedToNestedInput = {
    create?: XOR<WorkOrderCreateWithoutAssignedToInput, WorkOrderUncheckedCreateWithoutAssignedToInput> | WorkOrderCreateWithoutAssignedToInput[] | WorkOrderUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: WorkOrderCreateOrConnectWithoutAssignedToInput | WorkOrderCreateOrConnectWithoutAssignedToInput[]
    upsert?: WorkOrderUpsertWithWhereUniqueWithoutAssignedToInput | WorkOrderUpsertWithWhereUniqueWithoutAssignedToInput[]
    createMany?: WorkOrderCreateManyAssignedToInputEnvelope
    set?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    disconnect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    delete?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    connect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    update?: WorkOrderUpdateWithWhereUniqueWithoutAssignedToInput | WorkOrderUpdateWithWhereUniqueWithoutAssignedToInput[]
    updateMany?: WorkOrderUpdateManyWithWhereWithoutAssignedToInput | WorkOrderUpdateManyWithWhereWithoutAssignedToInput[]
    deleteMany?: WorkOrderScalarWhereInput | WorkOrderScalarWhereInput[]
  }

  export type WorkOrderUpdateManyWithoutAssignedByNestedInput = {
    create?: XOR<WorkOrderCreateWithoutAssignedByInput, WorkOrderUncheckedCreateWithoutAssignedByInput> | WorkOrderCreateWithoutAssignedByInput[] | WorkOrderUncheckedCreateWithoutAssignedByInput[]
    connectOrCreate?: WorkOrderCreateOrConnectWithoutAssignedByInput | WorkOrderCreateOrConnectWithoutAssignedByInput[]
    upsert?: WorkOrderUpsertWithWhereUniqueWithoutAssignedByInput | WorkOrderUpsertWithWhereUniqueWithoutAssignedByInput[]
    createMany?: WorkOrderCreateManyAssignedByInputEnvelope
    set?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    disconnect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    delete?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    connect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    update?: WorkOrderUpdateWithWhereUniqueWithoutAssignedByInput | WorkOrderUpdateWithWhereUniqueWithoutAssignedByInput[]
    updateMany?: WorkOrderUpdateManyWithWhereWithoutAssignedByInput | WorkOrderUpdateManyWithWhereWithoutAssignedByInput[]
    deleteMany?: WorkOrderScalarWhereInput | WorkOrderScalarWhereInput[]
  }

  export type StatusLogUpdateManyWithoutChangedByNestedInput = {
    create?: XOR<StatusLogCreateWithoutChangedByInput, StatusLogUncheckedCreateWithoutChangedByInput> | StatusLogCreateWithoutChangedByInput[] | StatusLogUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: StatusLogCreateOrConnectWithoutChangedByInput | StatusLogCreateOrConnectWithoutChangedByInput[]
    upsert?: StatusLogUpsertWithWhereUniqueWithoutChangedByInput | StatusLogUpsertWithWhereUniqueWithoutChangedByInput[]
    createMany?: StatusLogCreateManyChangedByInputEnvelope
    set?: StatusLogWhereUniqueInput | StatusLogWhereUniqueInput[]
    disconnect?: StatusLogWhereUniqueInput | StatusLogWhereUniqueInput[]
    delete?: StatusLogWhereUniqueInput | StatusLogWhereUniqueInput[]
    connect?: StatusLogWhereUniqueInput | StatusLogWhereUniqueInput[]
    update?: StatusLogUpdateWithWhereUniqueWithoutChangedByInput | StatusLogUpdateWithWhereUniqueWithoutChangedByInput[]
    updateMany?: StatusLogUpdateManyWithWhereWithoutChangedByInput | StatusLogUpdateManyWithWhereWithoutChangedByInput[]
    deleteMany?: StatusLogScalarWhereInput | StatusLogScalarWhereInput[]
  }

  export type FaultReportUncheckedUpdateManyWithoutReportedByNestedInput = {
    create?: XOR<FaultReportCreateWithoutReportedByInput, FaultReportUncheckedCreateWithoutReportedByInput> | FaultReportCreateWithoutReportedByInput[] | FaultReportUncheckedCreateWithoutReportedByInput[]
    connectOrCreate?: FaultReportCreateOrConnectWithoutReportedByInput | FaultReportCreateOrConnectWithoutReportedByInput[]
    upsert?: FaultReportUpsertWithWhereUniqueWithoutReportedByInput | FaultReportUpsertWithWhereUniqueWithoutReportedByInput[]
    createMany?: FaultReportCreateManyReportedByInputEnvelope
    set?: FaultReportWhereUniqueInput | FaultReportWhereUniqueInput[]
    disconnect?: FaultReportWhereUniqueInput | FaultReportWhereUniqueInput[]
    delete?: FaultReportWhereUniqueInput | FaultReportWhereUniqueInput[]
    connect?: FaultReportWhereUniqueInput | FaultReportWhereUniqueInput[]
    update?: FaultReportUpdateWithWhereUniqueWithoutReportedByInput | FaultReportUpdateWithWhereUniqueWithoutReportedByInput[]
    updateMany?: FaultReportUpdateManyWithWhereWithoutReportedByInput | FaultReportUpdateManyWithWhereWithoutReportedByInput[]
    deleteMany?: FaultReportScalarWhereInput | FaultReportScalarWhereInput[]
  }

  export type WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput = {
    create?: XOR<WorkOrderCreateWithoutAssignedToInput, WorkOrderUncheckedCreateWithoutAssignedToInput> | WorkOrderCreateWithoutAssignedToInput[] | WorkOrderUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: WorkOrderCreateOrConnectWithoutAssignedToInput | WorkOrderCreateOrConnectWithoutAssignedToInput[]
    upsert?: WorkOrderUpsertWithWhereUniqueWithoutAssignedToInput | WorkOrderUpsertWithWhereUniqueWithoutAssignedToInput[]
    createMany?: WorkOrderCreateManyAssignedToInputEnvelope
    set?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    disconnect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    delete?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    connect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    update?: WorkOrderUpdateWithWhereUniqueWithoutAssignedToInput | WorkOrderUpdateWithWhereUniqueWithoutAssignedToInput[]
    updateMany?: WorkOrderUpdateManyWithWhereWithoutAssignedToInput | WorkOrderUpdateManyWithWhereWithoutAssignedToInput[]
    deleteMany?: WorkOrderScalarWhereInput | WorkOrderScalarWhereInput[]
  }

  export type WorkOrderUncheckedUpdateManyWithoutAssignedByNestedInput = {
    create?: XOR<WorkOrderCreateWithoutAssignedByInput, WorkOrderUncheckedCreateWithoutAssignedByInput> | WorkOrderCreateWithoutAssignedByInput[] | WorkOrderUncheckedCreateWithoutAssignedByInput[]
    connectOrCreate?: WorkOrderCreateOrConnectWithoutAssignedByInput | WorkOrderCreateOrConnectWithoutAssignedByInput[]
    upsert?: WorkOrderUpsertWithWhereUniqueWithoutAssignedByInput | WorkOrderUpsertWithWhereUniqueWithoutAssignedByInput[]
    createMany?: WorkOrderCreateManyAssignedByInputEnvelope
    set?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    disconnect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    delete?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    connect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    update?: WorkOrderUpdateWithWhereUniqueWithoutAssignedByInput | WorkOrderUpdateWithWhereUniqueWithoutAssignedByInput[]
    updateMany?: WorkOrderUpdateManyWithWhereWithoutAssignedByInput | WorkOrderUpdateManyWithWhereWithoutAssignedByInput[]
    deleteMany?: WorkOrderScalarWhereInput | WorkOrderScalarWhereInput[]
  }

  export type StatusLogUncheckedUpdateManyWithoutChangedByNestedInput = {
    create?: XOR<StatusLogCreateWithoutChangedByInput, StatusLogUncheckedCreateWithoutChangedByInput> | StatusLogCreateWithoutChangedByInput[] | StatusLogUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: StatusLogCreateOrConnectWithoutChangedByInput | StatusLogCreateOrConnectWithoutChangedByInput[]
    upsert?: StatusLogUpsertWithWhereUniqueWithoutChangedByInput | StatusLogUpsertWithWhereUniqueWithoutChangedByInput[]
    createMany?: StatusLogCreateManyChangedByInputEnvelope
    set?: StatusLogWhereUniqueInput | StatusLogWhereUniqueInput[]
    disconnect?: StatusLogWhereUniqueInput | StatusLogWhereUniqueInput[]
    delete?: StatusLogWhereUniqueInput | StatusLogWhereUniqueInput[]
    connect?: StatusLogWhereUniqueInput | StatusLogWhereUniqueInput[]
    update?: StatusLogUpdateWithWhereUniqueWithoutChangedByInput | StatusLogUpdateWithWhereUniqueWithoutChangedByInput[]
    updateMany?: StatusLogUpdateManyWithWhereWithoutChangedByInput | StatusLogUpdateManyWithWhereWithoutChangedByInput[]
    deleteMany?: StatusLogScalarWhereInput | StatusLogScalarWhereInput[]
  }

  export type FaultReportCreateNestedManyWithoutPoleInput = {
    create?: XOR<FaultReportCreateWithoutPoleInput, FaultReportUncheckedCreateWithoutPoleInput> | FaultReportCreateWithoutPoleInput[] | FaultReportUncheckedCreateWithoutPoleInput[]
    connectOrCreate?: FaultReportCreateOrConnectWithoutPoleInput | FaultReportCreateOrConnectWithoutPoleInput[]
    createMany?: FaultReportCreateManyPoleInputEnvelope
    connect?: FaultReportWhereUniqueInput | FaultReportWhereUniqueInput[]
  }

  export type StatusLogCreateNestedManyWithoutPoleInput = {
    create?: XOR<StatusLogCreateWithoutPoleInput, StatusLogUncheckedCreateWithoutPoleInput> | StatusLogCreateWithoutPoleInput[] | StatusLogUncheckedCreateWithoutPoleInput[]
    connectOrCreate?: StatusLogCreateOrConnectWithoutPoleInput | StatusLogCreateOrConnectWithoutPoleInput[]
    createMany?: StatusLogCreateManyPoleInputEnvelope
    connect?: StatusLogWhereUniqueInput | StatusLogWhereUniqueInput[]
  }

  export type FaultReportUncheckedCreateNestedManyWithoutPoleInput = {
    create?: XOR<FaultReportCreateWithoutPoleInput, FaultReportUncheckedCreateWithoutPoleInput> | FaultReportCreateWithoutPoleInput[] | FaultReportUncheckedCreateWithoutPoleInput[]
    connectOrCreate?: FaultReportCreateOrConnectWithoutPoleInput | FaultReportCreateOrConnectWithoutPoleInput[]
    createMany?: FaultReportCreateManyPoleInputEnvelope
    connect?: FaultReportWhereUniqueInput | FaultReportWhereUniqueInput[]
  }

  export type StatusLogUncheckedCreateNestedManyWithoutPoleInput = {
    create?: XOR<StatusLogCreateWithoutPoleInput, StatusLogUncheckedCreateWithoutPoleInput> | StatusLogCreateWithoutPoleInput[] | StatusLogUncheckedCreateWithoutPoleInput[]
    connectOrCreate?: StatusLogCreateOrConnectWithoutPoleInput | StatusLogCreateOrConnectWithoutPoleInput[]
    createMany?: StatusLogCreateManyPoleInputEnvelope
    connect?: StatusLogWhereUniqueInput | StatusLogWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumPoleStatusFieldUpdateOperationsInput = {
    set?: $Enums.PoleStatus
  }

  export type FaultReportUpdateManyWithoutPoleNestedInput = {
    create?: XOR<FaultReportCreateWithoutPoleInput, FaultReportUncheckedCreateWithoutPoleInput> | FaultReportCreateWithoutPoleInput[] | FaultReportUncheckedCreateWithoutPoleInput[]
    connectOrCreate?: FaultReportCreateOrConnectWithoutPoleInput | FaultReportCreateOrConnectWithoutPoleInput[]
    upsert?: FaultReportUpsertWithWhereUniqueWithoutPoleInput | FaultReportUpsertWithWhereUniqueWithoutPoleInput[]
    createMany?: FaultReportCreateManyPoleInputEnvelope
    set?: FaultReportWhereUniqueInput | FaultReportWhereUniqueInput[]
    disconnect?: FaultReportWhereUniqueInput | FaultReportWhereUniqueInput[]
    delete?: FaultReportWhereUniqueInput | FaultReportWhereUniqueInput[]
    connect?: FaultReportWhereUniqueInput | FaultReportWhereUniqueInput[]
    update?: FaultReportUpdateWithWhereUniqueWithoutPoleInput | FaultReportUpdateWithWhereUniqueWithoutPoleInput[]
    updateMany?: FaultReportUpdateManyWithWhereWithoutPoleInput | FaultReportUpdateManyWithWhereWithoutPoleInput[]
    deleteMany?: FaultReportScalarWhereInput | FaultReportScalarWhereInput[]
  }

  export type StatusLogUpdateManyWithoutPoleNestedInput = {
    create?: XOR<StatusLogCreateWithoutPoleInput, StatusLogUncheckedCreateWithoutPoleInput> | StatusLogCreateWithoutPoleInput[] | StatusLogUncheckedCreateWithoutPoleInput[]
    connectOrCreate?: StatusLogCreateOrConnectWithoutPoleInput | StatusLogCreateOrConnectWithoutPoleInput[]
    upsert?: StatusLogUpsertWithWhereUniqueWithoutPoleInput | StatusLogUpsertWithWhereUniqueWithoutPoleInput[]
    createMany?: StatusLogCreateManyPoleInputEnvelope
    set?: StatusLogWhereUniqueInput | StatusLogWhereUniqueInput[]
    disconnect?: StatusLogWhereUniqueInput | StatusLogWhereUniqueInput[]
    delete?: StatusLogWhereUniqueInput | StatusLogWhereUniqueInput[]
    connect?: StatusLogWhereUniqueInput | StatusLogWhereUniqueInput[]
    update?: StatusLogUpdateWithWhereUniqueWithoutPoleInput | StatusLogUpdateWithWhereUniqueWithoutPoleInput[]
    updateMany?: StatusLogUpdateManyWithWhereWithoutPoleInput | StatusLogUpdateManyWithWhereWithoutPoleInput[]
    deleteMany?: StatusLogScalarWhereInput | StatusLogScalarWhereInput[]
  }

  export type FaultReportUncheckedUpdateManyWithoutPoleNestedInput = {
    create?: XOR<FaultReportCreateWithoutPoleInput, FaultReportUncheckedCreateWithoutPoleInput> | FaultReportCreateWithoutPoleInput[] | FaultReportUncheckedCreateWithoutPoleInput[]
    connectOrCreate?: FaultReportCreateOrConnectWithoutPoleInput | FaultReportCreateOrConnectWithoutPoleInput[]
    upsert?: FaultReportUpsertWithWhereUniqueWithoutPoleInput | FaultReportUpsertWithWhereUniqueWithoutPoleInput[]
    createMany?: FaultReportCreateManyPoleInputEnvelope
    set?: FaultReportWhereUniqueInput | FaultReportWhereUniqueInput[]
    disconnect?: FaultReportWhereUniqueInput | FaultReportWhereUniqueInput[]
    delete?: FaultReportWhereUniqueInput | FaultReportWhereUniqueInput[]
    connect?: FaultReportWhereUniqueInput | FaultReportWhereUniqueInput[]
    update?: FaultReportUpdateWithWhereUniqueWithoutPoleInput | FaultReportUpdateWithWhereUniqueWithoutPoleInput[]
    updateMany?: FaultReportUpdateManyWithWhereWithoutPoleInput | FaultReportUpdateManyWithWhereWithoutPoleInput[]
    deleteMany?: FaultReportScalarWhereInput | FaultReportScalarWhereInput[]
  }

  export type StatusLogUncheckedUpdateManyWithoutPoleNestedInput = {
    create?: XOR<StatusLogCreateWithoutPoleInput, StatusLogUncheckedCreateWithoutPoleInput> | StatusLogCreateWithoutPoleInput[] | StatusLogUncheckedCreateWithoutPoleInput[]
    connectOrCreate?: StatusLogCreateOrConnectWithoutPoleInput | StatusLogCreateOrConnectWithoutPoleInput[]
    upsert?: StatusLogUpsertWithWhereUniqueWithoutPoleInput | StatusLogUpsertWithWhereUniqueWithoutPoleInput[]
    createMany?: StatusLogCreateManyPoleInputEnvelope
    set?: StatusLogWhereUniqueInput | StatusLogWhereUniqueInput[]
    disconnect?: StatusLogWhereUniqueInput | StatusLogWhereUniqueInput[]
    delete?: StatusLogWhereUniqueInput | StatusLogWhereUniqueInput[]
    connect?: StatusLogWhereUniqueInput | StatusLogWhereUniqueInput[]
    update?: StatusLogUpdateWithWhereUniqueWithoutPoleInput | StatusLogUpdateWithWhereUniqueWithoutPoleInput[]
    updateMany?: StatusLogUpdateManyWithWhereWithoutPoleInput | StatusLogUpdateManyWithWhereWithoutPoleInput[]
    deleteMany?: StatusLogScalarWhereInput | StatusLogScalarWhereInput[]
  }

  export type PoleCreateNestedOneWithoutFaultReportsInput = {
    create?: XOR<PoleCreateWithoutFaultReportsInput, PoleUncheckedCreateWithoutFaultReportsInput>
    connectOrCreate?: PoleCreateOrConnectWithoutFaultReportsInput
    connect?: PoleWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFaultReportsInput = {
    create?: XOR<UserCreateWithoutFaultReportsInput, UserUncheckedCreateWithoutFaultReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFaultReportsInput
    connect?: UserWhereUniqueInput
  }

  export type WorkOrderCreateNestedOneWithoutFaultReportInput = {
    create?: XOR<WorkOrderCreateWithoutFaultReportInput, WorkOrderUncheckedCreateWithoutFaultReportInput>
    connectOrCreate?: WorkOrderCreateOrConnectWithoutFaultReportInput
    connect?: WorkOrderWhereUniqueInput
  }

  export type WorkOrderUncheckedCreateNestedOneWithoutFaultReportInput = {
    create?: XOR<WorkOrderCreateWithoutFaultReportInput, WorkOrderUncheckedCreateWithoutFaultReportInput>
    connectOrCreate?: WorkOrderCreateOrConnectWithoutFaultReportInput
    connect?: WorkOrderWhereUniqueInput
  }

  export type EnumFaultTypeFieldUpdateOperationsInput = {
    set?: $Enums.FaultType
  }

  export type EnumReportStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReportStatus
  }

  export type PoleUpdateOneRequiredWithoutFaultReportsNestedInput = {
    create?: XOR<PoleCreateWithoutFaultReportsInput, PoleUncheckedCreateWithoutFaultReportsInput>
    connectOrCreate?: PoleCreateOrConnectWithoutFaultReportsInput
    upsert?: PoleUpsertWithoutFaultReportsInput
    connect?: PoleWhereUniqueInput
    update?: XOR<XOR<PoleUpdateToOneWithWhereWithoutFaultReportsInput, PoleUpdateWithoutFaultReportsInput>, PoleUncheckedUpdateWithoutFaultReportsInput>
  }

  export type UserUpdateOneRequiredWithoutFaultReportsNestedInput = {
    create?: XOR<UserCreateWithoutFaultReportsInput, UserUncheckedCreateWithoutFaultReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFaultReportsInput
    upsert?: UserUpsertWithoutFaultReportsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFaultReportsInput, UserUpdateWithoutFaultReportsInput>, UserUncheckedUpdateWithoutFaultReportsInput>
  }

  export type WorkOrderUpdateOneWithoutFaultReportNestedInput = {
    create?: XOR<WorkOrderCreateWithoutFaultReportInput, WorkOrderUncheckedCreateWithoutFaultReportInput>
    connectOrCreate?: WorkOrderCreateOrConnectWithoutFaultReportInput
    upsert?: WorkOrderUpsertWithoutFaultReportInput
    disconnect?: WorkOrderWhereInput | boolean
    delete?: WorkOrderWhereInput | boolean
    connect?: WorkOrderWhereUniqueInput
    update?: XOR<XOR<WorkOrderUpdateToOneWithWhereWithoutFaultReportInput, WorkOrderUpdateWithoutFaultReportInput>, WorkOrderUncheckedUpdateWithoutFaultReportInput>
  }

  export type WorkOrderUncheckedUpdateOneWithoutFaultReportNestedInput = {
    create?: XOR<WorkOrderCreateWithoutFaultReportInput, WorkOrderUncheckedCreateWithoutFaultReportInput>
    connectOrCreate?: WorkOrderCreateOrConnectWithoutFaultReportInput
    upsert?: WorkOrderUpsertWithoutFaultReportInput
    disconnect?: WorkOrderWhereInput | boolean
    delete?: WorkOrderWhereInput | boolean
    connect?: WorkOrderWhereUniqueInput
    update?: XOR<XOR<WorkOrderUpdateToOneWithWhereWithoutFaultReportInput, WorkOrderUpdateWithoutFaultReportInput>, WorkOrderUncheckedUpdateWithoutFaultReportInput>
  }

  export type FaultReportCreateNestedOneWithoutWorkOrderInput = {
    create?: XOR<FaultReportCreateWithoutWorkOrderInput, FaultReportUncheckedCreateWithoutWorkOrderInput>
    connectOrCreate?: FaultReportCreateOrConnectWithoutWorkOrderInput
    connect?: FaultReportWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutWorkOrdersAssignedInput = {
    create?: XOR<UserCreateWithoutWorkOrdersAssignedInput, UserUncheckedCreateWithoutWorkOrdersAssignedInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkOrdersAssignedInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutWorkOrdersCreatedInput = {
    create?: XOR<UserCreateWithoutWorkOrdersCreatedInput, UserUncheckedCreateWithoutWorkOrdersCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkOrdersCreatedInput
    connect?: UserWhereUniqueInput
  }

  export type EnumWorkOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.WorkOrderStatus
  }

  export type FaultReportUpdateOneRequiredWithoutWorkOrderNestedInput = {
    create?: XOR<FaultReportCreateWithoutWorkOrderInput, FaultReportUncheckedCreateWithoutWorkOrderInput>
    connectOrCreate?: FaultReportCreateOrConnectWithoutWorkOrderInput
    upsert?: FaultReportUpsertWithoutWorkOrderInput
    connect?: FaultReportWhereUniqueInput
    update?: XOR<XOR<FaultReportUpdateToOneWithWhereWithoutWorkOrderInput, FaultReportUpdateWithoutWorkOrderInput>, FaultReportUncheckedUpdateWithoutWorkOrderInput>
  }

  export type UserUpdateOneWithoutWorkOrdersAssignedNestedInput = {
    create?: XOR<UserCreateWithoutWorkOrdersAssignedInput, UserUncheckedCreateWithoutWorkOrdersAssignedInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkOrdersAssignedInput
    upsert?: UserUpsertWithoutWorkOrdersAssignedInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWorkOrdersAssignedInput, UserUpdateWithoutWorkOrdersAssignedInput>, UserUncheckedUpdateWithoutWorkOrdersAssignedInput>
  }

  export type UserUpdateOneRequiredWithoutWorkOrdersCreatedNestedInput = {
    create?: XOR<UserCreateWithoutWorkOrdersCreatedInput, UserUncheckedCreateWithoutWorkOrdersCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkOrdersCreatedInput
    upsert?: UserUpsertWithoutWorkOrdersCreatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWorkOrdersCreatedInput, UserUpdateWithoutWorkOrdersCreatedInput>, UserUncheckedUpdateWithoutWorkOrdersCreatedInput>
  }

  export type PoleCreateNestedOneWithoutStatusLogsInput = {
    create?: XOR<PoleCreateWithoutStatusLogsInput, PoleUncheckedCreateWithoutStatusLogsInput>
    connectOrCreate?: PoleCreateOrConnectWithoutStatusLogsInput
    connect?: PoleWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutStatusLogsInput = {
    create?: XOR<UserCreateWithoutStatusLogsInput, UserUncheckedCreateWithoutStatusLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStatusLogsInput
    connect?: UserWhereUniqueInput
  }

  export type PoleUpdateOneRequiredWithoutStatusLogsNestedInput = {
    create?: XOR<PoleCreateWithoutStatusLogsInput, PoleUncheckedCreateWithoutStatusLogsInput>
    connectOrCreate?: PoleCreateOrConnectWithoutStatusLogsInput
    upsert?: PoleUpsertWithoutStatusLogsInput
    connect?: PoleWhereUniqueInput
    update?: XOR<XOR<PoleUpdateToOneWithWhereWithoutStatusLogsInput, PoleUpdateWithoutStatusLogsInput>, PoleUncheckedUpdateWithoutStatusLogsInput>
  }

  export type UserUpdateOneRequiredWithoutStatusLogsNestedInput = {
    create?: XOR<UserCreateWithoutStatusLogsInput, UserUncheckedCreateWithoutStatusLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStatusLogsInput
    upsert?: UserUpsertWithoutStatusLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStatusLogsInput, UserUpdateWithoutStatusLogsInput>, UserUncheckedUpdateWithoutStatusLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumPoleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PoleStatus | EnumPoleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PoleStatus[] | ListEnumPoleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PoleStatus[] | ListEnumPoleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPoleStatusFilter<$PrismaModel> | $Enums.PoleStatus
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumPoleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PoleStatus | EnumPoleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PoleStatus[] | ListEnumPoleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PoleStatus[] | ListEnumPoleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPoleStatusWithAggregatesFilter<$PrismaModel> | $Enums.PoleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPoleStatusFilter<$PrismaModel>
    _max?: NestedEnumPoleStatusFilter<$PrismaModel>
  }

  export type NestedEnumFaultTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FaultType | EnumFaultTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FaultType[] | ListEnumFaultTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FaultType[] | ListEnumFaultTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFaultTypeFilter<$PrismaModel> | $Enums.FaultType
  }

  export type NestedEnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus
  }

  export type NestedEnumFaultTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FaultType | EnumFaultTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FaultType[] | ListEnumFaultTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FaultType[] | ListEnumFaultTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFaultTypeWithAggregatesFilter<$PrismaModel> | $Enums.FaultType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFaultTypeFilter<$PrismaModel>
    _max?: NestedEnumFaultTypeFilter<$PrismaModel>
  }

  export type NestedEnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReportStatusFilter<$PrismaModel>
    _max?: NestedEnumReportStatusFilter<$PrismaModel>
  }

  export type NestedEnumWorkOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkOrderStatus | EnumWorkOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WorkOrderStatus[] | ListEnumWorkOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkOrderStatus[] | ListEnumWorkOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkOrderStatusFilter<$PrismaModel> | $Enums.WorkOrderStatus
  }

  export type NestedEnumWorkOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkOrderStatus | EnumWorkOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WorkOrderStatus[] | ListEnumWorkOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkOrderStatus[] | ListEnumWorkOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.WorkOrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWorkOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumWorkOrderStatusFilter<$PrismaModel>
  }

  export type FaultReportCreateWithoutReportedByInput = {
    id?: string
    description: string
    faultType: $Enums.FaultType
    status?: $Enums.ReportStatus
    reportedAt?: Date | string
    pole: PoleCreateNestedOneWithoutFaultReportsInput
    workOrder?: WorkOrderCreateNestedOneWithoutFaultReportInput
  }

  export type FaultReportUncheckedCreateWithoutReportedByInput = {
    id?: string
    poleId: string
    description: string
    faultType: $Enums.FaultType
    status?: $Enums.ReportStatus
    reportedAt?: Date | string
    workOrder?: WorkOrderUncheckedCreateNestedOneWithoutFaultReportInput
  }

  export type FaultReportCreateOrConnectWithoutReportedByInput = {
    where: FaultReportWhereUniqueInput
    create: XOR<FaultReportCreateWithoutReportedByInput, FaultReportUncheckedCreateWithoutReportedByInput>
  }

  export type FaultReportCreateManyReportedByInputEnvelope = {
    data: FaultReportCreateManyReportedByInput | FaultReportCreateManyReportedByInput[]
    skipDuplicates?: boolean
  }

  export type WorkOrderCreateWithoutAssignedToInput = {
    id?: string
    status?: $Enums.WorkOrderStatus
    assignedAt?: Date | string
    resolvedAt?: Date | string | null
    resolutionNotes?: string | null
    faultReport: FaultReportCreateNestedOneWithoutWorkOrderInput
    assignedBy: UserCreateNestedOneWithoutWorkOrdersCreatedInput
  }

  export type WorkOrderUncheckedCreateWithoutAssignedToInput = {
    id?: string
    faultReportId: string
    assignedById: string
    status?: $Enums.WorkOrderStatus
    assignedAt?: Date | string
    resolvedAt?: Date | string | null
    resolutionNotes?: string | null
  }

  export type WorkOrderCreateOrConnectWithoutAssignedToInput = {
    where: WorkOrderWhereUniqueInput
    create: XOR<WorkOrderCreateWithoutAssignedToInput, WorkOrderUncheckedCreateWithoutAssignedToInput>
  }

  export type WorkOrderCreateManyAssignedToInputEnvelope = {
    data: WorkOrderCreateManyAssignedToInput | WorkOrderCreateManyAssignedToInput[]
    skipDuplicates?: boolean
  }

  export type WorkOrderCreateWithoutAssignedByInput = {
    id?: string
    status?: $Enums.WorkOrderStatus
    assignedAt?: Date | string
    resolvedAt?: Date | string | null
    resolutionNotes?: string | null
    faultReport: FaultReportCreateNestedOneWithoutWorkOrderInput
    assignedTo?: UserCreateNestedOneWithoutWorkOrdersAssignedInput
  }

  export type WorkOrderUncheckedCreateWithoutAssignedByInput = {
    id?: string
    faultReportId: string
    assignedToId?: string | null
    status?: $Enums.WorkOrderStatus
    assignedAt?: Date | string
    resolvedAt?: Date | string | null
    resolutionNotes?: string | null
  }

  export type WorkOrderCreateOrConnectWithoutAssignedByInput = {
    where: WorkOrderWhereUniqueInput
    create: XOR<WorkOrderCreateWithoutAssignedByInput, WorkOrderUncheckedCreateWithoutAssignedByInput>
  }

  export type WorkOrderCreateManyAssignedByInputEnvelope = {
    data: WorkOrderCreateManyAssignedByInput | WorkOrderCreateManyAssignedByInput[]
    skipDuplicates?: boolean
  }

  export type StatusLogCreateWithoutChangedByInput = {
    id?: string
    fromStatus: $Enums.PoleStatus
    toStatus: $Enums.PoleStatus
    changedAt?: Date | string
    reason?: string | null
    pole: PoleCreateNestedOneWithoutStatusLogsInput
  }

  export type StatusLogUncheckedCreateWithoutChangedByInput = {
    id?: string
    poleId: string
    fromStatus: $Enums.PoleStatus
    toStatus: $Enums.PoleStatus
    changedAt?: Date | string
    reason?: string | null
  }

  export type StatusLogCreateOrConnectWithoutChangedByInput = {
    where: StatusLogWhereUniqueInput
    create: XOR<StatusLogCreateWithoutChangedByInput, StatusLogUncheckedCreateWithoutChangedByInput>
  }

  export type StatusLogCreateManyChangedByInputEnvelope = {
    data: StatusLogCreateManyChangedByInput | StatusLogCreateManyChangedByInput[]
    skipDuplicates?: boolean
  }

  export type FaultReportUpsertWithWhereUniqueWithoutReportedByInput = {
    where: FaultReportWhereUniqueInput
    update: XOR<FaultReportUpdateWithoutReportedByInput, FaultReportUncheckedUpdateWithoutReportedByInput>
    create: XOR<FaultReportCreateWithoutReportedByInput, FaultReportUncheckedCreateWithoutReportedByInput>
  }

  export type FaultReportUpdateWithWhereUniqueWithoutReportedByInput = {
    where: FaultReportWhereUniqueInput
    data: XOR<FaultReportUpdateWithoutReportedByInput, FaultReportUncheckedUpdateWithoutReportedByInput>
  }

  export type FaultReportUpdateManyWithWhereWithoutReportedByInput = {
    where: FaultReportScalarWhereInput
    data: XOR<FaultReportUpdateManyMutationInput, FaultReportUncheckedUpdateManyWithoutReportedByInput>
  }

  export type FaultReportScalarWhereInput = {
    AND?: FaultReportScalarWhereInput | FaultReportScalarWhereInput[]
    OR?: FaultReportScalarWhereInput[]
    NOT?: FaultReportScalarWhereInput | FaultReportScalarWhereInput[]
    id?: StringFilter<"FaultReport"> | string
    poleId?: StringFilter<"FaultReport"> | string
    reportedById?: StringFilter<"FaultReport"> | string
    description?: StringFilter<"FaultReport"> | string
    faultType?: EnumFaultTypeFilter<"FaultReport"> | $Enums.FaultType
    status?: EnumReportStatusFilter<"FaultReport"> | $Enums.ReportStatus
    reportedAt?: DateTimeFilter<"FaultReport"> | Date | string
  }

  export type WorkOrderUpsertWithWhereUniqueWithoutAssignedToInput = {
    where: WorkOrderWhereUniqueInput
    update: XOR<WorkOrderUpdateWithoutAssignedToInput, WorkOrderUncheckedUpdateWithoutAssignedToInput>
    create: XOR<WorkOrderCreateWithoutAssignedToInput, WorkOrderUncheckedCreateWithoutAssignedToInput>
  }

  export type WorkOrderUpdateWithWhereUniqueWithoutAssignedToInput = {
    where: WorkOrderWhereUniqueInput
    data: XOR<WorkOrderUpdateWithoutAssignedToInput, WorkOrderUncheckedUpdateWithoutAssignedToInput>
  }

  export type WorkOrderUpdateManyWithWhereWithoutAssignedToInput = {
    where: WorkOrderScalarWhereInput
    data: XOR<WorkOrderUpdateManyMutationInput, WorkOrderUncheckedUpdateManyWithoutAssignedToInput>
  }

  export type WorkOrderScalarWhereInput = {
    AND?: WorkOrderScalarWhereInput | WorkOrderScalarWhereInput[]
    OR?: WorkOrderScalarWhereInput[]
    NOT?: WorkOrderScalarWhereInput | WorkOrderScalarWhereInput[]
    id?: StringFilter<"WorkOrder"> | string
    faultReportId?: StringFilter<"WorkOrder"> | string
    assignedToId?: StringNullableFilter<"WorkOrder"> | string | null
    assignedById?: StringFilter<"WorkOrder"> | string
    status?: EnumWorkOrderStatusFilter<"WorkOrder"> | $Enums.WorkOrderStatus
    assignedAt?: DateTimeFilter<"WorkOrder"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"WorkOrder"> | Date | string | null
    resolutionNotes?: StringNullableFilter<"WorkOrder"> | string | null
  }

  export type WorkOrderUpsertWithWhereUniqueWithoutAssignedByInput = {
    where: WorkOrderWhereUniqueInput
    update: XOR<WorkOrderUpdateWithoutAssignedByInput, WorkOrderUncheckedUpdateWithoutAssignedByInput>
    create: XOR<WorkOrderCreateWithoutAssignedByInput, WorkOrderUncheckedCreateWithoutAssignedByInput>
  }

  export type WorkOrderUpdateWithWhereUniqueWithoutAssignedByInput = {
    where: WorkOrderWhereUniqueInput
    data: XOR<WorkOrderUpdateWithoutAssignedByInput, WorkOrderUncheckedUpdateWithoutAssignedByInput>
  }

  export type WorkOrderUpdateManyWithWhereWithoutAssignedByInput = {
    where: WorkOrderScalarWhereInput
    data: XOR<WorkOrderUpdateManyMutationInput, WorkOrderUncheckedUpdateManyWithoutAssignedByInput>
  }

  export type StatusLogUpsertWithWhereUniqueWithoutChangedByInput = {
    where: StatusLogWhereUniqueInput
    update: XOR<StatusLogUpdateWithoutChangedByInput, StatusLogUncheckedUpdateWithoutChangedByInput>
    create: XOR<StatusLogCreateWithoutChangedByInput, StatusLogUncheckedCreateWithoutChangedByInput>
  }

  export type StatusLogUpdateWithWhereUniqueWithoutChangedByInput = {
    where: StatusLogWhereUniqueInput
    data: XOR<StatusLogUpdateWithoutChangedByInput, StatusLogUncheckedUpdateWithoutChangedByInput>
  }

  export type StatusLogUpdateManyWithWhereWithoutChangedByInput = {
    where: StatusLogScalarWhereInput
    data: XOR<StatusLogUpdateManyMutationInput, StatusLogUncheckedUpdateManyWithoutChangedByInput>
  }

  export type StatusLogScalarWhereInput = {
    AND?: StatusLogScalarWhereInput | StatusLogScalarWhereInput[]
    OR?: StatusLogScalarWhereInput[]
    NOT?: StatusLogScalarWhereInput | StatusLogScalarWhereInput[]
    id?: StringFilter<"StatusLog"> | string
    poleId?: StringFilter<"StatusLog"> | string
    changedById?: StringFilter<"StatusLog"> | string
    fromStatus?: EnumPoleStatusFilter<"StatusLog"> | $Enums.PoleStatus
    toStatus?: EnumPoleStatusFilter<"StatusLog"> | $Enums.PoleStatus
    changedAt?: DateTimeFilter<"StatusLog"> | Date | string
    reason?: StringNullableFilter<"StatusLog"> | string | null
  }

  export type FaultReportCreateWithoutPoleInput = {
    id?: string
    description: string
    faultType: $Enums.FaultType
    status?: $Enums.ReportStatus
    reportedAt?: Date | string
    reportedBy: UserCreateNestedOneWithoutFaultReportsInput
    workOrder?: WorkOrderCreateNestedOneWithoutFaultReportInput
  }

  export type FaultReportUncheckedCreateWithoutPoleInput = {
    id?: string
    reportedById: string
    description: string
    faultType: $Enums.FaultType
    status?: $Enums.ReportStatus
    reportedAt?: Date | string
    workOrder?: WorkOrderUncheckedCreateNestedOneWithoutFaultReportInput
  }

  export type FaultReportCreateOrConnectWithoutPoleInput = {
    where: FaultReportWhereUniqueInput
    create: XOR<FaultReportCreateWithoutPoleInput, FaultReportUncheckedCreateWithoutPoleInput>
  }

  export type FaultReportCreateManyPoleInputEnvelope = {
    data: FaultReportCreateManyPoleInput | FaultReportCreateManyPoleInput[]
    skipDuplicates?: boolean
  }

  export type StatusLogCreateWithoutPoleInput = {
    id?: string
    fromStatus: $Enums.PoleStatus
    toStatus: $Enums.PoleStatus
    changedAt?: Date | string
    reason?: string | null
    changedBy: UserCreateNestedOneWithoutStatusLogsInput
  }

  export type StatusLogUncheckedCreateWithoutPoleInput = {
    id?: string
    changedById: string
    fromStatus: $Enums.PoleStatus
    toStatus: $Enums.PoleStatus
    changedAt?: Date | string
    reason?: string | null
  }

  export type StatusLogCreateOrConnectWithoutPoleInput = {
    where: StatusLogWhereUniqueInput
    create: XOR<StatusLogCreateWithoutPoleInput, StatusLogUncheckedCreateWithoutPoleInput>
  }

  export type StatusLogCreateManyPoleInputEnvelope = {
    data: StatusLogCreateManyPoleInput | StatusLogCreateManyPoleInput[]
    skipDuplicates?: boolean
  }

  export type FaultReportUpsertWithWhereUniqueWithoutPoleInput = {
    where: FaultReportWhereUniqueInput
    update: XOR<FaultReportUpdateWithoutPoleInput, FaultReportUncheckedUpdateWithoutPoleInput>
    create: XOR<FaultReportCreateWithoutPoleInput, FaultReportUncheckedCreateWithoutPoleInput>
  }

  export type FaultReportUpdateWithWhereUniqueWithoutPoleInput = {
    where: FaultReportWhereUniqueInput
    data: XOR<FaultReportUpdateWithoutPoleInput, FaultReportUncheckedUpdateWithoutPoleInput>
  }

  export type FaultReportUpdateManyWithWhereWithoutPoleInput = {
    where: FaultReportScalarWhereInput
    data: XOR<FaultReportUpdateManyMutationInput, FaultReportUncheckedUpdateManyWithoutPoleInput>
  }

  export type StatusLogUpsertWithWhereUniqueWithoutPoleInput = {
    where: StatusLogWhereUniqueInput
    update: XOR<StatusLogUpdateWithoutPoleInput, StatusLogUncheckedUpdateWithoutPoleInput>
    create: XOR<StatusLogCreateWithoutPoleInput, StatusLogUncheckedCreateWithoutPoleInput>
  }

  export type StatusLogUpdateWithWhereUniqueWithoutPoleInput = {
    where: StatusLogWhereUniqueInput
    data: XOR<StatusLogUpdateWithoutPoleInput, StatusLogUncheckedUpdateWithoutPoleInput>
  }

  export type StatusLogUpdateManyWithWhereWithoutPoleInput = {
    where: StatusLogScalarWhereInput
    data: XOR<StatusLogUpdateManyMutationInput, StatusLogUncheckedUpdateManyWithoutPoleInput>
  }

  export type PoleCreateWithoutFaultReportsInput = {
    id?: string
    poleCode: string
    address: string
    barangay: string
    latitude: number
    longitude: number
    status?: $Enums.PoleStatus
    installedAt?: Date | string
    updatedAt?: Date | string
    statusLogs?: StatusLogCreateNestedManyWithoutPoleInput
  }

  export type PoleUncheckedCreateWithoutFaultReportsInput = {
    id?: string
    poleCode: string
    address: string
    barangay: string
    latitude: number
    longitude: number
    status?: $Enums.PoleStatus
    installedAt?: Date | string
    updatedAt?: Date | string
    statusLogs?: StatusLogUncheckedCreateNestedManyWithoutPoleInput
  }

  export type PoleCreateOrConnectWithoutFaultReportsInput = {
    where: PoleWhereUniqueInput
    create: XOR<PoleCreateWithoutFaultReportsInput, PoleUncheckedCreateWithoutFaultReportsInput>
  }

  export type UserCreateWithoutFaultReportsInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob?: Date | string | null
    gender?: string | null
    email: string
    phone: string
    passwordHash: string
    region: string
    province?: string | null
    city: string
    barangay: string
    streetAddress?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    workOrdersAssigned?: WorkOrderCreateNestedManyWithoutAssignedToInput
    workOrdersCreated?: WorkOrderCreateNestedManyWithoutAssignedByInput
    statusLogs?: StatusLogCreateNestedManyWithoutChangedByInput
  }

  export type UserUncheckedCreateWithoutFaultReportsInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob?: Date | string | null
    gender?: string | null
    email: string
    phone: string
    passwordHash: string
    region: string
    province?: string | null
    city: string
    barangay: string
    streetAddress?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    workOrdersAssigned?: WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput
    workOrdersCreated?: WorkOrderUncheckedCreateNestedManyWithoutAssignedByInput
    statusLogs?: StatusLogUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type UserCreateOrConnectWithoutFaultReportsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFaultReportsInput, UserUncheckedCreateWithoutFaultReportsInput>
  }

  export type WorkOrderCreateWithoutFaultReportInput = {
    id?: string
    status?: $Enums.WorkOrderStatus
    assignedAt?: Date | string
    resolvedAt?: Date | string | null
    resolutionNotes?: string | null
    assignedTo?: UserCreateNestedOneWithoutWorkOrdersAssignedInput
    assignedBy: UserCreateNestedOneWithoutWorkOrdersCreatedInput
  }

  export type WorkOrderUncheckedCreateWithoutFaultReportInput = {
    id?: string
    assignedToId?: string | null
    assignedById: string
    status?: $Enums.WorkOrderStatus
    assignedAt?: Date | string
    resolvedAt?: Date | string | null
    resolutionNotes?: string | null
  }

  export type WorkOrderCreateOrConnectWithoutFaultReportInput = {
    where: WorkOrderWhereUniqueInput
    create: XOR<WorkOrderCreateWithoutFaultReportInput, WorkOrderUncheckedCreateWithoutFaultReportInput>
  }

  export type PoleUpsertWithoutFaultReportsInput = {
    update: XOR<PoleUpdateWithoutFaultReportsInput, PoleUncheckedUpdateWithoutFaultReportsInput>
    create: XOR<PoleCreateWithoutFaultReportsInput, PoleUncheckedCreateWithoutFaultReportsInput>
    where?: PoleWhereInput
  }

  export type PoleUpdateToOneWithWhereWithoutFaultReportsInput = {
    where?: PoleWhereInput
    data: XOR<PoleUpdateWithoutFaultReportsInput, PoleUncheckedUpdateWithoutFaultReportsInput>
  }

  export type PoleUpdateWithoutFaultReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    poleCode?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    barangay?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    status?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statusLogs?: StatusLogUpdateManyWithoutPoleNestedInput
  }

  export type PoleUncheckedUpdateWithoutFaultReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    poleCode?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    barangay?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    status?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statusLogs?: StatusLogUncheckedUpdateManyWithoutPoleNestedInput
  }

  export type UserUpsertWithoutFaultReportsInput = {
    update: XOR<UserUpdateWithoutFaultReportsInput, UserUncheckedUpdateWithoutFaultReportsInput>
    create: XOR<UserCreateWithoutFaultReportsInput, UserUncheckedCreateWithoutFaultReportsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFaultReportsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFaultReportsInput, UserUncheckedUpdateWithoutFaultReportsInput>
  }

  export type UserUpdateWithoutFaultReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    province?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    barangay?: StringFieldUpdateOperationsInput | string
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workOrdersAssigned?: WorkOrderUpdateManyWithoutAssignedToNestedInput
    workOrdersCreated?: WorkOrderUpdateManyWithoutAssignedByNestedInput
    statusLogs?: StatusLogUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateWithoutFaultReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    province?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    barangay?: StringFieldUpdateOperationsInput | string
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workOrdersAssigned?: WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput
    workOrdersCreated?: WorkOrderUncheckedUpdateManyWithoutAssignedByNestedInput
    statusLogs?: StatusLogUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type WorkOrderUpsertWithoutFaultReportInput = {
    update: XOR<WorkOrderUpdateWithoutFaultReportInput, WorkOrderUncheckedUpdateWithoutFaultReportInput>
    create: XOR<WorkOrderCreateWithoutFaultReportInput, WorkOrderUncheckedCreateWithoutFaultReportInput>
    where?: WorkOrderWhereInput
  }

  export type WorkOrderUpdateToOneWithWhereWithoutFaultReportInput = {
    where?: WorkOrderWhereInput
    data: XOR<WorkOrderUpdateWithoutFaultReportInput, WorkOrderUncheckedUpdateWithoutFaultReportInput>
  }

  export type WorkOrderUpdateWithoutFaultReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: UserUpdateOneWithoutWorkOrdersAssignedNestedInput
    assignedBy?: UserUpdateOneRequiredWithoutWorkOrdersCreatedNestedInput
  }

  export type WorkOrderUncheckedUpdateWithoutFaultReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedById?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FaultReportCreateWithoutWorkOrderInput = {
    id?: string
    description: string
    faultType: $Enums.FaultType
    status?: $Enums.ReportStatus
    reportedAt?: Date | string
    pole: PoleCreateNestedOneWithoutFaultReportsInput
    reportedBy: UserCreateNestedOneWithoutFaultReportsInput
  }

  export type FaultReportUncheckedCreateWithoutWorkOrderInput = {
    id?: string
    poleId: string
    reportedById: string
    description: string
    faultType: $Enums.FaultType
    status?: $Enums.ReportStatus
    reportedAt?: Date | string
  }

  export type FaultReportCreateOrConnectWithoutWorkOrderInput = {
    where: FaultReportWhereUniqueInput
    create: XOR<FaultReportCreateWithoutWorkOrderInput, FaultReportUncheckedCreateWithoutWorkOrderInput>
  }

  export type UserCreateWithoutWorkOrdersAssignedInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob?: Date | string | null
    gender?: string | null
    email: string
    phone: string
    passwordHash: string
    region: string
    province?: string | null
    city: string
    barangay: string
    streetAddress?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    faultReports?: FaultReportCreateNestedManyWithoutReportedByInput
    workOrdersCreated?: WorkOrderCreateNestedManyWithoutAssignedByInput
    statusLogs?: StatusLogCreateNestedManyWithoutChangedByInput
  }

  export type UserUncheckedCreateWithoutWorkOrdersAssignedInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob?: Date | string | null
    gender?: string | null
    email: string
    phone: string
    passwordHash: string
    region: string
    province?: string | null
    city: string
    barangay: string
    streetAddress?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    faultReports?: FaultReportUncheckedCreateNestedManyWithoutReportedByInput
    workOrdersCreated?: WorkOrderUncheckedCreateNestedManyWithoutAssignedByInput
    statusLogs?: StatusLogUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type UserCreateOrConnectWithoutWorkOrdersAssignedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWorkOrdersAssignedInput, UserUncheckedCreateWithoutWorkOrdersAssignedInput>
  }

  export type UserCreateWithoutWorkOrdersCreatedInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob?: Date | string | null
    gender?: string | null
    email: string
    phone: string
    passwordHash: string
    region: string
    province?: string | null
    city: string
    barangay: string
    streetAddress?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    faultReports?: FaultReportCreateNestedManyWithoutReportedByInput
    workOrdersAssigned?: WorkOrderCreateNestedManyWithoutAssignedToInput
    statusLogs?: StatusLogCreateNestedManyWithoutChangedByInput
  }

  export type UserUncheckedCreateWithoutWorkOrdersCreatedInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob?: Date | string | null
    gender?: string | null
    email: string
    phone: string
    passwordHash: string
    region: string
    province?: string | null
    city: string
    barangay: string
    streetAddress?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    faultReports?: FaultReportUncheckedCreateNestedManyWithoutReportedByInput
    workOrdersAssigned?: WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput
    statusLogs?: StatusLogUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type UserCreateOrConnectWithoutWorkOrdersCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWorkOrdersCreatedInput, UserUncheckedCreateWithoutWorkOrdersCreatedInput>
  }

  export type FaultReportUpsertWithoutWorkOrderInput = {
    update: XOR<FaultReportUpdateWithoutWorkOrderInput, FaultReportUncheckedUpdateWithoutWorkOrderInput>
    create: XOR<FaultReportCreateWithoutWorkOrderInput, FaultReportUncheckedCreateWithoutWorkOrderInput>
    where?: FaultReportWhereInput
  }

  export type FaultReportUpdateToOneWithWhereWithoutWorkOrderInput = {
    where?: FaultReportWhereInput
    data: XOR<FaultReportUpdateWithoutWorkOrderInput, FaultReportUncheckedUpdateWithoutWorkOrderInput>
  }

  export type FaultReportUpdateWithoutWorkOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    faultType?: EnumFaultTypeFieldUpdateOperationsInput | $Enums.FaultType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    reportedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pole?: PoleUpdateOneRequiredWithoutFaultReportsNestedInput
    reportedBy?: UserUpdateOneRequiredWithoutFaultReportsNestedInput
  }

  export type FaultReportUncheckedUpdateWithoutWorkOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    poleId?: StringFieldUpdateOperationsInput | string
    reportedById?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    faultType?: EnumFaultTypeFieldUpdateOperationsInput | $Enums.FaultType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    reportedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutWorkOrdersAssignedInput = {
    update: XOR<UserUpdateWithoutWorkOrdersAssignedInput, UserUncheckedUpdateWithoutWorkOrdersAssignedInput>
    create: XOR<UserCreateWithoutWorkOrdersAssignedInput, UserUncheckedCreateWithoutWorkOrdersAssignedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWorkOrdersAssignedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWorkOrdersAssignedInput, UserUncheckedUpdateWithoutWorkOrdersAssignedInput>
  }

  export type UserUpdateWithoutWorkOrdersAssignedInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    province?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    barangay?: StringFieldUpdateOperationsInput | string
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    faultReports?: FaultReportUpdateManyWithoutReportedByNestedInput
    workOrdersCreated?: WorkOrderUpdateManyWithoutAssignedByNestedInput
    statusLogs?: StatusLogUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateWithoutWorkOrdersAssignedInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    province?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    barangay?: StringFieldUpdateOperationsInput | string
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    faultReports?: FaultReportUncheckedUpdateManyWithoutReportedByNestedInput
    workOrdersCreated?: WorkOrderUncheckedUpdateManyWithoutAssignedByNestedInput
    statusLogs?: StatusLogUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type UserUpsertWithoutWorkOrdersCreatedInput = {
    update: XOR<UserUpdateWithoutWorkOrdersCreatedInput, UserUncheckedUpdateWithoutWorkOrdersCreatedInput>
    create: XOR<UserCreateWithoutWorkOrdersCreatedInput, UserUncheckedCreateWithoutWorkOrdersCreatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWorkOrdersCreatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWorkOrdersCreatedInput, UserUncheckedUpdateWithoutWorkOrdersCreatedInput>
  }

  export type UserUpdateWithoutWorkOrdersCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    province?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    barangay?: StringFieldUpdateOperationsInput | string
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    faultReports?: FaultReportUpdateManyWithoutReportedByNestedInput
    workOrdersAssigned?: WorkOrderUpdateManyWithoutAssignedToNestedInput
    statusLogs?: StatusLogUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateWithoutWorkOrdersCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    province?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    barangay?: StringFieldUpdateOperationsInput | string
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    faultReports?: FaultReportUncheckedUpdateManyWithoutReportedByNestedInput
    workOrdersAssigned?: WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput
    statusLogs?: StatusLogUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type PoleCreateWithoutStatusLogsInput = {
    id?: string
    poleCode: string
    address: string
    barangay: string
    latitude: number
    longitude: number
    status?: $Enums.PoleStatus
    installedAt?: Date | string
    updatedAt?: Date | string
    faultReports?: FaultReportCreateNestedManyWithoutPoleInput
  }

  export type PoleUncheckedCreateWithoutStatusLogsInput = {
    id?: string
    poleCode: string
    address: string
    barangay: string
    latitude: number
    longitude: number
    status?: $Enums.PoleStatus
    installedAt?: Date | string
    updatedAt?: Date | string
    faultReports?: FaultReportUncheckedCreateNestedManyWithoutPoleInput
  }

  export type PoleCreateOrConnectWithoutStatusLogsInput = {
    where: PoleWhereUniqueInput
    create: XOR<PoleCreateWithoutStatusLogsInput, PoleUncheckedCreateWithoutStatusLogsInput>
  }

  export type UserCreateWithoutStatusLogsInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob?: Date | string | null
    gender?: string | null
    email: string
    phone: string
    passwordHash: string
    region: string
    province?: string | null
    city: string
    barangay: string
    streetAddress?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    faultReports?: FaultReportCreateNestedManyWithoutReportedByInput
    workOrdersAssigned?: WorkOrderCreateNestedManyWithoutAssignedToInput
    workOrdersCreated?: WorkOrderCreateNestedManyWithoutAssignedByInput
  }

  export type UserUncheckedCreateWithoutStatusLogsInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob?: Date | string | null
    gender?: string | null
    email: string
    phone: string
    passwordHash: string
    region: string
    province?: string | null
    city: string
    barangay: string
    streetAddress?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    faultReports?: FaultReportUncheckedCreateNestedManyWithoutReportedByInput
    workOrdersAssigned?: WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput
    workOrdersCreated?: WorkOrderUncheckedCreateNestedManyWithoutAssignedByInput
  }

  export type UserCreateOrConnectWithoutStatusLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStatusLogsInput, UserUncheckedCreateWithoutStatusLogsInput>
  }

  export type PoleUpsertWithoutStatusLogsInput = {
    update: XOR<PoleUpdateWithoutStatusLogsInput, PoleUncheckedUpdateWithoutStatusLogsInput>
    create: XOR<PoleCreateWithoutStatusLogsInput, PoleUncheckedCreateWithoutStatusLogsInput>
    where?: PoleWhereInput
  }

  export type PoleUpdateToOneWithWhereWithoutStatusLogsInput = {
    where?: PoleWhereInput
    data: XOR<PoleUpdateWithoutStatusLogsInput, PoleUncheckedUpdateWithoutStatusLogsInput>
  }

  export type PoleUpdateWithoutStatusLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    poleCode?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    barangay?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    status?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    faultReports?: FaultReportUpdateManyWithoutPoleNestedInput
  }

  export type PoleUncheckedUpdateWithoutStatusLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    poleCode?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    barangay?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    status?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    faultReports?: FaultReportUncheckedUpdateManyWithoutPoleNestedInput
  }

  export type UserUpsertWithoutStatusLogsInput = {
    update: XOR<UserUpdateWithoutStatusLogsInput, UserUncheckedUpdateWithoutStatusLogsInput>
    create: XOR<UserCreateWithoutStatusLogsInput, UserUncheckedCreateWithoutStatusLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStatusLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStatusLogsInput, UserUncheckedUpdateWithoutStatusLogsInput>
  }

  export type UserUpdateWithoutStatusLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    province?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    barangay?: StringFieldUpdateOperationsInput | string
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    faultReports?: FaultReportUpdateManyWithoutReportedByNestedInput
    workOrdersAssigned?: WorkOrderUpdateManyWithoutAssignedToNestedInput
    workOrdersCreated?: WorkOrderUpdateManyWithoutAssignedByNestedInput
  }

  export type UserUncheckedUpdateWithoutStatusLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    province?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    barangay?: StringFieldUpdateOperationsInput | string
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    faultReports?: FaultReportUncheckedUpdateManyWithoutReportedByNestedInput
    workOrdersAssigned?: WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput
    workOrdersCreated?: WorkOrderUncheckedUpdateManyWithoutAssignedByNestedInput
  }

  export type FaultReportCreateManyReportedByInput = {
    id?: string
    poleId: string
    description: string
    faultType: $Enums.FaultType
    status?: $Enums.ReportStatus
    reportedAt?: Date | string
  }

  export type WorkOrderCreateManyAssignedToInput = {
    id?: string
    faultReportId: string
    assignedById: string
    status?: $Enums.WorkOrderStatus
    assignedAt?: Date | string
    resolvedAt?: Date | string | null
    resolutionNotes?: string | null
  }

  export type WorkOrderCreateManyAssignedByInput = {
    id?: string
    faultReportId: string
    assignedToId?: string | null
    status?: $Enums.WorkOrderStatus
    assignedAt?: Date | string
    resolvedAt?: Date | string | null
    resolutionNotes?: string | null
  }

  export type StatusLogCreateManyChangedByInput = {
    id?: string
    poleId: string
    fromStatus: $Enums.PoleStatus
    toStatus: $Enums.PoleStatus
    changedAt?: Date | string
    reason?: string | null
  }

  export type FaultReportUpdateWithoutReportedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    faultType?: EnumFaultTypeFieldUpdateOperationsInput | $Enums.FaultType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    reportedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pole?: PoleUpdateOneRequiredWithoutFaultReportsNestedInput
    workOrder?: WorkOrderUpdateOneWithoutFaultReportNestedInput
  }

  export type FaultReportUncheckedUpdateWithoutReportedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    poleId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    faultType?: EnumFaultTypeFieldUpdateOperationsInput | $Enums.FaultType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    reportedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workOrder?: WorkOrderUncheckedUpdateOneWithoutFaultReportNestedInput
  }

  export type FaultReportUncheckedUpdateManyWithoutReportedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    poleId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    faultType?: EnumFaultTypeFieldUpdateOperationsInput | $Enums.FaultType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    reportedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkOrderUpdateWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    faultReport?: FaultReportUpdateOneRequiredWithoutWorkOrderNestedInput
    assignedBy?: UserUpdateOneRequiredWithoutWorkOrdersCreatedNestedInput
  }

  export type WorkOrderUncheckedUpdateWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string
    faultReportId?: StringFieldUpdateOperationsInput | string
    assignedById?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkOrderUncheckedUpdateManyWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string
    faultReportId?: StringFieldUpdateOperationsInput | string
    assignedById?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkOrderUpdateWithoutAssignedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    faultReport?: FaultReportUpdateOneRequiredWithoutWorkOrderNestedInput
    assignedTo?: UserUpdateOneWithoutWorkOrdersAssignedNestedInput
  }

  export type WorkOrderUncheckedUpdateWithoutAssignedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    faultReportId?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkOrderUncheckedUpdateManyWithoutAssignedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    faultReportId?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StatusLogUpdateWithoutChangedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    toStatus?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    pole?: PoleUpdateOneRequiredWithoutStatusLogsNestedInput
  }

  export type StatusLogUncheckedUpdateWithoutChangedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    poleId?: StringFieldUpdateOperationsInput | string
    fromStatus?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    toStatus?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StatusLogUncheckedUpdateManyWithoutChangedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    poleId?: StringFieldUpdateOperationsInput | string
    fromStatus?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    toStatus?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FaultReportCreateManyPoleInput = {
    id?: string
    reportedById: string
    description: string
    faultType: $Enums.FaultType
    status?: $Enums.ReportStatus
    reportedAt?: Date | string
  }

  export type StatusLogCreateManyPoleInput = {
    id?: string
    changedById: string
    fromStatus: $Enums.PoleStatus
    toStatus: $Enums.PoleStatus
    changedAt?: Date | string
    reason?: string | null
  }

  export type FaultReportUpdateWithoutPoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    faultType?: EnumFaultTypeFieldUpdateOperationsInput | $Enums.FaultType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    reportedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reportedBy?: UserUpdateOneRequiredWithoutFaultReportsNestedInput
    workOrder?: WorkOrderUpdateOneWithoutFaultReportNestedInput
  }

  export type FaultReportUncheckedUpdateWithoutPoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportedById?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    faultType?: EnumFaultTypeFieldUpdateOperationsInput | $Enums.FaultType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    reportedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workOrder?: WorkOrderUncheckedUpdateOneWithoutFaultReportNestedInput
  }

  export type FaultReportUncheckedUpdateManyWithoutPoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportedById?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    faultType?: EnumFaultTypeFieldUpdateOperationsInput | $Enums.FaultType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    reportedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatusLogUpdateWithoutPoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    toStatus?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    changedBy?: UserUpdateOneRequiredWithoutStatusLogsNestedInput
  }

  export type StatusLogUncheckedUpdateWithoutPoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    changedById?: StringFieldUpdateOperationsInput | string
    fromStatus?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    toStatus?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StatusLogUncheckedUpdateManyWithoutPoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    changedById?: StringFieldUpdateOperationsInput | string
    fromStatus?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    toStatus?: EnumPoleStatusFieldUpdateOperationsInput | $Enums.PoleStatus
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}