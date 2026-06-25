
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Child
 * A learner profile (the child using the app)
 */
export type Child = $Result.DefaultSelection<Prisma.$ChildPayload>
/**
 * Model DyslexiaTest
 * Дислекси шалгалтын нэг оролдлогын дэлгэрэнгүй үр дүн
 */
export type DyslexiaTest = $Result.DefaultSelection<Prisma.$DyslexiaTestPayload>
/**
 * Model Badge
 * An earned (or locked) achievement badge
 */
export type Badge = $Result.DefaultSelection<Prisma.$BadgePayload>
/**
 * Model ReadingSession
 * One reading practice session — drives the Parent dashboard stats
 */
export type ReadingSession = $Result.DefaultSelection<Prisma.$ReadingSessionPayload>
/**
 * Model Lesson
 * A reading lesson (the Reading screen)
 */
export type Lesson = $Result.DefaultSelection<Prisma.$LessonPayload>
/**
 * Model Story
 * A story in the Story World screen
 */
export type Story = $Result.DefaultSelection<Prisma.$StoryPayload>
/**
 * Model Game
 * A learning game tile
 */
export type Game = $Result.DefaultSelection<Prisma.$GamePayload>
/**
 * Model GameResult
 * Result of playing a game
 */
export type GameResult = $Result.DefaultSelection<Prisma.$GameResultPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Children
 * const children = await prisma.child.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Children
   * const children = await prisma.child.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.child`: Exposes CRUD operations for the **Child** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Children
    * const children = await prisma.child.findMany()
    * ```
    */
  get child(): Prisma.ChildDelegate<ExtArgs>;

  /**
   * `prisma.dyslexiaTest`: Exposes CRUD operations for the **DyslexiaTest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DyslexiaTests
    * const dyslexiaTests = await prisma.dyslexiaTest.findMany()
    * ```
    */
  get dyslexiaTest(): Prisma.DyslexiaTestDelegate<ExtArgs>;

  /**
   * `prisma.badge`: Exposes CRUD operations for the **Badge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Badges
    * const badges = await prisma.badge.findMany()
    * ```
    */
  get badge(): Prisma.BadgeDelegate<ExtArgs>;

  /**
   * `prisma.readingSession`: Exposes CRUD operations for the **ReadingSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReadingSessions
    * const readingSessions = await prisma.readingSession.findMany()
    * ```
    */
  get readingSession(): Prisma.ReadingSessionDelegate<ExtArgs>;

  /**
   * `prisma.lesson`: Exposes CRUD operations for the **Lesson** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lessons
    * const lessons = await prisma.lesson.findMany()
    * ```
    */
  get lesson(): Prisma.LessonDelegate<ExtArgs>;

  /**
   * `prisma.story`: Exposes CRUD operations for the **Story** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stories
    * const stories = await prisma.story.findMany()
    * ```
    */
  get story(): Prisma.StoryDelegate<ExtArgs>;

  /**
   * `prisma.game`: Exposes CRUD operations for the **Game** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Games
    * const games = await prisma.game.findMany()
    * ```
    */
  get game(): Prisma.GameDelegate<ExtArgs>;

  /**
   * `prisma.gameResult`: Exposes CRUD operations for the **GameResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameResults
    * const gameResults = await prisma.gameResult.findMany()
    * ```
    */
  get gameResult(): Prisma.GameResultDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    Child: 'Child',
    DyslexiaTest: 'DyslexiaTest',
    Badge: 'Badge',
    ReadingSession: 'ReadingSession',
    Lesson: 'Lesson',
    Story: 'Story',
    Game: 'Game',
    GameResult: 'GameResult'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "child" | "dyslexiaTest" | "badge" | "readingSession" | "lesson" | "story" | "game" | "gameResult"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Child: {
        payload: Prisma.$ChildPayload<ExtArgs>
        fields: Prisma.ChildFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChildFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChildFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          findFirst: {
            args: Prisma.ChildFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChildFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          findMany: {
            args: Prisma.ChildFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>[]
          }
          create: {
            args: Prisma.ChildCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          createMany: {
            args: Prisma.ChildCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChildCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>[]
          }
          delete: {
            args: Prisma.ChildDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          update: {
            args: Prisma.ChildUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          deleteMany: {
            args: Prisma.ChildDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChildUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ChildUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          aggregate: {
            args: Prisma.ChildAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChild>
          }
          groupBy: {
            args: Prisma.ChildGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChildGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChildCountArgs<ExtArgs>
            result: $Utils.Optional<ChildCountAggregateOutputType> | number
          }
        }
      }
      DyslexiaTest: {
        payload: Prisma.$DyslexiaTestPayload<ExtArgs>
        fields: Prisma.DyslexiaTestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DyslexiaTestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DyslexiaTestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DyslexiaTestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DyslexiaTestPayload>
          }
          findFirst: {
            args: Prisma.DyslexiaTestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DyslexiaTestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DyslexiaTestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DyslexiaTestPayload>
          }
          findMany: {
            args: Prisma.DyslexiaTestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DyslexiaTestPayload>[]
          }
          create: {
            args: Prisma.DyslexiaTestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DyslexiaTestPayload>
          }
          createMany: {
            args: Prisma.DyslexiaTestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DyslexiaTestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DyslexiaTestPayload>[]
          }
          delete: {
            args: Prisma.DyslexiaTestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DyslexiaTestPayload>
          }
          update: {
            args: Prisma.DyslexiaTestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DyslexiaTestPayload>
          }
          deleteMany: {
            args: Prisma.DyslexiaTestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DyslexiaTestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DyslexiaTestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DyslexiaTestPayload>
          }
          aggregate: {
            args: Prisma.DyslexiaTestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDyslexiaTest>
          }
          groupBy: {
            args: Prisma.DyslexiaTestGroupByArgs<ExtArgs>
            result: $Utils.Optional<DyslexiaTestGroupByOutputType>[]
          }
          count: {
            args: Prisma.DyslexiaTestCountArgs<ExtArgs>
            result: $Utils.Optional<DyslexiaTestCountAggregateOutputType> | number
          }
        }
      }
      Badge: {
        payload: Prisma.$BadgePayload<ExtArgs>
        fields: Prisma.BadgeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BadgeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BadgeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          findFirst: {
            args: Prisma.BadgeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BadgeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          findMany: {
            args: Prisma.BadgeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>[]
          }
          create: {
            args: Prisma.BadgeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          createMany: {
            args: Prisma.BadgeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BadgeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>[]
          }
          delete: {
            args: Prisma.BadgeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          update: {
            args: Prisma.BadgeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          deleteMany: {
            args: Prisma.BadgeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BadgeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BadgeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          aggregate: {
            args: Prisma.BadgeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBadge>
          }
          groupBy: {
            args: Prisma.BadgeGroupByArgs<ExtArgs>
            result: $Utils.Optional<BadgeGroupByOutputType>[]
          }
          count: {
            args: Prisma.BadgeCountArgs<ExtArgs>
            result: $Utils.Optional<BadgeCountAggregateOutputType> | number
          }
        }
      }
      ReadingSession: {
        payload: Prisma.$ReadingSessionPayload<ExtArgs>
        fields: Prisma.ReadingSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReadingSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReadingSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingSessionPayload>
          }
          findFirst: {
            args: Prisma.ReadingSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReadingSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingSessionPayload>
          }
          findMany: {
            args: Prisma.ReadingSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingSessionPayload>[]
          }
          create: {
            args: Prisma.ReadingSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingSessionPayload>
          }
          createMany: {
            args: Prisma.ReadingSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReadingSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingSessionPayload>[]
          }
          delete: {
            args: Prisma.ReadingSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingSessionPayload>
          }
          update: {
            args: Prisma.ReadingSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingSessionPayload>
          }
          deleteMany: {
            args: Prisma.ReadingSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReadingSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReadingSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingSessionPayload>
          }
          aggregate: {
            args: Prisma.ReadingSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReadingSession>
          }
          groupBy: {
            args: Prisma.ReadingSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReadingSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReadingSessionCountArgs<ExtArgs>
            result: $Utils.Optional<ReadingSessionCountAggregateOutputType> | number
          }
        }
      }
      Lesson: {
        payload: Prisma.$LessonPayload<ExtArgs>
        fields: Prisma.LessonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LessonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LessonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          findFirst: {
            args: Prisma.LessonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LessonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          findMany: {
            args: Prisma.LessonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>[]
          }
          create: {
            args: Prisma.LessonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          createMany: {
            args: Prisma.LessonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LessonCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>[]
          }
          delete: {
            args: Prisma.LessonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          update: {
            args: Prisma.LessonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          deleteMany: {
            args: Prisma.LessonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LessonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LessonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          aggregate: {
            args: Prisma.LessonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLesson>
          }
          groupBy: {
            args: Prisma.LessonGroupByArgs<ExtArgs>
            result: $Utils.Optional<LessonGroupByOutputType>[]
          }
          count: {
            args: Prisma.LessonCountArgs<ExtArgs>
            result: $Utils.Optional<LessonCountAggregateOutputType> | number
          }
        }
      }
      Story: {
        payload: Prisma.$StoryPayload<ExtArgs>
        fields: Prisma.StoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoryPayload>
          }
          findFirst: {
            args: Prisma.StoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoryPayload>
          }
          findMany: {
            args: Prisma.StoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoryPayload>[]
          }
          create: {
            args: Prisma.StoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoryPayload>
          }
          createMany: {
            args: Prisma.StoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoryPayload>[]
          }
          delete: {
            args: Prisma.StoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoryPayload>
          }
          update: {
            args: Prisma.StoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoryPayload>
          }
          deleteMany: {
            args: Prisma.StoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoryPayload>
          }
          aggregate: {
            args: Prisma.StoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStory>
          }
          groupBy: {
            args: Prisma.StoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<StoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.StoryCountArgs<ExtArgs>
            result: $Utils.Optional<StoryCountAggregateOutputType> | number
          }
        }
      }
      Game: {
        payload: Prisma.$GamePayload<ExtArgs>
        fields: Prisma.GameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findFirst: {
            args: Prisma.GameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findMany: {
            args: Prisma.GameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          create: {
            args: Prisma.GameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          createMany: {
            args: Prisma.GameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          delete: {
            args: Prisma.GameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          update: {
            args: Prisma.GameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          deleteMany: {
            args: Prisma.GameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          aggregate: {
            args: Prisma.GameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGame>
          }
          groupBy: {
            args: Prisma.GameGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameCountArgs<ExtArgs>
            result: $Utils.Optional<GameCountAggregateOutputType> | number
          }
        }
      }
      GameResult: {
        payload: Prisma.$GameResultPayload<ExtArgs>
        fields: Prisma.GameResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameResultPayload>
          }
          findFirst: {
            args: Prisma.GameResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameResultPayload>
          }
          findMany: {
            args: Prisma.GameResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameResultPayload>[]
          }
          create: {
            args: Prisma.GameResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameResultPayload>
          }
          createMany: {
            args: Prisma.GameResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameResultCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameResultPayload>[]
          }
          delete: {
            args: Prisma.GameResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameResultPayload>
          }
          update: {
            args: Prisma.GameResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameResultPayload>
          }
          deleteMany: {
            args: Prisma.GameResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GameResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameResultPayload>
          }
          aggregate: {
            args: Prisma.GameResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameResult>
          }
          groupBy: {
            args: Prisma.GameResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameResultCountArgs<ExtArgs>
            result: $Utils.Optional<GameResultCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type ChildCountOutputType
   */

  export type ChildCountOutputType = {
    badges: number
    readingSessions: number
    gameResults: number
    dyslexiaTests: number
  }

  export type ChildCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    badges?: boolean | ChildCountOutputTypeCountBadgesArgs
    readingSessions?: boolean | ChildCountOutputTypeCountReadingSessionsArgs
    gameResults?: boolean | ChildCountOutputTypeCountGameResultsArgs
    dyslexiaTests?: boolean | ChildCountOutputTypeCountDyslexiaTestsArgs
  }

  // Custom InputTypes
  /**
   * ChildCountOutputType without action
   */
  export type ChildCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChildCountOutputType
     */
    select?: ChildCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChildCountOutputType without action
   */
  export type ChildCountOutputTypeCountBadgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BadgeWhereInput
  }

  /**
   * ChildCountOutputType without action
   */
  export type ChildCountOutputTypeCountReadingSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadingSessionWhereInput
  }

  /**
   * ChildCountOutputType without action
   */
  export type ChildCountOutputTypeCountGameResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameResultWhereInput
  }

  /**
   * ChildCountOutputType without action
   */
  export type ChildCountOutputTypeCountDyslexiaTestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DyslexiaTestWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Child
   */

  export type AggregateChild = {
    _count: ChildCountAggregateOutputType | null
    _avg: ChildAvgAggregateOutputType | null
    _sum: ChildSumAggregateOutputType | null
    _min: ChildMinAggregateOutputType | null
    _max: ChildMaxAggregateOutputType | null
  }

  export type ChildAvgAggregateOutputType = {
    level: number | null
    stars: number | null
    streak: number | null
    coins: number | null
    dyslexiaScore: number | null
  }

  export type ChildSumAggregateOutputType = {
    level: number | null
    stars: number | null
    streak: number | null
    coins: number | null
    dyslexiaScore: number | null
  }

  export type ChildMinAggregateOutputType = {
    id: string | null
    clerkId: string | null
    email: string | null
    name: string | null
    avatar: string | null
    level: number | null
    title: string | null
    stars: number | null
    streak: number | null
    coins: number | null
    dyslexiaTestDone: boolean | null
    dyslexiaScore: number | null
    dyslexiaRisk: string | null
    dyslexiaTestedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChildMaxAggregateOutputType = {
    id: string | null
    clerkId: string | null
    email: string | null
    name: string | null
    avatar: string | null
    level: number | null
    title: string | null
    stars: number | null
    streak: number | null
    coins: number | null
    dyslexiaTestDone: boolean | null
    dyslexiaScore: number | null
    dyslexiaRisk: string | null
    dyslexiaTestedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChildCountAggregateOutputType = {
    id: number
    clerkId: number
    email: number
    name: number
    avatar: number
    level: number
    title: number
    stars: number
    streak: number
    coins: number
    dyslexiaTestDone: number
    dyslexiaScore: number
    dyslexiaRisk: number
    dyslexiaTestedAt: number
    dyslexiaWeakSkills: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ChildAvgAggregateInputType = {
    level?: true
    stars?: true
    streak?: true
    coins?: true
    dyslexiaScore?: true
  }

  export type ChildSumAggregateInputType = {
    level?: true
    stars?: true
    streak?: true
    coins?: true
    dyslexiaScore?: true
  }

  export type ChildMinAggregateInputType = {
    id?: true
    clerkId?: true
    email?: true
    name?: true
    avatar?: true
    level?: true
    title?: true
    stars?: true
    streak?: true
    coins?: true
    dyslexiaTestDone?: true
    dyslexiaScore?: true
    dyslexiaRisk?: true
    dyslexiaTestedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChildMaxAggregateInputType = {
    id?: true
    clerkId?: true
    email?: true
    name?: true
    avatar?: true
    level?: true
    title?: true
    stars?: true
    streak?: true
    coins?: true
    dyslexiaTestDone?: true
    dyslexiaScore?: true
    dyslexiaRisk?: true
    dyslexiaTestedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChildCountAggregateInputType = {
    id?: true
    clerkId?: true
    email?: true
    name?: true
    avatar?: true
    level?: true
    title?: true
    stars?: true
    streak?: true
    coins?: true
    dyslexiaTestDone?: true
    dyslexiaScore?: true
    dyslexiaRisk?: true
    dyslexiaTestedAt?: true
    dyslexiaWeakSkills?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChildAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Child to aggregate.
     */
    where?: ChildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Children to fetch.
     */
    orderBy?: ChildOrderByWithRelationInput | ChildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Children.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Children
    **/
    _count?: true | ChildCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChildAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChildSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChildMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChildMaxAggregateInputType
  }

  export type GetChildAggregateType<T extends ChildAggregateArgs> = {
        [P in keyof T & keyof AggregateChild]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChild[P]>
      : GetScalarType<T[P], AggregateChild[P]>
  }




  export type ChildGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChildWhereInput
    orderBy?: ChildOrderByWithAggregationInput | ChildOrderByWithAggregationInput[]
    by: ChildScalarFieldEnum[] | ChildScalarFieldEnum
    having?: ChildScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChildCountAggregateInputType | true
    _avg?: ChildAvgAggregateInputType
    _sum?: ChildSumAggregateInputType
    _min?: ChildMinAggregateInputType
    _max?: ChildMaxAggregateInputType
  }

  export type ChildGroupByOutputType = {
    id: string
    clerkId: string | null
    email: string | null
    name: string
    avatar: string
    level: number
    title: string
    stars: number
    streak: number
    coins: number
    dyslexiaTestDone: boolean
    dyslexiaScore: number | null
    dyslexiaRisk: string | null
    dyslexiaTestedAt: Date | null
    dyslexiaWeakSkills: string[]
    createdAt: Date
    updatedAt: Date
    _count: ChildCountAggregateOutputType | null
    _avg: ChildAvgAggregateOutputType | null
    _sum: ChildSumAggregateOutputType | null
    _min: ChildMinAggregateOutputType | null
    _max: ChildMaxAggregateOutputType | null
  }

  type GetChildGroupByPayload<T extends ChildGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChildGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChildGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChildGroupByOutputType[P]>
            : GetScalarType<T[P], ChildGroupByOutputType[P]>
        }
      >
    >


  export type ChildSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    email?: boolean
    name?: boolean
    avatar?: boolean
    level?: boolean
    title?: boolean
    stars?: boolean
    streak?: boolean
    coins?: boolean
    dyslexiaTestDone?: boolean
    dyslexiaScore?: boolean
    dyslexiaRisk?: boolean
    dyslexiaTestedAt?: boolean
    dyslexiaWeakSkills?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    badges?: boolean | Child$badgesArgs<ExtArgs>
    readingSessions?: boolean | Child$readingSessionsArgs<ExtArgs>
    gameResults?: boolean | Child$gameResultsArgs<ExtArgs>
    dyslexiaTests?: boolean | Child$dyslexiaTestsArgs<ExtArgs>
    _count?: boolean | ChildCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["child"]>

  export type ChildSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    email?: boolean
    name?: boolean
    avatar?: boolean
    level?: boolean
    title?: boolean
    stars?: boolean
    streak?: boolean
    coins?: boolean
    dyslexiaTestDone?: boolean
    dyslexiaScore?: boolean
    dyslexiaRisk?: boolean
    dyslexiaTestedAt?: boolean
    dyslexiaWeakSkills?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["child"]>

  export type ChildSelectScalar = {
    id?: boolean
    clerkId?: boolean
    email?: boolean
    name?: boolean
    avatar?: boolean
    level?: boolean
    title?: boolean
    stars?: boolean
    streak?: boolean
    coins?: boolean
    dyslexiaTestDone?: boolean
    dyslexiaScore?: boolean
    dyslexiaRisk?: boolean
    dyslexiaTestedAt?: boolean
    dyslexiaWeakSkills?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ChildInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    badges?: boolean | Child$badgesArgs<ExtArgs>
    readingSessions?: boolean | Child$readingSessionsArgs<ExtArgs>
    gameResults?: boolean | Child$gameResultsArgs<ExtArgs>
    dyslexiaTests?: boolean | Child$dyslexiaTestsArgs<ExtArgs>
    _count?: boolean | ChildCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChildIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ChildPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Child"
    objects: {
      badges: Prisma.$BadgePayload<ExtArgs>[]
      readingSessions: Prisma.$ReadingSessionPayload<ExtArgs>[]
      gameResults: Prisma.$GameResultPayload<ExtArgs>[]
      dyslexiaTests: Prisma.$DyslexiaTestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clerkId: string | null
      email: string | null
      name: string
      avatar: string
      level: number
      title: string
      stars: number
      streak: number
      coins: number
      dyslexiaTestDone: boolean
      dyslexiaScore: number | null
      dyslexiaRisk: string | null
      dyslexiaTestedAt: Date | null
      dyslexiaWeakSkills: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["child"]>
    composites: {}
  }

  type ChildGetPayload<S extends boolean | null | undefined | ChildDefaultArgs> = $Result.GetResult<Prisma.$ChildPayload, S>

  type ChildCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ChildFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ChildCountAggregateInputType | true
    }

  export interface ChildDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Child'], meta: { name: 'Child' } }
    /**
     * Find zero or one Child that matches the filter.
     * @param {ChildFindUniqueArgs} args - Arguments to find a Child
     * @example
     * // Get one Child
     * const child = await prisma.child.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChildFindUniqueArgs>(args: SelectSubset<T, ChildFindUniqueArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Child that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ChildFindUniqueOrThrowArgs} args - Arguments to find a Child
     * @example
     * // Get one Child
     * const child = await prisma.child.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChildFindUniqueOrThrowArgs>(args: SelectSubset<T, ChildFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Child that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildFindFirstArgs} args - Arguments to find a Child
     * @example
     * // Get one Child
     * const child = await prisma.child.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChildFindFirstArgs>(args?: SelectSubset<T, ChildFindFirstArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Child that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildFindFirstOrThrowArgs} args - Arguments to find a Child
     * @example
     * // Get one Child
     * const child = await prisma.child.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChildFindFirstOrThrowArgs>(args?: SelectSubset<T, ChildFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Children that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Children
     * const children = await prisma.child.findMany()
     * 
     * // Get first 10 Children
     * const children = await prisma.child.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const childWithIdOnly = await prisma.child.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChildFindManyArgs>(args?: SelectSubset<T, ChildFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Child.
     * @param {ChildCreateArgs} args - Arguments to create a Child.
     * @example
     * // Create one Child
     * const Child = await prisma.child.create({
     *   data: {
     *     // ... data to create a Child
     *   }
     * })
     * 
     */
    create<T extends ChildCreateArgs>(args: SelectSubset<T, ChildCreateArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Children.
     * @param {ChildCreateManyArgs} args - Arguments to create many Children.
     * @example
     * // Create many Children
     * const child = await prisma.child.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChildCreateManyArgs>(args?: SelectSubset<T, ChildCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Children and returns the data saved in the database.
     * @param {ChildCreateManyAndReturnArgs} args - Arguments to create many Children.
     * @example
     * // Create many Children
     * const child = await prisma.child.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Children and only return the `id`
     * const childWithIdOnly = await prisma.child.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChildCreateManyAndReturnArgs>(args?: SelectSubset<T, ChildCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Child.
     * @param {ChildDeleteArgs} args - Arguments to delete one Child.
     * @example
     * // Delete one Child
     * const Child = await prisma.child.delete({
     *   where: {
     *     // ... filter to delete one Child
     *   }
     * })
     * 
     */
    delete<T extends ChildDeleteArgs>(args: SelectSubset<T, ChildDeleteArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Child.
     * @param {ChildUpdateArgs} args - Arguments to update one Child.
     * @example
     * // Update one Child
     * const child = await prisma.child.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChildUpdateArgs>(args: SelectSubset<T, ChildUpdateArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Children.
     * @param {ChildDeleteManyArgs} args - Arguments to filter Children to delete.
     * @example
     * // Delete a few Children
     * const { count } = await prisma.child.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChildDeleteManyArgs>(args?: SelectSubset<T, ChildDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Children.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Children
     * const child = await prisma.child.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChildUpdateManyArgs>(args: SelectSubset<T, ChildUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Child.
     * @param {ChildUpsertArgs} args - Arguments to update or create a Child.
     * @example
     * // Update or create a Child
     * const child = await prisma.child.upsert({
     *   create: {
     *     // ... data to create a Child
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Child we want to update
     *   }
     * })
     */
    upsert<T extends ChildUpsertArgs>(args: SelectSubset<T, ChildUpsertArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Children.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildCountArgs} args - Arguments to filter Children to count.
     * @example
     * // Count the number of Children
     * const count = await prisma.child.count({
     *   where: {
     *     // ... the filter for the Children we want to count
     *   }
     * })
    **/
    count<T extends ChildCountArgs>(
      args?: Subset<T, ChildCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChildCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Child.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChildAggregateArgs>(args: Subset<T, ChildAggregateArgs>): Prisma.PrismaPromise<GetChildAggregateType<T>>

    /**
     * Group by Child.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildGroupByArgs} args - Group by arguments.
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
      T extends ChildGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChildGroupByArgs['orderBy'] }
        : { orderBy?: ChildGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ChildGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChildGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Child model
   */
  readonly fields: ChildFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Child.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChildClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    badges<T extends Child$badgesArgs<ExtArgs> = {}>(args?: Subset<T, Child$badgesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findMany"> | Null>
    readingSessions<T extends Child$readingSessionsArgs<ExtArgs> = {}>(args?: Subset<T, Child$readingSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingSessionPayload<ExtArgs>, T, "findMany"> | Null>
    gameResults<T extends Child$gameResultsArgs<ExtArgs> = {}>(args?: Subset<T, Child$gameResultsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "findMany"> | Null>
    dyslexiaTests<T extends Child$dyslexiaTestsArgs<ExtArgs> = {}>(args?: Subset<T, Child$dyslexiaTestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DyslexiaTestPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Child model
   */ 
  interface ChildFieldRefs {
    readonly id: FieldRef<"Child", 'String'>
    readonly clerkId: FieldRef<"Child", 'String'>
    readonly email: FieldRef<"Child", 'String'>
    readonly name: FieldRef<"Child", 'String'>
    readonly avatar: FieldRef<"Child", 'String'>
    readonly level: FieldRef<"Child", 'Int'>
    readonly title: FieldRef<"Child", 'String'>
    readonly stars: FieldRef<"Child", 'Int'>
    readonly streak: FieldRef<"Child", 'Int'>
    readonly coins: FieldRef<"Child", 'Int'>
    readonly dyslexiaTestDone: FieldRef<"Child", 'Boolean'>
    readonly dyslexiaScore: FieldRef<"Child", 'Int'>
    readonly dyslexiaRisk: FieldRef<"Child", 'String'>
    readonly dyslexiaTestedAt: FieldRef<"Child", 'DateTime'>
    readonly dyslexiaWeakSkills: FieldRef<"Child", 'String[]'>
    readonly createdAt: FieldRef<"Child", 'DateTime'>
    readonly updatedAt: FieldRef<"Child", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Child findUnique
   */
  export type ChildFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter, which Child to fetch.
     */
    where: ChildWhereUniqueInput
  }

  /**
   * Child findUniqueOrThrow
   */
  export type ChildFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter, which Child to fetch.
     */
    where: ChildWhereUniqueInput
  }

  /**
   * Child findFirst
   */
  export type ChildFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter, which Child to fetch.
     */
    where?: ChildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Children to fetch.
     */
    orderBy?: ChildOrderByWithRelationInput | ChildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Children.
     */
    cursor?: ChildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Children.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Children.
     */
    distinct?: ChildScalarFieldEnum | ChildScalarFieldEnum[]
  }

  /**
   * Child findFirstOrThrow
   */
  export type ChildFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter, which Child to fetch.
     */
    where?: ChildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Children to fetch.
     */
    orderBy?: ChildOrderByWithRelationInput | ChildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Children.
     */
    cursor?: ChildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Children.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Children.
     */
    distinct?: ChildScalarFieldEnum | ChildScalarFieldEnum[]
  }

  /**
   * Child findMany
   */
  export type ChildFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter, which Children to fetch.
     */
    where?: ChildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Children to fetch.
     */
    orderBy?: ChildOrderByWithRelationInput | ChildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Children.
     */
    cursor?: ChildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Children.
     */
    skip?: number
    distinct?: ChildScalarFieldEnum | ChildScalarFieldEnum[]
  }

  /**
   * Child create
   */
  export type ChildCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * The data needed to create a Child.
     */
    data: XOR<ChildCreateInput, ChildUncheckedCreateInput>
  }

  /**
   * Child createMany
   */
  export type ChildCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Children.
     */
    data: ChildCreateManyInput | ChildCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Child createManyAndReturn
   */
  export type ChildCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Children.
     */
    data: ChildCreateManyInput | ChildCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Child update
   */
  export type ChildUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * The data needed to update a Child.
     */
    data: XOR<ChildUpdateInput, ChildUncheckedUpdateInput>
    /**
     * Choose, which Child to update.
     */
    where: ChildWhereUniqueInput
  }

  /**
   * Child updateMany
   */
  export type ChildUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Children.
     */
    data: XOR<ChildUpdateManyMutationInput, ChildUncheckedUpdateManyInput>
    /**
     * Filter which Children to update
     */
    where?: ChildWhereInput
  }

  /**
   * Child upsert
   */
  export type ChildUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * The filter to search for the Child to update in case it exists.
     */
    where: ChildWhereUniqueInput
    /**
     * In case the Child found by the `where` argument doesn't exist, create a new Child with this data.
     */
    create: XOR<ChildCreateInput, ChildUncheckedCreateInput>
    /**
     * In case the Child was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChildUpdateInput, ChildUncheckedUpdateInput>
  }

  /**
   * Child delete
   */
  export type ChildDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter which Child to delete.
     */
    where: ChildWhereUniqueInput
  }

  /**
   * Child deleteMany
   */
  export type ChildDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Children to delete
     */
    where?: ChildWhereInput
  }

  /**
   * Child.badges
   */
  export type Child$badgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    where?: BadgeWhereInput
    orderBy?: BadgeOrderByWithRelationInput | BadgeOrderByWithRelationInput[]
    cursor?: BadgeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BadgeScalarFieldEnum | BadgeScalarFieldEnum[]
  }

  /**
   * Child.readingSessions
   */
  export type Child$readingSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingSession
     */
    select?: ReadingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingSessionInclude<ExtArgs> | null
    where?: ReadingSessionWhereInput
    orderBy?: ReadingSessionOrderByWithRelationInput | ReadingSessionOrderByWithRelationInput[]
    cursor?: ReadingSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReadingSessionScalarFieldEnum | ReadingSessionScalarFieldEnum[]
  }

  /**
   * Child.gameResults
   */
  export type Child$gameResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    where?: GameResultWhereInput
    orderBy?: GameResultOrderByWithRelationInput | GameResultOrderByWithRelationInput[]
    cursor?: GameResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameResultScalarFieldEnum | GameResultScalarFieldEnum[]
  }

  /**
   * Child.dyslexiaTests
   */
  export type Child$dyslexiaTestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DyslexiaTest
     */
    select?: DyslexiaTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DyslexiaTestInclude<ExtArgs> | null
    where?: DyslexiaTestWhereInput
    orderBy?: DyslexiaTestOrderByWithRelationInput | DyslexiaTestOrderByWithRelationInput[]
    cursor?: DyslexiaTestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DyslexiaTestScalarFieldEnum | DyslexiaTestScalarFieldEnum[]
  }

  /**
   * Child without action
   */
  export type ChildDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
  }


  /**
   * Model DyslexiaTest
   */

  export type AggregateDyslexiaTest = {
    _count: DyslexiaTestCountAggregateOutputType | null
    _avg: DyslexiaTestAvgAggregateOutputType | null
    _sum: DyslexiaTestSumAggregateOutputType | null
    _min: DyslexiaTestMinAggregateOutputType | null
    _max: DyslexiaTestMaxAggregateOutputType | null
  }

  export type DyslexiaTestAvgAggregateOutputType = {
    score: number | null
  }

  export type DyslexiaTestSumAggregateOutputType = {
    score: number | null
  }

  export type DyslexiaTestMinAggregateOutputType = {
    id: string | null
    score: number | null
    risk: string | null
    createdAt: Date | null
    childId: string | null
  }

  export type DyslexiaTestMaxAggregateOutputType = {
    id: string | null
    score: number | null
    risk: string | null
    createdAt: Date | null
    childId: string | null
  }

  export type DyslexiaTestCountAggregateOutputType = {
    id: number
    score: number
    risk: number
    answers: number
    weakSkills: number
    createdAt: number
    childId: number
    _all: number
  }


  export type DyslexiaTestAvgAggregateInputType = {
    score?: true
  }

  export type DyslexiaTestSumAggregateInputType = {
    score?: true
  }

  export type DyslexiaTestMinAggregateInputType = {
    id?: true
    score?: true
    risk?: true
    createdAt?: true
    childId?: true
  }

  export type DyslexiaTestMaxAggregateInputType = {
    id?: true
    score?: true
    risk?: true
    createdAt?: true
    childId?: true
  }

  export type DyslexiaTestCountAggregateInputType = {
    id?: true
    score?: true
    risk?: true
    answers?: true
    weakSkills?: true
    createdAt?: true
    childId?: true
    _all?: true
  }

  export type DyslexiaTestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DyslexiaTest to aggregate.
     */
    where?: DyslexiaTestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DyslexiaTests to fetch.
     */
    orderBy?: DyslexiaTestOrderByWithRelationInput | DyslexiaTestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DyslexiaTestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DyslexiaTests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DyslexiaTests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DyslexiaTests
    **/
    _count?: true | DyslexiaTestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DyslexiaTestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DyslexiaTestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DyslexiaTestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DyslexiaTestMaxAggregateInputType
  }

  export type GetDyslexiaTestAggregateType<T extends DyslexiaTestAggregateArgs> = {
        [P in keyof T & keyof AggregateDyslexiaTest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDyslexiaTest[P]>
      : GetScalarType<T[P], AggregateDyslexiaTest[P]>
  }




  export type DyslexiaTestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DyslexiaTestWhereInput
    orderBy?: DyslexiaTestOrderByWithAggregationInput | DyslexiaTestOrderByWithAggregationInput[]
    by: DyslexiaTestScalarFieldEnum[] | DyslexiaTestScalarFieldEnum
    having?: DyslexiaTestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DyslexiaTestCountAggregateInputType | true
    _avg?: DyslexiaTestAvgAggregateInputType
    _sum?: DyslexiaTestSumAggregateInputType
    _min?: DyslexiaTestMinAggregateInputType
    _max?: DyslexiaTestMaxAggregateInputType
  }

  export type DyslexiaTestGroupByOutputType = {
    id: string
    score: number
    risk: string
    answers: JsonValue
    weakSkills: string[]
    createdAt: Date
    childId: string
    _count: DyslexiaTestCountAggregateOutputType | null
    _avg: DyslexiaTestAvgAggregateOutputType | null
    _sum: DyslexiaTestSumAggregateOutputType | null
    _min: DyslexiaTestMinAggregateOutputType | null
    _max: DyslexiaTestMaxAggregateOutputType | null
  }

  type GetDyslexiaTestGroupByPayload<T extends DyslexiaTestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DyslexiaTestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DyslexiaTestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DyslexiaTestGroupByOutputType[P]>
            : GetScalarType<T[P], DyslexiaTestGroupByOutputType[P]>
        }
      >
    >


  export type DyslexiaTestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    score?: boolean
    risk?: boolean
    answers?: boolean
    weakSkills?: boolean
    createdAt?: boolean
    childId?: boolean
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dyslexiaTest"]>

  export type DyslexiaTestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    score?: boolean
    risk?: boolean
    answers?: boolean
    weakSkills?: boolean
    createdAt?: boolean
    childId?: boolean
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dyslexiaTest"]>

  export type DyslexiaTestSelectScalar = {
    id?: boolean
    score?: boolean
    risk?: boolean
    answers?: boolean
    weakSkills?: boolean
    createdAt?: boolean
    childId?: boolean
  }

  export type DyslexiaTestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }
  export type DyslexiaTestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }

  export type $DyslexiaTestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DyslexiaTest"
    objects: {
      child: Prisma.$ChildPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      score: number
      risk: string
      answers: Prisma.JsonValue
      weakSkills: string[]
      createdAt: Date
      childId: string
    }, ExtArgs["result"]["dyslexiaTest"]>
    composites: {}
  }

  type DyslexiaTestGetPayload<S extends boolean | null | undefined | DyslexiaTestDefaultArgs> = $Result.GetResult<Prisma.$DyslexiaTestPayload, S>

  type DyslexiaTestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DyslexiaTestFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DyslexiaTestCountAggregateInputType | true
    }

  export interface DyslexiaTestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DyslexiaTest'], meta: { name: 'DyslexiaTest' } }
    /**
     * Find zero or one DyslexiaTest that matches the filter.
     * @param {DyslexiaTestFindUniqueArgs} args - Arguments to find a DyslexiaTest
     * @example
     * // Get one DyslexiaTest
     * const dyslexiaTest = await prisma.dyslexiaTest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DyslexiaTestFindUniqueArgs>(args: SelectSubset<T, DyslexiaTestFindUniqueArgs<ExtArgs>>): Prisma__DyslexiaTestClient<$Result.GetResult<Prisma.$DyslexiaTestPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DyslexiaTest that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DyslexiaTestFindUniqueOrThrowArgs} args - Arguments to find a DyslexiaTest
     * @example
     * // Get one DyslexiaTest
     * const dyslexiaTest = await prisma.dyslexiaTest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DyslexiaTestFindUniqueOrThrowArgs>(args: SelectSubset<T, DyslexiaTestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DyslexiaTestClient<$Result.GetResult<Prisma.$DyslexiaTestPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DyslexiaTest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DyslexiaTestFindFirstArgs} args - Arguments to find a DyslexiaTest
     * @example
     * // Get one DyslexiaTest
     * const dyslexiaTest = await prisma.dyslexiaTest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DyslexiaTestFindFirstArgs>(args?: SelectSubset<T, DyslexiaTestFindFirstArgs<ExtArgs>>): Prisma__DyslexiaTestClient<$Result.GetResult<Prisma.$DyslexiaTestPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DyslexiaTest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DyslexiaTestFindFirstOrThrowArgs} args - Arguments to find a DyslexiaTest
     * @example
     * // Get one DyslexiaTest
     * const dyslexiaTest = await prisma.dyslexiaTest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DyslexiaTestFindFirstOrThrowArgs>(args?: SelectSubset<T, DyslexiaTestFindFirstOrThrowArgs<ExtArgs>>): Prisma__DyslexiaTestClient<$Result.GetResult<Prisma.$DyslexiaTestPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DyslexiaTests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DyslexiaTestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DyslexiaTests
     * const dyslexiaTests = await prisma.dyslexiaTest.findMany()
     * 
     * // Get first 10 DyslexiaTests
     * const dyslexiaTests = await prisma.dyslexiaTest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dyslexiaTestWithIdOnly = await prisma.dyslexiaTest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DyslexiaTestFindManyArgs>(args?: SelectSubset<T, DyslexiaTestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DyslexiaTestPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DyslexiaTest.
     * @param {DyslexiaTestCreateArgs} args - Arguments to create a DyslexiaTest.
     * @example
     * // Create one DyslexiaTest
     * const DyslexiaTest = await prisma.dyslexiaTest.create({
     *   data: {
     *     // ... data to create a DyslexiaTest
     *   }
     * })
     * 
     */
    create<T extends DyslexiaTestCreateArgs>(args: SelectSubset<T, DyslexiaTestCreateArgs<ExtArgs>>): Prisma__DyslexiaTestClient<$Result.GetResult<Prisma.$DyslexiaTestPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DyslexiaTests.
     * @param {DyslexiaTestCreateManyArgs} args - Arguments to create many DyslexiaTests.
     * @example
     * // Create many DyslexiaTests
     * const dyslexiaTest = await prisma.dyslexiaTest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DyslexiaTestCreateManyArgs>(args?: SelectSubset<T, DyslexiaTestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DyslexiaTests and returns the data saved in the database.
     * @param {DyslexiaTestCreateManyAndReturnArgs} args - Arguments to create many DyslexiaTests.
     * @example
     * // Create many DyslexiaTests
     * const dyslexiaTest = await prisma.dyslexiaTest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DyslexiaTests and only return the `id`
     * const dyslexiaTestWithIdOnly = await prisma.dyslexiaTest.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DyslexiaTestCreateManyAndReturnArgs>(args?: SelectSubset<T, DyslexiaTestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DyslexiaTestPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DyslexiaTest.
     * @param {DyslexiaTestDeleteArgs} args - Arguments to delete one DyslexiaTest.
     * @example
     * // Delete one DyslexiaTest
     * const DyslexiaTest = await prisma.dyslexiaTest.delete({
     *   where: {
     *     // ... filter to delete one DyslexiaTest
     *   }
     * })
     * 
     */
    delete<T extends DyslexiaTestDeleteArgs>(args: SelectSubset<T, DyslexiaTestDeleteArgs<ExtArgs>>): Prisma__DyslexiaTestClient<$Result.GetResult<Prisma.$DyslexiaTestPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DyslexiaTest.
     * @param {DyslexiaTestUpdateArgs} args - Arguments to update one DyslexiaTest.
     * @example
     * // Update one DyslexiaTest
     * const dyslexiaTest = await prisma.dyslexiaTest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DyslexiaTestUpdateArgs>(args: SelectSubset<T, DyslexiaTestUpdateArgs<ExtArgs>>): Prisma__DyslexiaTestClient<$Result.GetResult<Prisma.$DyslexiaTestPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DyslexiaTests.
     * @param {DyslexiaTestDeleteManyArgs} args - Arguments to filter DyslexiaTests to delete.
     * @example
     * // Delete a few DyslexiaTests
     * const { count } = await prisma.dyslexiaTest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DyslexiaTestDeleteManyArgs>(args?: SelectSubset<T, DyslexiaTestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DyslexiaTests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DyslexiaTestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DyslexiaTests
     * const dyslexiaTest = await prisma.dyslexiaTest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DyslexiaTestUpdateManyArgs>(args: SelectSubset<T, DyslexiaTestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DyslexiaTest.
     * @param {DyslexiaTestUpsertArgs} args - Arguments to update or create a DyslexiaTest.
     * @example
     * // Update or create a DyslexiaTest
     * const dyslexiaTest = await prisma.dyslexiaTest.upsert({
     *   create: {
     *     // ... data to create a DyslexiaTest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DyslexiaTest we want to update
     *   }
     * })
     */
    upsert<T extends DyslexiaTestUpsertArgs>(args: SelectSubset<T, DyslexiaTestUpsertArgs<ExtArgs>>): Prisma__DyslexiaTestClient<$Result.GetResult<Prisma.$DyslexiaTestPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DyslexiaTests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DyslexiaTestCountArgs} args - Arguments to filter DyslexiaTests to count.
     * @example
     * // Count the number of DyslexiaTests
     * const count = await prisma.dyslexiaTest.count({
     *   where: {
     *     // ... the filter for the DyslexiaTests we want to count
     *   }
     * })
    **/
    count<T extends DyslexiaTestCountArgs>(
      args?: Subset<T, DyslexiaTestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DyslexiaTestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DyslexiaTest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DyslexiaTestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DyslexiaTestAggregateArgs>(args: Subset<T, DyslexiaTestAggregateArgs>): Prisma.PrismaPromise<GetDyslexiaTestAggregateType<T>>

    /**
     * Group by DyslexiaTest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DyslexiaTestGroupByArgs} args - Group by arguments.
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
      T extends DyslexiaTestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DyslexiaTestGroupByArgs['orderBy'] }
        : { orderBy?: DyslexiaTestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DyslexiaTestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDyslexiaTestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DyslexiaTest model
   */
  readonly fields: DyslexiaTestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DyslexiaTest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DyslexiaTestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    child<T extends ChildDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChildDefaultArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the DyslexiaTest model
   */ 
  interface DyslexiaTestFieldRefs {
    readonly id: FieldRef<"DyslexiaTest", 'String'>
    readonly score: FieldRef<"DyslexiaTest", 'Int'>
    readonly risk: FieldRef<"DyslexiaTest", 'String'>
    readonly answers: FieldRef<"DyslexiaTest", 'Json'>
    readonly weakSkills: FieldRef<"DyslexiaTest", 'String[]'>
    readonly createdAt: FieldRef<"DyslexiaTest", 'DateTime'>
    readonly childId: FieldRef<"DyslexiaTest", 'String'>
  }
    

  // Custom InputTypes
  /**
   * DyslexiaTest findUnique
   */
  export type DyslexiaTestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DyslexiaTest
     */
    select?: DyslexiaTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DyslexiaTestInclude<ExtArgs> | null
    /**
     * Filter, which DyslexiaTest to fetch.
     */
    where: DyslexiaTestWhereUniqueInput
  }

  /**
   * DyslexiaTest findUniqueOrThrow
   */
  export type DyslexiaTestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DyslexiaTest
     */
    select?: DyslexiaTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DyslexiaTestInclude<ExtArgs> | null
    /**
     * Filter, which DyslexiaTest to fetch.
     */
    where: DyslexiaTestWhereUniqueInput
  }

  /**
   * DyslexiaTest findFirst
   */
  export type DyslexiaTestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DyslexiaTest
     */
    select?: DyslexiaTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DyslexiaTestInclude<ExtArgs> | null
    /**
     * Filter, which DyslexiaTest to fetch.
     */
    where?: DyslexiaTestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DyslexiaTests to fetch.
     */
    orderBy?: DyslexiaTestOrderByWithRelationInput | DyslexiaTestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DyslexiaTests.
     */
    cursor?: DyslexiaTestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DyslexiaTests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DyslexiaTests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DyslexiaTests.
     */
    distinct?: DyslexiaTestScalarFieldEnum | DyslexiaTestScalarFieldEnum[]
  }

  /**
   * DyslexiaTest findFirstOrThrow
   */
  export type DyslexiaTestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DyslexiaTest
     */
    select?: DyslexiaTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DyslexiaTestInclude<ExtArgs> | null
    /**
     * Filter, which DyslexiaTest to fetch.
     */
    where?: DyslexiaTestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DyslexiaTests to fetch.
     */
    orderBy?: DyslexiaTestOrderByWithRelationInput | DyslexiaTestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DyslexiaTests.
     */
    cursor?: DyslexiaTestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DyslexiaTests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DyslexiaTests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DyslexiaTests.
     */
    distinct?: DyslexiaTestScalarFieldEnum | DyslexiaTestScalarFieldEnum[]
  }

  /**
   * DyslexiaTest findMany
   */
  export type DyslexiaTestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DyslexiaTest
     */
    select?: DyslexiaTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DyslexiaTestInclude<ExtArgs> | null
    /**
     * Filter, which DyslexiaTests to fetch.
     */
    where?: DyslexiaTestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DyslexiaTests to fetch.
     */
    orderBy?: DyslexiaTestOrderByWithRelationInput | DyslexiaTestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DyslexiaTests.
     */
    cursor?: DyslexiaTestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DyslexiaTests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DyslexiaTests.
     */
    skip?: number
    distinct?: DyslexiaTestScalarFieldEnum | DyslexiaTestScalarFieldEnum[]
  }

  /**
   * DyslexiaTest create
   */
  export type DyslexiaTestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DyslexiaTest
     */
    select?: DyslexiaTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DyslexiaTestInclude<ExtArgs> | null
    /**
     * The data needed to create a DyslexiaTest.
     */
    data: XOR<DyslexiaTestCreateInput, DyslexiaTestUncheckedCreateInput>
  }

  /**
   * DyslexiaTest createMany
   */
  export type DyslexiaTestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DyslexiaTests.
     */
    data: DyslexiaTestCreateManyInput | DyslexiaTestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DyslexiaTest createManyAndReturn
   */
  export type DyslexiaTestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DyslexiaTest
     */
    select?: DyslexiaTestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DyslexiaTests.
     */
    data: DyslexiaTestCreateManyInput | DyslexiaTestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DyslexiaTestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DyslexiaTest update
   */
  export type DyslexiaTestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DyslexiaTest
     */
    select?: DyslexiaTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DyslexiaTestInclude<ExtArgs> | null
    /**
     * The data needed to update a DyslexiaTest.
     */
    data: XOR<DyslexiaTestUpdateInput, DyslexiaTestUncheckedUpdateInput>
    /**
     * Choose, which DyslexiaTest to update.
     */
    where: DyslexiaTestWhereUniqueInput
  }

  /**
   * DyslexiaTest updateMany
   */
  export type DyslexiaTestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DyslexiaTests.
     */
    data: XOR<DyslexiaTestUpdateManyMutationInput, DyslexiaTestUncheckedUpdateManyInput>
    /**
     * Filter which DyslexiaTests to update
     */
    where?: DyslexiaTestWhereInput
  }

  /**
   * DyslexiaTest upsert
   */
  export type DyslexiaTestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DyslexiaTest
     */
    select?: DyslexiaTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DyslexiaTestInclude<ExtArgs> | null
    /**
     * The filter to search for the DyslexiaTest to update in case it exists.
     */
    where: DyslexiaTestWhereUniqueInput
    /**
     * In case the DyslexiaTest found by the `where` argument doesn't exist, create a new DyslexiaTest with this data.
     */
    create: XOR<DyslexiaTestCreateInput, DyslexiaTestUncheckedCreateInput>
    /**
     * In case the DyslexiaTest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DyslexiaTestUpdateInput, DyslexiaTestUncheckedUpdateInput>
  }

  /**
   * DyslexiaTest delete
   */
  export type DyslexiaTestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DyslexiaTest
     */
    select?: DyslexiaTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DyslexiaTestInclude<ExtArgs> | null
    /**
     * Filter which DyslexiaTest to delete.
     */
    where: DyslexiaTestWhereUniqueInput
  }

  /**
   * DyslexiaTest deleteMany
   */
  export type DyslexiaTestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DyslexiaTests to delete
     */
    where?: DyslexiaTestWhereInput
  }

  /**
   * DyslexiaTest without action
   */
  export type DyslexiaTestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DyslexiaTest
     */
    select?: DyslexiaTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DyslexiaTestInclude<ExtArgs> | null
  }


  /**
   * Model Badge
   */

  export type AggregateBadge = {
    _count: BadgeCountAggregateOutputType | null
    _min: BadgeMinAggregateOutputType | null
    _max: BadgeMaxAggregateOutputType | null
  }

  export type BadgeMinAggregateOutputType = {
    id: string | null
    key: string | null
    label: string | null
    emoji: string | null
    unlocked: boolean | null
    childId: string | null
  }

  export type BadgeMaxAggregateOutputType = {
    id: string | null
    key: string | null
    label: string | null
    emoji: string | null
    unlocked: boolean | null
    childId: string | null
  }

  export type BadgeCountAggregateOutputType = {
    id: number
    key: number
    label: number
    emoji: number
    unlocked: number
    childId: number
    _all: number
  }


  export type BadgeMinAggregateInputType = {
    id?: true
    key?: true
    label?: true
    emoji?: true
    unlocked?: true
    childId?: true
  }

  export type BadgeMaxAggregateInputType = {
    id?: true
    key?: true
    label?: true
    emoji?: true
    unlocked?: true
    childId?: true
  }

  export type BadgeCountAggregateInputType = {
    id?: true
    key?: true
    label?: true
    emoji?: true
    unlocked?: true
    childId?: true
    _all?: true
  }

  export type BadgeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Badge to aggregate.
     */
    where?: BadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Badges to fetch.
     */
    orderBy?: BadgeOrderByWithRelationInput | BadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Badges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Badges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Badges
    **/
    _count?: true | BadgeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BadgeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BadgeMaxAggregateInputType
  }

  export type GetBadgeAggregateType<T extends BadgeAggregateArgs> = {
        [P in keyof T & keyof AggregateBadge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBadge[P]>
      : GetScalarType<T[P], AggregateBadge[P]>
  }




  export type BadgeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BadgeWhereInput
    orderBy?: BadgeOrderByWithAggregationInput | BadgeOrderByWithAggregationInput[]
    by: BadgeScalarFieldEnum[] | BadgeScalarFieldEnum
    having?: BadgeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BadgeCountAggregateInputType | true
    _min?: BadgeMinAggregateInputType
    _max?: BadgeMaxAggregateInputType
  }

  export type BadgeGroupByOutputType = {
    id: string
    key: string
    label: string
    emoji: string
    unlocked: boolean
    childId: string
    _count: BadgeCountAggregateOutputType | null
    _min: BadgeMinAggregateOutputType | null
    _max: BadgeMaxAggregateOutputType | null
  }

  type GetBadgeGroupByPayload<T extends BadgeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BadgeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BadgeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BadgeGroupByOutputType[P]>
            : GetScalarType<T[P], BadgeGroupByOutputType[P]>
        }
      >
    >


  export type BadgeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    label?: boolean
    emoji?: boolean
    unlocked?: boolean
    childId?: boolean
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["badge"]>

  export type BadgeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    label?: boolean
    emoji?: boolean
    unlocked?: boolean
    childId?: boolean
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["badge"]>

  export type BadgeSelectScalar = {
    id?: boolean
    key?: boolean
    label?: boolean
    emoji?: boolean
    unlocked?: boolean
    childId?: boolean
  }

  export type BadgeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }
  export type BadgeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }

  export type $BadgePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Badge"
    objects: {
      child: Prisma.$ChildPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      label: string
      emoji: string
      unlocked: boolean
      childId: string
    }, ExtArgs["result"]["badge"]>
    composites: {}
  }

  type BadgeGetPayload<S extends boolean | null | undefined | BadgeDefaultArgs> = $Result.GetResult<Prisma.$BadgePayload, S>

  type BadgeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BadgeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BadgeCountAggregateInputType | true
    }

  export interface BadgeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Badge'], meta: { name: 'Badge' } }
    /**
     * Find zero or one Badge that matches the filter.
     * @param {BadgeFindUniqueArgs} args - Arguments to find a Badge
     * @example
     * // Get one Badge
     * const badge = await prisma.badge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BadgeFindUniqueArgs>(args: SelectSubset<T, BadgeFindUniqueArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Badge that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BadgeFindUniqueOrThrowArgs} args - Arguments to find a Badge
     * @example
     * // Get one Badge
     * const badge = await prisma.badge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BadgeFindUniqueOrThrowArgs>(args: SelectSubset<T, BadgeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Badge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeFindFirstArgs} args - Arguments to find a Badge
     * @example
     * // Get one Badge
     * const badge = await prisma.badge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BadgeFindFirstArgs>(args?: SelectSubset<T, BadgeFindFirstArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Badge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeFindFirstOrThrowArgs} args - Arguments to find a Badge
     * @example
     * // Get one Badge
     * const badge = await prisma.badge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BadgeFindFirstOrThrowArgs>(args?: SelectSubset<T, BadgeFindFirstOrThrowArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Badges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Badges
     * const badges = await prisma.badge.findMany()
     * 
     * // Get first 10 Badges
     * const badges = await prisma.badge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const badgeWithIdOnly = await prisma.badge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BadgeFindManyArgs>(args?: SelectSubset<T, BadgeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Badge.
     * @param {BadgeCreateArgs} args - Arguments to create a Badge.
     * @example
     * // Create one Badge
     * const Badge = await prisma.badge.create({
     *   data: {
     *     // ... data to create a Badge
     *   }
     * })
     * 
     */
    create<T extends BadgeCreateArgs>(args: SelectSubset<T, BadgeCreateArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Badges.
     * @param {BadgeCreateManyArgs} args - Arguments to create many Badges.
     * @example
     * // Create many Badges
     * const badge = await prisma.badge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BadgeCreateManyArgs>(args?: SelectSubset<T, BadgeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Badges and returns the data saved in the database.
     * @param {BadgeCreateManyAndReturnArgs} args - Arguments to create many Badges.
     * @example
     * // Create many Badges
     * const badge = await prisma.badge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Badges and only return the `id`
     * const badgeWithIdOnly = await prisma.badge.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BadgeCreateManyAndReturnArgs>(args?: SelectSubset<T, BadgeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Badge.
     * @param {BadgeDeleteArgs} args - Arguments to delete one Badge.
     * @example
     * // Delete one Badge
     * const Badge = await prisma.badge.delete({
     *   where: {
     *     // ... filter to delete one Badge
     *   }
     * })
     * 
     */
    delete<T extends BadgeDeleteArgs>(args: SelectSubset<T, BadgeDeleteArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Badge.
     * @param {BadgeUpdateArgs} args - Arguments to update one Badge.
     * @example
     * // Update one Badge
     * const badge = await prisma.badge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BadgeUpdateArgs>(args: SelectSubset<T, BadgeUpdateArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Badges.
     * @param {BadgeDeleteManyArgs} args - Arguments to filter Badges to delete.
     * @example
     * // Delete a few Badges
     * const { count } = await prisma.badge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BadgeDeleteManyArgs>(args?: SelectSubset<T, BadgeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Badges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Badges
     * const badge = await prisma.badge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BadgeUpdateManyArgs>(args: SelectSubset<T, BadgeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Badge.
     * @param {BadgeUpsertArgs} args - Arguments to update or create a Badge.
     * @example
     * // Update or create a Badge
     * const badge = await prisma.badge.upsert({
     *   create: {
     *     // ... data to create a Badge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Badge we want to update
     *   }
     * })
     */
    upsert<T extends BadgeUpsertArgs>(args: SelectSubset<T, BadgeUpsertArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Badges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeCountArgs} args - Arguments to filter Badges to count.
     * @example
     * // Count the number of Badges
     * const count = await prisma.badge.count({
     *   where: {
     *     // ... the filter for the Badges we want to count
     *   }
     * })
    **/
    count<T extends BadgeCountArgs>(
      args?: Subset<T, BadgeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BadgeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Badge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BadgeAggregateArgs>(args: Subset<T, BadgeAggregateArgs>): Prisma.PrismaPromise<GetBadgeAggregateType<T>>

    /**
     * Group by Badge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeGroupByArgs} args - Group by arguments.
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
      T extends BadgeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BadgeGroupByArgs['orderBy'] }
        : { orderBy?: BadgeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BadgeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBadgeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Badge model
   */
  readonly fields: BadgeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Badge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BadgeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    child<T extends ChildDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChildDefaultArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Badge model
   */ 
  interface BadgeFieldRefs {
    readonly id: FieldRef<"Badge", 'String'>
    readonly key: FieldRef<"Badge", 'String'>
    readonly label: FieldRef<"Badge", 'String'>
    readonly emoji: FieldRef<"Badge", 'String'>
    readonly unlocked: FieldRef<"Badge", 'Boolean'>
    readonly childId: FieldRef<"Badge", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Badge findUnique
   */
  export type BadgeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * Filter, which Badge to fetch.
     */
    where: BadgeWhereUniqueInput
  }

  /**
   * Badge findUniqueOrThrow
   */
  export type BadgeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * Filter, which Badge to fetch.
     */
    where: BadgeWhereUniqueInput
  }

  /**
   * Badge findFirst
   */
  export type BadgeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * Filter, which Badge to fetch.
     */
    where?: BadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Badges to fetch.
     */
    orderBy?: BadgeOrderByWithRelationInput | BadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Badges.
     */
    cursor?: BadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Badges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Badges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Badges.
     */
    distinct?: BadgeScalarFieldEnum | BadgeScalarFieldEnum[]
  }

  /**
   * Badge findFirstOrThrow
   */
  export type BadgeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * Filter, which Badge to fetch.
     */
    where?: BadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Badges to fetch.
     */
    orderBy?: BadgeOrderByWithRelationInput | BadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Badges.
     */
    cursor?: BadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Badges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Badges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Badges.
     */
    distinct?: BadgeScalarFieldEnum | BadgeScalarFieldEnum[]
  }

  /**
   * Badge findMany
   */
  export type BadgeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * Filter, which Badges to fetch.
     */
    where?: BadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Badges to fetch.
     */
    orderBy?: BadgeOrderByWithRelationInput | BadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Badges.
     */
    cursor?: BadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Badges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Badges.
     */
    skip?: number
    distinct?: BadgeScalarFieldEnum | BadgeScalarFieldEnum[]
  }

  /**
   * Badge create
   */
  export type BadgeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * The data needed to create a Badge.
     */
    data: XOR<BadgeCreateInput, BadgeUncheckedCreateInput>
  }

  /**
   * Badge createMany
   */
  export type BadgeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Badges.
     */
    data: BadgeCreateManyInput | BadgeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Badge createManyAndReturn
   */
  export type BadgeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Badges.
     */
    data: BadgeCreateManyInput | BadgeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Badge update
   */
  export type BadgeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * The data needed to update a Badge.
     */
    data: XOR<BadgeUpdateInput, BadgeUncheckedUpdateInput>
    /**
     * Choose, which Badge to update.
     */
    where: BadgeWhereUniqueInput
  }

  /**
   * Badge updateMany
   */
  export type BadgeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Badges.
     */
    data: XOR<BadgeUpdateManyMutationInput, BadgeUncheckedUpdateManyInput>
    /**
     * Filter which Badges to update
     */
    where?: BadgeWhereInput
  }

  /**
   * Badge upsert
   */
  export type BadgeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * The filter to search for the Badge to update in case it exists.
     */
    where: BadgeWhereUniqueInput
    /**
     * In case the Badge found by the `where` argument doesn't exist, create a new Badge with this data.
     */
    create: XOR<BadgeCreateInput, BadgeUncheckedCreateInput>
    /**
     * In case the Badge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BadgeUpdateInput, BadgeUncheckedUpdateInput>
  }

  /**
   * Badge delete
   */
  export type BadgeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * Filter which Badge to delete.
     */
    where: BadgeWhereUniqueInput
  }

  /**
   * Badge deleteMany
   */
  export type BadgeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Badges to delete
     */
    where?: BadgeWhereInput
  }

  /**
   * Badge without action
   */
  export type BadgeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
  }


  /**
   * Model ReadingSession
   */

  export type AggregateReadingSession = {
    _count: ReadingSessionCountAggregateOutputType | null
    _avg: ReadingSessionAvgAggregateOutputType | null
    _sum: ReadingSessionSumAggregateOutputType | null
    _min: ReadingSessionMinAggregateOutputType | null
    _max: ReadingSessionMaxAggregateOutputType | null
  }

  export type ReadingSessionAvgAggregateOutputType = {
    accuracy: number | null
    durationMin: number | null
    wordsRead: number | null
  }

  export type ReadingSessionSumAggregateOutputType = {
    accuracy: number | null
    durationMin: number | null
    wordsRead: number | null
  }

  export type ReadingSessionMinAggregateOutputType = {
    id: string | null
    accuracy: number | null
    durationMin: number | null
    wordsRead: number | null
    lessonId: string | null
    createdAt: Date | null
    childId: string | null
  }

  export type ReadingSessionMaxAggregateOutputType = {
    id: string | null
    accuracy: number | null
    durationMin: number | null
    wordsRead: number | null
    lessonId: string | null
    createdAt: Date | null
    childId: string | null
  }

  export type ReadingSessionCountAggregateOutputType = {
    id: number
    accuracy: number
    durationMin: number
    wordsRead: number
    lessonId: number
    createdAt: number
    childId: number
    _all: number
  }


  export type ReadingSessionAvgAggregateInputType = {
    accuracy?: true
    durationMin?: true
    wordsRead?: true
  }

  export type ReadingSessionSumAggregateInputType = {
    accuracy?: true
    durationMin?: true
    wordsRead?: true
  }

  export type ReadingSessionMinAggregateInputType = {
    id?: true
    accuracy?: true
    durationMin?: true
    wordsRead?: true
    lessonId?: true
    createdAt?: true
    childId?: true
  }

  export type ReadingSessionMaxAggregateInputType = {
    id?: true
    accuracy?: true
    durationMin?: true
    wordsRead?: true
    lessonId?: true
    createdAt?: true
    childId?: true
  }

  export type ReadingSessionCountAggregateInputType = {
    id?: true
    accuracy?: true
    durationMin?: true
    wordsRead?: true
    lessonId?: true
    createdAt?: true
    childId?: true
    _all?: true
  }

  export type ReadingSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReadingSession to aggregate.
     */
    where?: ReadingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadingSessions to fetch.
     */
    orderBy?: ReadingSessionOrderByWithRelationInput | ReadingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReadingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadingSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReadingSessions
    **/
    _count?: true | ReadingSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReadingSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReadingSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReadingSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReadingSessionMaxAggregateInputType
  }

  export type GetReadingSessionAggregateType<T extends ReadingSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateReadingSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReadingSession[P]>
      : GetScalarType<T[P], AggregateReadingSession[P]>
  }




  export type ReadingSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadingSessionWhereInput
    orderBy?: ReadingSessionOrderByWithAggregationInput | ReadingSessionOrderByWithAggregationInput[]
    by: ReadingSessionScalarFieldEnum[] | ReadingSessionScalarFieldEnum
    having?: ReadingSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReadingSessionCountAggregateInputType | true
    _avg?: ReadingSessionAvgAggregateInputType
    _sum?: ReadingSessionSumAggregateInputType
    _min?: ReadingSessionMinAggregateInputType
    _max?: ReadingSessionMaxAggregateInputType
  }

  export type ReadingSessionGroupByOutputType = {
    id: string
    accuracy: number
    durationMin: number
    wordsRead: number
    lessonId: string | null
    createdAt: Date
    childId: string
    _count: ReadingSessionCountAggregateOutputType | null
    _avg: ReadingSessionAvgAggregateOutputType | null
    _sum: ReadingSessionSumAggregateOutputType | null
    _min: ReadingSessionMinAggregateOutputType | null
    _max: ReadingSessionMaxAggregateOutputType | null
  }

  type GetReadingSessionGroupByPayload<T extends ReadingSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReadingSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReadingSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReadingSessionGroupByOutputType[P]>
            : GetScalarType<T[P], ReadingSessionGroupByOutputType[P]>
        }
      >
    >


  export type ReadingSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accuracy?: boolean
    durationMin?: boolean
    wordsRead?: boolean
    lessonId?: boolean
    createdAt?: boolean
    childId?: boolean
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["readingSession"]>

  export type ReadingSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accuracy?: boolean
    durationMin?: boolean
    wordsRead?: boolean
    lessonId?: boolean
    createdAt?: boolean
    childId?: boolean
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["readingSession"]>

  export type ReadingSessionSelectScalar = {
    id?: boolean
    accuracy?: boolean
    durationMin?: boolean
    wordsRead?: boolean
    lessonId?: boolean
    createdAt?: boolean
    childId?: boolean
  }

  export type ReadingSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }
  export type ReadingSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }

  export type $ReadingSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReadingSession"
    objects: {
      child: Prisma.$ChildPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accuracy: number
      durationMin: number
      wordsRead: number
      lessonId: string | null
      createdAt: Date
      childId: string
    }, ExtArgs["result"]["readingSession"]>
    composites: {}
  }

  type ReadingSessionGetPayload<S extends boolean | null | undefined | ReadingSessionDefaultArgs> = $Result.GetResult<Prisma.$ReadingSessionPayload, S>

  type ReadingSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReadingSessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReadingSessionCountAggregateInputType | true
    }

  export interface ReadingSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReadingSession'], meta: { name: 'ReadingSession' } }
    /**
     * Find zero or one ReadingSession that matches the filter.
     * @param {ReadingSessionFindUniqueArgs} args - Arguments to find a ReadingSession
     * @example
     * // Get one ReadingSession
     * const readingSession = await prisma.readingSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReadingSessionFindUniqueArgs>(args: SelectSubset<T, ReadingSessionFindUniqueArgs<ExtArgs>>): Prisma__ReadingSessionClient<$Result.GetResult<Prisma.$ReadingSessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ReadingSession that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReadingSessionFindUniqueOrThrowArgs} args - Arguments to find a ReadingSession
     * @example
     * // Get one ReadingSession
     * const readingSession = await prisma.readingSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReadingSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, ReadingSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReadingSessionClient<$Result.GetResult<Prisma.$ReadingSessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ReadingSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingSessionFindFirstArgs} args - Arguments to find a ReadingSession
     * @example
     * // Get one ReadingSession
     * const readingSession = await prisma.readingSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReadingSessionFindFirstArgs>(args?: SelectSubset<T, ReadingSessionFindFirstArgs<ExtArgs>>): Prisma__ReadingSessionClient<$Result.GetResult<Prisma.$ReadingSessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ReadingSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingSessionFindFirstOrThrowArgs} args - Arguments to find a ReadingSession
     * @example
     * // Get one ReadingSession
     * const readingSession = await prisma.readingSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReadingSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, ReadingSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReadingSessionClient<$Result.GetResult<Prisma.$ReadingSessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ReadingSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReadingSessions
     * const readingSessions = await prisma.readingSession.findMany()
     * 
     * // Get first 10 ReadingSessions
     * const readingSessions = await prisma.readingSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const readingSessionWithIdOnly = await prisma.readingSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReadingSessionFindManyArgs>(args?: SelectSubset<T, ReadingSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingSessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ReadingSession.
     * @param {ReadingSessionCreateArgs} args - Arguments to create a ReadingSession.
     * @example
     * // Create one ReadingSession
     * const ReadingSession = await prisma.readingSession.create({
     *   data: {
     *     // ... data to create a ReadingSession
     *   }
     * })
     * 
     */
    create<T extends ReadingSessionCreateArgs>(args: SelectSubset<T, ReadingSessionCreateArgs<ExtArgs>>): Prisma__ReadingSessionClient<$Result.GetResult<Prisma.$ReadingSessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ReadingSessions.
     * @param {ReadingSessionCreateManyArgs} args - Arguments to create many ReadingSessions.
     * @example
     * // Create many ReadingSessions
     * const readingSession = await prisma.readingSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReadingSessionCreateManyArgs>(args?: SelectSubset<T, ReadingSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReadingSessions and returns the data saved in the database.
     * @param {ReadingSessionCreateManyAndReturnArgs} args - Arguments to create many ReadingSessions.
     * @example
     * // Create many ReadingSessions
     * const readingSession = await prisma.readingSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReadingSessions and only return the `id`
     * const readingSessionWithIdOnly = await prisma.readingSession.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReadingSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, ReadingSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingSessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ReadingSession.
     * @param {ReadingSessionDeleteArgs} args - Arguments to delete one ReadingSession.
     * @example
     * // Delete one ReadingSession
     * const ReadingSession = await prisma.readingSession.delete({
     *   where: {
     *     // ... filter to delete one ReadingSession
     *   }
     * })
     * 
     */
    delete<T extends ReadingSessionDeleteArgs>(args: SelectSubset<T, ReadingSessionDeleteArgs<ExtArgs>>): Prisma__ReadingSessionClient<$Result.GetResult<Prisma.$ReadingSessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ReadingSession.
     * @param {ReadingSessionUpdateArgs} args - Arguments to update one ReadingSession.
     * @example
     * // Update one ReadingSession
     * const readingSession = await prisma.readingSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReadingSessionUpdateArgs>(args: SelectSubset<T, ReadingSessionUpdateArgs<ExtArgs>>): Prisma__ReadingSessionClient<$Result.GetResult<Prisma.$ReadingSessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ReadingSessions.
     * @param {ReadingSessionDeleteManyArgs} args - Arguments to filter ReadingSessions to delete.
     * @example
     * // Delete a few ReadingSessions
     * const { count } = await prisma.readingSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReadingSessionDeleteManyArgs>(args?: SelectSubset<T, ReadingSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReadingSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReadingSessions
     * const readingSession = await prisma.readingSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReadingSessionUpdateManyArgs>(args: SelectSubset<T, ReadingSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ReadingSession.
     * @param {ReadingSessionUpsertArgs} args - Arguments to update or create a ReadingSession.
     * @example
     * // Update or create a ReadingSession
     * const readingSession = await prisma.readingSession.upsert({
     *   create: {
     *     // ... data to create a ReadingSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReadingSession we want to update
     *   }
     * })
     */
    upsert<T extends ReadingSessionUpsertArgs>(args: SelectSubset<T, ReadingSessionUpsertArgs<ExtArgs>>): Prisma__ReadingSessionClient<$Result.GetResult<Prisma.$ReadingSessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ReadingSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingSessionCountArgs} args - Arguments to filter ReadingSessions to count.
     * @example
     * // Count the number of ReadingSessions
     * const count = await prisma.readingSession.count({
     *   where: {
     *     // ... the filter for the ReadingSessions we want to count
     *   }
     * })
    **/
    count<T extends ReadingSessionCountArgs>(
      args?: Subset<T, ReadingSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReadingSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReadingSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReadingSessionAggregateArgs>(args: Subset<T, ReadingSessionAggregateArgs>): Prisma.PrismaPromise<GetReadingSessionAggregateType<T>>

    /**
     * Group by ReadingSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingSessionGroupByArgs} args - Group by arguments.
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
      T extends ReadingSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReadingSessionGroupByArgs['orderBy'] }
        : { orderBy?: ReadingSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ReadingSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReadingSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReadingSession model
   */
  readonly fields: ReadingSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReadingSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReadingSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    child<T extends ChildDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChildDefaultArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ReadingSession model
   */ 
  interface ReadingSessionFieldRefs {
    readonly id: FieldRef<"ReadingSession", 'String'>
    readonly accuracy: FieldRef<"ReadingSession", 'Float'>
    readonly durationMin: FieldRef<"ReadingSession", 'Int'>
    readonly wordsRead: FieldRef<"ReadingSession", 'Int'>
    readonly lessonId: FieldRef<"ReadingSession", 'String'>
    readonly createdAt: FieldRef<"ReadingSession", 'DateTime'>
    readonly childId: FieldRef<"ReadingSession", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ReadingSession findUnique
   */
  export type ReadingSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingSession
     */
    select?: ReadingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingSessionInclude<ExtArgs> | null
    /**
     * Filter, which ReadingSession to fetch.
     */
    where: ReadingSessionWhereUniqueInput
  }

  /**
   * ReadingSession findUniqueOrThrow
   */
  export type ReadingSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingSession
     */
    select?: ReadingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingSessionInclude<ExtArgs> | null
    /**
     * Filter, which ReadingSession to fetch.
     */
    where: ReadingSessionWhereUniqueInput
  }

  /**
   * ReadingSession findFirst
   */
  export type ReadingSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingSession
     */
    select?: ReadingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingSessionInclude<ExtArgs> | null
    /**
     * Filter, which ReadingSession to fetch.
     */
    where?: ReadingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadingSessions to fetch.
     */
    orderBy?: ReadingSessionOrderByWithRelationInput | ReadingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReadingSessions.
     */
    cursor?: ReadingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadingSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReadingSessions.
     */
    distinct?: ReadingSessionScalarFieldEnum | ReadingSessionScalarFieldEnum[]
  }

  /**
   * ReadingSession findFirstOrThrow
   */
  export type ReadingSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingSession
     */
    select?: ReadingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingSessionInclude<ExtArgs> | null
    /**
     * Filter, which ReadingSession to fetch.
     */
    where?: ReadingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadingSessions to fetch.
     */
    orderBy?: ReadingSessionOrderByWithRelationInput | ReadingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReadingSessions.
     */
    cursor?: ReadingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadingSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReadingSessions.
     */
    distinct?: ReadingSessionScalarFieldEnum | ReadingSessionScalarFieldEnum[]
  }

  /**
   * ReadingSession findMany
   */
  export type ReadingSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingSession
     */
    select?: ReadingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingSessionInclude<ExtArgs> | null
    /**
     * Filter, which ReadingSessions to fetch.
     */
    where?: ReadingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadingSessions to fetch.
     */
    orderBy?: ReadingSessionOrderByWithRelationInput | ReadingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReadingSessions.
     */
    cursor?: ReadingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadingSessions.
     */
    skip?: number
    distinct?: ReadingSessionScalarFieldEnum | ReadingSessionScalarFieldEnum[]
  }

  /**
   * ReadingSession create
   */
  export type ReadingSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingSession
     */
    select?: ReadingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a ReadingSession.
     */
    data: XOR<ReadingSessionCreateInput, ReadingSessionUncheckedCreateInput>
  }

  /**
   * ReadingSession createMany
   */
  export type ReadingSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReadingSessions.
     */
    data: ReadingSessionCreateManyInput | ReadingSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReadingSession createManyAndReturn
   */
  export type ReadingSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingSession
     */
    select?: ReadingSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ReadingSessions.
     */
    data: ReadingSessionCreateManyInput | ReadingSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReadingSession update
   */
  export type ReadingSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingSession
     */
    select?: ReadingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a ReadingSession.
     */
    data: XOR<ReadingSessionUpdateInput, ReadingSessionUncheckedUpdateInput>
    /**
     * Choose, which ReadingSession to update.
     */
    where: ReadingSessionWhereUniqueInput
  }

  /**
   * ReadingSession updateMany
   */
  export type ReadingSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReadingSessions.
     */
    data: XOR<ReadingSessionUpdateManyMutationInput, ReadingSessionUncheckedUpdateManyInput>
    /**
     * Filter which ReadingSessions to update
     */
    where?: ReadingSessionWhereInput
  }

  /**
   * ReadingSession upsert
   */
  export type ReadingSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingSession
     */
    select?: ReadingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the ReadingSession to update in case it exists.
     */
    where: ReadingSessionWhereUniqueInput
    /**
     * In case the ReadingSession found by the `where` argument doesn't exist, create a new ReadingSession with this data.
     */
    create: XOR<ReadingSessionCreateInput, ReadingSessionUncheckedCreateInput>
    /**
     * In case the ReadingSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReadingSessionUpdateInput, ReadingSessionUncheckedUpdateInput>
  }

  /**
   * ReadingSession delete
   */
  export type ReadingSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingSession
     */
    select?: ReadingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingSessionInclude<ExtArgs> | null
    /**
     * Filter which ReadingSession to delete.
     */
    where: ReadingSessionWhereUniqueInput
  }

  /**
   * ReadingSession deleteMany
   */
  export type ReadingSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReadingSessions to delete
     */
    where?: ReadingSessionWhereInput
  }

  /**
   * ReadingSession without action
   */
  export type ReadingSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingSession
     */
    select?: ReadingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingSessionInclude<ExtArgs> | null
  }


  /**
   * Model Lesson
   */

  export type AggregateLesson = {
    _count: LessonCountAggregateOutputType | null
    _avg: LessonAvgAggregateOutputType | null
    _sum: LessonSumAggregateOutputType | null
    _min: LessonMinAggregateOutputType | null
    _max: LessonMaxAggregateOutputType | null
  }

  export type LessonAvgAggregateOutputType = {
    order: number | null
  }

  export type LessonSumAggregateOutputType = {
    order: number | null
  }

  export type LessonMinAggregateOutputType = {
    id: string | null
    order: number | null
    letter: string | null
    title: string | null
    emoji: string | null
    createdAt: Date | null
  }

  export type LessonMaxAggregateOutputType = {
    id: string | null
    order: number | null
    letter: string | null
    title: string | null
    emoji: string | null
    createdAt: Date | null
  }

  export type LessonCountAggregateOutputType = {
    id: number
    order: number
    letter: number
    title: number
    emoji: number
    createdAt: number
    _all: number
  }


  export type LessonAvgAggregateInputType = {
    order?: true
  }

  export type LessonSumAggregateInputType = {
    order?: true
  }

  export type LessonMinAggregateInputType = {
    id?: true
    order?: true
    letter?: true
    title?: true
    emoji?: true
    createdAt?: true
  }

  export type LessonMaxAggregateInputType = {
    id?: true
    order?: true
    letter?: true
    title?: true
    emoji?: true
    createdAt?: true
  }

  export type LessonCountAggregateInputType = {
    id?: true
    order?: true
    letter?: true
    title?: true
    emoji?: true
    createdAt?: true
    _all?: true
  }

  export type LessonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lesson to aggregate.
     */
    where?: LessonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LessonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lessons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Lessons
    **/
    _count?: true | LessonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LessonAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LessonSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LessonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LessonMaxAggregateInputType
  }

  export type GetLessonAggregateType<T extends LessonAggregateArgs> = {
        [P in keyof T & keyof AggregateLesson]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLesson[P]>
      : GetScalarType<T[P], AggregateLesson[P]>
  }




  export type LessonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonWhereInput
    orderBy?: LessonOrderByWithAggregationInput | LessonOrderByWithAggregationInput[]
    by: LessonScalarFieldEnum[] | LessonScalarFieldEnum
    having?: LessonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LessonCountAggregateInputType | true
    _avg?: LessonAvgAggregateInputType
    _sum?: LessonSumAggregateInputType
    _min?: LessonMinAggregateInputType
    _max?: LessonMaxAggregateInputType
  }

  export type LessonGroupByOutputType = {
    id: string
    order: number
    letter: string
    title: string
    emoji: string
    createdAt: Date
    _count: LessonCountAggregateOutputType | null
    _avg: LessonAvgAggregateOutputType | null
    _sum: LessonSumAggregateOutputType | null
    _min: LessonMinAggregateOutputType | null
    _max: LessonMaxAggregateOutputType | null
  }

  type GetLessonGroupByPayload<T extends LessonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LessonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LessonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LessonGroupByOutputType[P]>
            : GetScalarType<T[P], LessonGroupByOutputType[P]>
        }
      >
    >


  export type LessonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order?: boolean
    letter?: boolean
    title?: boolean
    emoji?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["lesson"]>

  export type LessonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order?: boolean
    letter?: boolean
    title?: boolean
    emoji?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["lesson"]>

  export type LessonSelectScalar = {
    id?: boolean
    order?: boolean
    letter?: boolean
    title?: boolean
    emoji?: boolean
    createdAt?: boolean
  }


  export type $LessonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lesson"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      order: number
      letter: string
      title: string
      emoji: string
      createdAt: Date
    }, ExtArgs["result"]["lesson"]>
    composites: {}
  }

  type LessonGetPayload<S extends boolean | null | undefined | LessonDefaultArgs> = $Result.GetResult<Prisma.$LessonPayload, S>

  type LessonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LessonFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LessonCountAggregateInputType | true
    }

  export interface LessonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lesson'], meta: { name: 'Lesson' } }
    /**
     * Find zero or one Lesson that matches the filter.
     * @param {LessonFindUniqueArgs} args - Arguments to find a Lesson
     * @example
     * // Get one Lesson
     * const lesson = await prisma.lesson.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LessonFindUniqueArgs>(args: SelectSubset<T, LessonFindUniqueArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Lesson that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LessonFindUniqueOrThrowArgs} args - Arguments to find a Lesson
     * @example
     * // Get one Lesson
     * const lesson = await prisma.lesson.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LessonFindUniqueOrThrowArgs>(args: SelectSubset<T, LessonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Lesson that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFindFirstArgs} args - Arguments to find a Lesson
     * @example
     * // Get one Lesson
     * const lesson = await prisma.lesson.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LessonFindFirstArgs>(args?: SelectSubset<T, LessonFindFirstArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Lesson that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFindFirstOrThrowArgs} args - Arguments to find a Lesson
     * @example
     * // Get one Lesson
     * const lesson = await prisma.lesson.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LessonFindFirstOrThrowArgs>(args?: SelectSubset<T, LessonFindFirstOrThrowArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Lessons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lessons
     * const lessons = await prisma.lesson.findMany()
     * 
     * // Get first 10 Lessons
     * const lessons = await prisma.lesson.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lessonWithIdOnly = await prisma.lesson.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LessonFindManyArgs>(args?: SelectSubset<T, LessonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Lesson.
     * @param {LessonCreateArgs} args - Arguments to create a Lesson.
     * @example
     * // Create one Lesson
     * const Lesson = await prisma.lesson.create({
     *   data: {
     *     // ... data to create a Lesson
     *   }
     * })
     * 
     */
    create<T extends LessonCreateArgs>(args: SelectSubset<T, LessonCreateArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Lessons.
     * @param {LessonCreateManyArgs} args - Arguments to create many Lessons.
     * @example
     * // Create many Lessons
     * const lesson = await prisma.lesson.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LessonCreateManyArgs>(args?: SelectSubset<T, LessonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Lessons and returns the data saved in the database.
     * @param {LessonCreateManyAndReturnArgs} args - Arguments to create many Lessons.
     * @example
     * // Create many Lessons
     * const lesson = await prisma.lesson.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Lessons and only return the `id`
     * const lessonWithIdOnly = await prisma.lesson.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LessonCreateManyAndReturnArgs>(args?: SelectSubset<T, LessonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Lesson.
     * @param {LessonDeleteArgs} args - Arguments to delete one Lesson.
     * @example
     * // Delete one Lesson
     * const Lesson = await prisma.lesson.delete({
     *   where: {
     *     // ... filter to delete one Lesson
     *   }
     * })
     * 
     */
    delete<T extends LessonDeleteArgs>(args: SelectSubset<T, LessonDeleteArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Lesson.
     * @param {LessonUpdateArgs} args - Arguments to update one Lesson.
     * @example
     * // Update one Lesson
     * const lesson = await prisma.lesson.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LessonUpdateArgs>(args: SelectSubset<T, LessonUpdateArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Lessons.
     * @param {LessonDeleteManyArgs} args - Arguments to filter Lessons to delete.
     * @example
     * // Delete a few Lessons
     * const { count } = await prisma.lesson.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LessonDeleteManyArgs>(args?: SelectSubset<T, LessonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lessons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lessons
     * const lesson = await prisma.lesson.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LessonUpdateManyArgs>(args: SelectSubset<T, LessonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Lesson.
     * @param {LessonUpsertArgs} args - Arguments to update or create a Lesson.
     * @example
     * // Update or create a Lesson
     * const lesson = await prisma.lesson.upsert({
     *   create: {
     *     // ... data to create a Lesson
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lesson we want to update
     *   }
     * })
     */
    upsert<T extends LessonUpsertArgs>(args: SelectSubset<T, LessonUpsertArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Lessons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonCountArgs} args - Arguments to filter Lessons to count.
     * @example
     * // Count the number of Lessons
     * const count = await prisma.lesson.count({
     *   where: {
     *     // ... the filter for the Lessons we want to count
     *   }
     * })
    **/
    count<T extends LessonCountArgs>(
      args?: Subset<T, LessonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LessonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lesson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LessonAggregateArgs>(args: Subset<T, LessonAggregateArgs>): Prisma.PrismaPromise<GetLessonAggregateType<T>>

    /**
     * Group by Lesson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonGroupByArgs} args - Group by arguments.
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
      T extends LessonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LessonGroupByArgs['orderBy'] }
        : { orderBy?: LessonGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LessonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLessonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lesson model
   */
  readonly fields: LessonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lesson.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LessonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Lesson model
   */ 
  interface LessonFieldRefs {
    readonly id: FieldRef<"Lesson", 'String'>
    readonly order: FieldRef<"Lesson", 'Int'>
    readonly letter: FieldRef<"Lesson", 'String'>
    readonly title: FieldRef<"Lesson", 'String'>
    readonly emoji: FieldRef<"Lesson", 'String'>
    readonly createdAt: FieldRef<"Lesson", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Lesson findUnique
   */
  export type LessonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Filter, which Lesson to fetch.
     */
    where: LessonWhereUniqueInput
  }

  /**
   * Lesson findUniqueOrThrow
   */
  export type LessonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Filter, which Lesson to fetch.
     */
    where: LessonWhereUniqueInput
  }

  /**
   * Lesson findFirst
   */
  export type LessonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Filter, which Lesson to fetch.
     */
    where?: LessonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lessons.
     */
    cursor?: LessonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lessons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lessons.
     */
    distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[]
  }

  /**
   * Lesson findFirstOrThrow
   */
  export type LessonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Filter, which Lesson to fetch.
     */
    where?: LessonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lessons.
     */
    cursor?: LessonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lessons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lessons.
     */
    distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[]
  }

  /**
   * Lesson findMany
   */
  export type LessonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Filter, which Lessons to fetch.
     */
    where?: LessonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Lessons.
     */
    cursor?: LessonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lessons.
     */
    skip?: number
    distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[]
  }

  /**
   * Lesson create
   */
  export type LessonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * The data needed to create a Lesson.
     */
    data: XOR<LessonCreateInput, LessonUncheckedCreateInput>
  }

  /**
   * Lesson createMany
   */
  export type LessonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Lessons.
     */
    data: LessonCreateManyInput | LessonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lesson createManyAndReturn
   */
  export type LessonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Lessons.
     */
    data: LessonCreateManyInput | LessonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lesson update
   */
  export type LessonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * The data needed to update a Lesson.
     */
    data: XOR<LessonUpdateInput, LessonUncheckedUpdateInput>
    /**
     * Choose, which Lesson to update.
     */
    where: LessonWhereUniqueInput
  }

  /**
   * Lesson updateMany
   */
  export type LessonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Lessons.
     */
    data: XOR<LessonUpdateManyMutationInput, LessonUncheckedUpdateManyInput>
    /**
     * Filter which Lessons to update
     */
    where?: LessonWhereInput
  }

  /**
   * Lesson upsert
   */
  export type LessonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * The filter to search for the Lesson to update in case it exists.
     */
    where: LessonWhereUniqueInput
    /**
     * In case the Lesson found by the `where` argument doesn't exist, create a new Lesson with this data.
     */
    create: XOR<LessonCreateInput, LessonUncheckedCreateInput>
    /**
     * In case the Lesson was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LessonUpdateInput, LessonUncheckedUpdateInput>
  }

  /**
   * Lesson delete
   */
  export type LessonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Filter which Lesson to delete.
     */
    where: LessonWhereUniqueInput
  }

  /**
   * Lesson deleteMany
   */
  export type LessonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lessons to delete
     */
    where?: LessonWhereInput
  }

  /**
   * Lesson without action
   */
  export type LessonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
  }


  /**
   * Model Story
   */

  export type AggregateStory = {
    _count: StoryCountAggregateOutputType | null
    _avg: StoryAvgAggregateOutputType | null
    _sum: StorySumAggregateOutputType | null
    _min: StoryMinAggregateOutputType | null
    _max: StoryMaxAggregateOutputType | null
  }

  export type StoryAvgAggregateOutputType = {
    minutes: number | null
  }

  export type StorySumAggregateOutputType = {
    minutes: number | null
  }

  export type StoryMinAggregateOutputType = {
    id: string | null
    title: string | null
    emoji: string | null
    level: string | null
    category: string | null
    hasAudio: boolean | null
    minutes: number | null
  }

  export type StoryMaxAggregateOutputType = {
    id: string | null
    title: string | null
    emoji: string | null
    level: string | null
    category: string | null
    hasAudio: boolean | null
    minutes: number | null
  }

  export type StoryCountAggregateOutputType = {
    id: number
    title: number
    emoji: number
    level: number
    category: number
    hasAudio: number
    minutes: number
    _all: number
  }


  export type StoryAvgAggregateInputType = {
    minutes?: true
  }

  export type StorySumAggregateInputType = {
    minutes?: true
  }

  export type StoryMinAggregateInputType = {
    id?: true
    title?: true
    emoji?: true
    level?: true
    category?: true
    hasAudio?: true
    minutes?: true
  }

  export type StoryMaxAggregateInputType = {
    id?: true
    title?: true
    emoji?: true
    level?: true
    category?: true
    hasAudio?: true
    minutes?: true
  }

  export type StoryCountAggregateInputType = {
    id?: true
    title?: true
    emoji?: true
    level?: true
    category?: true
    hasAudio?: true
    minutes?: true
    _all?: true
  }

  export type StoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Story to aggregate.
     */
    where?: StoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stories to fetch.
     */
    orderBy?: StoryOrderByWithRelationInput | StoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Stories
    **/
    _count?: true | StoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StoryMaxAggregateInputType
  }

  export type GetStoryAggregateType<T extends StoryAggregateArgs> = {
        [P in keyof T & keyof AggregateStory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStory[P]>
      : GetScalarType<T[P], AggregateStory[P]>
  }




  export type StoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoryWhereInput
    orderBy?: StoryOrderByWithAggregationInput | StoryOrderByWithAggregationInput[]
    by: StoryScalarFieldEnum[] | StoryScalarFieldEnum
    having?: StoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StoryCountAggregateInputType | true
    _avg?: StoryAvgAggregateInputType
    _sum?: StorySumAggregateInputType
    _min?: StoryMinAggregateInputType
    _max?: StoryMaxAggregateInputType
  }

  export type StoryGroupByOutputType = {
    id: string
    title: string
    emoji: string
    level: string
    category: string
    hasAudio: boolean
    minutes: number
    _count: StoryCountAggregateOutputType | null
    _avg: StoryAvgAggregateOutputType | null
    _sum: StorySumAggregateOutputType | null
    _min: StoryMinAggregateOutputType | null
    _max: StoryMaxAggregateOutputType | null
  }

  type GetStoryGroupByPayload<T extends StoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StoryGroupByOutputType[P]>
            : GetScalarType<T[P], StoryGroupByOutputType[P]>
        }
      >
    >


  export type StorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    emoji?: boolean
    level?: boolean
    category?: boolean
    hasAudio?: boolean
    minutes?: boolean
  }, ExtArgs["result"]["story"]>

  export type StorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    emoji?: boolean
    level?: boolean
    category?: boolean
    hasAudio?: boolean
    minutes?: boolean
  }, ExtArgs["result"]["story"]>

  export type StorySelectScalar = {
    id?: boolean
    title?: boolean
    emoji?: boolean
    level?: boolean
    category?: boolean
    hasAudio?: boolean
    minutes?: boolean
  }


  export type $StoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Story"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      emoji: string
      level: string
      category: string
      hasAudio: boolean
      minutes: number
    }, ExtArgs["result"]["story"]>
    composites: {}
  }

  type StoryGetPayload<S extends boolean | null | undefined | StoryDefaultArgs> = $Result.GetResult<Prisma.$StoryPayload, S>

  type StoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StoryCountAggregateInputType | true
    }

  export interface StoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Story'], meta: { name: 'Story' } }
    /**
     * Find zero or one Story that matches the filter.
     * @param {StoryFindUniqueArgs} args - Arguments to find a Story
     * @example
     * // Get one Story
     * const story = await prisma.story.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StoryFindUniqueArgs>(args: SelectSubset<T, StoryFindUniqueArgs<ExtArgs>>): Prisma__StoryClient<$Result.GetResult<Prisma.$StoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Story that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StoryFindUniqueOrThrowArgs} args - Arguments to find a Story
     * @example
     * // Get one Story
     * const story = await prisma.story.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StoryFindUniqueOrThrowArgs>(args: SelectSubset<T, StoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StoryClient<$Result.GetResult<Prisma.$StoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Story that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoryFindFirstArgs} args - Arguments to find a Story
     * @example
     * // Get one Story
     * const story = await prisma.story.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StoryFindFirstArgs>(args?: SelectSubset<T, StoryFindFirstArgs<ExtArgs>>): Prisma__StoryClient<$Result.GetResult<Prisma.$StoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Story that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoryFindFirstOrThrowArgs} args - Arguments to find a Story
     * @example
     * // Get one Story
     * const story = await prisma.story.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StoryFindFirstOrThrowArgs>(args?: SelectSubset<T, StoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__StoryClient<$Result.GetResult<Prisma.$StoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Stories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stories
     * const stories = await prisma.story.findMany()
     * 
     * // Get first 10 Stories
     * const stories = await prisma.story.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storyWithIdOnly = await prisma.story.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StoryFindManyArgs>(args?: SelectSubset<T, StoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Story.
     * @param {StoryCreateArgs} args - Arguments to create a Story.
     * @example
     * // Create one Story
     * const Story = await prisma.story.create({
     *   data: {
     *     // ... data to create a Story
     *   }
     * })
     * 
     */
    create<T extends StoryCreateArgs>(args: SelectSubset<T, StoryCreateArgs<ExtArgs>>): Prisma__StoryClient<$Result.GetResult<Prisma.$StoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Stories.
     * @param {StoryCreateManyArgs} args - Arguments to create many Stories.
     * @example
     * // Create many Stories
     * const story = await prisma.story.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StoryCreateManyArgs>(args?: SelectSubset<T, StoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Stories and returns the data saved in the database.
     * @param {StoryCreateManyAndReturnArgs} args - Arguments to create many Stories.
     * @example
     * // Create many Stories
     * const story = await prisma.story.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Stories and only return the `id`
     * const storyWithIdOnly = await prisma.story.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StoryCreateManyAndReturnArgs>(args?: SelectSubset<T, StoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Story.
     * @param {StoryDeleteArgs} args - Arguments to delete one Story.
     * @example
     * // Delete one Story
     * const Story = await prisma.story.delete({
     *   where: {
     *     // ... filter to delete one Story
     *   }
     * })
     * 
     */
    delete<T extends StoryDeleteArgs>(args: SelectSubset<T, StoryDeleteArgs<ExtArgs>>): Prisma__StoryClient<$Result.GetResult<Prisma.$StoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Story.
     * @param {StoryUpdateArgs} args - Arguments to update one Story.
     * @example
     * // Update one Story
     * const story = await prisma.story.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StoryUpdateArgs>(args: SelectSubset<T, StoryUpdateArgs<ExtArgs>>): Prisma__StoryClient<$Result.GetResult<Prisma.$StoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Stories.
     * @param {StoryDeleteManyArgs} args - Arguments to filter Stories to delete.
     * @example
     * // Delete a few Stories
     * const { count } = await prisma.story.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StoryDeleteManyArgs>(args?: SelectSubset<T, StoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stories
     * const story = await prisma.story.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StoryUpdateManyArgs>(args: SelectSubset<T, StoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Story.
     * @param {StoryUpsertArgs} args - Arguments to update or create a Story.
     * @example
     * // Update or create a Story
     * const story = await prisma.story.upsert({
     *   create: {
     *     // ... data to create a Story
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Story we want to update
     *   }
     * })
     */
    upsert<T extends StoryUpsertArgs>(args: SelectSubset<T, StoryUpsertArgs<ExtArgs>>): Prisma__StoryClient<$Result.GetResult<Prisma.$StoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Stories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoryCountArgs} args - Arguments to filter Stories to count.
     * @example
     * // Count the number of Stories
     * const count = await prisma.story.count({
     *   where: {
     *     // ... the filter for the Stories we want to count
     *   }
     * })
    **/
    count<T extends StoryCountArgs>(
      args?: Subset<T, StoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Story.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StoryAggregateArgs>(args: Subset<T, StoryAggregateArgs>): Prisma.PrismaPromise<GetStoryAggregateType<T>>

    /**
     * Group by Story.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoryGroupByArgs} args - Group by arguments.
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
      T extends StoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StoryGroupByArgs['orderBy'] }
        : { orderBy?: StoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Story model
   */
  readonly fields: StoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Story.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Story model
   */ 
  interface StoryFieldRefs {
    readonly id: FieldRef<"Story", 'String'>
    readonly title: FieldRef<"Story", 'String'>
    readonly emoji: FieldRef<"Story", 'String'>
    readonly level: FieldRef<"Story", 'String'>
    readonly category: FieldRef<"Story", 'String'>
    readonly hasAudio: FieldRef<"Story", 'Boolean'>
    readonly minutes: FieldRef<"Story", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Story findUnique
   */
  export type StoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Story
     */
    select?: StorySelect<ExtArgs> | null
    /**
     * Filter, which Story to fetch.
     */
    where: StoryWhereUniqueInput
  }

  /**
   * Story findUniqueOrThrow
   */
  export type StoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Story
     */
    select?: StorySelect<ExtArgs> | null
    /**
     * Filter, which Story to fetch.
     */
    where: StoryWhereUniqueInput
  }

  /**
   * Story findFirst
   */
  export type StoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Story
     */
    select?: StorySelect<ExtArgs> | null
    /**
     * Filter, which Story to fetch.
     */
    where?: StoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stories to fetch.
     */
    orderBy?: StoryOrderByWithRelationInput | StoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stories.
     */
    cursor?: StoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stories.
     */
    distinct?: StoryScalarFieldEnum | StoryScalarFieldEnum[]
  }

  /**
   * Story findFirstOrThrow
   */
  export type StoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Story
     */
    select?: StorySelect<ExtArgs> | null
    /**
     * Filter, which Story to fetch.
     */
    where?: StoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stories to fetch.
     */
    orderBy?: StoryOrderByWithRelationInput | StoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stories.
     */
    cursor?: StoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stories.
     */
    distinct?: StoryScalarFieldEnum | StoryScalarFieldEnum[]
  }

  /**
   * Story findMany
   */
  export type StoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Story
     */
    select?: StorySelect<ExtArgs> | null
    /**
     * Filter, which Stories to fetch.
     */
    where?: StoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stories to fetch.
     */
    orderBy?: StoryOrderByWithRelationInput | StoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Stories.
     */
    cursor?: StoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stories.
     */
    skip?: number
    distinct?: StoryScalarFieldEnum | StoryScalarFieldEnum[]
  }

  /**
   * Story create
   */
  export type StoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Story
     */
    select?: StorySelect<ExtArgs> | null
    /**
     * The data needed to create a Story.
     */
    data: XOR<StoryCreateInput, StoryUncheckedCreateInput>
  }

  /**
   * Story createMany
   */
  export type StoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Stories.
     */
    data: StoryCreateManyInput | StoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Story createManyAndReturn
   */
  export type StoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Story
     */
    select?: StorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Stories.
     */
    data: StoryCreateManyInput | StoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Story update
   */
  export type StoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Story
     */
    select?: StorySelect<ExtArgs> | null
    /**
     * The data needed to update a Story.
     */
    data: XOR<StoryUpdateInput, StoryUncheckedUpdateInput>
    /**
     * Choose, which Story to update.
     */
    where: StoryWhereUniqueInput
  }

  /**
   * Story updateMany
   */
  export type StoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Stories.
     */
    data: XOR<StoryUpdateManyMutationInput, StoryUncheckedUpdateManyInput>
    /**
     * Filter which Stories to update
     */
    where?: StoryWhereInput
  }

  /**
   * Story upsert
   */
  export type StoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Story
     */
    select?: StorySelect<ExtArgs> | null
    /**
     * The filter to search for the Story to update in case it exists.
     */
    where: StoryWhereUniqueInput
    /**
     * In case the Story found by the `where` argument doesn't exist, create a new Story with this data.
     */
    create: XOR<StoryCreateInput, StoryUncheckedCreateInput>
    /**
     * In case the Story was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StoryUpdateInput, StoryUncheckedUpdateInput>
  }

  /**
   * Story delete
   */
  export type StoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Story
     */
    select?: StorySelect<ExtArgs> | null
    /**
     * Filter which Story to delete.
     */
    where: StoryWhereUniqueInput
  }

  /**
   * Story deleteMany
   */
  export type StoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stories to delete
     */
    where?: StoryWhereInput
  }

  /**
   * Story without action
   */
  export type StoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Story
     */
    select?: StorySelect<ExtArgs> | null
  }


  /**
   * Model Game
   */

  export type AggregateGame = {
    _count: GameCountAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  export type GameMinAggregateOutputType = {
    id: string | null
    title: string | null
    subtitle: string | null
    emoji: string | null
  }

  export type GameMaxAggregateOutputType = {
    id: string | null
    title: string | null
    subtitle: string | null
    emoji: string | null
  }

  export type GameCountAggregateOutputType = {
    id: number
    title: number
    subtitle: number
    emoji: number
    _all: number
  }


  export type GameMinAggregateInputType = {
    id?: true
    title?: true
    subtitle?: true
    emoji?: true
  }

  export type GameMaxAggregateInputType = {
    id?: true
    title?: true
    subtitle?: true
    emoji?: true
  }

  export type GameCountAggregateInputType = {
    id?: true
    title?: true
    subtitle?: true
    emoji?: true
    _all?: true
  }

  export type GameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Game to aggregate.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Games
    **/
    _count?: true | GameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameMaxAggregateInputType
  }

  export type GetGameAggregateType<T extends GameAggregateArgs> = {
        [P in keyof T & keyof AggregateGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGame[P]>
      : GetScalarType<T[P], AggregateGame[P]>
  }




  export type GameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
    orderBy?: GameOrderByWithAggregationInput | GameOrderByWithAggregationInput[]
    by: GameScalarFieldEnum[] | GameScalarFieldEnum
    having?: GameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameCountAggregateInputType | true
    _min?: GameMinAggregateInputType
    _max?: GameMaxAggregateInputType
  }

  export type GameGroupByOutputType = {
    id: string
    title: string
    subtitle: string
    emoji: string
    _count: GameCountAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  type GetGameGroupByPayload<T extends GameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameGroupByOutputType[P]>
            : GetScalarType<T[P], GameGroupByOutputType[P]>
        }
      >
    >


  export type GameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    subtitle?: boolean
    emoji?: boolean
  }, ExtArgs["result"]["game"]>

  export type GameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    subtitle?: boolean
    emoji?: boolean
  }, ExtArgs["result"]["game"]>

  export type GameSelectScalar = {
    id?: boolean
    title?: boolean
    subtitle?: boolean
    emoji?: boolean
  }


  export type $GamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Game"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      subtitle: string
      emoji: string
    }, ExtArgs["result"]["game"]>
    composites: {}
  }

  type GameGetPayload<S extends boolean | null | undefined | GameDefaultArgs> = $Result.GetResult<Prisma.$GamePayload, S>

  type GameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GameFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GameCountAggregateInputType | true
    }

  export interface GameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Game'], meta: { name: 'Game' } }
    /**
     * Find zero or one Game that matches the filter.
     * @param {GameFindUniqueArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameFindUniqueArgs>(args: SelectSubset<T, GameFindUniqueArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Game that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GameFindUniqueOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameFindUniqueOrThrowArgs>(args: SelectSubset<T, GameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Game that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameFindFirstArgs>(args?: SelectSubset<T, GameFindFirstArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Game that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameFindFirstOrThrowArgs>(args?: SelectSubset<T, GameFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Games that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Games
     * const games = await prisma.game.findMany()
     * 
     * // Get first 10 Games
     * const games = await prisma.game.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameWithIdOnly = await prisma.game.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameFindManyArgs>(args?: SelectSubset<T, GameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Game.
     * @param {GameCreateArgs} args - Arguments to create a Game.
     * @example
     * // Create one Game
     * const Game = await prisma.game.create({
     *   data: {
     *     // ... data to create a Game
     *   }
     * })
     * 
     */
    create<T extends GameCreateArgs>(args: SelectSubset<T, GameCreateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Games.
     * @param {GameCreateManyArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameCreateManyArgs>(args?: SelectSubset<T, GameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Games and returns the data saved in the database.
     * @param {GameCreateManyAndReturnArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameCreateManyAndReturnArgs>(args?: SelectSubset<T, GameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Game.
     * @param {GameDeleteArgs} args - Arguments to delete one Game.
     * @example
     * // Delete one Game
     * const Game = await prisma.game.delete({
     *   where: {
     *     // ... filter to delete one Game
     *   }
     * })
     * 
     */
    delete<T extends GameDeleteArgs>(args: SelectSubset<T, GameDeleteArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Game.
     * @param {GameUpdateArgs} args - Arguments to update one Game.
     * @example
     * // Update one Game
     * const game = await prisma.game.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameUpdateArgs>(args: SelectSubset<T, GameUpdateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Games.
     * @param {GameDeleteManyArgs} args - Arguments to filter Games to delete.
     * @example
     * // Delete a few Games
     * const { count } = await prisma.game.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameDeleteManyArgs>(args?: SelectSubset<T, GameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameUpdateManyArgs>(args: SelectSubset<T, GameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Game.
     * @param {GameUpsertArgs} args - Arguments to update or create a Game.
     * @example
     * // Update or create a Game
     * const game = await prisma.game.upsert({
     *   create: {
     *     // ... data to create a Game
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Game we want to update
     *   }
     * })
     */
    upsert<T extends GameUpsertArgs>(args: SelectSubset<T, GameUpsertArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCountArgs} args - Arguments to filter Games to count.
     * @example
     * // Count the number of Games
     * const count = await prisma.game.count({
     *   where: {
     *     // ... the filter for the Games we want to count
     *   }
     * })
    **/
    count<T extends GameCountArgs>(
      args?: Subset<T, GameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GameAggregateArgs>(args: Subset<T, GameAggregateArgs>): Prisma.PrismaPromise<GetGameAggregateType<T>>

    /**
     * Group by Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameGroupByArgs} args - Group by arguments.
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
      T extends GameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameGroupByArgs['orderBy'] }
        : { orderBy?: GameGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Game model
   */
  readonly fields: GameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Game.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Game model
   */ 
  interface GameFieldRefs {
    readonly id: FieldRef<"Game", 'String'>
    readonly title: FieldRef<"Game", 'String'>
    readonly subtitle: FieldRef<"Game", 'String'>
    readonly emoji: FieldRef<"Game", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Game findUnique
   */
  export type GameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findUniqueOrThrow
   */
  export type GameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findFirst
   */
  export type GameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findFirstOrThrow
   */
  export type GameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findMany
   */
  export type GameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Filter, which Games to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game create
   */
  export type GameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * The data needed to create a Game.
     */
    data: XOR<GameCreateInput, GameUncheckedCreateInput>
  }

  /**
   * Game createMany
   */
  export type GameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Game createManyAndReturn
   */
  export type GameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Game update
   */
  export type GameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * The data needed to update a Game.
     */
    data: XOR<GameUpdateInput, GameUncheckedUpdateInput>
    /**
     * Choose, which Game to update.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game updateMany
   */
  export type GameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
  }

  /**
   * Game upsert
   */
  export type GameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * The filter to search for the Game to update in case it exists.
     */
    where: GameWhereUniqueInput
    /**
     * In case the Game found by the `where` argument doesn't exist, create a new Game with this data.
     */
    create: XOR<GameCreateInput, GameUncheckedCreateInput>
    /**
     * In case the Game was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameUpdateInput, GameUncheckedUpdateInput>
  }

  /**
   * Game delete
   */
  export type GameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Filter which Game to delete.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game deleteMany
   */
  export type GameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Games to delete
     */
    where?: GameWhereInput
  }

  /**
   * Game without action
   */
  export type GameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
  }


  /**
   * Model GameResult
   */

  export type AggregateGameResult = {
    _count: GameResultCountAggregateOutputType | null
    _avg: GameResultAvgAggregateOutputType | null
    _sum: GameResultSumAggregateOutputType | null
    _min: GameResultMinAggregateOutputType | null
    _max: GameResultMaxAggregateOutputType | null
  }

  export type GameResultAvgAggregateOutputType = {
    score: number | null
  }

  export type GameResultSumAggregateOutputType = {
    score: number | null
  }

  export type GameResultMinAggregateOutputType = {
    id: string | null
    gameTitle: string | null
    score: number | null
    createdAt: Date | null
    childId: string | null
  }

  export type GameResultMaxAggregateOutputType = {
    id: string | null
    gameTitle: string | null
    score: number | null
    createdAt: Date | null
    childId: string | null
  }

  export type GameResultCountAggregateOutputType = {
    id: number
    gameTitle: number
    score: number
    createdAt: number
    childId: number
    _all: number
  }


  export type GameResultAvgAggregateInputType = {
    score?: true
  }

  export type GameResultSumAggregateInputType = {
    score?: true
  }

  export type GameResultMinAggregateInputType = {
    id?: true
    gameTitle?: true
    score?: true
    createdAt?: true
    childId?: true
  }

  export type GameResultMaxAggregateInputType = {
    id?: true
    gameTitle?: true
    score?: true
    createdAt?: true
    childId?: true
  }

  export type GameResultCountAggregateInputType = {
    id?: true
    gameTitle?: true
    score?: true
    createdAt?: true
    childId?: true
    _all?: true
  }

  export type GameResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameResult to aggregate.
     */
    where?: GameResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameResults to fetch.
     */
    orderBy?: GameResultOrderByWithRelationInput | GameResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameResults
    **/
    _count?: true | GameResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameResultMaxAggregateInputType
  }

  export type GetGameResultAggregateType<T extends GameResultAggregateArgs> = {
        [P in keyof T & keyof AggregateGameResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameResult[P]>
      : GetScalarType<T[P], AggregateGameResult[P]>
  }




  export type GameResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameResultWhereInput
    orderBy?: GameResultOrderByWithAggregationInput | GameResultOrderByWithAggregationInput[]
    by: GameResultScalarFieldEnum[] | GameResultScalarFieldEnum
    having?: GameResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameResultCountAggregateInputType | true
    _avg?: GameResultAvgAggregateInputType
    _sum?: GameResultSumAggregateInputType
    _min?: GameResultMinAggregateInputType
    _max?: GameResultMaxAggregateInputType
  }

  export type GameResultGroupByOutputType = {
    id: string
    gameTitle: string
    score: number
    createdAt: Date
    childId: string
    _count: GameResultCountAggregateOutputType | null
    _avg: GameResultAvgAggregateOutputType | null
    _sum: GameResultSumAggregateOutputType | null
    _min: GameResultMinAggregateOutputType | null
    _max: GameResultMaxAggregateOutputType | null
  }

  type GetGameResultGroupByPayload<T extends GameResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameResultGroupByOutputType[P]>
            : GetScalarType<T[P], GameResultGroupByOutputType[P]>
        }
      >
    >


  export type GameResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameTitle?: boolean
    score?: boolean
    createdAt?: boolean
    childId?: boolean
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameResult"]>

  export type GameResultSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameTitle?: boolean
    score?: boolean
    createdAt?: boolean
    childId?: boolean
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameResult"]>

  export type GameResultSelectScalar = {
    id?: boolean
    gameTitle?: boolean
    score?: boolean
    createdAt?: boolean
    childId?: boolean
  }

  export type GameResultInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }
  export type GameResultIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }

  export type $GameResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameResult"
    objects: {
      child: Prisma.$ChildPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      gameTitle: string
      score: number
      createdAt: Date
      childId: string
    }, ExtArgs["result"]["gameResult"]>
    composites: {}
  }

  type GameResultGetPayload<S extends boolean | null | undefined | GameResultDefaultArgs> = $Result.GetResult<Prisma.$GameResultPayload, S>

  type GameResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GameResultFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GameResultCountAggregateInputType | true
    }

  export interface GameResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameResult'], meta: { name: 'GameResult' } }
    /**
     * Find zero or one GameResult that matches the filter.
     * @param {GameResultFindUniqueArgs} args - Arguments to find a GameResult
     * @example
     * // Get one GameResult
     * const gameResult = await prisma.gameResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameResultFindUniqueArgs>(args: SelectSubset<T, GameResultFindUniqueArgs<ExtArgs>>): Prisma__GameResultClient<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GameResult that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GameResultFindUniqueOrThrowArgs} args - Arguments to find a GameResult
     * @example
     * // Get one GameResult
     * const gameResult = await prisma.gameResult.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameResultFindUniqueOrThrowArgs>(args: SelectSubset<T, GameResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameResultClient<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GameResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameResultFindFirstArgs} args - Arguments to find a GameResult
     * @example
     * // Get one GameResult
     * const gameResult = await prisma.gameResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameResultFindFirstArgs>(args?: SelectSubset<T, GameResultFindFirstArgs<ExtArgs>>): Prisma__GameResultClient<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GameResult that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameResultFindFirstOrThrowArgs} args - Arguments to find a GameResult
     * @example
     * // Get one GameResult
     * const gameResult = await prisma.gameResult.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameResultFindFirstOrThrowArgs>(args?: SelectSubset<T, GameResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameResultClient<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GameResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameResults
     * const gameResults = await prisma.gameResult.findMany()
     * 
     * // Get first 10 GameResults
     * const gameResults = await prisma.gameResult.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameResultWithIdOnly = await prisma.gameResult.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameResultFindManyArgs>(args?: SelectSubset<T, GameResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GameResult.
     * @param {GameResultCreateArgs} args - Arguments to create a GameResult.
     * @example
     * // Create one GameResult
     * const GameResult = await prisma.gameResult.create({
     *   data: {
     *     // ... data to create a GameResult
     *   }
     * })
     * 
     */
    create<T extends GameResultCreateArgs>(args: SelectSubset<T, GameResultCreateArgs<ExtArgs>>): Prisma__GameResultClient<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GameResults.
     * @param {GameResultCreateManyArgs} args - Arguments to create many GameResults.
     * @example
     * // Create many GameResults
     * const gameResult = await prisma.gameResult.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameResultCreateManyArgs>(args?: SelectSubset<T, GameResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameResults and returns the data saved in the database.
     * @param {GameResultCreateManyAndReturnArgs} args - Arguments to create many GameResults.
     * @example
     * // Create many GameResults
     * const gameResult = await prisma.gameResult.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameResults and only return the `id`
     * const gameResultWithIdOnly = await prisma.gameResult.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameResultCreateManyAndReturnArgs>(args?: SelectSubset<T, GameResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GameResult.
     * @param {GameResultDeleteArgs} args - Arguments to delete one GameResult.
     * @example
     * // Delete one GameResult
     * const GameResult = await prisma.gameResult.delete({
     *   where: {
     *     // ... filter to delete one GameResult
     *   }
     * })
     * 
     */
    delete<T extends GameResultDeleteArgs>(args: SelectSubset<T, GameResultDeleteArgs<ExtArgs>>): Prisma__GameResultClient<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GameResult.
     * @param {GameResultUpdateArgs} args - Arguments to update one GameResult.
     * @example
     * // Update one GameResult
     * const gameResult = await prisma.gameResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameResultUpdateArgs>(args: SelectSubset<T, GameResultUpdateArgs<ExtArgs>>): Prisma__GameResultClient<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GameResults.
     * @param {GameResultDeleteManyArgs} args - Arguments to filter GameResults to delete.
     * @example
     * // Delete a few GameResults
     * const { count } = await prisma.gameResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameResultDeleteManyArgs>(args?: SelectSubset<T, GameResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameResults
     * const gameResult = await prisma.gameResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameResultUpdateManyArgs>(args: SelectSubset<T, GameResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GameResult.
     * @param {GameResultUpsertArgs} args - Arguments to update or create a GameResult.
     * @example
     * // Update or create a GameResult
     * const gameResult = await prisma.gameResult.upsert({
     *   create: {
     *     // ... data to create a GameResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameResult we want to update
     *   }
     * })
     */
    upsert<T extends GameResultUpsertArgs>(args: SelectSubset<T, GameResultUpsertArgs<ExtArgs>>): Prisma__GameResultClient<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GameResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameResultCountArgs} args - Arguments to filter GameResults to count.
     * @example
     * // Count the number of GameResults
     * const count = await prisma.gameResult.count({
     *   where: {
     *     // ... the filter for the GameResults we want to count
     *   }
     * })
    **/
    count<T extends GameResultCountArgs>(
      args?: Subset<T, GameResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GameResultAggregateArgs>(args: Subset<T, GameResultAggregateArgs>): Prisma.PrismaPromise<GetGameResultAggregateType<T>>

    /**
     * Group by GameResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameResultGroupByArgs} args - Group by arguments.
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
      T extends GameResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameResultGroupByArgs['orderBy'] }
        : { orderBy?: GameResultGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GameResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameResult model
   */
  readonly fields: GameResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameResult.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    child<T extends ChildDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChildDefaultArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the GameResult model
   */ 
  interface GameResultFieldRefs {
    readonly id: FieldRef<"GameResult", 'String'>
    readonly gameTitle: FieldRef<"GameResult", 'String'>
    readonly score: FieldRef<"GameResult", 'Int'>
    readonly createdAt: FieldRef<"GameResult", 'DateTime'>
    readonly childId: FieldRef<"GameResult", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GameResult findUnique
   */
  export type GameResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    /**
     * Filter, which GameResult to fetch.
     */
    where: GameResultWhereUniqueInput
  }

  /**
   * GameResult findUniqueOrThrow
   */
  export type GameResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    /**
     * Filter, which GameResult to fetch.
     */
    where: GameResultWhereUniqueInput
  }

  /**
   * GameResult findFirst
   */
  export type GameResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    /**
     * Filter, which GameResult to fetch.
     */
    where?: GameResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameResults to fetch.
     */
    orderBy?: GameResultOrderByWithRelationInput | GameResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameResults.
     */
    cursor?: GameResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameResults.
     */
    distinct?: GameResultScalarFieldEnum | GameResultScalarFieldEnum[]
  }

  /**
   * GameResult findFirstOrThrow
   */
  export type GameResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    /**
     * Filter, which GameResult to fetch.
     */
    where?: GameResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameResults to fetch.
     */
    orderBy?: GameResultOrderByWithRelationInput | GameResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameResults.
     */
    cursor?: GameResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameResults.
     */
    distinct?: GameResultScalarFieldEnum | GameResultScalarFieldEnum[]
  }

  /**
   * GameResult findMany
   */
  export type GameResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    /**
     * Filter, which GameResults to fetch.
     */
    where?: GameResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameResults to fetch.
     */
    orderBy?: GameResultOrderByWithRelationInput | GameResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameResults.
     */
    cursor?: GameResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameResults.
     */
    skip?: number
    distinct?: GameResultScalarFieldEnum | GameResultScalarFieldEnum[]
  }

  /**
   * GameResult create
   */
  export type GameResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    /**
     * The data needed to create a GameResult.
     */
    data: XOR<GameResultCreateInput, GameResultUncheckedCreateInput>
  }

  /**
   * GameResult createMany
   */
  export type GameResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameResults.
     */
    data: GameResultCreateManyInput | GameResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameResult createManyAndReturn
   */
  export type GameResultCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GameResults.
     */
    data: GameResultCreateManyInput | GameResultCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameResult update
   */
  export type GameResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    /**
     * The data needed to update a GameResult.
     */
    data: XOR<GameResultUpdateInput, GameResultUncheckedUpdateInput>
    /**
     * Choose, which GameResult to update.
     */
    where: GameResultWhereUniqueInput
  }

  /**
   * GameResult updateMany
   */
  export type GameResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameResults.
     */
    data: XOR<GameResultUpdateManyMutationInput, GameResultUncheckedUpdateManyInput>
    /**
     * Filter which GameResults to update
     */
    where?: GameResultWhereInput
  }

  /**
   * GameResult upsert
   */
  export type GameResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    /**
     * The filter to search for the GameResult to update in case it exists.
     */
    where: GameResultWhereUniqueInput
    /**
     * In case the GameResult found by the `where` argument doesn't exist, create a new GameResult with this data.
     */
    create: XOR<GameResultCreateInput, GameResultUncheckedCreateInput>
    /**
     * In case the GameResult was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameResultUpdateInput, GameResultUncheckedUpdateInput>
  }

  /**
   * GameResult delete
   */
  export type GameResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    /**
     * Filter which GameResult to delete.
     */
    where: GameResultWhereUniqueInput
  }

  /**
   * GameResult deleteMany
   */
  export type GameResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameResults to delete
     */
    where?: GameResultWhereInput
  }

  /**
   * GameResult without action
   */
  export type GameResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
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


  export const ChildScalarFieldEnum: {
    id: 'id',
    clerkId: 'clerkId',
    email: 'email',
    name: 'name',
    avatar: 'avatar',
    level: 'level',
    title: 'title',
    stars: 'stars',
    streak: 'streak',
    coins: 'coins',
    dyslexiaTestDone: 'dyslexiaTestDone',
    dyslexiaScore: 'dyslexiaScore',
    dyslexiaRisk: 'dyslexiaRisk',
    dyslexiaTestedAt: 'dyslexiaTestedAt',
    dyslexiaWeakSkills: 'dyslexiaWeakSkills',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ChildScalarFieldEnum = (typeof ChildScalarFieldEnum)[keyof typeof ChildScalarFieldEnum]


  export const DyslexiaTestScalarFieldEnum: {
    id: 'id',
    score: 'score',
    risk: 'risk',
    answers: 'answers',
    weakSkills: 'weakSkills',
    createdAt: 'createdAt',
    childId: 'childId'
  };

  export type DyslexiaTestScalarFieldEnum = (typeof DyslexiaTestScalarFieldEnum)[keyof typeof DyslexiaTestScalarFieldEnum]


  export const BadgeScalarFieldEnum: {
    id: 'id',
    key: 'key',
    label: 'label',
    emoji: 'emoji',
    unlocked: 'unlocked',
    childId: 'childId'
  };

  export type BadgeScalarFieldEnum = (typeof BadgeScalarFieldEnum)[keyof typeof BadgeScalarFieldEnum]


  export const ReadingSessionScalarFieldEnum: {
    id: 'id',
    accuracy: 'accuracy',
    durationMin: 'durationMin',
    wordsRead: 'wordsRead',
    lessonId: 'lessonId',
    createdAt: 'createdAt',
    childId: 'childId'
  };

  export type ReadingSessionScalarFieldEnum = (typeof ReadingSessionScalarFieldEnum)[keyof typeof ReadingSessionScalarFieldEnum]


  export const LessonScalarFieldEnum: {
    id: 'id',
    order: 'order',
    letter: 'letter',
    title: 'title',
    emoji: 'emoji',
    createdAt: 'createdAt'
  };

  export type LessonScalarFieldEnum = (typeof LessonScalarFieldEnum)[keyof typeof LessonScalarFieldEnum]


  export const StoryScalarFieldEnum: {
    id: 'id',
    title: 'title',
    emoji: 'emoji',
    level: 'level',
    category: 'category',
    hasAudio: 'hasAudio',
    minutes: 'minutes'
  };

  export type StoryScalarFieldEnum = (typeof StoryScalarFieldEnum)[keyof typeof StoryScalarFieldEnum]


  export const GameScalarFieldEnum: {
    id: 'id',
    title: 'title',
    subtitle: 'subtitle',
    emoji: 'emoji'
  };

  export type GameScalarFieldEnum = (typeof GameScalarFieldEnum)[keyof typeof GameScalarFieldEnum]


  export const GameResultScalarFieldEnum: {
    id: 'id',
    gameTitle: 'gameTitle',
    score: 'score',
    createdAt: 'createdAt',
    childId: 'childId'
  };

  export type GameResultScalarFieldEnum = (typeof GameResultScalarFieldEnum)[keyof typeof GameResultScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ChildWhereInput = {
    AND?: ChildWhereInput | ChildWhereInput[]
    OR?: ChildWhereInput[]
    NOT?: ChildWhereInput | ChildWhereInput[]
    id?: StringFilter<"Child"> | string
    clerkId?: StringNullableFilter<"Child"> | string | null
    email?: StringNullableFilter<"Child"> | string | null
    name?: StringFilter<"Child"> | string
    avatar?: StringFilter<"Child"> | string
    level?: IntFilter<"Child"> | number
    title?: StringFilter<"Child"> | string
    stars?: IntFilter<"Child"> | number
    streak?: IntFilter<"Child"> | number
    coins?: IntFilter<"Child"> | number
    dyslexiaTestDone?: BoolFilter<"Child"> | boolean
    dyslexiaScore?: IntNullableFilter<"Child"> | number | null
    dyslexiaRisk?: StringNullableFilter<"Child"> | string | null
    dyslexiaTestedAt?: DateTimeNullableFilter<"Child"> | Date | string | null
    dyslexiaWeakSkills?: StringNullableListFilter<"Child">
    createdAt?: DateTimeFilter<"Child"> | Date | string
    updatedAt?: DateTimeFilter<"Child"> | Date | string
    badges?: BadgeListRelationFilter
    readingSessions?: ReadingSessionListRelationFilter
    gameResults?: GameResultListRelationFilter
    dyslexiaTests?: DyslexiaTestListRelationFilter
  }

  export type ChildOrderByWithRelationInput = {
    id?: SortOrder
    clerkId?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    name?: SortOrder
    avatar?: SortOrder
    level?: SortOrder
    title?: SortOrder
    stars?: SortOrder
    streak?: SortOrder
    coins?: SortOrder
    dyslexiaTestDone?: SortOrder
    dyslexiaScore?: SortOrderInput | SortOrder
    dyslexiaRisk?: SortOrderInput | SortOrder
    dyslexiaTestedAt?: SortOrderInput | SortOrder
    dyslexiaWeakSkills?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    badges?: BadgeOrderByRelationAggregateInput
    readingSessions?: ReadingSessionOrderByRelationAggregateInput
    gameResults?: GameResultOrderByRelationAggregateInput
    dyslexiaTests?: DyslexiaTestOrderByRelationAggregateInput
  }

  export type ChildWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clerkId?: string
    AND?: ChildWhereInput | ChildWhereInput[]
    OR?: ChildWhereInput[]
    NOT?: ChildWhereInput | ChildWhereInput[]
    email?: StringNullableFilter<"Child"> | string | null
    name?: StringFilter<"Child"> | string
    avatar?: StringFilter<"Child"> | string
    level?: IntFilter<"Child"> | number
    title?: StringFilter<"Child"> | string
    stars?: IntFilter<"Child"> | number
    streak?: IntFilter<"Child"> | number
    coins?: IntFilter<"Child"> | number
    dyslexiaTestDone?: BoolFilter<"Child"> | boolean
    dyslexiaScore?: IntNullableFilter<"Child"> | number | null
    dyslexiaRisk?: StringNullableFilter<"Child"> | string | null
    dyslexiaTestedAt?: DateTimeNullableFilter<"Child"> | Date | string | null
    dyslexiaWeakSkills?: StringNullableListFilter<"Child">
    createdAt?: DateTimeFilter<"Child"> | Date | string
    updatedAt?: DateTimeFilter<"Child"> | Date | string
    badges?: BadgeListRelationFilter
    readingSessions?: ReadingSessionListRelationFilter
    gameResults?: GameResultListRelationFilter
    dyslexiaTests?: DyslexiaTestListRelationFilter
  }, "id" | "clerkId">

  export type ChildOrderByWithAggregationInput = {
    id?: SortOrder
    clerkId?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    name?: SortOrder
    avatar?: SortOrder
    level?: SortOrder
    title?: SortOrder
    stars?: SortOrder
    streak?: SortOrder
    coins?: SortOrder
    dyslexiaTestDone?: SortOrder
    dyslexiaScore?: SortOrderInput | SortOrder
    dyslexiaRisk?: SortOrderInput | SortOrder
    dyslexiaTestedAt?: SortOrderInput | SortOrder
    dyslexiaWeakSkills?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ChildCountOrderByAggregateInput
    _avg?: ChildAvgOrderByAggregateInput
    _max?: ChildMaxOrderByAggregateInput
    _min?: ChildMinOrderByAggregateInput
    _sum?: ChildSumOrderByAggregateInput
  }

  export type ChildScalarWhereWithAggregatesInput = {
    AND?: ChildScalarWhereWithAggregatesInput | ChildScalarWhereWithAggregatesInput[]
    OR?: ChildScalarWhereWithAggregatesInput[]
    NOT?: ChildScalarWhereWithAggregatesInput | ChildScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Child"> | string
    clerkId?: StringNullableWithAggregatesFilter<"Child"> | string | null
    email?: StringNullableWithAggregatesFilter<"Child"> | string | null
    name?: StringWithAggregatesFilter<"Child"> | string
    avatar?: StringWithAggregatesFilter<"Child"> | string
    level?: IntWithAggregatesFilter<"Child"> | number
    title?: StringWithAggregatesFilter<"Child"> | string
    stars?: IntWithAggregatesFilter<"Child"> | number
    streak?: IntWithAggregatesFilter<"Child"> | number
    coins?: IntWithAggregatesFilter<"Child"> | number
    dyslexiaTestDone?: BoolWithAggregatesFilter<"Child"> | boolean
    dyslexiaScore?: IntNullableWithAggregatesFilter<"Child"> | number | null
    dyslexiaRisk?: StringNullableWithAggregatesFilter<"Child"> | string | null
    dyslexiaTestedAt?: DateTimeNullableWithAggregatesFilter<"Child"> | Date | string | null
    dyslexiaWeakSkills?: StringNullableListFilter<"Child">
    createdAt?: DateTimeWithAggregatesFilter<"Child"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Child"> | Date | string
  }

  export type DyslexiaTestWhereInput = {
    AND?: DyslexiaTestWhereInput | DyslexiaTestWhereInput[]
    OR?: DyslexiaTestWhereInput[]
    NOT?: DyslexiaTestWhereInput | DyslexiaTestWhereInput[]
    id?: StringFilter<"DyslexiaTest"> | string
    score?: IntFilter<"DyslexiaTest"> | number
    risk?: StringFilter<"DyslexiaTest"> | string
    answers?: JsonFilter<"DyslexiaTest">
    weakSkills?: StringNullableListFilter<"DyslexiaTest">
    createdAt?: DateTimeFilter<"DyslexiaTest"> | Date | string
    childId?: StringFilter<"DyslexiaTest"> | string
    child?: XOR<ChildRelationFilter, ChildWhereInput>
  }

  export type DyslexiaTestOrderByWithRelationInput = {
    id?: SortOrder
    score?: SortOrder
    risk?: SortOrder
    answers?: SortOrder
    weakSkills?: SortOrder
    createdAt?: SortOrder
    childId?: SortOrder
    child?: ChildOrderByWithRelationInput
  }

  export type DyslexiaTestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DyslexiaTestWhereInput | DyslexiaTestWhereInput[]
    OR?: DyslexiaTestWhereInput[]
    NOT?: DyslexiaTestWhereInput | DyslexiaTestWhereInput[]
    score?: IntFilter<"DyslexiaTest"> | number
    risk?: StringFilter<"DyslexiaTest"> | string
    answers?: JsonFilter<"DyslexiaTest">
    weakSkills?: StringNullableListFilter<"DyslexiaTest">
    createdAt?: DateTimeFilter<"DyslexiaTest"> | Date | string
    childId?: StringFilter<"DyslexiaTest"> | string
    child?: XOR<ChildRelationFilter, ChildWhereInput>
  }, "id">

  export type DyslexiaTestOrderByWithAggregationInput = {
    id?: SortOrder
    score?: SortOrder
    risk?: SortOrder
    answers?: SortOrder
    weakSkills?: SortOrder
    createdAt?: SortOrder
    childId?: SortOrder
    _count?: DyslexiaTestCountOrderByAggregateInput
    _avg?: DyslexiaTestAvgOrderByAggregateInput
    _max?: DyslexiaTestMaxOrderByAggregateInput
    _min?: DyslexiaTestMinOrderByAggregateInput
    _sum?: DyslexiaTestSumOrderByAggregateInput
  }

  export type DyslexiaTestScalarWhereWithAggregatesInput = {
    AND?: DyslexiaTestScalarWhereWithAggregatesInput | DyslexiaTestScalarWhereWithAggregatesInput[]
    OR?: DyslexiaTestScalarWhereWithAggregatesInput[]
    NOT?: DyslexiaTestScalarWhereWithAggregatesInput | DyslexiaTestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DyslexiaTest"> | string
    score?: IntWithAggregatesFilter<"DyslexiaTest"> | number
    risk?: StringWithAggregatesFilter<"DyslexiaTest"> | string
    answers?: JsonWithAggregatesFilter<"DyslexiaTest">
    weakSkills?: StringNullableListFilter<"DyslexiaTest">
    createdAt?: DateTimeWithAggregatesFilter<"DyslexiaTest"> | Date | string
    childId?: StringWithAggregatesFilter<"DyslexiaTest"> | string
  }

  export type BadgeWhereInput = {
    AND?: BadgeWhereInput | BadgeWhereInput[]
    OR?: BadgeWhereInput[]
    NOT?: BadgeWhereInput | BadgeWhereInput[]
    id?: StringFilter<"Badge"> | string
    key?: StringFilter<"Badge"> | string
    label?: StringFilter<"Badge"> | string
    emoji?: StringFilter<"Badge"> | string
    unlocked?: BoolFilter<"Badge"> | boolean
    childId?: StringFilter<"Badge"> | string
    child?: XOR<ChildRelationFilter, ChildWhereInput>
  }

  export type BadgeOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    emoji?: SortOrder
    unlocked?: SortOrder
    childId?: SortOrder
    child?: ChildOrderByWithRelationInput
  }

  export type BadgeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    childId_key?: BadgeChildIdKeyCompoundUniqueInput
    AND?: BadgeWhereInput | BadgeWhereInput[]
    OR?: BadgeWhereInput[]
    NOT?: BadgeWhereInput | BadgeWhereInput[]
    key?: StringFilter<"Badge"> | string
    label?: StringFilter<"Badge"> | string
    emoji?: StringFilter<"Badge"> | string
    unlocked?: BoolFilter<"Badge"> | boolean
    childId?: StringFilter<"Badge"> | string
    child?: XOR<ChildRelationFilter, ChildWhereInput>
  }, "id" | "childId_key">

  export type BadgeOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    emoji?: SortOrder
    unlocked?: SortOrder
    childId?: SortOrder
    _count?: BadgeCountOrderByAggregateInput
    _max?: BadgeMaxOrderByAggregateInput
    _min?: BadgeMinOrderByAggregateInput
  }

  export type BadgeScalarWhereWithAggregatesInput = {
    AND?: BadgeScalarWhereWithAggregatesInput | BadgeScalarWhereWithAggregatesInput[]
    OR?: BadgeScalarWhereWithAggregatesInput[]
    NOT?: BadgeScalarWhereWithAggregatesInput | BadgeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Badge"> | string
    key?: StringWithAggregatesFilter<"Badge"> | string
    label?: StringWithAggregatesFilter<"Badge"> | string
    emoji?: StringWithAggregatesFilter<"Badge"> | string
    unlocked?: BoolWithAggregatesFilter<"Badge"> | boolean
    childId?: StringWithAggregatesFilter<"Badge"> | string
  }

  export type ReadingSessionWhereInput = {
    AND?: ReadingSessionWhereInput | ReadingSessionWhereInput[]
    OR?: ReadingSessionWhereInput[]
    NOT?: ReadingSessionWhereInput | ReadingSessionWhereInput[]
    id?: StringFilter<"ReadingSession"> | string
    accuracy?: FloatFilter<"ReadingSession"> | number
    durationMin?: IntFilter<"ReadingSession"> | number
    wordsRead?: IntFilter<"ReadingSession"> | number
    lessonId?: StringNullableFilter<"ReadingSession"> | string | null
    createdAt?: DateTimeFilter<"ReadingSession"> | Date | string
    childId?: StringFilter<"ReadingSession"> | string
    child?: XOR<ChildRelationFilter, ChildWhereInput>
  }

  export type ReadingSessionOrderByWithRelationInput = {
    id?: SortOrder
    accuracy?: SortOrder
    durationMin?: SortOrder
    wordsRead?: SortOrder
    lessonId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    childId?: SortOrder
    child?: ChildOrderByWithRelationInput
  }

  export type ReadingSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReadingSessionWhereInput | ReadingSessionWhereInput[]
    OR?: ReadingSessionWhereInput[]
    NOT?: ReadingSessionWhereInput | ReadingSessionWhereInput[]
    accuracy?: FloatFilter<"ReadingSession"> | number
    durationMin?: IntFilter<"ReadingSession"> | number
    wordsRead?: IntFilter<"ReadingSession"> | number
    lessonId?: StringNullableFilter<"ReadingSession"> | string | null
    createdAt?: DateTimeFilter<"ReadingSession"> | Date | string
    childId?: StringFilter<"ReadingSession"> | string
    child?: XOR<ChildRelationFilter, ChildWhereInput>
  }, "id">

  export type ReadingSessionOrderByWithAggregationInput = {
    id?: SortOrder
    accuracy?: SortOrder
    durationMin?: SortOrder
    wordsRead?: SortOrder
    lessonId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    childId?: SortOrder
    _count?: ReadingSessionCountOrderByAggregateInput
    _avg?: ReadingSessionAvgOrderByAggregateInput
    _max?: ReadingSessionMaxOrderByAggregateInput
    _min?: ReadingSessionMinOrderByAggregateInput
    _sum?: ReadingSessionSumOrderByAggregateInput
  }

  export type ReadingSessionScalarWhereWithAggregatesInput = {
    AND?: ReadingSessionScalarWhereWithAggregatesInput | ReadingSessionScalarWhereWithAggregatesInput[]
    OR?: ReadingSessionScalarWhereWithAggregatesInput[]
    NOT?: ReadingSessionScalarWhereWithAggregatesInput | ReadingSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReadingSession"> | string
    accuracy?: FloatWithAggregatesFilter<"ReadingSession"> | number
    durationMin?: IntWithAggregatesFilter<"ReadingSession"> | number
    wordsRead?: IntWithAggregatesFilter<"ReadingSession"> | number
    lessonId?: StringNullableWithAggregatesFilter<"ReadingSession"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ReadingSession"> | Date | string
    childId?: StringWithAggregatesFilter<"ReadingSession"> | string
  }

  export type LessonWhereInput = {
    AND?: LessonWhereInput | LessonWhereInput[]
    OR?: LessonWhereInput[]
    NOT?: LessonWhereInput | LessonWhereInput[]
    id?: StringFilter<"Lesson"> | string
    order?: IntFilter<"Lesson"> | number
    letter?: StringFilter<"Lesson"> | string
    title?: StringFilter<"Lesson"> | string
    emoji?: StringFilter<"Lesson"> | string
    createdAt?: DateTimeFilter<"Lesson"> | Date | string
  }

  export type LessonOrderByWithRelationInput = {
    id?: SortOrder
    order?: SortOrder
    letter?: SortOrder
    title?: SortOrder
    emoji?: SortOrder
    createdAt?: SortOrder
  }

  export type LessonWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    order?: number
    AND?: LessonWhereInput | LessonWhereInput[]
    OR?: LessonWhereInput[]
    NOT?: LessonWhereInput | LessonWhereInput[]
    letter?: StringFilter<"Lesson"> | string
    title?: StringFilter<"Lesson"> | string
    emoji?: StringFilter<"Lesson"> | string
    createdAt?: DateTimeFilter<"Lesson"> | Date | string
  }, "id" | "order">

  export type LessonOrderByWithAggregationInput = {
    id?: SortOrder
    order?: SortOrder
    letter?: SortOrder
    title?: SortOrder
    emoji?: SortOrder
    createdAt?: SortOrder
    _count?: LessonCountOrderByAggregateInput
    _avg?: LessonAvgOrderByAggregateInput
    _max?: LessonMaxOrderByAggregateInput
    _min?: LessonMinOrderByAggregateInput
    _sum?: LessonSumOrderByAggregateInput
  }

  export type LessonScalarWhereWithAggregatesInput = {
    AND?: LessonScalarWhereWithAggregatesInput | LessonScalarWhereWithAggregatesInput[]
    OR?: LessonScalarWhereWithAggregatesInput[]
    NOT?: LessonScalarWhereWithAggregatesInput | LessonScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Lesson"> | string
    order?: IntWithAggregatesFilter<"Lesson"> | number
    letter?: StringWithAggregatesFilter<"Lesson"> | string
    title?: StringWithAggregatesFilter<"Lesson"> | string
    emoji?: StringWithAggregatesFilter<"Lesson"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Lesson"> | Date | string
  }

  export type StoryWhereInput = {
    AND?: StoryWhereInput | StoryWhereInput[]
    OR?: StoryWhereInput[]
    NOT?: StoryWhereInput | StoryWhereInput[]
    id?: StringFilter<"Story"> | string
    title?: StringFilter<"Story"> | string
    emoji?: StringFilter<"Story"> | string
    level?: StringFilter<"Story"> | string
    category?: StringFilter<"Story"> | string
    hasAudio?: BoolFilter<"Story"> | boolean
    minutes?: IntFilter<"Story"> | number
  }

  export type StoryOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    emoji?: SortOrder
    level?: SortOrder
    category?: SortOrder
    hasAudio?: SortOrder
    minutes?: SortOrder
  }

  export type StoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StoryWhereInput | StoryWhereInput[]
    OR?: StoryWhereInput[]
    NOT?: StoryWhereInput | StoryWhereInput[]
    title?: StringFilter<"Story"> | string
    emoji?: StringFilter<"Story"> | string
    level?: StringFilter<"Story"> | string
    category?: StringFilter<"Story"> | string
    hasAudio?: BoolFilter<"Story"> | boolean
    minutes?: IntFilter<"Story"> | number
  }, "id">

  export type StoryOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    emoji?: SortOrder
    level?: SortOrder
    category?: SortOrder
    hasAudio?: SortOrder
    minutes?: SortOrder
    _count?: StoryCountOrderByAggregateInput
    _avg?: StoryAvgOrderByAggregateInput
    _max?: StoryMaxOrderByAggregateInput
    _min?: StoryMinOrderByAggregateInput
    _sum?: StorySumOrderByAggregateInput
  }

  export type StoryScalarWhereWithAggregatesInput = {
    AND?: StoryScalarWhereWithAggregatesInput | StoryScalarWhereWithAggregatesInput[]
    OR?: StoryScalarWhereWithAggregatesInput[]
    NOT?: StoryScalarWhereWithAggregatesInput | StoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Story"> | string
    title?: StringWithAggregatesFilter<"Story"> | string
    emoji?: StringWithAggregatesFilter<"Story"> | string
    level?: StringWithAggregatesFilter<"Story"> | string
    category?: StringWithAggregatesFilter<"Story"> | string
    hasAudio?: BoolWithAggregatesFilter<"Story"> | boolean
    minutes?: IntWithAggregatesFilter<"Story"> | number
  }

  export type GameWhereInput = {
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    id?: StringFilter<"Game"> | string
    title?: StringFilter<"Game"> | string
    subtitle?: StringFilter<"Game"> | string
    emoji?: StringFilter<"Game"> | string
  }

  export type GameOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    emoji?: SortOrder
  }

  export type GameWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    title?: StringFilter<"Game"> | string
    subtitle?: StringFilter<"Game"> | string
    emoji?: StringFilter<"Game"> | string
  }, "id">

  export type GameOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    emoji?: SortOrder
    _count?: GameCountOrderByAggregateInput
    _max?: GameMaxOrderByAggregateInput
    _min?: GameMinOrderByAggregateInput
  }

  export type GameScalarWhereWithAggregatesInput = {
    AND?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    OR?: GameScalarWhereWithAggregatesInput[]
    NOT?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Game"> | string
    title?: StringWithAggregatesFilter<"Game"> | string
    subtitle?: StringWithAggregatesFilter<"Game"> | string
    emoji?: StringWithAggregatesFilter<"Game"> | string
  }

  export type GameResultWhereInput = {
    AND?: GameResultWhereInput | GameResultWhereInput[]
    OR?: GameResultWhereInput[]
    NOT?: GameResultWhereInput | GameResultWhereInput[]
    id?: StringFilter<"GameResult"> | string
    gameTitle?: StringFilter<"GameResult"> | string
    score?: IntFilter<"GameResult"> | number
    createdAt?: DateTimeFilter<"GameResult"> | Date | string
    childId?: StringFilter<"GameResult"> | string
    child?: XOR<ChildRelationFilter, ChildWhereInput>
  }

  export type GameResultOrderByWithRelationInput = {
    id?: SortOrder
    gameTitle?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
    childId?: SortOrder
    child?: ChildOrderByWithRelationInput
  }

  export type GameResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GameResultWhereInput | GameResultWhereInput[]
    OR?: GameResultWhereInput[]
    NOT?: GameResultWhereInput | GameResultWhereInput[]
    gameTitle?: StringFilter<"GameResult"> | string
    score?: IntFilter<"GameResult"> | number
    createdAt?: DateTimeFilter<"GameResult"> | Date | string
    childId?: StringFilter<"GameResult"> | string
    child?: XOR<ChildRelationFilter, ChildWhereInput>
  }, "id">

  export type GameResultOrderByWithAggregationInput = {
    id?: SortOrder
    gameTitle?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
    childId?: SortOrder
    _count?: GameResultCountOrderByAggregateInput
    _avg?: GameResultAvgOrderByAggregateInput
    _max?: GameResultMaxOrderByAggregateInput
    _min?: GameResultMinOrderByAggregateInput
    _sum?: GameResultSumOrderByAggregateInput
  }

  export type GameResultScalarWhereWithAggregatesInput = {
    AND?: GameResultScalarWhereWithAggregatesInput | GameResultScalarWhereWithAggregatesInput[]
    OR?: GameResultScalarWhereWithAggregatesInput[]
    NOT?: GameResultScalarWhereWithAggregatesInput | GameResultScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GameResult"> | string
    gameTitle?: StringWithAggregatesFilter<"GameResult"> | string
    score?: IntWithAggregatesFilter<"GameResult"> | number
    createdAt?: DateTimeWithAggregatesFilter<"GameResult"> | Date | string
    childId?: StringWithAggregatesFilter<"GameResult"> | string
  }

  export type ChildCreateInput = {
    id?: string
    clerkId?: string | null
    email?: string | null
    name: string
    avatar?: string
    level?: number
    title?: string
    stars?: number
    streak?: number
    coins?: number
    dyslexiaTestDone?: boolean
    dyslexiaScore?: number | null
    dyslexiaRisk?: string | null
    dyslexiaTestedAt?: Date | string | null
    dyslexiaWeakSkills?: ChildCreatedyslexiaWeakSkillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    badges?: BadgeCreateNestedManyWithoutChildInput
    readingSessions?: ReadingSessionCreateNestedManyWithoutChildInput
    gameResults?: GameResultCreateNestedManyWithoutChildInput
    dyslexiaTests?: DyslexiaTestCreateNestedManyWithoutChildInput
  }

  export type ChildUncheckedCreateInput = {
    id?: string
    clerkId?: string | null
    email?: string | null
    name: string
    avatar?: string
    level?: number
    title?: string
    stars?: number
    streak?: number
    coins?: number
    dyslexiaTestDone?: boolean
    dyslexiaScore?: number | null
    dyslexiaRisk?: string | null
    dyslexiaTestedAt?: Date | string | null
    dyslexiaWeakSkills?: ChildCreatedyslexiaWeakSkillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    badges?: BadgeUncheckedCreateNestedManyWithoutChildInput
    readingSessions?: ReadingSessionUncheckedCreateNestedManyWithoutChildInput
    gameResults?: GameResultUncheckedCreateNestedManyWithoutChildInput
    dyslexiaTests?: DyslexiaTestUncheckedCreateNestedManyWithoutChildInput
  }

  export type ChildUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    stars?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    dyslexiaTestDone?: BoolFieldUpdateOperationsInput | boolean
    dyslexiaScore?: NullableIntFieldUpdateOperationsInput | number | null
    dyslexiaRisk?: NullableStringFieldUpdateOperationsInput | string | null
    dyslexiaTestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dyslexiaWeakSkills?: ChildUpdatedyslexiaWeakSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    badges?: BadgeUpdateManyWithoutChildNestedInput
    readingSessions?: ReadingSessionUpdateManyWithoutChildNestedInput
    gameResults?: GameResultUpdateManyWithoutChildNestedInput
    dyslexiaTests?: DyslexiaTestUpdateManyWithoutChildNestedInput
  }

  export type ChildUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    stars?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    dyslexiaTestDone?: BoolFieldUpdateOperationsInput | boolean
    dyslexiaScore?: NullableIntFieldUpdateOperationsInput | number | null
    dyslexiaRisk?: NullableStringFieldUpdateOperationsInput | string | null
    dyslexiaTestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dyslexiaWeakSkills?: ChildUpdatedyslexiaWeakSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    badges?: BadgeUncheckedUpdateManyWithoutChildNestedInput
    readingSessions?: ReadingSessionUncheckedUpdateManyWithoutChildNestedInput
    gameResults?: GameResultUncheckedUpdateManyWithoutChildNestedInput
    dyslexiaTests?: DyslexiaTestUncheckedUpdateManyWithoutChildNestedInput
  }

  export type ChildCreateManyInput = {
    id?: string
    clerkId?: string | null
    email?: string | null
    name: string
    avatar?: string
    level?: number
    title?: string
    stars?: number
    streak?: number
    coins?: number
    dyslexiaTestDone?: boolean
    dyslexiaScore?: number | null
    dyslexiaRisk?: string | null
    dyslexiaTestedAt?: Date | string | null
    dyslexiaWeakSkills?: ChildCreatedyslexiaWeakSkillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChildUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    stars?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    dyslexiaTestDone?: BoolFieldUpdateOperationsInput | boolean
    dyslexiaScore?: NullableIntFieldUpdateOperationsInput | number | null
    dyslexiaRisk?: NullableStringFieldUpdateOperationsInput | string | null
    dyslexiaTestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dyslexiaWeakSkills?: ChildUpdatedyslexiaWeakSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChildUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    stars?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    dyslexiaTestDone?: BoolFieldUpdateOperationsInput | boolean
    dyslexiaScore?: NullableIntFieldUpdateOperationsInput | number | null
    dyslexiaRisk?: NullableStringFieldUpdateOperationsInput | string | null
    dyslexiaTestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dyslexiaWeakSkills?: ChildUpdatedyslexiaWeakSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DyslexiaTestCreateInput = {
    id?: string
    score: number
    risk: string
    answers: JsonNullValueInput | InputJsonValue
    weakSkills?: DyslexiaTestCreateweakSkillsInput | string[]
    createdAt?: Date | string
    child: ChildCreateNestedOneWithoutDyslexiaTestsInput
  }

  export type DyslexiaTestUncheckedCreateInput = {
    id?: string
    score: number
    risk: string
    answers: JsonNullValueInput | InputJsonValue
    weakSkills?: DyslexiaTestCreateweakSkillsInput | string[]
    createdAt?: Date | string
    childId: string
  }

  export type DyslexiaTestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    risk?: StringFieldUpdateOperationsInput | string
    answers?: JsonNullValueInput | InputJsonValue
    weakSkills?: DyslexiaTestUpdateweakSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    child?: ChildUpdateOneRequiredWithoutDyslexiaTestsNestedInput
  }

  export type DyslexiaTestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    risk?: StringFieldUpdateOperationsInput | string
    answers?: JsonNullValueInput | InputJsonValue
    weakSkills?: DyslexiaTestUpdateweakSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childId?: StringFieldUpdateOperationsInput | string
  }

  export type DyslexiaTestCreateManyInput = {
    id?: string
    score: number
    risk: string
    answers: JsonNullValueInput | InputJsonValue
    weakSkills?: DyslexiaTestCreateweakSkillsInput | string[]
    createdAt?: Date | string
    childId: string
  }

  export type DyslexiaTestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    risk?: StringFieldUpdateOperationsInput | string
    answers?: JsonNullValueInput | InputJsonValue
    weakSkills?: DyslexiaTestUpdateweakSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DyslexiaTestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    risk?: StringFieldUpdateOperationsInput | string
    answers?: JsonNullValueInput | InputJsonValue
    weakSkills?: DyslexiaTestUpdateweakSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childId?: StringFieldUpdateOperationsInput | string
  }

  export type BadgeCreateInput = {
    id?: string
    key: string
    label: string
    emoji: string
    unlocked?: boolean
    child: ChildCreateNestedOneWithoutBadgesInput
  }

  export type BadgeUncheckedCreateInput = {
    id?: string
    key: string
    label: string
    emoji: string
    unlocked?: boolean
    childId: string
  }

  export type BadgeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    unlocked?: BoolFieldUpdateOperationsInput | boolean
    child?: ChildUpdateOneRequiredWithoutBadgesNestedInput
  }

  export type BadgeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    unlocked?: BoolFieldUpdateOperationsInput | boolean
    childId?: StringFieldUpdateOperationsInput | string
  }

  export type BadgeCreateManyInput = {
    id?: string
    key: string
    label: string
    emoji: string
    unlocked?: boolean
    childId: string
  }

  export type BadgeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    unlocked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BadgeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    unlocked?: BoolFieldUpdateOperationsInput | boolean
    childId?: StringFieldUpdateOperationsInput | string
  }

  export type ReadingSessionCreateInput = {
    id?: string
    accuracy?: number
    durationMin?: number
    wordsRead?: number
    lessonId?: string | null
    createdAt?: Date | string
    child: ChildCreateNestedOneWithoutReadingSessionsInput
  }

  export type ReadingSessionUncheckedCreateInput = {
    id?: string
    accuracy?: number
    durationMin?: number
    wordsRead?: number
    lessonId?: string | null
    createdAt?: Date | string
    childId: string
  }

  export type ReadingSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accuracy?: FloatFieldUpdateOperationsInput | number
    durationMin?: IntFieldUpdateOperationsInput | number
    wordsRead?: IntFieldUpdateOperationsInput | number
    lessonId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    child?: ChildUpdateOneRequiredWithoutReadingSessionsNestedInput
  }

  export type ReadingSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accuracy?: FloatFieldUpdateOperationsInput | number
    durationMin?: IntFieldUpdateOperationsInput | number
    wordsRead?: IntFieldUpdateOperationsInput | number
    lessonId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childId?: StringFieldUpdateOperationsInput | string
  }

  export type ReadingSessionCreateManyInput = {
    id?: string
    accuracy?: number
    durationMin?: number
    wordsRead?: number
    lessonId?: string | null
    createdAt?: Date | string
    childId: string
  }

  export type ReadingSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accuracy?: FloatFieldUpdateOperationsInput | number
    durationMin?: IntFieldUpdateOperationsInput | number
    wordsRead?: IntFieldUpdateOperationsInput | number
    lessonId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadingSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accuracy?: FloatFieldUpdateOperationsInput | number
    durationMin?: IntFieldUpdateOperationsInput | number
    wordsRead?: IntFieldUpdateOperationsInput | number
    lessonId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childId?: StringFieldUpdateOperationsInput | string
  }

  export type LessonCreateInput = {
    id?: string
    order: number
    letter: string
    title: string
    emoji?: string
    createdAt?: Date | string
  }

  export type LessonUncheckedCreateInput = {
    id?: string
    order: number
    letter: string
    title: string
    emoji?: string
    createdAt?: Date | string
  }

  export type LessonUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    letter?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    letter?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonCreateManyInput = {
    id?: string
    order: number
    letter: string
    title: string
    emoji?: string
    createdAt?: Date | string
  }

  export type LessonUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    letter?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    letter?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoryCreateInput = {
    id?: string
    title: string
    emoji: string
    level: string
    category: string
    hasAudio?: boolean
    minutes?: number
  }

  export type StoryUncheckedCreateInput = {
    id?: string
    title: string
    emoji: string
    level: string
    category: string
    hasAudio?: boolean
    minutes?: number
  }

  export type StoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    hasAudio?: BoolFieldUpdateOperationsInput | boolean
    minutes?: IntFieldUpdateOperationsInput | number
  }

  export type StoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    hasAudio?: BoolFieldUpdateOperationsInput | boolean
    minutes?: IntFieldUpdateOperationsInput | number
  }

  export type StoryCreateManyInput = {
    id?: string
    title: string
    emoji: string
    level: string
    category: string
    hasAudio?: boolean
    minutes?: number
  }

  export type StoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    hasAudio?: BoolFieldUpdateOperationsInput | boolean
    minutes?: IntFieldUpdateOperationsInput | number
  }

  export type StoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    hasAudio?: BoolFieldUpdateOperationsInput | boolean
    minutes?: IntFieldUpdateOperationsInput | number
  }

  export type GameCreateInput = {
    id?: string
    title: string
    subtitle: string
    emoji: string
  }

  export type GameUncheckedCreateInput = {
    id?: string
    title: string
    subtitle: string
    emoji: string
  }

  export type GameUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
  }

  export type GameUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
  }

  export type GameCreateManyInput = {
    id?: string
    title: string
    subtitle: string
    emoji: string
  }

  export type GameUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
  }

  export type GameUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
  }

  export type GameResultCreateInput = {
    id?: string
    gameTitle: string
    score?: number
    createdAt?: Date | string
    child: ChildCreateNestedOneWithoutGameResultsInput
  }

  export type GameResultUncheckedCreateInput = {
    id?: string
    gameTitle: string
    score?: number
    createdAt?: Date | string
    childId: string
  }

  export type GameResultUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameTitle?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    child?: ChildUpdateOneRequiredWithoutGameResultsNestedInput
  }

  export type GameResultUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameTitle?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childId?: StringFieldUpdateOperationsInput | string
  }

  export type GameResultCreateManyInput = {
    id?: string
    gameTitle: string
    score?: number
    createdAt?: Date | string
    childId: string
  }

  export type GameResultUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameTitle?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameResultUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameTitle?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childId?: StringFieldUpdateOperationsInput | string
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

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
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

  export type BadgeListRelationFilter = {
    every?: BadgeWhereInput
    some?: BadgeWhereInput
    none?: BadgeWhereInput
  }

  export type ReadingSessionListRelationFilter = {
    every?: ReadingSessionWhereInput
    some?: ReadingSessionWhereInput
    none?: ReadingSessionWhereInput
  }

  export type GameResultListRelationFilter = {
    every?: GameResultWhereInput
    some?: GameResultWhereInput
    none?: GameResultWhereInput
  }

  export type DyslexiaTestListRelationFilter = {
    every?: DyslexiaTestWhereInput
    some?: DyslexiaTestWhereInput
    none?: DyslexiaTestWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BadgeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReadingSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameResultOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DyslexiaTestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChildCountOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    level?: SortOrder
    title?: SortOrder
    stars?: SortOrder
    streak?: SortOrder
    coins?: SortOrder
    dyslexiaTestDone?: SortOrder
    dyslexiaScore?: SortOrder
    dyslexiaRisk?: SortOrder
    dyslexiaTestedAt?: SortOrder
    dyslexiaWeakSkills?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChildAvgOrderByAggregateInput = {
    level?: SortOrder
    stars?: SortOrder
    streak?: SortOrder
    coins?: SortOrder
    dyslexiaScore?: SortOrder
  }

  export type ChildMaxOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    level?: SortOrder
    title?: SortOrder
    stars?: SortOrder
    streak?: SortOrder
    coins?: SortOrder
    dyslexiaTestDone?: SortOrder
    dyslexiaScore?: SortOrder
    dyslexiaRisk?: SortOrder
    dyslexiaTestedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChildMinOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    level?: SortOrder
    title?: SortOrder
    stars?: SortOrder
    streak?: SortOrder
    coins?: SortOrder
    dyslexiaTestDone?: SortOrder
    dyslexiaScore?: SortOrder
    dyslexiaRisk?: SortOrder
    dyslexiaTestedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChildSumOrderByAggregateInput = {
    level?: SortOrder
    stars?: SortOrder
    streak?: SortOrder
    coins?: SortOrder
    dyslexiaScore?: SortOrder
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

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ChildRelationFilter = {
    is?: ChildWhereInput
    isNot?: ChildWhereInput
  }

  export type DyslexiaTestCountOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    risk?: SortOrder
    answers?: SortOrder
    weakSkills?: SortOrder
    createdAt?: SortOrder
    childId?: SortOrder
  }

  export type DyslexiaTestAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type DyslexiaTestMaxOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    risk?: SortOrder
    createdAt?: SortOrder
    childId?: SortOrder
  }

  export type DyslexiaTestMinOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    risk?: SortOrder
    createdAt?: SortOrder
    childId?: SortOrder
  }

  export type DyslexiaTestSumOrderByAggregateInput = {
    score?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BadgeChildIdKeyCompoundUniqueInput = {
    childId: string
    key: string
  }

  export type BadgeCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    emoji?: SortOrder
    unlocked?: SortOrder
    childId?: SortOrder
  }

  export type BadgeMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    emoji?: SortOrder
    unlocked?: SortOrder
    childId?: SortOrder
  }

  export type BadgeMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    emoji?: SortOrder
    unlocked?: SortOrder
    childId?: SortOrder
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

  export type ReadingSessionCountOrderByAggregateInput = {
    id?: SortOrder
    accuracy?: SortOrder
    durationMin?: SortOrder
    wordsRead?: SortOrder
    lessonId?: SortOrder
    createdAt?: SortOrder
    childId?: SortOrder
  }

  export type ReadingSessionAvgOrderByAggregateInput = {
    accuracy?: SortOrder
    durationMin?: SortOrder
    wordsRead?: SortOrder
  }

  export type ReadingSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    accuracy?: SortOrder
    durationMin?: SortOrder
    wordsRead?: SortOrder
    lessonId?: SortOrder
    createdAt?: SortOrder
    childId?: SortOrder
  }

  export type ReadingSessionMinOrderByAggregateInput = {
    id?: SortOrder
    accuracy?: SortOrder
    durationMin?: SortOrder
    wordsRead?: SortOrder
    lessonId?: SortOrder
    createdAt?: SortOrder
    childId?: SortOrder
  }

  export type ReadingSessionSumOrderByAggregateInput = {
    accuracy?: SortOrder
    durationMin?: SortOrder
    wordsRead?: SortOrder
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

  export type LessonCountOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    letter?: SortOrder
    title?: SortOrder
    emoji?: SortOrder
    createdAt?: SortOrder
  }

  export type LessonAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type LessonMaxOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    letter?: SortOrder
    title?: SortOrder
    emoji?: SortOrder
    createdAt?: SortOrder
  }

  export type LessonMinOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    letter?: SortOrder
    title?: SortOrder
    emoji?: SortOrder
    createdAt?: SortOrder
  }

  export type LessonSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type StoryCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    emoji?: SortOrder
    level?: SortOrder
    category?: SortOrder
    hasAudio?: SortOrder
    minutes?: SortOrder
  }

  export type StoryAvgOrderByAggregateInput = {
    minutes?: SortOrder
  }

  export type StoryMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    emoji?: SortOrder
    level?: SortOrder
    category?: SortOrder
    hasAudio?: SortOrder
    minutes?: SortOrder
  }

  export type StoryMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    emoji?: SortOrder
    level?: SortOrder
    category?: SortOrder
    hasAudio?: SortOrder
    minutes?: SortOrder
  }

  export type StorySumOrderByAggregateInput = {
    minutes?: SortOrder
  }

  export type GameCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    emoji?: SortOrder
  }

  export type GameMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    emoji?: SortOrder
  }

  export type GameMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    emoji?: SortOrder
  }

  export type GameResultCountOrderByAggregateInput = {
    id?: SortOrder
    gameTitle?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
    childId?: SortOrder
  }

  export type GameResultAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type GameResultMaxOrderByAggregateInput = {
    id?: SortOrder
    gameTitle?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
    childId?: SortOrder
  }

  export type GameResultMinOrderByAggregateInput = {
    id?: SortOrder
    gameTitle?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
    childId?: SortOrder
  }

  export type GameResultSumOrderByAggregateInput = {
    score?: SortOrder
  }

  export type ChildCreatedyslexiaWeakSkillsInput = {
    set: string[]
  }

  export type BadgeCreateNestedManyWithoutChildInput = {
    create?: XOR<BadgeCreateWithoutChildInput, BadgeUncheckedCreateWithoutChildInput> | BadgeCreateWithoutChildInput[] | BadgeUncheckedCreateWithoutChildInput[]
    connectOrCreate?: BadgeCreateOrConnectWithoutChildInput | BadgeCreateOrConnectWithoutChildInput[]
    createMany?: BadgeCreateManyChildInputEnvelope
    connect?: BadgeWhereUniqueInput | BadgeWhereUniqueInput[]
  }

  export type ReadingSessionCreateNestedManyWithoutChildInput = {
    create?: XOR<ReadingSessionCreateWithoutChildInput, ReadingSessionUncheckedCreateWithoutChildInput> | ReadingSessionCreateWithoutChildInput[] | ReadingSessionUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ReadingSessionCreateOrConnectWithoutChildInput | ReadingSessionCreateOrConnectWithoutChildInput[]
    createMany?: ReadingSessionCreateManyChildInputEnvelope
    connect?: ReadingSessionWhereUniqueInput | ReadingSessionWhereUniqueInput[]
  }

  export type GameResultCreateNestedManyWithoutChildInput = {
    create?: XOR<GameResultCreateWithoutChildInput, GameResultUncheckedCreateWithoutChildInput> | GameResultCreateWithoutChildInput[] | GameResultUncheckedCreateWithoutChildInput[]
    connectOrCreate?: GameResultCreateOrConnectWithoutChildInput | GameResultCreateOrConnectWithoutChildInput[]
    createMany?: GameResultCreateManyChildInputEnvelope
    connect?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
  }

  export type DyslexiaTestCreateNestedManyWithoutChildInput = {
    create?: XOR<DyslexiaTestCreateWithoutChildInput, DyslexiaTestUncheckedCreateWithoutChildInput> | DyslexiaTestCreateWithoutChildInput[] | DyslexiaTestUncheckedCreateWithoutChildInput[]
    connectOrCreate?: DyslexiaTestCreateOrConnectWithoutChildInput | DyslexiaTestCreateOrConnectWithoutChildInput[]
    createMany?: DyslexiaTestCreateManyChildInputEnvelope
    connect?: DyslexiaTestWhereUniqueInput | DyslexiaTestWhereUniqueInput[]
  }

  export type BadgeUncheckedCreateNestedManyWithoutChildInput = {
    create?: XOR<BadgeCreateWithoutChildInput, BadgeUncheckedCreateWithoutChildInput> | BadgeCreateWithoutChildInput[] | BadgeUncheckedCreateWithoutChildInput[]
    connectOrCreate?: BadgeCreateOrConnectWithoutChildInput | BadgeCreateOrConnectWithoutChildInput[]
    createMany?: BadgeCreateManyChildInputEnvelope
    connect?: BadgeWhereUniqueInput | BadgeWhereUniqueInput[]
  }

  export type ReadingSessionUncheckedCreateNestedManyWithoutChildInput = {
    create?: XOR<ReadingSessionCreateWithoutChildInput, ReadingSessionUncheckedCreateWithoutChildInput> | ReadingSessionCreateWithoutChildInput[] | ReadingSessionUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ReadingSessionCreateOrConnectWithoutChildInput | ReadingSessionCreateOrConnectWithoutChildInput[]
    createMany?: ReadingSessionCreateManyChildInputEnvelope
    connect?: ReadingSessionWhereUniqueInput | ReadingSessionWhereUniqueInput[]
  }

  export type GameResultUncheckedCreateNestedManyWithoutChildInput = {
    create?: XOR<GameResultCreateWithoutChildInput, GameResultUncheckedCreateWithoutChildInput> | GameResultCreateWithoutChildInput[] | GameResultUncheckedCreateWithoutChildInput[]
    connectOrCreate?: GameResultCreateOrConnectWithoutChildInput | GameResultCreateOrConnectWithoutChildInput[]
    createMany?: GameResultCreateManyChildInputEnvelope
    connect?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
  }

  export type DyslexiaTestUncheckedCreateNestedManyWithoutChildInput = {
    create?: XOR<DyslexiaTestCreateWithoutChildInput, DyslexiaTestUncheckedCreateWithoutChildInput> | DyslexiaTestCreateWithoutChildInput[] | DyslexiaTestUncheckedCreateWithoutChildInput[]
    connectOrCreate?: DyslexiaTestCreateOrConnectWithoutChildInput | DyslexiaTestCreateOrConnectWithoutChildInput[]
    createMany?: DyslexiaTestCreateManyChildInputEnvelope
    connect?: DyslexiaTestWhereUniqueInput | DyslexiaTestWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ChildUpdatedyslexiaWeakSkillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BadgeUpdateManyWithoutChildNestedInput = {
    create?: XOR<BadgeCreateWithoutChildInput, BadgeUncheckedCreateWithoutChildInput> | BadgeCreateWithoutChildInput[] | BadgeUncheckedCreateWithoutChildInput[]
    connectOrCreate?: BadgeCreateOrConnectWithoutChildInput | BadgeCreateOrConnectWithoutChildInput[]
    upsert?: BadgeUpsertWithWhereUniqueWithoutChildInput | BadgeUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: BadgeCreateManyChildInputEnvelope
    set?: BadgeWhereUniqueInput | BadgeWhereUniqueInput[]
    disconnect?: BadgeWhereUniqueInput | BadgeWhereUniqueInput[]
    delete?: BadgeWhereUniqueInput | BadgeWhereUniqueInput[]
    connect?: BadgeWhereUniqueInput | BadgeWhereUniqueInput[]
    update?: BadgeUpdateWithWhereUniqueWithoutChildInput | BadgeUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: BadgeUpdateManyWithWhereWithoutChildInput | BadgeUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: BadgeScalarWhereInput | BadgeScalarWhereInput[]
  }

  export type ReadingSessionUpdateManyWithoutChildNestedInput = {
    create?: XOR<ReadingSessionCreateWithoutChildInput, ReadingSessionUncheckedCreateWithoutChildInput> | ReadingSessionCreateWithoutChildInput[] | ReadingSessionUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ReadingSessionCreateOrConnectWithoutChildInput | ReadingSessionCreateOrConnectWithoutChildInput[]
    upsert?: ReadingSessionUpsertWithWhereUniqueWithoutChildInput | ReadingSessionUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: ReadingSessionCreateManyChildInputEnvelope
    set?: ReadingSessionWhereUniqueInput | ReadingSessionWhereUniqueInput[]
    disconnect?: ReadingSessionWhereUniqueInput | ReadingSessionWhereUniqueInput[]
    delete?: ReadingSessionWhereUniqueInput | ReadingSessionWhereUniqueInput[]
    connect?: ReadingSessionWhereUniqueInput | ReadingSessionWhereUniqueInput[]
    update?: ReadingSessionUpdateWithWhereUniqueWithoutChildInput | ReadingSessionUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: ReadingSessionUpdateManyWithWhereWithoutChildInput | ReadingSessionUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: ReadingSessionScalarWhereInput | ReadingSessionScalarWhereInput[]
  }

  export type GameResultUpdateManyWithoutChildNestedInput = {
    create?: XOR<GameResultCreateWithoutChildInput, GameResultUncheckedCreateWithoutChildInput> | GameResultCreateWithoutChildInput[] | GameResultUncheckedCreateWithoutChildInput[]
    connectOrCreate?: GameResultCreateOrConnectWithoutChildInput | GameResultCreateOrConnectWithoutChildInput[]
    upsert?: GameResultUpsertWithWhereUniqueWithoutChildInput | GameResultUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: GameResultCreateManyChildInputEnvelope
    set?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    disconnect?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    delete?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    connect?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    update?: GameResultUpdateWithWhereUniqueWithoutChildInput | GameResultUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: GameResultUpdateManyWithWhereWithoutChildInput | GameResultUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: GameResultScalarWhereInput | GameResultScalarWhereInput[]
  }

  export type DyslexiaTestUpdateManyWithoutChildNestedInput = {
    create?: XOR<DyslexiaTestCreateWithoutChildInput, DyslexiaTestUncheckedCreateWithoutChildInput> | DyslexiaTestCreateWithoutChildInput[] | DyslexiaTestUncheckedCreateWithoutChildInput[]
    connectOrCreate?: DyslexiaTestCreateOrConnectWithoutChildInput | DyslexiaTestCreateOrConnectWithoutChildInput[]
    upsert?: DyslexiaTestUpsertWithWhereUniqueWithoutChildInput | DyslexiaTestUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: DyslexiaTestCreateManyChildInputEnvelope
    set?: DyslexiaTestWhereUniqueInput | DyslexiaTestWhereUniqueInput[]
    disconnect?: DyslexiaTestWhereUniqueInput | DyslexiaTestWhereUniqueInput[]
    delete?: DyslexiaTestWhereUniqueInput | DyslexiaTestWhereUniqueInput[]
    connect?: DyslexiaTestWhereUniqueInput | DyslexiaTestWhereUniqueInput[]
    update?: DyslexiaTestUpdateWithWhereUniqueWithoutChildInput | DyslexiaTestUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: DyslexiaTestUpdateManyWithWhereWithoutChildInput | DyslexiaTestUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: DyslexiaTestScalarWhereInput | DyslexiaTestScalarWhereInput[]
  }

  export type BadgeUncheckedUpdateManyWithoutChildNestedInput = {
    create?: XOR<BadgeCreateWithoutChildInput, BadgeUncheckedCreateWithoutChildInput> | BadgeCreateWithoutChildInput[] | BadgeUncheckedCreateWithoutChildInput[]
    connectOrCreate?: BadgeCreateOrConnectWithoutChildInput | BadgeCreateOrConnectWithoutChildInput[]
    upsert?: BadgeUpsertWithWhereUniqueWithoutChildInput | BadgeUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: BadgeCreateManyChildInputEnvelope
    set?: BadgeWhereUniqueInput | BadgeWhereUniqueInput[]
    disconnect?: BadgeWhereUniqueInput | BadgeWhereUniqueInput[]
    delete?: BadgeWhereUniqueInput | BadgeWhereUniqueInput[]
    connect?: BadgeWhereUniqueInput | BadgeWhereUniqueInput[]
    update?: BadgeUpdateWithWhereUniqueWithoutChildInput | BadgeUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: BadgeUpdateManyWithWhereWithoutChildInput | BadgeUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: BadgeScalarWhereInput | BadgeScalarWhereInput[]
  }

  export type ReadingSessionUncheckedUpdateManyWithoutChildNestedInput = {
    create?: XOR<ReadingSessionCreateWithoutChildInput, ReadingSessionUncheckedCreateWithoutChildInput> | ReadingSessionCreateWithoutChildInput[] | ReadingSessionUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ReadingSessionCreateOrConnectWithoutChildInput | ReadingSessionCreateOrConnectWithoutChildInput[]
    upsert?: ReadingSessionUpsertWithWhereUniqueWithoutChildInput | ReadingSessionUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: ReadingSessionCreateManyChildInputEnvelope
    set?: ReadingSessionWhereUniqueInput | ReadingSessionWhereUniqueInput[]
    disconnect?: ReadingSessionWhereUniqueInput | ReadingSessionWhereUniqueInput[]
    delete?: ReadingSessionWhereUniqueInput | ReadingSessionWhereUniqueInput[]
    connect?: ReadingSessionWhereUniqueInput | ReadingSessionWhereUniqueInput[]
    update?: ReadingSessionUpdateWithWhereUniqueWithoutChildInput | ReadingSessionUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: ReadingSessionUpdateManyWithWhereWithoutChildInput | ReadingSessionUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: ReadingSessionScalarWhereInput | ReadingSessionScalarWhereInput[]
  }

  export type GameResultUncheckedUpdateManyWithoutChildNestedInput = {
    create?: XOR<GameResultCreateWithoutChildInput, GameResultUncheckedCreateWithoutChildInput> | GameResultCreateWithoutChildInput[] | GameResultUncheckedCreateWithoutChildInput[]
    connectOrCreate?: GameResultCreateOrConnectWithoutChildInput | GameResultCreateOrConnectWithoutChildInput[]
    upsert?: GameResultUpsertWithWhereUniqueWithoutChildInput | GameResultUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: GameResultCreateManyChildInputEnvelope
    set?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    disconnect?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    delete?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    connect?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    update?: GameResultUpdateWithWhereUniqueWithoutChildInput | GameResultUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: GameResultUpdateManyWithWhereWithoutChildInput | GameResultUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: GameResultScalarWhereInput | GameResultScalarWhereInput[]
  }

  export type DyslexiaTestUncheckedUpdateManyWithoutChildNestedInput = {
    create?: XOR<DyslexiaTestCreateWithoutChildInput, DyslexiaTestUncheckedCreateWithoutChildInput> | DyslexiaTestCreateWithoutChildInput[] | DyslexiaTestUncheckedCreateWithoutChildInput[]
    connectOrCreate?: DyslexiaTestCreateOrConnectWithoutChildInput | DyslexiaTestCreateOrConnectWithoutChildInput[]
    upsert?: DyslexiaTestUpsertWithWhereUniqueWithoutChildInput | DyslexiaTestUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: DyslexiaTestCreateManyChildInputEnvelope
    set?: DyslexiaTestWhereUniqueInput | DyslexiaTestWhereUniqueInput[]
    disconnect?: DyslexiaTestWhereUniqueInput | DyslexiaTestWhereUniqueInput[]
    delete?: DyslexiaTestWhereUniqueInput | DyslexiaTestWhereUniqueInput[]
    connect?: DyslexiaTestWhereUniqueInput | DyslexiaTestWhereUniqueInput[]
    update?: DyslexiaTestUpdateWithWhereUniqueWithoutChildInput | DyslexiaTestUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: DyslexiaTestUpdateManyWithWhereWithoutChildInput | DyslexiaTestUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: DyslexiaTestScalarWhereInput | DyslexiaTestScalarWhereInput[]
  }

  export type DyslexiaTestCreateweakSkillsInput = {
    set: string[]
  }

  export type ChildCreateNestedOneWithoutDyslexiaTestsInput = {
    create?: XOR<ChildCreateWithoutDyslexiaTestsInput, ChildUncheckedCreateWithoutDyslexiaTestsInput>
    connectOrCreate?: ChildCreateOrConnectWithoutDyslexiaTestsInput
    connect?: ChildWhereUniqueInput
  }

  export type DyslexiaTestUpdateweakSkillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ChildUpdateOneRequiredWithoutDyslexiaTestsNestedInput = {
    create?: XOR<ChildCreateWithoutDyslexiaTestsInput, ChildUncheckedCreateWithoutDyslexiaTestsInput>
    connectOrCreate?: ChildCreateOrConnectWithoutDyslexiaTestsInput
    upsert?: ChildUpsertWithoutDyslexiaTestsInput
    connect?: ChildWhereUniqueInput
    update?: XOR<XOR<ChildUpdateToOneWithWhereWithoutDyslexiaTestsInput, ChildUpdateWithoutDyslexiaTestsInput>, ChildUncheckedUpdateWithoutDyslexiaTestsInput>
  }

  export type ChildCreateNestedOneWithoutBadgesInput = {
    create?: XOR<ChildCreateWithoutBadgesInput, ChildUncheckedCreateWithoutBadgesInput>
    connectOrCreate?: ChildCreateOrConnectWithoutBadgesInput
    connect?: ChildWhereUniqueInput
  }

  export type ChildUpdateOneRequiredWithoutBadgesNestedInput = {
    create?: XOR<ChildCreateWithoutBadgesInput, ChildUncheckedCreateWithoutBadgesInput>
    connectOrCreate?: ChildCreateOrConnectWithoutBadgesInput
    upsert?: ChildUpsertWithoutBadgesInput
    connect?: ChildWhereUniqueInput
    update?: XOR<XOR<ChildUpdateToOneWithWhereWithoutBadgesInput, ChildUpdateWithoutBadgesInput>, ChildUncheckedUpdateWithoutBadgesInput>
  }

  export type ChildCreateNestedOneWithoutReadingSessionsInput = {
    create?: XOR<ChildCreateWithoutReadingSessionsInput, ChildUncheckedCreateWithoutReadingSessionsInput>
    connectOrCreate?: ChildCreateOrConnectWithoutReadingSessionsInput
    connect?: ChildWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ChildUpdateOneRequiredWithoutReadingSessionsNestedInput = {
    create?: XOR<ChildCreateWithoutReadingSessionsInput, ChildUncheckedCreateWithoutReadingSessionsInput>
    connectOrCreate?: ChildCreateOrConnectWithoutReadingSessionsInput
    upsert?: ChildUpsertWithoutReadingSessionsInput
    connect?: ChildWhereUniqueInput
    update?: XOR<XOR<ChildUpdateToOneWithWhereWithoutReadingSessionsInput, ChildUpdateWithoutReadingSessionsInput>, ChildUncheckedUpdateWithoutReadingSessionsInput>
  }

  export type ChildCreateNestedOneWithoutGameResultsInput = {
    create?: XOR<ChildCreateWithoutGameResultsInput, ChildUncheckedCreateWithoutGameResultsInput>
    connectOrCreate?: ChildCreateOrConnectWithoutGameResultsInput
    connect?: ChildWhereUniqueInput
  }

  export type ChildUpdateOneRequiredWithoutGameResultsNestedInput = {
    create?: XOR<ChildCreateWithoutGameResultsInput, ChildUncheckedCreateWithoutGameResultsInput>
    connectOrCreate?: ChildCreateOrConnectWithoutGameResultsInput
    upsert?: ChildUpsertWithoutGameResultsInput
    connect?: ChildWhereUniqueInput
    update?: XOR<XOR<ChildUpdateToOneWithWhereWithoutGameResultsInput, ChildUpdateWithoutGameResultsInput>, ChildUncheckedUpdateWithoutGameResultsInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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

  export type BadgeCreateWithoutChildInput = {
    id?: string
    key: string
    label: string
    emoji: string
    unlocked?: boolean
  }

  export type BadgeUncheckedCreateWithoutChildInput = {
    id?: string
    key: string
    label: string
    emoji: string
    unlocked?: boolean
  }

  export type BadgeCreateOrConnectWithoutChildInput = {
    where: BadgeWhereUniqueInput
    create: XOR<BadgeCreateWithoutChildInput, BadgeUncheckedCreateWithoutChildInput>
  }

  export type BadgeCreateManyChildInputEnvelope = {
    data: BadgeCreateManyChildInput | BadgeCreateManyChildInput[]
    skipDuplicates?: boolean
  }

  export type ReadingSessionCreateWithoutChildInput = {
    id?: string
    accuracy?: number
    durationMin?: number
    wordsRead?: number
    lessonId?: string | null
    createdAt?: Date | string
  }

  export type ReadingSessionUncheckedCreateWithoutChildInput = {
    id?: string
    accuracy?: number
    durationMin?: number
    wordsRead?: number
    lessonId?: string | null
    createdAt?: Date | string
  }

  export type ReadingSessionCreateOrConnectWithoutChildInput = {
    where: ReadingSessionWhereUniqueInput
    create: XOR<ReadingSessionCreateWithoutChildInput, ReadingSessionUncheckedCreateWithoutChildInput>
  }

  export type ReadingSessionCreateManyChildInputEnvelope = {
    data: ReadingSessionCreateManyChildInput | ReadingSessionCreateManyChildInput[]
    skipDuplicates?: boolean
  }

  export type GameResultCreateWithoutChildInput = {
    id?: string
    gameTitle: string
    score?: number
    createdAt?: Date | string
  }

  export type GameResultUncheckedCreateWithoutChildInput = {
    id?: string
    gameTitle: string
    score?: number
    createdAt?: Date | string
  }

  export type GameResultCreateOrConnectWithoutChildInput = {
    where: GameResultWhereUniqueInput
    create: XOR<GameResultCreateWithoutChildInput, GameResultUncheckedCreateWithoutChildInput>
  }

  export type GameResultCreateManyChildInputEnvelope = {
    data: GameResultCreateManyChildInput | GameResultCreateManyChildInput[]
    skipDuplicates?: boolean
  }

  export type DyslexiaTestCreateWithoutChildInput = {
    id?: string
    score: number
    risk: string
    answers: JsonNullValueInput | InputJsonValue
    weakSkills?: DyslexiaTestCreateweakSkillsInput | string[]
    createdAt?: Date | string
  }

  export type DyslexiaTestUncheckedCreateWithoutChildInput = {
    id?: string
    score: number
    risk: string
    answers: JsonNullValueInput | InputJsonValue
    weakSkills?: DyslexiaTestCreateweakSkillsInput | string[]
    createdAt?: Date | string
  }

  export type DyslexiaTestCreateOrConnectWithoutChildInput = {
    where: DyslexiaTestWhereUniqueInput
    create: XOR<DyslexiaTestCreateWithoutChildInput, DyslexiaTestUncheckedCreateWithoutChildInput>
  }

  export type DyslexiaTestCreateManyChildInputEnvelope = {
    data: DyslexiaTestCreateManyChildInput | DyslexiaTestCreateManyChildInput[]
    skipDuplicates?: boolean
  }

  export type BadgeUpsertWithWhereUniqueWithoutChildInput = {
    where: BadgeWhereUniqueInput
    update: XOR<BadgeUpdateWithoutChildInput, BadgeUncheckedUpdateWithoutChildInput>
    create: XOR<BadgeCreateWithoutChildInput, BadgeUncheckedCreateWithoutChildInput>
  }

  export type BadgeUpdateWithWhereUniqueWithoutChildInput = {
    where: BadgeWhereUniqueInput
    data: XOR<BadgeUpdateWithoutChildInput, BadgeUncheckedUpdateWithoutChildInput>
  }

  export type BadgeUpdateManyWithWhereWithoutChildInput = {
    where: BadgeScalarWhereInput
    data: XOR<BadgeUpdateManyMutationInput, BadgeUncheckedUpdateManyWithoutChildInput>
  }

  export type BadgeScalarWhereInput = {
    AND?: BadgeScalarWhereInput | BadgeScalarWhereInput[]
    OR?: BadgeScalarWhereInput[]
    NOT?: BadgeScalarWhereInput | BadgeScalarWhereInput[]
    id?: StringFilter<"Badge"> | string
    key?: StringFilter<"Badge"> | string
    label?: StringFilter<"Badge"> | string
    emoji?: StringFilter<"Badge"> | string
    unlocked?: BoolFilter<"Badge"> | boolean
    childId?: StringFilter<"Badge"> | string
  }

  export type ReadingSessionUpsertWithWhereUniqueWithoutChildInput = {
    where: ReadingSessionWhereUniqueInput
    update: XOR<ReadingSessionUpdateWithoutChildInput, ReadingSessionUncheckedUpdateWithoutChildInput>
    create: XOR<ReadingSessionCreateWithoutChildInput, ReadingSessionUncheckedCreateWithoutChildInput>
  }

  export type ReadingSessionUpdateWithWhereUniqueWithoutChildInput = {
    where: ReadingSessionWhereUniqueInput
    data: XOR<ReadingSessionUpdateWithoutChildInput, ReadingSessionUncheckedUpdateWithoutChildInput>
  }

  export type ReadingSessionUpdateManyWithWhereWithoutChildInput = {
    where: ReadingSessionScalarWhereInput
    data: XOR<ReadingSessionUpdateManyMutationInput, ReadingSessionUncheckedUpdateManyWithoutChildInput>
  }

  export type ReadingSessionScalarWhereInput = {
    AND?: ReadingSessionScalarWhereInput | ReadingSessionScalarWhereInput[]
    OR?: ReadingSessionScalarWhereInput[]
    NOT?: ReadingSessionScalarWhereInput | ReadingSessionScalarWhereInput[]
    id?: StringFilter<"ReadingSession"> | string
    accuracy?: FloatFilter<"ReadingSession"> | number
    durationMin?: IntFilter<"ReadingSession"> | number
    wordsRead?: IntFilter<"ReadingSession"> | number
    lessonId?: StringNullableFilter<"ReadingSession"> | string | null
    createdAt?: DateTimeFilter<"ReadingSession"> | Date | string
    childId?: StringFilter<"ReadingSession"> | string
  }

  export type GameResultUpsertWithWhereUniqueWithoutChildInput = {
    where: GameResultWhereUniqueInput
    update: XOR<GameResultUpdateWithoutChildInput, GameResultUncheckedUpdateWithoutChildInput>
    create: XOR<GameResultCreateWithoutChildInput, GameResultUncheckedCreateWithoutChildInput>
  }

  export type GameResultUpdateWithWhereUniqueWithoutChildInput = {
    where: GameResultWhereUniqueInput
    data: XOR<GameResultUpdateWithoutChildInput, GameResultUncheckedUpdateWithoutChildInput>
  }

  export type GameResultUpdateManyWithWhereWithoutChildInput = {
    where: GameResultScalarWhereInput
    data: XOR<GameResultUpdateManyMutationInput, GameResultUncheckedUpdateManyWithoutChildInput>
  }

  export type GameResultScalarWhereInput = {
    AND?: GameResultScalarWhereInput | GameResultScalarWhereInput[]
    OR?: GameResultScalarWhereInput[]
    NOT?: GameResultScalarWhereInput | GameResultScalarWhereInput[]
    id?: StringFilter<"GameResult"> | string
    gameTitle?: StringFilter<"GameResult"> | string
    score?: IntFilter<"GameResult"> | number
    createdAt?: DateTimeFilter<"GameResult"> | Date | string
    childId?: StringFilter<"GameResult"> | string
  }

  export type DyslexiaTestUpsertWithWhereUniqueWithoutChildInput = {
    where: DyslexiaTestWhereUniqueInput
    update: XOR<DyslexiaTestUpdateWithoutChildInput, DyslexiaTestUncheckedUpdateWithoutChildInput>
    create: XOR<DyslexiaTestCreateWithoutChildInput, DyslexiaTestUncheckedCreateWithoutChildInput>
  }

  export type DyslexiaTestUpdateWithWhereUniqueWithoutChildInput = {
    where: DyslexiaTestWhereUniqueInput
    data: XOR<DyslexiaTestUpdateWithoutChildInput, DyslexiaTestUncheckedUpdateWithoutChildInput>
  }

  export type DyslexiaTestUpdateManyWithWhereWithoutChildInput = {
    where: DyslexiaTestScalarWhereInput
    data: XOR<DyslexiaTestUpdateManyMutationInput, DyslexiaTestUncheckedUpdateManyWithoutChildInput>
  }

  export type DyslexiaTestScalarWhereInput = {
    AND?: DyslexiaTestScalarWhereInput | DyslexiaTestScalarWhereInput[]
    OR?: DyslexiaTestScalarWhereInput[]
    NOT?: DyslexiaTestScalarWhereInput | DyslexiaTestScalarWhereInput[]
    id?: StringFilter<"DyslexiaTest"> | string
    score?: IntFilter<"DyslexiaTest"> | number
    risk?: StringFilter<"DyslexiaTest"> | string
    answers?: JsonFilter<"DyslexiaTest">
    weakSkills?: StringNullableListFilter<"DyslexiaTest">
    createdAt?: DateTimeFilter<"DyslexiaTest"> | Date | string
    childId?: StringFilter<"DyslexiaTest"> | string
  }

  export type ChildCreateWithoutDyslexiaTestsInput = {
    id?: string
    clerkId?: string | null
    email?: string | null
    name: string
    avatar?: string
    level?: number
    title?: string
    stars?: number
    streak?: number
    coins?: number
    dyslexiaTestDone?: boolean
    dyslexiaScore?: number | null
    dyslexiaRisk?: string | null
    dyslexiaTestedAt?: Date | string | null
    dyslexiaWeakSkills?: ChildCreatedyslexiaWeakSkillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    badges?: BadgeCreateNestedManyWithoutChildInput
    readingSessions?: ReadingSessionCreateNestedManyWithoutChildInput
    gameResults?: GameResultCreateNestedManyWithoutChildInput
  }

  export type ChildUncheckedCreateWithoutDyslexiaTestsInput = {
    id?: string
    clerkId?: string | null
    email?: string | null
    name: string
    avatar?: string
    level?: number
    title?: string
    stars?: number
    streak?: number
    coins?: number
    dyslexiaTestDone?: boolean
    dyslexiaScore?: number | null
    dyslexiaRisk?: string | null
    dyslexiaTestedAt?: Date | string | null
    dyslexiaWeakSkills?: ChildCreatedyslexiaWeakSkillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    badges?: BadgeUncheckedCreateNestedManyWithoutChildInput
    readingSessions?: ReadingSessionUncheckedCreateNestedManyWithoutChildInput
    gameResults?: GameResultUncheckedCreateNestedManyWithoutChildInput
  }

  export type ChildCreateOrConnectWithoutDyslexiaTestsInput = {
    where: ChildWhereUniqueInput
    create: XOR<ChildCreateWithoutDyslexiaTestsInput, ChildUncheckedCreateWithoutDyslexiaTestsInput>
  }

  export type ChildUpsertWithoutDyslexiaTestsInput = {
    update: XOR<ChildUpdateWithoutDyslexiaTestsInput, ChildUncheckedUpdateWithoutDyslexiaTestsInput>
    create: XOR<ChildCreateWithoutDyslexiaTestsInput, ChildUncheckedCreateWithoutDyslexiaTestsInput>
    where?: ChildWhereInput
  }

  export type ChildUpdateToOneWithWhereWithoutDyslexiaTestsInput = {
    where?: ChildWhereInput
    data: XOR<ChildUpdateWithoutDyslexiaTestsInput, ChildUncheckedUpdateWithoutDyslexiaTestsInput>
  }

  export type ChildUpdateWithoutDyslexiaTestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    stars?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    dyslexiaTestDone?: BoolFieldUpdateOperationsInput | boolean
    dyslexiaScore?: NullableIntFieldUpdateOperationsInput | number | null
    dyslexiaRisk?: NullableStringFieldUpdateOperationsInput | string | null
    dyslexiaTestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dyslexiaWeakSkills?: ChildUpdatedyslexiaWeakSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    badges?: BadgeUpdateManyWithoutChildNestedInput
    readingSessions?: ReadingSessionUpdateManyWithoutChildNestedInput
    gameResults?: GameResultUpdateManyWithoutChildNestedInput
  }

  export type ChildUncheckedUpdateWithoutDyslexiaTestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    stars?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    dyslexiaTestDone?: BoolFieldUpdateOperationsInput | boolean
    dyslexiaScore?: NullableIntFieldUpdateOperationsInput | number | null
    dyslexiaRisk?: NullableStringFieldUpdateOperationsInput | string | null
    dyslexiaTestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dyslexiaWeakSkills?: ChildUpdatedyslexiaWeakSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    badges?: BadgeUncheckedUpdateManyWithoutChildNestedInput
    readingSessions?: ReadingSessionUncheckedUpdateManyWithoutChildNestedInput
    gameResults?: GameResultUncheckedUpdateManyWithoutChildNestedInput
  }

  export type ChildCreateWithoutBadgesInput = {
    id?: string
    clerkId?: string | null
    email?: string | null
    name: string
    avatar?: string
    level?: number
    title?: string
    stars?: number
    streak?: number
    coins?: number
    dyslexiaTestDone?: boolean
    dyslexiaScore?: number | null
    dyslexiaRisk?: string | null
    dyslexiaTestedAt?: Date | string | null
    dyslexiaWeakSkills?: ChildCreatedyslexiaWeakSkillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    readingSessions?: ReadingSessionCreateNestedManyWithoutChildInput
    gameResults?: GameResultCreateNestedManyWithoutChildInput
    dyslexiaTests?: DyslexiaTestCreateNestedManyWithoutChildInput
  }

  export type ChildUncheckedCreateWithoutBadgesInput = {
    id?: string
    clerkId?: string | null
    email?: string | null
    name: string
    avatar?: string
    level?: number
    title?: string
    stars?: number
    streak?: number
    coins?: number
    dyslexiaTestDone?: boolean
    dyslexiaScore?: number | null
    dyslexiaRisk?: string | null
    dyslexiaTestedAt?: Date | string | null
    dyslexiaWeakSkills?: ChildCreatedyslexiaWeakSkillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    readingSessions?: ReadingSessionUncheckedCreateNestedManyWithoutChildInput
    gameResults?: GameResultUncheckedCreateNestedManyWithoutChildInput
    dyslexiaTests?: DyslexiaTestUncheckedCreateNestedManyWithoutChildInput
  }

  export type ChildCreateOrConnectWithoutBadgesInput = {
    where: ChildWhereUniqueInput
    create: XOR<ChildCreateWithoutBadgesInput, ChildUncheckedCreateWithoutBadgesInput>
  }

  export type ChildUpsertWithoutBadgesInput = {
    update: XOR<ChildUpdateWithoutBadgesInput, ChildUncheckedUpdateWithoutBadgesInput>
    create: XOR<ChildCreateWithoutBadgesInput, ChildUncheckedCreateWithoutBadgesInput>
    where?: ChildWhereInput
  }

  export type ChildUpdateToOneWithWhereWithoutBadgesInput = {
    where?: ChildWhereInput
    data: XOR<ChildUpdateWithoutBadgesInput, ChildUncheckedUpdateWithoutBadgesInput>
  }

  export type ChildUpdateWithoutBadgesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    stars?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    dyslexiaTestDone?: BoolFieldUpdateOperationsInput | boolean
    dyslexiaScore?: NullableIntFieldUpdateOperationsInput | number | null
    dyslexiaRisk?: NullableStringFieldUpdateOperationsInput | string | null
    dyslexiaTestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dyslexiaWeakSkills?: ChildUpdatedyslexiaWeakSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readingSessions?: ReadingSessionUpdateManyWithoutChildNestedInput
    gameResults?: GameResultUpdateManyWithoutChildNestedInput
    dyslexiaTests?: DyslexiaTestUpdateManyWithoutChildNestedInput
  }

  export type ChildUncheckedUpdateWithoutBadgesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    stars?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    dyslexiaTestDone?: BoolFieldUpdateOperationsInput | boolean
    dyslexiaScore?: NullableIntFieldUpdateOperationsInput | number | null
    dyslexiaRisk?: NullableStringFieldUpdateOperationsInput | string | null
    dyslexiaTestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dyslexiaWeakSkills?: ChildUpdatedyslexiaWeakSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readingSessions?: ReadingSessionUncheckedUpdateManyWithoutChildNestedInput
    gameResults?: GameResultUncheckedUpdateManyWithoutChildNestedInput
    dyslexiaTests?: DyslexiaTestUncheckedUpdateManyWithoutChildNestedInput
  }

  export type ChildCreateWithoutReadingSessionsInput = {
    id?: string
    clerkId?: string | null
    email?: string | null
    name: string
    avatar?: string
    level?: number
    title?: string
    stars?: number
    streak?: number
    coins?: number
    dyslexiaTestDone?: boolean
    dyslexiaScore?: number | null
    dyslexiaRisk?: string | null
    dyslexiaTestedAt?: Date | string | null
    dyslexiaWeakSkills?: ChildCreatedyslexiaWeakSkillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    badges?: BadgeCreateNestedManyWithoutChildInput
    gameResults?: GameResultCreateNestedManyWithoutChildInput
    dyslexiaTests?: DyslexiaTestCreateNestedManyWithoutChildInput
  }

  export type ChildUncheckedCreateWithoutReadingSessionsInput = {
    id?: string
    clerkId?: string | null
    email?: string | null
    name: string
    avatar?: string
    level?: number
    title?: string
    stars?: number
    streak?: number
    coins?: number
    dyslexiaTestDone?: boolean
    dyslexiaScore?: number | null
    dyslexiaRisk?: string | null
    dyslexiaTestedAt?: Date | string | null
    dyslexiaWeakSkills?: ChildCreatedyslexiaWeakSkillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    badges?: BadgeUncheckedCreateNestedManyWithoutChildInput
    gameResults?: GameResultUncheckedCreateNestedManyWithoutChildInput
    dyslexiaTests?: DyslexiaTestUncheckedCreateNestedManyWithoutChildInput
  }

  export type ChildCreateOrConnectWithoutReadingSessionsInput = {
    where: ChildWhereUniqueInput
    create: XOR<ChildCreateWithoutReadingSessionsInput, ChildUncheckedCreateWithoutReadingSessionsInput>
  }

  export type ChildUpsertWithoutReadingSessionsInput = {
    update: XOR<ChildUpdateWithoutReadingSessionsInput, ChildUncheckedUpdateWithoutReadingSessionsInput>
    create: XOR<ChildCreateWithoutReadingSessionsInput, ChildUncheckedCreateWithoutReadingSessionsInput>
    where?: ChildWhereInput
  }

  export type ChildUpdateToOneWithWhereWithoutReadingSessionsInput = {
    where?: ChildWhereInput
    data: XOR<ChildUpdateWithoutReadingSessionsInput, ChildUncheckedUpdateWithoutReadingSessionsInput>
  }

  export type ChildUpdateWithoutReadingSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    stars?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    dyslexiaTestDone?: BoolFieldUpdateOperationsInput | boolean
    dyslexiaScore?: NullableIntFieldUpdateOperationsInput | number | null
    dyslexiaRisk?: NullableStringFieldUpdateOperationsInput | string | null
    dyslexiaTestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dyslexiaWeakSkills?: ChildUpdatedyslexiaWeakSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    badges?: BadgeUpdateManyWithoutChildNestedInput
    gameResults?: GameResultUpdateManyWithoutChildNestedInput
    dyslexiaTests?: DyslexiaTestUpdateManyWithoutChildNestedInput
  }

  export type ChildUncheckedUpdateWithoutReadingSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    stars?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    dyslexiaTestDone?: BoolFieldUpdateOperationsInput | boolean
    dyslexiaScore?: NullableIntFieldUpdateOperationsInput | number | null
    dyslexiaRisk?: NullableStringFieldUpdateOperationsInput | string | null
    dyslexiaTestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dyslexiaWeakSkills?: ChildUpdatedyslexiaWeakSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    badges?: BadgeUncheckedUpdateManyWithoutChildNestedInput
    gameResults?: GameResultUncheckedUpdateManyWithoutChildNestedInput
    dyslexiaTests?: DyslexiaTestUncheckedUpdateManyWithoutChildNestedInput
  }

  export type ChildCreateWithoutGameResultsInput = {
    id?: string
    clerkId?: string | null
    email?: string | null
    name: string
    avatar?: string
    level?: number
    title?: string
    stars?: number
    streak?: number
    coins?: number
    dyslexiaTestDone?: boolean
    dyslexiaScore?: number | null
    dyslexiaRisk?: string | null
    dyslexiaTestedAt?: Date | string | null
    dyslexiaWeakSkills?: ChildCreatedyslexiaWeakSkillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    badges?: BadgeCreateNestedManyWithoutChildInput
    readingSessions?: ReadingSessionCreateNestedManyWithoutChildInput
    dyslexiaTests?: DyslexiaTestCreateNestedManyWithoutChildInput
  }

  export type ChildUncheckedCreateWithoutGameResultsInput = {
    id?: string
    clerkId?: string | null
    email?: string | null
    name: string
    avatar?: string
    level?: number
    title?: string
    stars?: number
    streak?: number
    coins?: number
    dyslexiaTestDone?: boolean
    dyslexiaScore?: number | null
    dyslexiaRisk?: string | null
    dyslexiaTestedAt?: Date | string | null
    dyslexiaWeakSkills?: ChildCreatedyslexiaWeakSkillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    badges?: BadgeUncheckedCreateNestedManyWithoutChildInput
    readingSessions?: ReadingSessionUncheckedCreateNestedManyWithoutChildInput
    dyslexiaTests?: DyslexiaTestUncheckedCreateNestedManyWithoutChildInput
  }

  export type ChildCreateOrConnectWithoutGameResultsInput = {
    where: ChildWhereUniqueInput
    create: XOR<ChildCreateWithoutGameResultsInput, ChildUncheckedCreateWithoutGameResultsInput>
  }

  export type ChildUpsertWithoutGameResultsInput = {
    update: XOR<ChildUpdateWithoutGameResultsInput, ChildUncheckedUpdateWithoutGameResultsInput>
    create: XOR<ChildCreateWithoutGameResultsInput, ChildUncheckedCreateWithoutGameResultsInput>
    where?: ChildWhereInput
  }

  export type ChildUpdateToOneWithWhereWithoutGameResultsInput = {
    where?: ChildWhereInput
    data: XOR<ChildUpdateWithoutGameResultsInput, ChildUncheckedUpdateWithoutGameResultsInput>
  }

  export type ChildUpdateWithoutGameResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    stars?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    dyslexiaTestDone?: BoolFieldUpdateOperationsInput | boolean
    dyslexiaScore?: NullableIntFieldUpdateOperationsInput | number | null
    dyslexiaRisk?: NullableStringFieldUpdateOperationsInput | string | null
    dyslexiaTestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dyslexiaWeakSkills?: ChildUpdatedyslexiaWeakSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    badges?: BadgeUpdateManyWithoutChildNestedInput
    readingSessions?: ReadingSessionUpdateManyWithoutChildNestedInput
    dyslexiaTests?: DyslexiaTestUpdateManyWithoutChildNestedInput
  }

  export type ChildUncheckedUpdateWithoutGameResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    stars?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    dyslexiaTestDone?: BoolFieldUpdateOperationsInput | boolean
    dyslexiaScore?: NullableIntFieldUpdateOperationsInput | number | null
    dyslexiaRisk?: NullableStringFieldUpdateOperationsInput | string | null
    dyslexiaTestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dyslexiaWeakSkills?: ChildUpdatedyslexiaWeakSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    badges?: BadgeUncheckedUpdateManyWithoutChildNestedInput
    readingSessions?: ReadingSessionUncheckedUpdateManyWithoutChildNestedInput
    dyslexiaTests?: DyslexiaTestUncheckedUpdateManyWithoutChildNestedInput
  }

  export type BadgeCreateManyChildInput = {
    id?: string
    key: string
    label: string
    emoji: string
    unlocked?: boolean
  }

  export type ReadingSessionCreateManyChildInput = {
    id?: string
    accuracy?: number
    durationMin?: number
    wordsRead?: number
    lessonId?: string | null
    createdAt?: Date | string
  }

  export type GameResultCreateManyChildInput = {
    id?: string
    gameTitle: string
    score?: number
    createdAt?: Date | string
  }

  export type DyslexiaTestCreateManyChildInput = {
    id?: string
    score: number
    risk: string
    answers: JsonNullValueInput | InputJsonValue
    weakSkills?: DyslexiaTestCreateweakSkillsInput | string[]
    createdAt?: Date | string
  }

  export type BadgeUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    unlocked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BadgeUncheckedUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    unlocked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BadgeUncheckedUpdateManyWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    unlocked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ReadingSessionUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    accuracy?: FloatFieldUpdateOperationsInput | number
    durationMin?: IntFieldUpdateOperationsInput | number
    wordsRead?: IntFieldUpdateOperationsInput | number
    lessonId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadingSessionUncheckedUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    accuracy?: FloatFieldUpdateOperationsInput | number
    durationMin?: IntFieldUpdateOperationsInput | number
    wordsRead?: IntFieldUpdateOperationsInput | number
    lessonId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadingSessionUncheckedUpdateManyWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    accuracy?: FloatFieldUpdateOperationsInput | number
    durationMin?: IntFieldUpdateOperationsInput | number
    wordsRead?: IntFieldUpdateOperationsInput | number
    lessonId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameResultUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameTitle?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameResultUncheckedUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameTitle?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameResultUncheckedUpdateManyWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameTitle?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DyslexiaTestUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    risk?: StringFieldUpdateOperationsInput | string
    answers?: JsonNullValueInput | InputJsonValue
    weakSkills?: DyslexiaTestUpdateweakSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DyslexiaTestUncheckedUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    risk?: StringFieldUpdateOperationsInput | string
    answers?: JsonNullValueInput | InputJsonValue
    weakSkills?: DyslexiaTestUpdateweakSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DyslexiaTestUncheckedUpdateManyWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    risk?: StringFieldUpdateOperationsInput | string
    answers?: JsonNullValueInput | InputJsonValue
    weakSkills?: DyslexiaTestUpdateweakSkillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ChildCountOutputTypeDefaultArgs instead
     */
    export type ChildCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ChildCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ChildDefaultArgs instead
     */
    export type ChildArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ChildDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DyslexiaTestDefaultArgs instead
     */
    export type DyslexiaTestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DyslexiaTestDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BadgeDefaultArgs instead
     */
    export type BadgeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BadgeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReadingSessionDefaultArgs instead
     */
    export type ReadingSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReadingSessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LessonDefaultArgs instead
     */
    export type LessonArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LessonDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StoryDefaultArgs instead
     */
    export type StoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GameDefaultArgs instead
     */
    export type GameArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GameDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GameResultDefaultArgs instead
     */
    export type GameResultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GameResultDefaultArgs<ExtArgs>

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