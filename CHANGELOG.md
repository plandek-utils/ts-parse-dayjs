# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.3.0](https://github.com/plandek-utils/ts-parse-dayjs/compare/v4.2.0...v4.3.0) (2021-12-01)


### Features

* **fromnow():** add a fromNow method ([#339](https://github.com/plandek-utils/ts-parse-dayjs/issues/339)) ([f9d2253](https://github.com/plandek-utils/ts-parse-dayjs/commit/f9d2253328a9ac09c5f61b2afa042508211292a8))

## [4.2.0](https://github.com/plandek-utils/ts-parse-dayjs/compare/v4.1.0...v4.2.0) (2021-04-16)


### Features

* export types of Options + deps upgrade ([4990e5b](https://github.com/plandek-utils/ts-parse-dayjs/commit/4990e5b9d44d23756656eaeb6d1a6bf6b02197fc))

## [4.1.0](https://github.com/plandek-utils/ts-parse-dayjs/compare/v4.0.0...v4.1.0) (2021-04-07)


### Features

* adds RelativeTime plugin support ([436069b](https://github.com/plandek-utils/ts-parse-dayjs/commit/436069b8cac6e0f9876c00df88458750ffa5c23a))

## [4.0.0](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.11.0...v4.0.0) (2021-02-05)


### ⚠ BREAKING CHANGES

* **deps:** `dayjs` Duration plugin has a typescript-only breaking change in its type
definition.

* **deps:** updated dependencies, including dayjs ([4e5a5b5](https://github.com/plandek-utils/ts-parse-dayjs/commit/4e5a5b504969dd432632db42f54f36a62ee9276b))

## [3.11.0](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.10.4...v3.11.0) (2020-12-10)


### Features

* adding Duration plugin and durationBetween(a, b) function. Also enhancing README ([5658c51](https://github.com/plandek-utils/ts-parse-dayjs/commit/5658c51d37d31764423c4361f02839c691781976))

### [3.10.4](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.10.3...v3.10.4) (2020-09-28)


### Bug Fixes

* **dependency:** missing lock file + adapting to dayjs filename fix ([073af2d](https://github.com/plandek-utils/ts-parse-dayjs/commit/073af2d316aecf87e7dcf7181bd01eee25809ef4))

### [3.10.3](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.10.2...v3.10.3) (2020-09-28)

### [3.10.2](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.10.1...v3.10.2) (2020-06-18)


### Bug Fixes

* fixing imports with bad filename ([1cf14ca](https://github.com/plandek-utils/ts-parse-dayjs/commit/1cf14ca837cb685fb42f514d3106bde364b27aca))

### [3.10.1](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.10.0...v3.10.1) (2020-06-18)


### Bug Fixes

* add global import to fix types ([7c4bbc9](https://github.com/plandek-utils/ts-parse-dayjs/commit/7c4bbc9c804a0c85abe858b22a3edb114100fa1d))

## [3.10.0](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.9.0...v3.10.0) (2020-06-18)


### Features

* adding `isBetween`, `isSameOrAfter` and `isSameOrBefore` to created dayjs objects ([4fd2185](https://github.com/plandek-utils/ts-parse-dayjs/commit/4fd21853968553742091c7b8910dbf28873e12eb))

## [3.9.0](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.8.2...v3.9.0) (2020-06-01)


### Features

* add `isStrictDayjsInput()` and `isDayjsInput()` ([0a3d7c3](https://github.com/plandek-utils/ts-parse-dayjs/commit/0a3d7c3dc59664279635901c98aadca296a70184))


### Bug Fixes

* target ES2017 instead of esnext for module, and ES2015 for main ([e783e88](https://github.com/plandek-utils/ts-parse-dayjs/commit/e783e8835ae480becb6519bf12ee0a734531b05b))

### [3.8.2](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.8.1...v3.8.2) (2020-05-12)


### Bug Fixes

* target TS compilation to es2017 instead of esnext to avoid issues with apps using the lib ([81fba37](https://github.com/plandek-utils/ts-parse-dayjs/commit/81fba37245a5863df87b987916f26a7b00037458))

### [3.8.1](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.8.0...v3.8.1) (2020-05-12)

## [3.8.0](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.7.0...v3.8.0) (2020-04-23)


### Features

* better type of isValidDate(), now hinting that the value is not null ([dee648b](https://github.com/plandek-utils/ts-parse-dayjs/commit/dee648b910fe0638d38cfd4ce3dbac7e60460635))

## [3.7.0](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.6.3...v3.7.0) (2020-04-23)


### Features

* isValidDate() function added ([2697376](https://github.com/plandek-utils/ts-parse-dayjs/commit/269737695db8694a2550ac104658dcc3ca762de4))


### Bug Fixes

* **deps:** [security] bump acorn from 6.4.0 to 6.4.1 ([#66](https://github.com/plandek-utils/ts-parse-dayjs/issues/66)) ([146038f](https://github.com/plandek-utils/ts-parse-dayjs/commit/146038f2517fffb4824237b244085557ba0adc01))

### [3.6.3](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.6.2...v3.6.3) (2020-04-14)

### [3.6.2](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.6.1...v3.6.2) (2020-04-03)

### [3.6.1](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.6.0...v3.6.1) (2020-04-02)


### Bug Fixes

* fixing type issue with minDayjs() and maxDayjs() ([d3ce927](https://github.com/plandek-utils/ts-parse-dayjs/commit/d3ce9277b6477c7186cf9913ff37fc49f266ef2b))

## [3.6.0](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.5.0...v3.6.0) (2020-04-02)


### Features

* add minDayjs() and maxDayjs(), plus upgrade dayjs dep. Also update dependencies and format ([03a8c02](https://github.com/plandek-utils/ts-parse-dayjs/commit/03a8c02a57e93556577b445a849176f055ddc9af))

## [3.5.0](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.4.0...v3.5.0) (2020-02-26)


### Features

* formatDate() function ([38de73d](https://github.com/plandek-utils/ts-parse-dayjs/commit/38de73d0b4663ffd32191a41a2c3ea395ed939df))

## [3.4.0](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.3.1...v3.4.0) (2020-02-26)


### Features

* export isDayjs function and Dayjs type ([c796acb](https://github.com/plandek-utils/ts-parse-dayjs/commit/c796acbb006880bd524544d91f973ea3402b9487))

### [3.3.1](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.3.0...v3.3.1) (2020-02-26)


### Bug Fixes

* **deps:** bump dayjs from 1.8.20 to 1.8.21 ([#58](https://github.com/plandek-utils/ts-parse-dayjs/issues/58)) ([59bc6ea](https://github.com/plandek-utils/ts-parse-dayjs/commit/59bc6ea0acc5f7c17e71a7a0903e8b6755364dcf))

## [3.3.0](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.2.0...v3.3.0) (2020-02-13)


### Features

* add week of year support ([f66822f](https://github.com/plandek-utils/ts-parse-dayjs/commit/f66822f734aa29d2f9907c92a508bf84eed2eeb2))

## [3.2.0](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.1.2...v3.2.0) (2020-02-13)


### Features

* add formatting capabilities by using the AdvancedFormat plugin ([c2c3ff4](https://github.com/plandek-utils/ts-parse-dayjs/commit/c2c3ff46defaa2a03bd661e1e5cb3e4221e0bc3b))


### Bug Fixes

* **deps:** bump dayjs from 1.8.19 to 1.8.20 ([#51](https://github.com/plandek-utils/ts-parse-dayjs/issues/51)) ([6bbba03](https://github.com/plandek-utils/ts-parse-dayjs/commit/6bbba03e7b72ef6740e4fc33a0acb2217853b608))

### [3.1.2](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.1.1...v3.1.2) (2020-01-06)

### [3.1.1](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.1.0...v3.1.1) (2019-12-18)


### Bug Fixes

* fix in types with Dayjs dependency (broke before with 1.8.18) ([2a29a63](https://github.com/plandek-utils/ts-parse-dayjs/commit/2a29a634572fdf57c6a44e1ddb07053abeba3922))

## [3.1.0](https://github.com/plandek-utils/ts-parse-dayjs/compare/v3.0.0...v3.1.0) (2019-12-03)


### Features

* expose TimeDefault and TimeOverride enums ([6a32374](https://github.com/plandek-utils/ts-parse-dayjs/commit/6a32374c29a488c3b3e18bdeb1f3d01ede8a896a))

## [3.0.0](https://github.com/plandek-utils/ts-parse-dayjs/compare/v2.0.0...v3.0.0) (2019-10-29)


### ⚠ BREAKING CHANGES

* The optional argument of the custom origin has been replaced by an optional object
with all the options. The first option available is the `origin`. e.g.
`parseFromStandardPeriods("1d", customOrigin)` => `parseFromStandardPeriods("1d", { origin:
customOrigin })`
* The optional argument of the custom locale has been replaced by an optional object
with all the options. The first one of which is locale. e.g. `parseDayjs(d, customLocale)` =>
`parseDayjs(d, { locale: customLocale })`

### Features

* options object with `strict` option + `time` adapt option + refactor ([#2](https://github.com/plandek-utils/ts-parse-dayjs/issues/2)) ([8a26e5f](https://github.com/plandek-utils/ts-parse-dayjs/commit/8a26e5fbdd98029e037a3af88fd4ed576ca8d788))
* second argument as option hash instead of directly the locale ([400613b](https://github.com/plandek-utils/ts-parse-dayjs/commit/400613bb47e12aa81d71f41774d4ffcdc8912c3a))
* second argument as option hash instead of directly the origin (parseFromStandardPeriods) ([f976d3e](https://github.com/plandek-utils/ts-parse-dayjs/commit/f976d3ed53bb78e0627fa614a2df228625791032))

## [2.0.0](https://github.com/plandek-utils/ts-parse-dayjs/compare/v1.2.0...v2.0.0) (2019-10-28)

### Features

* add Locale support + include english locales by default + default locale en-gb ([99f0c72](https://github.com/plandek-utils/ts-parse-dayjs/commit/99f0c728f24c235613f61e57e2de40c74e34e4b4))
* parseFromStandardPeriods() and Ranges ([1bc2ff7](https://github.com/plandek-utils/ts-parse-dayjs/commit/1bc2ff7617d61d06a63c9611d05339c6749e0ea4))


### ⚠ BREAKING CHANGES

* the Dayjs objects returned by the functions in this lib will now use `en-gb` locale
by default instead of `en` (USA English)

* mark as Breaking Change the new default locale ([ca59898](https://github.com/plandek-utils/ts-parse-dayjs/commit/ca59898a81693807956e8e3ed318681f0abcc77a))

## [1.1.0](https://github.com/plandek-utils/ts-parse-dayjs/compare/v1.0.0...v1.1.0) (2019-10-25)


### Features

* exporting DayjsInput type ([56d6eb7](https://github.com/plandek-utils/ts-parse-dayjs/commit/56d6eb72f958bc8fd3161c058b84d5c6f4a1a824))

## 1.0.0 (2019-10-23)


### Features

* initial parseDayjs parseDayjsOrError parseDayjsStartOfDay parseDayjsEndOfDay ([f92c010](https://github.com/plandek-utils/ts-parse-dayjs/commit/f92c010df80d8d7486a63f3393501c3ae47cb4c1))

## 1.0.0 (2019-10-23)


### Features

* initial parseDayjs parseDayjsOrError parseDayjsStartOfDay parseDayjsEndOfDay ([f92c010](https://github.com/plandek-utils/ts-parse-dayjs/commit/f92c010df80d8d7486a63f3393501c3ae47cb4c1))

## 1.0.0 (2019-10-23)
